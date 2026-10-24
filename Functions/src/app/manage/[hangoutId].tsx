import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Platform, Pressable, Share, StyleSheet, Text, View } from "react-native";
import { AppText, AppTextInput, Card, CategoryTile, Chip, Icon, PrimaryButton, Screen } from "../../components/ui";
import { useHangouts } from "../../hooks/useHangouts";
import { useThemePalette } from "../../hooks/useColorTheme";
import { Fonts } from "../../constants/Fonts";
import { CATEGORY_META, CATEGORY_ORDER, PRIVACY_META } from "../../constants/Categories";
import DateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { PlaceSearchInput } from "../../components/hangouts/PlaceSearchInput";
import { formatStartsAt } from "../../utils/hangouts";
import type { HangoutCategory, LatLng } from "../../constants/types/hangout";


/** Host tools for a hangout: requests, guests, invites, +1s and invite code. */
export default function ManageHangout() {
  const { hangoutId } = useLocalSearchParams<{ hangoutId: string }>();
  const router = useRouter();
  const palette = useThemePalette();
  const {
    hangouts,
    getPeople,
    getInviteCode,
    regenerateInviteCode,
    inviteUser,
    approveRequest,
    denyRequest,
    removeGuest,
    setAllowPlusOnes,
    editHangout,
    cancelHangout,
    lookupNames,
    searchUsers,
  } = useHangouts();

  const hangout = hangouts.find((item) => item.id === hangoutId);
  const people = getPeople(hangoutId);
  const [names, setNames] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<{ id: string; displayName: string }[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [placeLabel, setPlaceLabel] = useState("");
  const [category, setCategory] = useState<HangoutCategory>("chill");
  const [startsAt, setStartsAt] = useState<Date>(new Date());
  const [newLocation, setNewLocation] = useState<LatLng | null>(null);
  const [saving, setSaving] = useState(false);
  const loadedRef = useRef<string | null>(null);

  // Seed the form once per hangout so live snapshots don't clobber typing.
  useEffect(() => {
    if (!hangout || loadedRef.current === hangout.id) return;
    loadedRef.current = hangout.id;
    setTitle(hangout.title);
    setDescription(hangout.description);
    setPlaceLabel(hangout.placeLabel);
    setCategory(hangout.category);
    setStartsAt(new Date(hangout.startsAt));
  }, [hangout]);

  const idsKey = [...people.requested, ...people.approved, ...people.going].join(",");
  useEffect(() => {
    const ids = idsKey ? idsKey.split(",") : [];
    if (ids.length === 0) return;
    void lookupNames(ids).then((found) => setNames((prev) => ({ ...prev, ...found })));
  }, [idsKey, lookupNames]);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => {
      searchUsers(search)
        .then((found) => {
          if (!cancelled) setResults(found);
        })
        .catch(() => undefined);
    }, 300);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [search, searchUsers]);

  if (!hangout) {
    return (
      <Screen>
        <AppText variant="subtitle">Hangout not found</AppText>
        <PrimaryButton label="Back" variant="outline" onPress={() => router.back()} />
      </Screen>
    );
  }

  const isPrivate = hangout.privacy !== "public";
  const code = getInviteCode(hangout.id);
  const nameOf = (id: string) => names[id] ?? id;
  const openProfile = (id: string) =>
    router.push({ pathname: "/user/[userId]", params: { userId: id, name: nameOf(id) } });
  const guests = people.approved.filter(
    (id) => !people.requested.includes(id),
  );

  const makeCode = async () => {
    try {
      await regenerateInviteCode(hangout.id);
    } catch (error) {
      Alert.alert(
        "Couldn't create a code",
        error instanceof Error ? error.message : "Please try again.",
      );
    }
  };

  const save = async () => {
    setSaving(true);
    try {
      await editHangout(hangout.id, {
        title,
        description,
        category,
        emoji: CATEGORY_META[category].emoji,
        placeLabel,
        startsAt: startsAt.toISOString(),
        ...(newLocation ? { location: newLocation } : {}),
      });
      setNewLocation(null);
      Alert.alert("Saved", "Your hangout is updated.");
    } catch (error) {
      Alert.alert(
        "Couldn't save",
        error instanceof Error ? error.message : "Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  const confirmCancel = () =>
    Alert.alert("Cancel hangout", "Everyone will lose access. This can't be undone.", [
      { text: "Keep it", style: "cancel" },
      {
        text: "Cancel hangout",
        style: "destructive",
        onPress: () => {
          cancelHangout(hangout.id)
            .then(() => router.back())
            .catch((error) =>
              Alert.alert(
                "Couldn't cancel",
                error instanceof Error ? error.message : "Please try again.",
              ),
            );
        },
      },
    ]);

  const confirmRemove = (id: string) =>
    Alert.alert("Remove guest", `Remove ${nameOf(id)} from this hangout?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => removeGuest(hangout.id, id) },
    ]);

  return (
    <Screen scroll>
      <PrimaryButton label="Back" icon="chevron-back" variant="ghost" onPress={() => router.back()} />
      <View style={styles.titleRow}>
        <CategoryTile category={hangout.category} size={44} />
        <AppText variant="hero" style={styles.titleText} numberOfLines={2}>{hangout.title}</AppText>
      </View>
      <AppText variant="caption" style={styles.sub}>
        {PRIVACY_META[hangout.privacy].label} · {people.going.length + people.plusOnes.length} going
      </AppText>

      <Text style={[styles.label, { color: palette.textMuted }]}>Details</Text>
      <AppTextInput label="Title" value={title} onChangeText={setTitle} />
      <AppTextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        style={styles.multiline}
      />
      <AppTextInput label="Place name" value={placeLabel} onChangeText={setPlaceLabel} />
      <PlaceSearchInput
        onPlaceSelected={(place) => {
          setNewLocation(place.location);
          setPlaceLabel(place.label);
        }}
        selectedLabel={newLocation ? placeLabel : null}
        near={newLocation ?? hangout.location}
      />
      <Text style={[styles.label, { color: palette.textMuted }]}>Start time</Text>
      <View style={styles.timeRow}><Icon name="time" size={15} color={palette.primary} /><AppText variant="caption">{formatStartsAt(startsAt.toISOString())}</AppText></View>
      {Platform.OS === "android" ? (
        <View style={styles.chips}>
          {(["date", "time"] as const).map((mode) => (
            <PrimaryButton
              key={mode}
              label={mode === "date" ? "Change date" : "Change time"}
              variant="outline"
              onPress={() =>
                DateTimePickerAndroid.open({
                  value: startsAt,
                  mode,
                  is24Hour: false,
                  onChange: (_event, selected) => {
                    if (selected) setStartsAt(selected);
                  },
                })
              }
            />
          ))}
        </View>
      ) : (
        <DateTimePicker
          value={startsAt}
          mode="datetime"
          onChange={(_event, selected) => {
            if (selected) setStartsAt(selected);
          }}
        />
      )}
      <View style={styles.chips}>
        {CATEGORY_ORDER.map((key) => {
          const active = key === category;
          return (
            <Chip key={key} label={CATEGORY_META[key].label} icon={CATEGORY_META[key].icon} color={CATEGORY_META[key].color} selected={active} onPress={() => setCategory(key)} />
          );
        })}
      </View>
      <PrimaryButton
        label={saving ? "Saving…" : "Save changes"}
        onPress={() => void save()}
        disabled={saving || title.trim().length === 0}
      />

      <Text style={[styles.label, { color: palette.textMuted }]}>+1s</Text>
      <Card>
        <PrimaryButton
          label={hangout.allowPlusOnes ? "+1s allowed — tap to disable" : "+1s off — tap to allow"}
          variant={hangout.allowPlusOnes ? "primary" : "outline"}
          onPress={() => setAllowPlusOnes(hangout.id, !hangout.allowPlusOnes)}
        />
      </Card>

      {isPrivate ? (
        <>
          <Text style={[styles.label, { color: palette.textMuted }]}>Invite code</Text>
          <Card>
            <Text style={[styles.code, { color: palette.text }]}>{code ?? "No code yet"}</Text>
            <View style={styles.row}>
              <PrimaryButton
                label={code ? "New code" : "Create code"}
                variant="outline"
                onPress={() => void makeCode()}
                style={styles.flex}
              />
              {code ? (
                <PrimaryButton
                  label="Share"
                  onPress={() =>
                    void Share.share({
                      message: `Join "${hangout.title}" on Functions: functions://invite/${code} (or enter code ${code})`,
                    })
                  }
                  style={styles.flex}
                />
              ) : null}
            </View>
          </Card>

          {hangout.privacy === "request" ? (
            <>
              <Text style={[styles.label, { color: palette.textMuted }]}>
                Join requests ({people.requested.length})
              </Text>
              <Card>
                {people.requested.length === 0 ? (
                  <Text style={{ color: palette.textMuted }}>No pending requests.</Text>
                ) : (
                  people.requested.map((id) => (
                    <View key={id} style={styles.person}>
                      <Text style={[styles.name, { color: palette.text }]} onPress={() => openProfile(id)}>{nameOf(id)}</Text>
                      <PrimaryButton
                        label="Approve"
                        onPress={() => approveRequest(hangout.id, id)}
                        style={styles.small}
                      />
                      <PrimaryButton
                        label="Deny"
                        variant="outline"
                        onPress={() => denyRequest(hangout.id, id)}
                        style={styles.small}
                      />
                    </View>
                  ))
                )}
              </Card>
            </>
          ) : null}

          <Text style={[styles.label, { color: palette.textMuted }]}>Invite someone</Text>
          <AppTextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search by name"
            autoCapitalize="none"
          />
          {results
            .filter((user) => !people.approved.includes(user.id) && user.id !== hangout.hostId)
            .map((user) => (
              <View key={user.id} style={styles.person}>
                <Text style={[styles.name, { color: palette.text }]}>{user.displayName}</Text>
                <PrimaryButton
                  label="Invite"
                  onPress={() => {
                    inviteUser(hangout.id, user.id);
                    setNames((prev) => ({ ...prev, [user.id]: user.displayName }));
                    setSearch("");
                  }}
                  style={styles.small}
                />
              </View>
            ))}

          <Text style={[styles.label, { color: palette.textMuted }]}>
            Approved guests ({guests.length})
          </Text>
          <Card>
            {guests.length === 0 ? (
              <Text style={{ color: palette.textMuted }}>Nobody approved yet.</Text>
            ) : (
              guests.map((id) => (
                <View key={id} style={styles.person}>
                  <Text style={[styles.name, { color: palette.text }]} onPress={() => openProfile(id)}>
                    {nameOf(id)}
                    {people.going.includes(id) ? " · going" : ""}
                    {people.plusOnes.includes(id) ? " +1" : ""}
                  </Text>
                  <PrimaryButton
                    label="Remove"
                    variant="outline"
                    onPress={() => confirmRemove(id)}
                    style={styles.small}
                  />
                </View>
              ))
            )}
          </Card>
        </>
      ) : null}
      <PrimaryButton
        label="Cancel hangout"
        variant="outline"
        onPress={confirmCancel}
        style={styles.danger}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  titleRow: { alignItems: "center", flexDirection: "row", gap: 12, marginTop: 8 },
  titleText: { flex: 1, fontSize: 28 },
  timeRow: { alignItems: "center", flexDirection: "row", gap: 6 },
  multiline: { height: 90, textAlignVertical: "top" },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 14 },
  chip: { borderRadius: 999, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 8 },
  danger: { marginBottom: 24, marginTop: 28 },
  sub: { marginBottom: 16, marginTop: 6 },
  label: {
    fontFamily: Fonts.SemiBold,
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 16,
    textTransform: "uppercase",
  },
  code: { fontFamily: Fonts.ExtraBold, fontSize: 28, letterSpacing: 4, marginBottom: 12, textAlign: "center" },
  row: { flexDirection: "row", gap: 8 },
  flex: { flex: 1 },
  person: { alignItems: "center", flexDirection: "row", gap: 8, paddingVertical: 6 },
  name: { flex: 1, fontFamily: Fonts.SemiBold, fontSize: 15 },
  small: { paddingHorizontal: 12 },
});
