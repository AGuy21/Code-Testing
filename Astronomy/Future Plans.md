Future Plans

High Priority (MVP)
- Sponsors Page: Add a dedicated page `Sponsors` (hero, tiers, benefits, contact CTA).
- Header CTA: Add a 'Become a Sponsor' or 'Support Us' button in the top navigation.
- Sponsor Form: Implement a simple form (`SponsorForm`) to capture sponsor leads (company, contact, email, tier, message).
- Sponsor Pack: Provide a downloadable sponsor pack PDF (`public/docs/sponsor-pack.pdf`) to explain partnership opportunities and benefits.
- Sponsor Card Improvements: Ensure `SponsorCard` supports lazy-loading images, alt text, and optional tier labels.
- Footer Sponsor Area: List sponsors dynamically from `src/constants/data/sponsors.ts`.
- Analytics: Add Google Analytics (GA4) and event tracking for sponsor-related CTAs and forms.

Medium Priority
- Sponsor wall & carousel: Show sponsor logos on a carousel or grid with links.
- Impact metrics & Why Sponsor: Add social proof and measurable outcomes (events, members, reach).
- Newsletter & Social: Add newsletter signup and social icons to increase reach and maintain contact.
- Social share meta: Add OG/Twitter meta tags and optimized `og:image` for the homepage and featured pages.

Long-Term / Advanced
- Donation/payment integration: Add Stripe/PayPal for donations and sponsorship payments.
- Case Studies & Testimonials: Add `CaseStudies` to highlight sponsor impact and previous collaboration results.
- Sponsor Portal: Implement an admin dashboard for sponsors to manage their assets and see impact metrics.

Implementation Notes
- MVP will use Formspree or a simple backendless contact method. For tracking, set up GA4 and wire events for CTA clicks and form submissions.
- Add all planned files and routes (e.g., `Sponsors.tsx`, `SponsorForm.tsx`, `sponsors.ts`) and include e2e tests or manual validation steps for forms and downloads.

Last updated: 2025-11-29
