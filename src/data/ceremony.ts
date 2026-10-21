/**
 * Ceremony Configuration - Single Source of Truth
 *
 * Update this file to modify any details about the ceremony, family, venue, or media.
 * Values marked with comments like "To be updated" will gracefully display tasteful placeholders
 * or conditional sections until provided by the family.
 */

export interface FamilyGroup {
  relationship: string;
  members: string[];
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  altText: string;
}

export interface CeremonyConfig {
  /** Display title for the baby girl */
  babyTitle: string;
  /** Subtitle / poetic phrase */
  subtitle: string;
  /** Formal event title */
  ceremonyTitle: string;
  /** Auspicious Sanskrit / Hindi phrase (e.g. Om Shree Ganeshay Namah / Namakarana) */
  auspiciousInvocation: string;
  /** Optional list of multiple auspicious invocations */
  auspiciousInvocations?: string[];
  /** Heartfelt introduction paragraph */
  invitationNote: string;

  /** Elder brother's special section */
  elderBrother: {
    name: string;
    message: string;
    roleLabel: string;
  };

  /** Ceremony date & time details */
  event: {
    date: string; // ISO date format YYYY-MM-DD
    day: string;
    displayDate: string;
    time: string;
    displayTime: string;
    timezone: string; // e.g. "Asia/Kolkata"
    isoDateTime: string; // ISO 8601 with timezone offset
    calendarDurationHours: number; // Configurable duration for .ics download
  };

  /** Venue information */
  venue: {
    city: string;
    stateCountry: string;
    name: string | null; // Leave null or "" until venue is finalized
    address: string | null; // Leave null or "" until address is finalized
    copyAddress?: string; // Formatted address string specifically for one-tap copy
    googleMapsUrl: string | null; // Leave null until available
    placeholderNotice: string;
  };

  /** Family members extending the invitation */
  family: {
    parents: string[]; // Leave empty array [] until provided
    grandparents: string[]; // Leave empty array [] until provided
    otherMembers: FamilyGroup[]; // Configurable groups
    placeholderNotice: string;
  };

  /** Photo gallery items */
  gallery: {
    photos: GalleryPhoto[]; // Leave empty [] until family photos are provided
    placeholderMessage: string;
  };

  /** Optional background music */
  music: {
    audioUrl: string | null; // e.g. "/audio/shehnai-melody.mp3", leave null if none
    title: string;
  };

  /** Closing message */
  closing: {
    title: string;
    message: string;
    signature: string;
  };
}

export const CEREMONY_DATA: CeremonyConfig = {
  babyTitle: "A Little Princess",
  subtitle: "A Beautiful Name, A Lifetime of Love",
  ceremonyTitle: "Baby Girl Naming Ceremony",
  auspiciousInvocation: "॥ Sri Ganeshaya Namah ॥ • ॥ Sri Mailaralingeshwara Prasanna ॥",
  auspiciousInvocations: [
    "॥ Sri Ganeshaya Namah ॥",
    "॥ Sri Mailaralingeshwara Prasanna ॥",
  ],
  invitationNote:
    "With hearts overflowing with joy and gratitude to the Almighty. We, Smt. Amruta Ravikumar Habib & Shri Ravikumar V Habib, the happiest parents, cordially invite you to celebrate the auspicious Namakarana Ceremony of our precious little daughter, the greatest blessing of our lives.\n\nYour presence, love, and blessings will make this cherished moment even more special as we celebrate the beautiful beginning of her journey.",

  elderBrother: {
    name: "Krishnendu Habib",
    roleLabel: "A Special Invitation From Her Elder Brother",
    message:
      "I've been blessed with a little sister, and now our family has another reason to smile. Please join us to celebrate her special day!",
  },

  event: {
    date: "2026-10-25",
    day: "Sunday",
    displayDate: "25 October 2026",
    time: "11:45 AM",
    displayTime: "11:45 AM",
    timezone: "Asia/Kolkata",
    // Source of truth: 25 October 2026 at 11:45 AM Asia/Kolkata (+05:30)
    isoDateTime: "2026-10-25T11:45:00+05:30",
    calendarDurationHours: 2,
  },

  venue: {
    city: "Bengaluru",
    stateCountry: "Karnataka, India",
    name: "Ramanna Gardens",
    address:
      "Door No:15, Ground Floor, 2nd Main Road, 5th Cross Ramanna Garden, Behind Mitra Apartment, Chamundeshwari Layout, Vidyaranyapura Main Road, Bengaluru - 560097",
    copyAddress:
      "*Ravikumar Habib*\nDoor No:15,\nGround Floor,\n2nd Main Road,\n5th Cross Ramanna Garden,\nBehind Mitra Apartment,\nChamundeshwari Layout, Vidyaranyapura Main Road,\nBengalore: 560097\nKarnataka",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=13.0654760,77.5555950",
    placeholderNotice: "Tap 'Get Directions' below to navigate directly to the ceremony.",
  },

  family: {
    parents: ["Ravikumar Habib", "Amruta Habib"],
    grandparents: ["Vishwanathsa Habib", "Laxmi Habib"],
    otherMembers: [],
    placeholderNotice:
      "A warm welcome to all our cherished family, friends, and loved ones.",
  },

  gallery: {
    // Photos to be supplied later. Structure is fully ready for gallery photos.
    photos: [],
    placeholderMessage:
      "Precious moments and ceremony glimpses will be cherished and shared here soon.",
  },

  music: {
    // Optional background music. Leave null if not provided.
    // Audio synthesizer fallback or audio file will play only upon explicit user tap.
    audioUrl: null,
    title: "Traditional Auspicious Melody",
  },

  closing: {
    title: "With Love & Blessings",
    message:
      "With love and blessings, our family warmly invites you to share in this precious occasion. Your presence will make our celebration even more special.",
    signature: "Warm Regards,\nKrishnendu Habib & Family",
  },
};
