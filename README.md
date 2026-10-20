# A Little Princess • Baby Girl Naming Ceremony Invitation

An interactive, responsive, and culturally rich digital invitation website for an Indian baby girl's naming ceremony (Namakarana), built with **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

Designed with traditional Indian elegance, warm ivory tones, antique gold filigree, soft blush accents, and modern interactive storytelling.

---

## 🌸 Key Features

1. **Magical Full-Screen Welcome (Screen 1)**
   - Auspicious Sanskrit invocation (`॥ श्री गणेशाय नमः ॥`).
   - Handcrafted SVG illustration of a traditional Indian baby cradle (*Palna / Thottil*) with golden chains, hanging bells, marigold garlands, and gentle swing animation.
   - Elegant floral toran (*Jasmine & Mango Leaf Garland*) and antique-gold corner filigree.
   - Canvas-based gentle falling rose and jasmine petals in the background.
   - Interactive **"Open Your Invitation"** button with golden shimmer and entrance sequence.

2. **Royal Invitation Reveal (Screen 2)**
   - Unfolds into a traditional Indian royal invitation card (*Patrika*).
   - "With Love and Blessings" header, baby girl title, and heartfelt ceremony announcement.
   - Interactive **"Shower Blessings (पुष्पवृष्टि)"** feature: releases auspicious rose petals and tracks guest blessings.

3. **Special Invitation from Elder Brother (Screen 3)**
   - Prominently extends the invitation on behalf of elder brother **Krishnendu Habib**.
   - Heartfelt personal quote in an elegant typography block surrounded by soft floral detailing.
   - Editable in central configuration without inventing extra personal information.

4. **Ceremony Date, Time & Live Countdown (Screen 5)**
   - **Date**: Sunday, 25 October 2026.
   - **Time**: 11:00 AM IST onwards.
   - **City**: Bengaluru, India.
   - **Timezone-Accurate Countdown**: Calculates remaining days, hours, minutes, and seconds in `Asia/Kolkata` time.
   - **Add to Calendar**: Generates and downloads a `.ics` calendar event file with exact UTC timestamps and reminders.

5. **Family Invitation Section (Screen 4)**
   - Dedicated section supporting parents', grandparents', and extended family's names.
   - Displays a warm, tasteful placeholder notice until real family names are provided in config (does not fabricate or invent unprovided names).

6. **Venue Section (Screen 6)**
   - Features Bengaluru, Karnataka, India with a location map-pin icon.
   - Tastefully displays *"Venue details will be shared soon."* until exact hall address is finalized.
   - "Get Directions" button remains gracefully disabled until coordinates/address are supplied.

7. **Family Photo Gallery & Modal Lightbox (Screen 7)**
   - Built to house family and baby memories once available.
   - Displays a warm invitation to revisit after the ceremony.
   - Includes a sample preview toggle and an accessible **Modal Lightbox** with Previous, Next, and keyboard `Escape` closing.

8. **Optional Background Music**
   - Strictly user-controlled: never autoplays.
   - Audio toggle in navigation bar with sound wave indicator.
   - Plays configured local/hosted audio file, or a gentle synthesized Tanpura/ambient tone via Web Audio API if no audio file is provided.

9. **Share & Blessings Interactions**
   - Floating and in-card **"Shower Blessings"** buttons.
   - **Share Invitation** button utilizing Web Share API with instant clipboard copy fallback.

---

## 🛠️ Technology Stack

- **React 19** with **Vite**
- **TypeScript** for strict type safety
- **Tailwind CSS v4** & custom CSS tokens
- **Framer Motion** for animations and smooth transitions
- **Lucide React** for icons
- **Canvas Confetti** for Pushpavrishti petal showers
- **Web Audio API** & **HTML5 Audio**

---

## 📁 Project Structure

