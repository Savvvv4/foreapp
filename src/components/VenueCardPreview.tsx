import VenueCard from "./VenueCard"
import type { VenueCardProps } from "./VenueCard"

/** Visual regression fixture for the unified venue card. */
export const venueCardFixtures: Array<{ label: string; props: VenueCardProps }> = [
  { label: "Featured course", props: { venueType: "course", name: "DDA Dwarka Golf Course", image: "https://images.unsplash.com/photo-1500932334442-8761ee4810a7?auto=format&fit=crop&w=900&q=80", featured: true, rating: 4.8, reviewCount: 312, locality: "Sector 24, Dwarka", city: "New Delhi", tags: [{ label: "9 holes" }, { label: "Special offer", tone: "offer" }], price: "₹660", priceUnit: "/ 9 holes", availability: { label: "Next slot 4:30 PM", status: "available" }, onOpen: () => {}, onBook: () => {} } },
  { label: "Championship course", props: { venueType: "course", name: "Delhi Golf Club", image: "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&w=900&q=80", rating: 4.7, reviewCount: 184, locality: "Lodhi Road", city: "New Delhi", distanceKm: 2.1, tags: [{ label: "18 holes" }, { label: "Championship" }], price: "₹2,500", priceUnit: "/ round", onOpen: () => {}, onBook: () => {} } },
  { label: "Practice facility", props: { venueType: "practice", name: "Hamoni Golf Camp", image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=900&q=80", featured: true, rating: 4.8, reviewCount: 96, locality: "Sector 23A", city: "Gurugram", distanceKm: 4.1, tags: [{ label: "Driving range" }, { label: "Floodlit" }, { label: "Special offer", tone: "offer" }], price: "₹500", priceUnit: "/ person", availability: { label: "Next slot 5:00 PM", status: "limited" }, onOpen: () => {}, onBook: () => {} } },
  { label: "Short game facility", props: { venueType: "practice", name: "Short Game Practice Centre", image: "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=900&q=80", locality: "Mehrauli", city: "New Delhi", tags: [{ label: "Short game area" }, { label: "Putting green" }], price: "₹500", priceUnit: "/ person", onOpen: () => {}, onBook: () => {} } },
  { label: "Sold out", props: { venueType: "course", name: "Weekend Tournament Course", rating: 4.6, locality: "Gurugram", city: "Haryana", tags: [{ label: "18 holes" }], price: "₹1,200", priceUnit: "/ 9 holes", availability: { label: "Fully booked today", status: "sold-out" }, onOpen: () => {}, onBook: () => {} } },
  { label: "No photo / missing rating and distance", props: { venueType: "practice", name: "Community Practice Facility With A Very Long Name", locality: "North Delhi", city: "New Delhi", tags: [{ label: "Driving range" }], price: "₹300", priceUnit: "/ person", onOpen: () => {}, onBook: () => {} } },
]

export default function VenueCardPreview() {
  return <main className="venue-card-preview"><h1>VenueCard visual fixtures</h1><p>Responsive fixtures for course and practice variants, featured state, sold-out state, and missing data.</p><div className="venue-card-preview__grid">{venueCardFixtures.map(({ label, props }) => <section key={label}><h2>{label}</h2><VenueCard {...props} /></section>)}</div></main>
}
