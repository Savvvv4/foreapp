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
  const visibleTags = tags.slice(0, 3)
  const handleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    const next = !saved
    setInternalSaved(next)
    onFavoriteChange?.(next)
  }

  return (
    <article className={`venue-card venue-card--${variant} venue-card--${venueType}`} onClick={onOpen}>
      <button className="venue-card__image" type="button" onClick={(event) => { event.stopPropagation(); onOpen() }} aria-label={`View ${name} details`}>
        {image ? <img src={image} alt="" loading="lazy" /> : <span className="venue-card__placeholder"><span>FORE</span><small>{venueType === "course" ? "GOLF COURSE" : "PRACTICE FACILITY"}</small></span>}
        <span className="venue-card__scrim" />
        {featured && <span className="venue-card__featured"><Star /> Featured</span>}
        {typeof rating === "number" && <span className="venue-card__rating"><Star /> {rating.toFixed(1)}{typeof reviewCount === "number" ? ` (${reviewCount})` : ""}</span>}
      </button>
      <div className="venue-card__body">
        <div className="venue-card__title-row">
          <h3 title={name}>{name}</h3>
          <button className={`venue-card__favorite${saved ? " is-saved" : ""}`} type="button" onClick={handleFavorite} aria-label={saved ? "Remove from favorites" : "Add to favorites"} aria-pressed={saved}>
            <Heart filled={saved} />
          </button>
        </div>
        <p className="venue-card__location"><Pin /><span>{location || "Location unavailable"}{typeof distanceKm === "number" ? ` · ${distanceKm.toFixed(1)} km` : ""}</span></p>
        {variant !== "compact" && visibleTags.length > 0 && <div className="venue-card__tags">{visibleTags.map((tag) => <span key={tag.label} className={`venue-card__tag venue-card__tag--${tag.tone ?? "default"}`}>{tag.label}</span>)}</div>}
        {variant === "compact" ? (
          <>
            <div className="venue-card__price-row">
              <div className="venue-card__price"><span>From</span><strong>{price}</strong><small>{priceUnit}</small></div>
              {availability && <div className={`venue-card__availability venue-card__availability--${availability.status ?? "available"}`}><i />{availability.label}</div>}
            </div>
            <div className="venue-card__actions">
              <button className="venue-card__secondary" type="button" onClick={(event) => { event.stopPropagation(); onOpen() }}>View details</button>
              <button className="venue-card__primary" type="button" disabled={soldOut} onClick={(event) => { event.stopPropagation(); onBook() }}>{soldOut ? "Join waitlist" : venueType === "course" ? "Book tee time" : "Book a bay"}{!soldOut && <Arrow />}</button>
            </div>
          </>
        ) : (
          <div className="venue-card__footer">
            <div className="venue-card__price">
              <span>From</span>
              <div className="venue-card__price-detail"><strong>{price}</strong><small>{priceUnit}</small></div>
            </div>
            <button className="venue-card__primary" type="button" disabled={soldOut} onClick={(event) => { event.stopPropagation(); onBook() }}>{soldOut ? "Join waitlist" : venueType === "course" ? "Book tee time" : "Book a bay"}{!soldOut && <Arrow />}</button>
          </div>
        )}
      </div>
    </article>
  )
}