```
src/
├── assets/                  # Static assets
├── components/
│   ├── BlessingShower.tsx   # Pushpavrishti flower petal shower
│   ├── BrotherMessage.tsx   # Elder brother Krishnendu Habib's message
│   ├── ClosingSection.tsx   # Warm closing note & family signature
│   ├── Countdown.tsx        # Asia/Kolkata live countdown timer
│   ├── EventDetails.tsx     # Date, time, timezone & calendar action
│   ├── FamilySection.tsx    # Family invitation details
│   ├── FloralDecoration.tsx # Hanging toran, corner ornaments, dividers
│   ├── InvitationReveal.tsx # Central unfolding invitation journey
│   ├── Lightbox.tsx         # Accessible photo modal lightbox
│   ├── MusicControl.tsx     # Optional background music control
│   ├── Navbar.tsx           # Sticky navigation & quick controls
│   ├── PetalsCanvas.tsx     # Floating flower petals canvas background
│   ├── PhotoGallery.tsx     # Responsive photo gallery
│   ├── TraditionalCradle.tsx# Animated Indian cradle illustration
│   ├── VenueSection.tsx     # Venue details & placeholder
│   └── WelcomeScreen.tsx    # Full-screen opening welcome card
├── data/
│   └── ceremony.ts          # Central configuration (Single Source of Truth)
├── hooks/
│   └── useCountdown.ts      # Custom hook for timezone countdown
├── utils/
│   └── calendar.ts          # .ics calendar event file generator
├── App.tsx                  # App root
├── index.css                # Color tokens, fonts, and design system
└── main.tsx                 # Entry point
```

---

## 📝 How to Update Ceremony Details

All event information, family names, venue details, photos, and audio are centralized in one file:

👉 **`src/data/ceremony.ts`**

### 1. Adding Family Names
Open `src/data/ceremony.ts` and update the `family` object:
```ts
family: {
  parents: ["Father Name", "Mother Name"],
  grandparents: ["Grandfather Name", "Grandmother Name"],
  otherMembers: [
    {
      relationship: "With Blessings From Chacha & Chachi",
      members: ["Uncle Name", "Aunt Name"],
    },
  ],
  placeholderNotice: "Extended with heartfelt warmth by the family and loved ones.",
}
```

### 2. Updating Venue & Address
When the hall name and address are finalized, update the `venue` object:
```ts
venue: {
  city: "Bengaluru",
  stateCountry: "Karnataka, India",
  name: "Royal Palace Banquet Hall",
  address: "123 Indiranagar, Bengaluru, Karnataka 560038",
  googleMapsUrl: "https://maps.google.com/?q=...",
  placeholderNotice: "Venue details will be shared soon.",
}
```
*(The "Get Directions" button will automatically become active once a URL is added!)*

### 3. Adding Photos to Gallery
To display baby and family photographs in the gallery:
```ts
gallery: {
  photos: [
    {
      id: "photo-1",
      url: "/images/baby-photo-1.jpg",
      caption: "Our little angel at 3 months",
      altText: "Baby girl smiling in traditional dress",
    },
  ],
  placeholderMessage: "...",
}
```

### 4. Adding Custom Background Music
Add your MP3 file to `public/audio/melody.mp3` and specify the path:
```ts
music: {
  audioUrl: "/audio/melody.mp3",
  title: "Auspicious Shehnai Melody",
}
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js (v18+ or higher)
- npm

### Installation
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 🎨 Cultural Palette & Styling

| Token | Hex | Usage |
|---|---|---|
| **Warm Ivory** | `#FFFAF5` | Page background, serene lighting |
| **Antique Gold** | `#B08D57` | Fine decorative borders, accents, buttons |
| **Champagne** | `#E8D6B8` | Subdued borders, highlighted chips |
| **Soft Blush Pink** | `#F3DDE2` | Petal highlights, badge backgrounds |
| **Dusty Rose** | `#C58F9C` | Swag floral garlands, heart icons |
| **Deep Rose-Brown** | `#81532F` | Primary headings, prominent brother name |
| **Warm Text Brown** | `#6F5A48` | Legible body text |
| **White** | `#FFFFFF` | Card surfaces |

---

## ♿ Accessibility & Responsiveness

- Tested for mobile phones (320px+), tablets, laptops, and large desktop displays.
- Respects `prefers-reduced-motion` to stop canvas particle drift and CSS swings when users request reduced motion.
- Keyboard accessible (`Tab`, `Enter`, `Escape` for Lightbox modal).
- High contrast typography for comfortable reading.
