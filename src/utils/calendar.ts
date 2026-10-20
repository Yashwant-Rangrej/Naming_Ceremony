import { CEREMONY_DATA } from '../data/ceremony';

/**
 * Smart calendar integration:
 * - On iPhone / iPad (iOS devices): opens native Apple Calendar via .ics prompt.
 * - On Android / Windows / Other devices: opens Google Calendar directly with pre-filled event details.
 */
export function handleSmartAddToCalendar(): void {
  const isIOSOrApple =
    typeof navigator !== 'undefined' &&
    (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

  if (isIOSOrApple) {
    downloadCalendarEvent();
  } else {
    addToGoogleCalendar();
  }
}

/**
 * Opens Google Calendar in a new tab with all event details pre-filled.
 */
export function addToGoogleCalendar(): void {
  const { event, babyTitle, elderBrother, venue } = CEREMONY_DATA;

  // Format date-time for UTC iCalendar format
  // 2026-10-25 12:00 PM IST is 2026-10-25 06:30 AM UTC
  const startDateUtc = '20261025T063000Z';
  const durationHours = event.calendarDurationHours || 2;
  const endHourUtc = 6 + durationHours;
  const endDateUtc = `20261025T0${endHourUtc}3000Z`;

  const locationStr = venue.name && venue.address
    ? `${venue.name}, ${venue.address}`
    : venue.name
    ? `${venue.name}, ${venue.city}, ${venue.stateCountry}`
    : `${venue.city}, ${venue.stateCountry}`;

  const title = `Baby Girl Naming Ceremony (${babyTitle})`;
  const description = `With love and blessings, please join ${elderBrother.name} and family to celebrate the auspicious Naming Ceremony of our precious little princess (${babyTitle}).`;

  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${startDateUtc}/${endDateUtc}&details=${encodeURIComponent(
    description
  )}&location=${encodeURIComponent(locationStr)}`;

  window.open(googleCalUrl, '_blank', 'noopener,noreferrer');
}

/**
 * Generates and triggers download of an .ics calendar file (native Apple Calendar).
 */
export function downloadCalendarEvent(): void {
  const { event, babyTitle, elderBrother, venue } = CEREMONY_DATA;

  const startDateUtc = '20261025T063000Z';
  const durationHours = event.calendarDurationHours || 2;
  const endHourUtc = 6 + durationHours;
  const endDateUtc = `20261025T0${endHourUtc}3000Z`;

  const locationStr = venue.name && venue.address
    ? `${venue.name}, ${venue.address}`
    : venue.name
    ? `${venue.name}, ${venue.city}, ${venue.stateCountry}`
    : `${venue.city}, ${venue.stateCountry}`;

  const description = `With love and blessings, please join ${elderBrother.name} and family to celebrate the auspicious Naming Ceremony of our precious little princess (${babyTitle}).`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Habib Family//Naming Ceremony Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:naming-ceremony-habib-20261025@ceremony.local`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART:${startDateUtc}`,
    `DTEND:${endDateUtc}`,
    `SUMMARY:Baby Girl Naming Ceremony (${babyTitle})`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${locationStr}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Baby Girl Naming Ceremony tomorrow',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Baby_Girl_Naming_Ceremony_Invitation.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
