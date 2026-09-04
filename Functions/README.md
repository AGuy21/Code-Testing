# Functions 🗺️

> Find and host real-life hangouts around you — a live events feed, an interactive map with one-tap RSVPs, and a 10-second host flow.

This README serves two audiences:

- **Engineers** — architecture, Firestore integration, external APIs and local setup.
- **The corporation** — the work that lives *outside* the code: design system, licensed assets, marketing plan and compliance duties.

---

## Table of contents

1. [Features](#features)
2. [Tech stack](#tech-stack)
3. [Architecture](#architecture)
4. [Firebase Firestore integration](#firebase-firestore-integration)
5. [External APIs & services](#external-apis--services)
6. [Getting started](#getting-started)
7. [Design system](#design-system)
8. [Marketing & corporate work](#marketing--corporate-work)
9. [Scripts](#scripts)
10. [Roadmap](#roadmap)
11. [License & attributions](#license--attributions)

---

## Features

- **Live events feed** — hangouts stream in real time from Firestore snapshots; no pull-to-refresh needed.
- **Interactive map** — custom emoji pins with live head counts, tap-to-open detail card, "locate me" FAB and auto-fit camera.
- **One-tap RSVPs** — Join / Pass / undo, persisted per signed-in Clerk user.
- **10-second host flow** — category + time chip + GPS pin, and the map flies to your new hangout.
- **Self-seeding data** — five starter hangouts are batch-written on first sync when the collection is empty.
- **Theming** — emerald/slate palette, light & dark, Manrope type ramp, reusable UI kit.

## Tech stack

| Layer | Choice |
| --- | --- |
| Runtime | Expo SDK 57 · React Native 0.86 · React 19 |
| Language | TypeScript (strict) |
| Navigation | expo-router (file-based routes) |
| Auth | Clerk (`@clerk/expo`, hosted auth + secure token cache) |
| Backend | Firebase Firestore — modular JS SDK, real-time listeners |
| Maps & location | `react-native-maps` (Google Maps on Android) + `expo-location` |
| Icons & type | `@react-native-vector-icons/ionicons`, `material-design-icons` · Manrope |

## Architecture

The codebase is **compartmentalized**: routes render screens, components present, one provider owns all data, and one config file owns every secret.

```text
Functions/
├── app.config.ts              # Expo config (source of truth; overrides app.json)
├── .env.local                 # Clerk + Google Maps keys (gitignored)
├── Configs/
│   ├── FirebaseConfig.ts      # Firebase app + Firestore instance (db)
│   └── firestore.rules        # Reference security rules for `hangouts`
└── src/
    ├── app/                   # expo-router routes
    │   ├── _layout.tsx        #   fonts → Clerk → Hangouts → Stack
    │   ├── hosted-auth-callback.tsx
    │   ├── (auth)/login.tsx   #   Clerk hosted sign-in
    │   └── (tabs)/            #   index (feed) · map · add · chat · profile
    ├── providers/
    │   └── HangoutsProvider.tsx   # Firestore ⇄ app state (single source of truth)
    ├── hooks/
    │   ├── useHangouts.ts     #   context accessor used by every feature
    │   └── useColorTheme.ts   #   palette per scheme (+ useThemePalette)
    ├── components/
    │   ├── ui/                #   AppText · AppTextInput · Badge · Card · PrimaryButton · Screen
    │   ├── hangouts/          #   HangoutCard · RsvpButtons
    │   └── map/               #   HangoutMap · HangoutMarker
    ├── constants/             #   Colors · Fonts · Categories · types/
    ├── data/hangouts.ts       #   seed hangouts + initial map region
    └── utils/hangouts.ts      #   date formatting
```

### Data flow

```text
                 ┌───────────────────────────┐
  Firestore      │   hangouts collection     │
                 └─────────────┬─────────────┘
          onSnapshot (real-time, ordered by startsAt)
                               ▼
         src/providers/HangoutsProvider.tsx
         · seeds 5 starter docs via writeBatch when empty
         · RSVPs → arrayUnion/arrayRemove on user-id arrays
         · addHangout → setDoc (+ serverTimestamp createdAt)
                               ▼  React context
         src/hooks/useHangouts.ts
        ┌────────────┬─────────────┬─────────────┐
        ▼            ▼             ▼             ▼
    (tabs)/index  (tabs)/map   (tabs)/add    components/*
    feed cards    map+markers  host form     RsvpButtons
```

Screens never touch Firestore directly — everything goes through `useHangouts()`.

## Firebase Firestore integration

- **Init** — `Configs/FirebaseConfig.ts` uses `initializeFirestore` with
  `experimentalAutoDetectLongPolling: true` because the default WebChannel
  transport is unreliable inside React Native. `firebase/analytics` is
  intentionally not imported (it depends on browser APIs).
- **Sync** — one `onSnapshot` listener on `hangouts`, ordered by `startsAt`
  ascending; the first snapshot flips `isLoading` off.
- **Seeding** — if the first snapshot is empty, a `writeBatch` writes the five
  `SEED_HANGOUTS` once (guarded by a ref so it never re-runs).
- **RSVPs** — the Clerk `userId` is unioned/removed from `goingUserIds` /
  `passedUserIds`; the visible head count is `baseGoingCount + (my RSVP)`.
- **Hosting** — `addHangout` writes a doc with `Timestamp.fromDate(startsAt)`
  and `serverTimestamp()` for `createdAt`; the snapshot loop picks it up.

### Data model — collection `hangouts`

| Field | Type | Notes |
| --- | --- | --- |
| `title` | string | 1–120 chars |
| `description` | string | ≤ 500 chars |
| `category` | string | `chill` \| `food` \| `sports` \| `party` \| `study` |
| `emoji` | string | rendered inside the map pin |
| `location` | `{ latitude, longitude }` | from device GPS |
| `placeLabel` | string | human-readable place name |
| `startsAt` | Firestore Timestamp | ordering key |
| `hostName` | string | display name |
| `hostId` | string \| null | Clerk user id (null for seeds) |
| `baseGoingCount` | number | seed head count |
| `goingUserIds` | string[] | RSVP state |
| `passedUserIds` | string[] | RSVP state |
| `createdAt` | server Timestamp | audit |

### Security rules

`Configs/firestore.rules` matches this write pattern exactly:

- `read` — public; the feed and map work for everyone.
- `create` — signed-in only; validates the fields above and requires empty RSVP arrays.
- `update` — signed-in only and **restricted to** `goingUserIds` / `passedUserIds` (max 1000 each).
- `delete` — closed.

Apply them in **Firebase console → Firestore Database → Rules**, or with the Firebase CLI:

```bash
npm i -g firebase-tools
firebase login
firebase deploy --only firestore:rules   # from a dir containing firebase.json
```

## External APIs & services

Everything the app calls outside its own code — and exactly where it is wired.

| # | API / service | Purpose | Wired in | Credential |
| --- | --- | --- | --- | --- |
| 1 | **Google Maps Platform** — Maps SDK for Android via `react-native-maps` | Map tab: tiles, markers, camera | `app.config.ts` → `android.config.googleMaps.apiKey` | `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY` in `.env.local` |
| 2 | **Firebase Firestore** | Real-time hangouts, RSVPs, seeding | `Configs/FirebaseConfig.ts` → consumed by `HangoutsProvider` | Firebase web config (public by design; protected by rules) |
| 3 | **Clerk** | Sign-in/up, sessions, identity for RSVP ownership | `src/app/_layout.tsx`, `(auth)/login.tsx`, `profile.tsx` | `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`; `CLERK_SECRET_KEY` is server-side only |
| 4 | **expo-location** (device GPS) | Locate-me FAB; pin-your-hangout | `(tabs)/map.tsx`, `(tabs)/add.tsx` | OS permission strings in `app.config.ts` |

### 1. Google Maps Platform (required for the Map tab)

`react-native-maps` renders **Google Maps on Android**, and the API key must be compiled into the native manifest. `app.config.ts` — which Expo uses *instead of* `app.json` when both exist — injects it from `.env.local`, with the dev key as fallback.

**Setup (one time):**

1. Open <https://console.cloud.google.com> → create or select a project.
2. **APIs & Services → Library** → enable **Maps SDK for Android** (and **Maps SDK for iOS** if you want Google tiles on iOS too).
3. **APIs & Services → Credentials → Create credentials → API key**.
4. **Restrict the key**: Application restrictions → *Android apps* → add package name `com.anonymous.Functions` and your SHA-1 (`cd android && ./gradlew signingReport`, or `keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android`). API restrictions → *Maps SDK for Android*.
5. Put the key in `Functions/.env.local`:
   ```
   EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=AIza…
   ```
6. **Rebuild native** — the key is compile-time config, not hot-reloadable:
   ```bash
   npx expo prebuild --clean
   npm run android
   ```

**Blank/grey map?** Check that the GCP project has billing enabled, the SDK is enabled, and the key restriction matches this app's package + SHA-1; then inspect `adb logcat | grep -iE "maps|api"`.

**Platform notes:**

- **iOS** — without a key you get **Apple Maps** (keyless and fine for dev). Setting `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY` additionally injects `ios.config.googleMapsApiKey` for Google tiles (then enable *Maps SDK for iOS* and restrict that key for iOS bundle IDs).
- **Web** — `react-native-maps` has no web support; the map tab is native-only.
- Google requires the in-app **"© Google" attribution** to remain visible — don't cover the bottom edge of the map with UI.

### 2. Clerk (auth)

- App keys live in `.env.local`; the root layout throws at startup if the publishable key is missing.
- Sign-in uses **Clerk hosted auth** (`useHostedAuth`) with `expo-web-browser` + `expo-secure-store`; `hosted-auth-callback.tsx` is the redirect landing pad.
- The Clerk `userId` is the only identifier persisted to Firestore (`hostId` + RSVP arrays) — no emails or names are stored.
- `CLERK_SECRET_KEY` must never ship in the app bundle; it is reserved for a future backend (Cloud Functions / corporate API).

### 3. Firebase Firestore

- Web config lives in `Configs/FirebaseConfig.ts` (project `functions-ce142`). A web API key is public by design — data protection comes from **security rules**, not secrecy.
- Create the database in **Firebase console → Firestore Database**, then apply `Configs/firestore.rules` (or run test mode while prototyping, but ship the rules).
- Recommended next step: move seeding and head-count aggregation into **Cloud Functions** and tighten `create` further.

### 4. expo-location

- Permission strings are configured in `app.config.ts` (`locationWhenInUsePermission`); the Android manifest requests `ACCESS_COARSE_LOCATION` / `ACCESS_FINE_LOCATION`.
- Used by the locate-me FAB (map camera) and the host flow's "Use my location" pin. Both degrade gracefully when the user denies access.

### 5. Outside information & assets used by the corporation

- **Typeface** — Manrope (SIL Open Font License), bundled through `expo-font` in `app.config.ts`.
- **Icons** — Ionicons (MIT) and Material Design Icons (Apache-2.0) via `@react-native-vector-icons/*`.
- **Map imagery** — Google Maps Platform imagery is licensed under Google's Terms of Service (attribution required; no caching or offline reuse).
- **Identity data** — Clerk is the identity processor (their DPA applies to user data).
- **Planned corporate API** — `profile.tsx` already sketches the integration pattern: `fetch` with `Authorization: Bearer <Clerk token>` against the company backend. Swap the `api.example.com` placeholder for the real corporate endpoint when it exists.

## Getting started

**Prerequisites:** Node ≥ 20 · npm · Android Studio (SDK + emulator with Google Play services). Expo Go is *not* enough for the map — use a dev build.

```bash
cd Functions
npm install

# .env.local template (already present locally)
# EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_…
# CLERK_SECRET_KEY=sk_test_…              # server-side only
# EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=AIza…

npm run android    # first run generates the gitignored android/ via prebuild
npm run ios        # macOS + Xcode
npm start          # Metro dev server
```

**Working-build checklist:** valid Clerk keys · Firestore database created with rules applied · Google Maps key set and restricted · emulator image with Google Play.

## Design system

**Palette** (`src/constants/Colors.ts`, emerald/slate, dark-first):

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `primary` | `#50c878` | `#50c878` | CTAs, active tab, pin accents |
| `secondary` | `#2f4f4f` | `#2f4f4f` | inactive tint, tab border |
| `background` | `#ffffff` | `#121212` | screen base |
| `surface` / `surfaceElevated` | `#F2F7F4` / `#E7F0EB` | `#1A211E` / `#242F2A` | cards, chips |
| `text` / `textMuted` | `#000000` / `#5C6B64` | `#ffffff` / `#8FA39A` | typography |
| `border` / `borderStrong` | 14% / 45% emerald | 16% / 40% emerald | hairlines, selected pin |
| `accentSoft` | 16% emerald | 16% emerald | selected states, emoji bubble |
| `link` | `#9370db` | `#9370db` | inline links |

**Type** — Manrope ramp (ExtraLight → ExtraBold); `AppText` variants: `hero`, `subtitle`, `body`, `caption`, `label`. Field labels are uppercase `SemiBold` 12px with letter-spacing.

**Shape & motion** — large radii (14–28px), 1px soft borders, map pin scales 44 → 52px when selected, 400–500 ms camera animations.

**UI kit** — always import from `components/ui`: `AppText` · `AppTextInput` · `Badge` · `Card` (incl. `accent` variant) · `PrimaryButton` (`primary` / `outline` / `ghost`) · `Screen` (scrollable wrapper).

**Category system** — the emoji is the brand device: chill 🛋️ · food 🍜 · sports 🏀 · party 🎉 · study 📚. The same glyph appears in cards, chips and map pins.

**Voice** — short, warm, lowercase-friendly: "Pin it, and others can say if they want to join".

## Marketing & corporate work

**Positioning** — for 18–30 year-olds new to a city or campus: spontaneous, low-pressure plans without group-chat chaos.

**Taglines** — "Say you're in." · "Hangouts happen." · "Find your people, tonight."

**Personas** — the **mover** (new in town, wants belonging), the **organizer** (hosts and wants zero-friction RSVPs), the **lurker** (browses the map, joins when plans are close).

**Value props** — map-first discovery · 10-second hosting · one-tap RSVP · real people in real places.

**Channels** — campus club ambassadors · IG Reels / TikTok screen-recordings of the map · QR posters near food trucks and parks · App Store / Play ASO on "hangout", "events near me", "meetup" · Product Hunt at v1.

**Launch checklist (outside the codebase):** finalize icon/splash assets · store listings with screenshots of Map, Events and Add flows · Play **Data Safety** form (coarse/fine location + user content; processors: Clerk, Firebase/Google) · privacy policy + terms URLs · visible Google attribution · support inbox · internal testing track before public rollout.

**KPIs** — week-1 retention · hangouts created / week · RSVP conversion (card views → Join) · map interactions per session · organic-vs-seed content ratio.

**Compliance notes** — location permission copy must match actual usage · Clerk and Firebase DPAs · Google Maps ToS attribution · keep the Manrope OFL license file with the repo.

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Metro dev server |
| `npm run android` / `npm run ios` | native dev build (prebuild on first run) |
| `npm run web` | Metro web bundle (map is native-only) |

## Roadmap

- Chat tab — Firestore subcollection per hangout
- Places search — Google **Places API** in the host flow (beyond GPS-only pins)
- Push notifications (FCM) when someone joins your hangout
- Cloud Functions for counters, moderation and auto-expiry of past hangouts
- Edit/delete own hangouts · feed filters and distance sorting

## License & attributions

- App code — MIT (see `LICENSE`).
- Manrope — SIL OFL · Ionicons — MIT · Material Design Icons — Apache-2.0.
- Google Maps Platform / Firebase — subject to Google's Terms of Service; Clerk — subject to Clerk's terms.
