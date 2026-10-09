import { useState } from "react"

export type VenueType = "course" | "practice"
export type VenueTag = { label: string; tone?: "default" | "offer" | "positive" }
export type VenueCardProps = {
  venueType: VenueType
  name: string
  image?: string
  featured?: boolean
  rating?: number
  reviewCount?: number
  locality: string
  city?: string
  distanceKm?: number
  tags?: VenueTag[]
  price: string
  priceUnit: string
  availability?: { label: string; status?: "available" | "limited" | "sold-out" }
  saved?: boolean
  onFavoriteChange?: (saved: boolean) => void
  onOpen: () => void
  onBook: () => void
  variant?: "default" | "compact" | "carousel"
}

function Star() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" fill="currentColor" /></svg>
}
function Heart({ filled }: { filled: boolean }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.8a5.4 5.4 0 0 0-7.6 0L12 6l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6l1.2 1.2L12 21l7.6-7.4 1.2-1.2a5.4 5.4 0 0 0 0-7.6Z" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
}
function Pin() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" fill="none" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="10" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.8"/></svg>
}
function Arrow() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

export default function VenueCard(props: VenueCardProps) {
  const {
    venueType, name, image, featured = false, rating, reviewCount, locality, city,
    distanceKm, tags = [], price, priceUnit, availability, onFavoriteChange, onOpen, onBook,
    variant = "default",
  } = props
  const [internalSaved, setInternalSaved] = useState(props.saved ?? false)
  const saved = props.saved ?? internalSaved
  const soldOut = availability?.status === "sold-out"
  const location = [locality, city].filter(Boolean).join(", ")
  const handleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    const next = !saved
    setInternalSaved(next)
    onFavoriteChange?.(next)
  }

  return (
    <article className={`venue-card venue-card--${variant} venue-card--${venueType}`} role="button" tabIndex={0} aria-label={name} onClick={onOpen} onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => { if (event.target !== event.currentTarget) return; if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onOpen() } }}>
      <div className="venue-card__image" aria-hidden="true">
        {image ? <img src={image} alt="" loading="lazy" /> : <span className="venue-card__placeholder"><span>FORE</span><small>{venueType === "course" ? "GOLF COURSE" : "PRACTICE FACILITY"}</small></span>}
        <span className="venue-card__scrim" />
      </div>
      <div className="venue-card__top">
        {featured ? <span className="venue-card__featured"><Star /> Featured</span> : <span />}
        <button className={`venue-card__favorite${saved ? " is-saved" : ""}`} type="button" onClick={handleFavorite} aria-label={saved ? "Remove from favorites" : "Add to favorites"} aria-pressed={saved}>
          <Heart filled={saved} />
        </button>
      </div>
      <div className="venue-card__body">
        <div className="venue-card__meta">
          {typeof rating === "number" && <span className="venue-card__rating"><Star /> {rating.toFixed(1)}{typeof reviewCount === "number" ? ` (${reviewCount})` : ""}</span>}
          {tags.length > 0 && <span className="venue-card__tag">{tags[0].label}</span>}
        </div>
        <h3 className="venue-card__title" title={name}>{name}</h3>
        <p className="venue-card__location"><Pin /><span>{location || "Location unavailable"}{typeof distanceKm === "number" ? ` · ${distanceKm.toFixed(1)} km away` : ""}</span></p>
        <div className="venue-card__footer">
          <div className="venue-card__price">
            <span>From</span>
            <div className="venue-card__price-detail"><strong>{price}</strong><small>{priceUnit}</small></div>
          </div>
          <button className="venue-card__primary" type="button" disabled={soldOut} onClick={(event) => { event.stopPropagation(); onBook() }}>{soldOut ? "Join waitlist" : venueType === "course" ? "Book tee time" : "Book a bay"}{!soldOut && <Arrow />}</button>
        </div>
      </div>
    </article>
  )
}
