export interface SponsorItem {
    date: string;
    image: string;
    link: string;
    name: string;
    tier: "Terrestrial" | "Stellar" | "Galactic";
}

/** MAIN THING ID [Sponsor Name]-[Date of Sponsorship]
 * date
"[Date of Sponsorship]" DDMMYYYY
(string)


image
"[Image link]"
(string)


link
"[Sponsor Link]"
(string)


name
"[Sponsor Name]"
(string)


tier
"[Terrestrial | Stellar | Galactic] "
 */