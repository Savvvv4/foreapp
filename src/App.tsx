import { useEffect, useMemo, useState } from "react"

type Role = "golfer" | "coach"
type GolferTab = "home" | "discover" | "play" | "improve" | "profile"
type PrimaryTab = "discover" | "performance" | "coach"
type CoachTab = "home" | "schedule" | "students"
type ConnectionStatus = "none" | "pending" | "connected"

type IconName = "home" | "search" | "flag" | "spark" | "user" | "calendar" | "users" | "clipboard" | "wallet" | "bell" | "arrow" | "chevron" | "star" | "pin" | "clock" | "video" | "chart" | "message" | "close" | "check" | "switch" | "heart" | "map" | "shield" | "directions" | "share" | "more" | "filter" | "plus" | "loader"

const photos = {
  course:
    "https://images.unsplash.com/photo-1500932334442-8761ee4810a7?auto=format&fit=crop&w=1000&q=85",
  golfer:
    "https://images.unsplash.com/photo-1789581945274-da00934d3b6d?auto=format&fit=crop&w=1000&q=85",
  green:
    "https://images.unsplash.com/photo-1592937238247-cd0090e02f65?auto=format&fit=crop&w=1000&q=85",
}

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    home: (
      <>
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v11h14V9" />
        <path d="M9 20v-6h6v6" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    flag: (
      <>
        <path d="M5 21V4" />
        <path d="M5 5c5-3 8 3 14 0v10c-6 3-9-3-14 0" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.3 4.2L17 9l-3.7 1.8L12 15l-1.3-4.2L7 9l3.7-1.8L12 3Z" />
        <path d="m5 14 .8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14Z" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c.8-5 3.5-7 8-7s7.2 2 8 7" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M7 3v4M17 3v4M3 10h18" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 19c.5-4 2.5-6 6-6s5.5 2 6 6" />
        <path d="M16 5c2.4.2 3.5 1.4 3.5 3s-1.1 2.8-3.5 3M17 13c2.4.6 3.7 2.5 4 5" />
      </>
    ),
    clipboard: (
      <>
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M9 4c0-2 6-2 6 0v2H9V4ZM9 11h6M9 15h6" />
      </>
    ),
    wallet: (
      <>
        <rect x="3" y="6" width="18" height="14" rx="3" />
        <path d="M16 11h5v5h-5a2.5 2.5 0 0 1 0-5ZM5 6V4h12v2" />
      </>
    ),
    bell: (
      <>
        <path d="M6 9a6 6 0 0 1 12 0c0 7 3 7 3 7H3s3 0 3-7Z" />
        <path d="M10 20h4" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14M14 7l5 5-5 5" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    star: (
      <path d="m12 3 2.7 5.5 6 .9-4.4 4.3 1.1 6-5.4-2.8-5.4 2.8 1.1-6-4.4-4.3 6-.9L12 3Z" />
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    video: (
      <>
        <rect x="3" y="5" width="13" height="14" rx="3" />
        <path d="m16 10 5-3v10l-5-3" />
      </>
    ),
    chart: (
      <>
        <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      </>
    ),
    message: <path d="M4 4h16v13H8l-4 4V4Z" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    check: <path d="m5 12 4 4L19 6" />,
    switch: (
      <>
        <path d="M7 7h13l-3-3M17 17H4l3 3" />
      </>
    ),
    heart: (
      <path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z" />
    ),
    map: (
      <>
        <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
        <path d="M9 3v15M15 6v15" />
      </>
    ),
    shield: (
      <path d="M12 3 4 6v6c0 5 3.4 8 8 9 4.6-1 8-4 8-9V6l-8-3Z" />
    ),
    directions: (
      <>
        <path d="m12 3 9 9-9 9-9-9 9-9Z" />
        <path d="M8 12h7M13 9l3 3-3 3" />
      </>
    ),
    share: (
      <>
        <circle cx="18" cy="5" r="2.5" />
        <circle cx="6" cy="12" r="2.5" />
        <circle cx="18" cy="19" r="2.5" />
        <path d="m8.2 10.8 7.5-4.5M8.2 13.2l7.5 4.5" />
      </>
    ),
    more: (
      <>
        <circle cx="5" cy="12" r="1" fill="currentColor" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
        <circle cx="19" cy="12" r="1" fill="currentColor" />
      </>
    ),
    filter: <path d="M4 5h16l-6 7v6l-4 2v-8L4 5Z" />,
    plus: <path d="M12 5v14M5 12h14" />,
    loader: (
      <>
        <path d="M12 3a9 9 0 1 1-6.4 2.7" />
        <path d="M3 3v6h6" />
      </>
    ),
  }
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function Avatar({ initials, image }: { initials: string; image?: string }) {
  return image ? (
    <img className="avatar" src={image} alt="" />
  ) : (
    <span className="avatar avatar-initials">{initials}</span>
  )
}

function SectionHeading({
  title,
  action,
  onAction,
}: {
  title: string
  action?: string
  onAction?: () => void
}) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {action && onAction && <button onClick={onAction}>{action}</button>}
    </div>
  )
}

function GolferHome({ go }: { go: (tab: GolferTab) => void }) {
  return (
    <main className="screen">
      <div className="welcome-row">
        <div>
          <p className="eyebrow">THURSDAY, 20 AUGUST</p>
          <h1>Good morning, Alex</h1>
        </div>
        <Avatar initials="AK" />
      </div>

      <button className="next-card" onClick={() => go("play")}>
        <img src={photos.course} alt="Delhi Golf Club fairway" />
        <span className="image-shade" />
        <span className="next-card-copy">
          <span className="eyebrow light">NEXT ROUND · TOMORROW</span>
          <strong>Delhi Golf Club</strong>
          <span>7:30 AM · 18 holes · 4 players</span>
          <span className="round-link">
            View round <Icon name="arrow" size={16} />
          </span>
        </span>
      </button>

      <div className="quick-grid">
        <button onClick={() => go("discover")}>
          <span className="quick-icon">
            <Icon name="search" />
          </span>
          <strong>Find & book</strong>
          <small>Courses and coaches</small>
        </button>
        <button onClick={() => go("play")}>
          <span className="quick-icon">
            <Icon name="flag" />
          </span>
          <strong>Track a round</strong>
          <small>Scores and strokes gained</small>
        </button>
        <button onClick={() => go("improve")}>
          <span className="quick-icon">
            <Icon name="spark" />
          </span>
          <strong>Practice</strong>
          <small>Drills from your coach</small>
        </button>
      </div>

      <SectionHeading
        title="Your game"
        action="View stats"
        onAction={() => go("play")}
      />
      <div className="stats-card">
        <div>
          <strong>14.2</strong>
          <span>Handicap</span>
          <small className="positive">↓ 1.8 this season</small>
        </div>
        <div
          className="mini-chart"
          aria-label="Handicap improving over six rounds"
        >
          <svg viewBox="0 0 160 55">
            <path
              className="chart-area"
              d="M0 9 30 18 58 15 87 31 117 29 160 47V55H0Z"
            />
            <path d="M0 9 30 18 58 15 87 31 117 29 160 47" />
          </svg>
          <span>Last 6 rounds</span>
        </div>
      </div>

      <SectionHeading
        title="Continue improving"
        action="See all"
        onAction={() => go("improve")}
      />
      <button className="coach-note" onClick={() => go("improve")}>
        <Avatar initials="SM" />
        <span>
          <small>NEW FROM SAVDEEP</small>
          <strong>Swing feedback is ready</strong>
          <em>3 annotated frames · 0:42 voice note</em>
        </span>
        <Icon name="chevron" size={18} />
      </button>
    </main>
  )
}

type DiscoverSection = "Courses" | "Ranges" | "Coaches"

function Discover({
  onModuleStateChange,
  initialSection,
  searchRequest,
}: {
  onModuleStateChange: (active: boolean, section?: DiscoverSection) => void
  initialSection: DiscoverSection
  searchRequest: number
}) {
  return <CourseBookingPrototype onModuleStateChange={onModuleStateChange} initialSection={initialSection} searchRequest={searchRequest} />
}

function DiscoverHome({
  openDiscover,
}: {
  openDiscover: (section: DiscoverSection) => void
}) {
  return (
    <main className="screen discover-home-screen">
      <button className="next-card discover-home-round" type="button">
        <img src={photos.course} alt="Delhi Golf Club fairway" />
        <span className="image-shade" />
        <span className="next-card-copy">
          <span className="eyebrow light">NEXT ROUND · TOMORROW</span>
          <strong>Delhi Golf Club</strong>
          <span>7:30 AM · 18 holes · 4 players</span>
          <span className="round-link">View round <Icon name="arrow" size={16} /></span>
        </span>
      </button>

      <SectionHeading title="Find & book" />
      <div className="discover-home-actions">
        <button type="button" onClick={() => openDiscover("Courses")}>
          <span className="discover-home-action-icon"><Icon name="flag" size={22} /></span>
          <span><strong>Book a tee time</strong><small>Find a course and book your next round</small></span>
          <Icon name="chevron" size={20} />
        </button>
        <button type="button" onClick={() => openDiscover("Ranges")}>
          <span className="discover-home-action-icon"><Icon name="map" size={22} /></span>
          <span><strong>Book a range</strong><small>Find a range and reserve a practice bay</small></span>
          <Icon name="chevron" size={20} />
        </button>
        <button type="button" onClick={() => openDiscover("Coaches")}>
          <span className="discover-home-action-icon"><Icon name="users" size={22} /></span>
          <span><strong>Find a coach</strong><small>Discover coaches and choose how to learn</small></span>
          <Icon name="chevron" size={20} />
        </button>
      </div>
    </main>
  )
}
type CourseFlowScreen =
  | "discover"
  | "results"
  | "course"
  | "confirmation"
  | "bookings"
  | "bookingDetail"
  | "rangeDiscover"
  | "rangeProfile"
  | "rangeSelect"
  | "rangeCheckout"
  | "rangeConfirmation"
  | "rangeDetail"
  | "coachDiscover"
  | "coachProfile"
  | "coachLesson"
  | "coachDateTime"
  | "coachCheckout"
  | "coachRequestSent"
  | "coachBookingPending"
  | "coachBookingConfirmed"
  | "coachDeclined"
type PaymentState = "methods" | "processing" | "failed" | "offline" | "expired"
type BookingStep = "select" | "review" | "payment"
type BookingCourse = { name: string; image: string; price: number }

const delhiCourse: BookingCourse = { name: "Delhi Golf Club", image: photos.course, price: 2500 }
const qutubCourse: BookingCourse = { name: "Qutub Golf Course", image: photos.green, price: 1800 }

function FlowHeader({
  title,
  back,
  action,
}: {
  title: string
  back: () => void
  action?: { label: string; icon: IconName; onClick: () => void }
}) {
  return (
    <header className="flow-page-header">
      <button
        type="button"
        className="flow-page-header-back"
        onClick={back}
        aria-label="Go back"
      >
        <Icon name="chevron" size={20} />
      </button>
      <h1>{title}</h1>
      {action ? (
        <button
          type="button"
          className="flow-page-header-action"
          onClick={action.onClick}
          aria-label={action.label}
        >
          <Icon name={action.icon} size={19} />
        </button>
      ) : (
        <span className="flow-page-header-spacer" aria-hidden="true" />
      )}
    </header>
  )
}

function ConfirmedBadge() {
  return (
    <span className="booking-status confirmed">
      <Icon name="check" size={14} /> Confirmed
    </span>
  )
}

function CourseCard({
  qutub = false,
  compact = false,
  onOpen,
  onBook,
}: {
  qutub?: boolean
  compact?: boolean
  onOpen: () => void
  onBook: () => void
}) {
  const [saved, setSaved] = useState(false)
  const name = qutub ? "Qutub Golf Course" : "Delhi Golf Club"
  const image = qutub ? photos.green : photos.course
  const rating = qutub ? "4.4" : "4.7"
  const distance = qutub ? "Mehrauli · 5.4 km" : "Lodhi Road · 2.1 km"
  return (
    <article className="course-card">
      <button className="course-card-main" onClick={onOpen}>
        <div className="course-card-image">
          <img src={image} alt={`${name} fairway`} />
          <span className="course-status-pill">{qutub ? "Public · 9 holes" : "Championship · 18 holes"}</span>
          <span className="course-rating-pill"><Icon name="star" size={13} /> {rating}</span>
        </div>
        <div className="course-card-copy">
          <div className="course-card-title-row">
            <div>
              <h3>{name}</h3>
              <p className="course-location"><Icon name="pin" size={14} /> {distance}</p>
            </div>
            <button
              type="button"
              className={`course-save-button ${saved ? "saved" : ""}`}
              onClick={(event) => { event.stopPropagation(); setSaved(!saved) }}
              aria-label={saved ? "Remove saved course" : "Save course"}
            >
              <Icon name="heart" size={18} />
            </button>
          </div>
          <div className="course-card-meta">
            <span>{qutub ? "From ₹1,800" : "From ₹2,500"}</span>
            <strong>{qutub ? "₹1,800" : "₹2,500"} <small>/ round</small></strong>
          </div>
        </div>
      </button>
      <div className="course-card-actions">
        <button type="button" className="course-details-button" onClick={onOpen}>View details</button>
        <button type="button" className="course-book-button" onClick={onBook}>Book tee time <Icon name="arrow" size={15} /></button>
      </div>
    </article>
  )
}

function BookAgainCourseCard({
  onOpen,
  onBook,
}: {
  onOpen: () => void
  onBook: () => void
}) {
  return (
    <article className="course-card book-again-card">
      <button className="course-card-main" onClick={onOpen}>
        <div className="course-card-image">
          <img src={photos.course} alt="Delhi Golf Club fairway" />
          <span className="course-status-pill">Championship · 18 holes</span>
          <span className="course-rating-pill"><Icon name="star" size={13} /> 4.7</span>
        </div>
        <div className="course-card-copy">
          <div className="course-card-title-row">
            <div>
              <h3>Delhi Golf Club</h3>
              <p className="course-location"><Icon name="pin" size={14} /> Lodhi Road · 2.1 km</p>
            </div>
            <span className="course-save-button" aria-hidden="true"><Icon name="heart" size={18} /></span>
          </div>
          <div className="course-card-meta">
            <span>Last played 18 Aug · 4 players</span>
            <strong>₹2,500 <small>/ round</small></strong>
          </div>
        </div>
      </button>
      <div className="course-card-actions">
        <button type="button" className="course-details-button" onClick={onOpen}>View details</button>
        <button type="button" className="course-book-button" onClick={onBook}>Book again <Icon name="arrow" size={15} /></button>
      </div>
    </article>
  )
}

function DiscoverCourses({
  go,
  openFilters,
  openSearch,
  openBooking,
  mode,
  setMode,
}: {
  go: (screen: CourseFlowScreen) => void
  openFilters: () => void
  openSearch: () => void
  openBooking: (course: BookingCourse, slot?: string) => void
  mode: "courses" | "ranges" | "coaches"
  setMode: (mode: "courses" | "ranges" | "coaches") => void
}) {
  return (
    <main className="screen booking-discover-screen">
      <SectionHeading title="Book Again" />
      <BookAgainCourseCard onOpen={() => go("course")} onBook={() => openBooking(delhiCourse)} />
      <SectionHeading title="Near you" />
      <div className="near-you-course-list">
        <CourseCard onOpen={() => go("course")} onBook={() => openBooking(delhiCourse)} />
        <CourseCard qutub onOpen={() => go("course")} onBook={() => openBooking(qutubCourse)} />
      </div>
    </main>
  )
}

function ResultsScreen({
  go,
  openFilters,
  state,
  setState,
  openBooking,
}: {
  go: (screen: CourseFlowScreen) => void
  openFilters: () => void
  state: "ready" | "empty" | "offline"
  setState: (state: "ready" | "empty" | "offline") => void
  openBooking: (course: BookingCourse, slot?: string) => void
}) {
  const [view, setView] = useState<"list" | "map">("list")
  const [selectedCourse, setSelectedCourse] = useState<"delhi" | "qutub">("delhi")
  return (
    <main className="screen results-screen">
      <FlowHeader title="Courses" back={() => go("discover")} />
      {state === "offline" && (
        <div className="booking-banner offline-banner">
          <Icon name="shield" size={17} />
          <span><strong>You’re offline</strong><small>Showing cached Delhi results.</small></span>
        </div>
      )}
      <div className="pinned-result-tools">
        <div className="quick-filter-row">
          <button onClick={openFilters}><Icon name="filter" size={14} /> Filters · 2</button>
          <button onClick={openFilters}>Recommended <Icon name="chevron" size={13} /></button>
          <button className="selected" onClick={openFilters}>Sat 22 Aug</button>
        </div>
        <div className="result-toggle"><button className={view === "list" ? "active" : ""} onClick={() => setView("list")}>List</button><button className={view === "map" ? "active" : ""} onClick={() => setView("map")}><Icon name="map" size={14} /> Map</button></div>
      </div>
      <div className="results-heading">
        <h1>{state === "empty" ? "No courses found" : "24 courses available"}</h1>
        <p>on Sat 22 Aug · 4 players</p>
      </div>
      {state === "empty" ? (
        <div className="booking-empty-state">
          <span><Icon name="search" size={26} /></span>
          <h2>Widen your search</h2>
          <p>Try a nearby area, flexible date, or remove a filter.</p>
          <button className="primary-button" onClick={() => setState("ready")}>Widen your search</button>
        </div>
      ) : view === "list" ? (
        <div className="result-course-list">
          <CourseCard onOpen={() => go("course")} onBook={() => openBooking(delhiCourse)} onSlot={(slot) => openBooking(delhiCourse, slot)} />
          <span className="cancellation-tag"><Icon name="shield" size={13} /> Free cancellation</span>
          <CourseCard qutub onOpen={() => go("course")} onBook={() => openBooking(qutubCourse)} onSlot={(slot) => openBooking(qutubCourse, slot)} />
        </div>
      ) : (
        <div className="booking-map-view">
          <div className="map-canvas" aria-label="Map of golf courses near Delhi">
            <i className="map-road road-one" /><i className="map-road road-two" /><i className="map-road road-three" />
            <span className="map-neighborhood neighborhood-one">Lodhi Estate</span>
            <span className="map-neighborhood neighborhood-two">Mehrauli</span>
            <button className={`map-pin pin-delhi ${selectedCourse === "delhi" ? "selected" : ""}`} onClick={() => setSelectedCourse("delhi")}><Icon name="flag" size={15} /><span>₹2,500</span></button>
            <button className={`map-pin pin-qutub ${selectedCourse === "qutub" ? "selected" : ""}`} onClick={() => setSelectedCourse("qutub")}><Icon name="flag" size={15} /><span>₹1,800</span></button>
            <button className="map-locate" onClick={() => setSelectedCourse("delhi")} aria-label="Center on your location"><Icon name="directions" size={17} /></button>
          </div>
          <article className="map-selected-card">
            <img src={selectedCourse === "delhi" ? photos.course : photos.green} alt={selectedCourse === "delhi" ? "Delhi Golf Club fairway" : "Qutub Golf Course fairway"} />
            <span><small>{selectedCourse === "delhi" ? "2.1 km away" : "5.4 km away"}</small><strong>{selectedCourse === "delhi" ? "Delhi Golf Club" : "Qutub Golf Course"}</strong><em><Icon name="star" size={12} /> {selectedCourse === "delhi" ? "4.7 · 18 holes" : "4.4 · 9 holes"}</em></span>
            <button onClick={() => openBooking(selectedCourse === "delhi" ? delhiCourse : qutubCourse)}>Book</button>
          </article>
        </div>
      )}
      <button className="floating-map-pill" onClick={() => setView(view === "list" ? "map" : "list")}><Icon name={view === "list" ? "map" : "search"} size={16} /> {view === "list" ? "Map" : "List"}</button>
    </main>
  )
}

function CourseProfileScreen({ go, openBooking }: { go: (screen: CourseFlowScreen) => void; openBooking: (course: BookingCourse, slot?: string) => void }) {
  return (
    <main className="course-profile-screen">
      <div className="course-profile-hero">
        <img src={photos.course} alt="Delhi Golf Club fairway" />
        <button onClick={() => go("results")}><Icon name="chevron" /></button>
        <button><Icon name="heart" /></button>
        <span>1 / 5</span>
      </div>
      <div className="course-profile-content">
        <div className="course-title-row">
          <h1>Delhi Golf Club</h1>
          <span className="rating"><Icon name="star" size={14} /> 4.7 (312)</span>
        </div>
        <p className="course-address"><Icon name="pin" size={15} /> Lodhi Road, Delhi · 2.1 km</p>
        <p className="trust-line"><Icon name="shield" size={15} /> Free cancellation until 24h before</p>
        <div className="course-facts">
          {[["18", "Holes"], ["72", "Par"], ["6,935", "Yards"], ["Collared", "Dress code"]].map(([value, label]) => (
            <div key={label}><strong>{value}</strong><span>{label}</span></div>
          ))}
        </div>
        <h2>Amenities</h2>
        <div className="amenity-grid">
          {["Driving range", "Caddies", "Golf carts", "Club rental"].map((amenity) => <span key={amenity}><Icon name="check" size={14} /> {amenity}</span>)}
        </div>
        <h2>About the course</h2>
        <p className="body-copy">A historic championship course in the heart of Delhi, known for tree-lined fairways, strategic bunkering, and fast greens. <button>Read more</button></p>
        <div className="profile-section-heading"><h2>Availability</h2><button onClick={() => openBooking(delhiCourse)}>All tee times</button></div>
        <div className="profile-date-strip">
          {["Thu 20", "Fri 21", "Sat 22", "Sun 23", "Mon 24", "Tue 25", "Wed 26"].map((date, index) => (
            <button className={index === 2 ? "selected" : ""} key={date}><small>{date.split(" ")[0]}</small><strong>{date.split(" ")[1]}</strong></button>
          ))}
        </div>
        <div className="availability-slots">
          {["6:30 AM", "7:30 AM", "8:30 AM"].map((slot) => <button key={slot} onClick={() => openBooking(delhiCourse, slot)}><strong>{slot}</strong><span>₹2,500</span></button>)}
        </div>
        <div className="profile-section-heading"><h2>Reviews</h2><button>See all 312</button></div>
        <div className="profile-review"><span>★★★★★</span><p>“Beautiful course, smooth check-in, and excellent caddies.”</p><small>Rohit S. · 2 weeks ago</small></div>
        <h2>Map & directions</h2>
        <button className="directions-card"><span><Icon name="map" size={24} /></span><div><strong>Lodhi Road, Delhi</strong><small>18 min drive · 2.1 km</small></div><Icon name="directions" /></button>
        <h2>Add a lesson at this course</h2>
        <button className="lesson-cross-sell" onClick={() => go("coachProfile")}><Avatar initials="SM" /><span><strong>Savdeep Mehta</strong><small>PGA Professional · 4.9 · from ₹1,800</small></span><Icon name="chevron" /></button>
      </div>
      <div className="booking-sticky-bar">
        <span><small>From</small><strong>₹2,500</strong></span>
        <button className="primary-button" onClick={() => openBooking(delhiCourse)}>Select tee time</button>
      </div>
    </main>
  )
}

function BookingFlowModal({
  course, step, setStep, date, setDate, time, setTime, caddyMode, setCaddyMode,
  cartCount, setCartCount, paymentMethod, setPaymentMethod, close, pay,
}: {
  course: BookingCourse
  step: BookingStep
  setStep: (step: BookingStep) => void
  date: string
  setDate: (date: string) => void
  time: string
  setTime: (time: string) => void
  caddyMode: "auto" | "own" | "none"
  setCaddyMode: (mode: "auto" | "own" | "none") => void
  cartCount: number
  setCartCount: (count: number) => void
  paymentMethod: string
  setPaymentMethod: (method: string) => void
  close: () => void
  pay: () => void
}) {
  const dates = [["Thu","Thursday","20"],["Fri","Friday","21"],["Sat","Saturday","22"],["Sun","Sunday","23"],["Mon","Monday","24"],["Tue","Tuesday","25"],["Wed","Wednesday","26"]] as const
  const slots = ["6:00 AM","6:10 AM","6:20 AM","6:30 AM","6:40 AM","6:50 AM","7:00 AM","7:10 AM","7:20 AM","7:30 AM"]
  const [paymentMenuOpen, setPaymentMenuOpen] = useState(false)
  const caddyCost = caddyMode === "auto" ? 320 : 0
  const cartCost = cartCount * 800
  const total = course.price + caddyCost + cartCost
  const selectedDate = dates.find(([day,,dayNumber]) => `${day} ${dayNumber}` === date)
  const formattedDate = selectedDate ? `${selectedDate[1]}, ${selectedDate[2]} August` : ""
  const canPay = Boolean(date && time)
  const paymentLabel = paymentMethod === "Net banking" ? "Net banking" : paymentMethod
  const extras = [
    caddyMode === "auto" ? "Caddy" : caddyMode === "own" ? "Own caddy" : "",
    cartCount > 0 ? `${cartCount} cart` : "",
  ].filter(Boolean)
  const heroDetail = !date
    ? ""
    : !time
      ? `${formattedDate}`
      : `${formattedDate} · ${time}${extras.length ? ` · ${extras.join(" · ")}` : ""}`

  return (
    <main className="booking-flow-page" aria-label={`Book ${course.name}`}>
      <header className="booking-page-topbar">
        <button type="button" className="app-topbar-back" onClick={close} aria-label="Go back">
          <Icon name="chevron" size={21} />
        </button>
        <span className="app-topbar-spacer" aria-hidden="true" />
      </header>

      <div className="booking-modern-scroll">
        <section className="booking-modern-hero">
          <img src={course.image} alt="" />
          <span className="booking-modern-hero-shade" />
          <div className="booking-modern-hero-copy">
            <span className="eyebrow light">{step === "payment" ? "CONFIRMING BOOKING" : "YOUR ROUND"}</span>
            <strong>{course.name}</strong>
            {heroDetail && <span>{heroDetail}</span>}
          </div>
        </section>

          {step !== "payment" ? (
            <div className="booking-modern-content">
              <section className="booking-modern-section">
                <div className="booking-modern-section-heading"><h2>Day</h2><span>Select a day</span></div>
                <div className="booking-modern-dates">
                  {dates.map(([day,,dayNumber]) => {
                    const value = `${day} ${dayNumber}`
                    return (
                      <button key={dayNumber} type="button" className={date === value ? "selected" : ""} aria-pressed={date === value} onClick={() => { setDate(value); setTime("") }}>
                        <small>{day}</small>
                        <strong>{dayNumber}</strong>
                        <span>Aug</span>
                      </button>
                    )
                  })}
                </div>
              </section>

              <section className="booking-modern-section">
                <div className="booking-modern-section-heading"><h2>Tee time</h2><span>{time || "Select a time"}</span></div>
                <div className="booking-modern-times">
                  {slots.map((slotItem) => (
                    <button key={slotItem} type="button" className={time === slotItem ? "selected" : ""} aria-pressed={time === slotItem} onClick={() => setTime(slotItem)}>
                      <strong>{slotItem}</strong>
                    </button>
                  ))}
                </div>
              </section>

              <section className="booking-modern-addons">
                <div className="booking-modern-addon">
                  <div><h2>Caddy</h2><span>{caddyMode === "auto" ? "₹320" : "Optional"}</span></div>
                  <div className="booking-modern-choice">
                    <button type="button" className={caddyMode === "none" ? "selected" : ""} onClick={() => setCaddyMode("none")}>No</button>
                    <button type="button" className={caddyMode === "auto" ? "selected" : ""} onClick={() => setCaddyMode("auto")}>Add</button>
                  </div>
                </div>
                <div className="booking-modern-addon">
                  <div><h2>Golf cart</h2><span>{cartCount > 0 ? "₹800" : "Optional"}</span></div>
                  <div className="booking-modern-choice">
                    <button type="button" className={cartCount === 0 ? "selected" : ""} onClick={() => setCartCount(0)}>No</button>
                    <button type="button" className={cartCount > 0 ? "selected" : ""} onClick={() => setCartCount(1)}>Add</button>
                  </div>
                </div>
              </section>

            </div>
          ) : (
            <div className="booking-modern-processing">
              <span><Icon name="loader" size={30} /></span>
              <h2>Securing your tee time</h2>
              <p>Confirming your booking at {course.name}.</p>
            </div>
          )}
        </div>

        {step !== "payment" && (
          <footer className="booking-modern-footer">
            <div className="booking-modern-payment-wrap">
              {paymentMenuOpen && (
                <div className="booking-modern-payment-menu" role="menu">
                  {["UPI","Card","Net banking"].map((method) => (
                    <button key={method} type="button" className={paymentMethod === method ? "selected" : ""} onClick={() => { setPaymentMethod(method); setPaymentMenuOpen(false) }}>
                      <span>{method}</span>
                      {paymentMethod === method && <Icon name="check" size={15} />}
                    </button>
                  ))}
                </div>
              )}
              <button type="button" className="booking-modern-payment-selector" onClick={() => setPaymentMenuOpen((open) => !open)} aria-expanded={paymentMenuOpen}>
                <span className="booking-modern-payment-icon"><Icon name="wallet" size={18} /></span>
                <span><small>PAY USING</small><strong>{paymentLabel}</strong></span>
                <Icon name="chevron" size={16} />
              </button>
            </div>
            <button type="button" className="booking-modern-pay-button" disabled={!canPay} onClick={pay}>
              <span>Confirm</span>
              <strong>₹{total.toLocaleString("en-IN")}</strong>
              <Icon name="arrow" size={17} />
            </button>
          </footer>
        )}
    </main>
  )
}
function RangeBookingFlowModal({
  step,
  setStep,
  date,
  setDate,
  bucketCount,
  setBucketCount,
  paymentMethod,
  setPaymentMethod,
  close,
  complete,
}: {
  step: BookingStep
  setStep: (step: BookingStep) => void
  date: string
  setDate: (date: string) => void
  bucketCount: number
  setBucketCount: (count: number) => void
  paymentMethod: string
  setPaymentMethod: (method: string) => void
  close: () => void
  complete: () => void
}) {
  const [paymentMenuOpen, setPaymentMenuOpen] = useState(false)
  const dates = Array.from({ length: 5 }, (_, index) => {
    const value = new Date()
    value.setHours(0, 0, 0, 0)
    value.setDate(value.getDate() + index)
    return {
      key: value.toISOString(),
      day: value.toLocaleDateString("en-IN", { weekday: "short" }),
      date: value.getDate().toString(),
      month: value.toLocaleDateString("en-IN", { month: "short" }),
      label: value.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" }),
    }
  })
  const selectedDate = dates.find((item) => item.key === date)
  const total = 900 + bucketCount * 350
  const paymentLabel = paymentMethod === "Net banking" ? "Net banking" : paymentMethod

  useEffect(() => {
    if (step !== "payment") return
    const timer = window.setTimeout(complete, 2000)
    return () => window.clearTimeout(timer)
  }, [step, complete])

  return (
    <main className="booking-flow-page" aria-label="Book Delhi Golf Club Range">
      <header className="booking-page-topbar">
        <button type="button" className="app-topbar-back" onClick={close} aria-label="Go back">
          <Icon name="chevron" size={21} />
        </button>
        <span className="app-topbar-spacer" aria-hidden="true" />
      </header>

      <div className="booking-modern-scroll">
        <section className="booking-modern-hero">
          <img src={photos.golfer} alt="" />
          <span className="booking-modern-hero-shade" />
          <div className="booking-modern-hero-copy">
            <span className="eyebrow light">{step === "payment" ? "CONFIRMING BOOKING" : "YOUR SESSION"}</span>
            <strong>Delhi Golf Club Range</strong>
            {selectedDate && <span>{selectedDate.label}{bucketCount ? ` · ${bucketCount} ${bucketCount === 1 ? "bucket" : "buckets"}` : ""}</span>}
          </div>
        </section>

        {step !== "payment" ? (
          <div className="booking-modern-content">
            <section className="booking-modern-section">
              <div className="booking-modern-section-heading"><h2>Day</h2><span>Select a day</span></div>
              <div className="booking-modern-dates">
                {dates.map((item, index) => (
                  <button key={item.key} type="button" className={date === item.key ? "selected" : ""} aria-pressed={date === item.key} onClick={() => setDate(item.key)}>
                    <small>{index === 0 ? "Today" : item.day}</small>
                    <strong>{item.date}</strong>
                    <span>{item.month}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="booking-modern-section range-bucket-section">
              <div className="booking-modern-section-heading"><h2>Ball buckets</h2><span>₹350 each</span></div>
              <div className="range-bucket-input">
                <button type="button" onClick={() => setBucketCount(Math.max(0, bucketCount - 1))} disabled={bucketCount === 0} aria-label="Remove bucket">−</button>
                <label><strong>{bucketCount}</strong><span>{bucketCount === 1 ? "bucket" : "buckets"}</span></label>
                <button type="button" onClick={() => setBucketCount(bucketCount + 1)} aria-label="Add bucket">+</button>
              </div>
              <small className="range-bucket-hint">Add as many practice ball buckets as you need.</small>
            </section>
          </div>
        ) : (
          <div className="booking-modern-processing">
            <span><Icon name="loader" size={30} /></span>
            <h2>Securing your range session</h2>
            <p>Confirming your booking at Delhi Golf Club Range.</p>
          </div>
        )}
      </div>

      {step !== "payment" && (
        <footer className="booking-modern-footer">
          <div className="booking-modern-payment-wrap">
            {paymentMenuOpen && (
              <div className="booking-modern-payment-menu" role="menu">
                {["UPI","Card","Net banking"].map((method) => (
                  <button key={method} type="button" className={paymentMethod === method ? "selected" : ""} onClick={() => { setPaymentMethod(method); setPaymentMenuOpen(false) }}>
                    <span>{method}</span>
                    {paymentMethod === method && <Icon name="check" size={15} />}
                  </button>
                ))}
              </div>
            )}
            <button type="button" className="booking-modern-payment-selector" onClick={() => setPaymentMenuOpen((open) => !open)} aria-expanded={paymentMenuOpen}>
              <span className="booking-modern-payment-icon"><Icon name="wallet" size={18} /></span>
              <span><small>PAY USING</small><strong>{paymentLabel}</strong></span>
              <Icon name="chevron" size={16} />
            </button>
          </div>
          <button type="button" className="booking-modern-pay-button" disabled={!date} onClick={() => setStep("payment")}>
            <span>Confirm</span>
            <strong>₹{total.toLocaleString("en-IN")}</strong>
            <Icon name="arrow" size={17} />
          </button>
        </footer>
      )}
    </main>
  )
}

function PaymentSheet({
  state,
  setState,
  close,
  succeed,
  recheck,
}: {
  state: PaymentState
  setState: (state: PaymentState) => void
  close: () => void
  succeed: () => void
  recheck: () => void
}) {
  const [method, setMethod] = useState("UPI")
  useEffect(() => {
    if (state !== "processing") return
    const timer = window.setTimeout(succeed, 1100)
    return () => window.clearTimeout(timer)
  }, [state, succeed])
  const process = () => {
    setState("processing")
  }
  return (
    <div className="sheet-backdrop payment-backdrop" onClick={close}>
      <div className="sheet payment-sheet" onClick={(event) => event.stopPropagation()}>
        <div className="sheet-handle" />
        {state === "methods" && <>
          <div className="sheet-title"><span><p className="eyebrow">SECURE PAYMENT</p><h2>Choose payment method</h2></span><button onClick={close}><Icon name="close" /></button></div>
          <div className="payment-method-tabs">{["UPI", "Cards", "Netbanking", "Wallets"].map((item) => <button className={method === item ? "active" : ""} onClick={() => setMethod(item)} key={item}>{item}</button>)}</div>
          {method === "UPI" && <div className="payment-choice-list">{["GPay", "PhonePe", "Paytm", "arjun@upi"].map((item,index) => <button className={index === 0 ? "selected" : ""} key={item}><span className="payment-logo">{item[0]}</span><strong>{item}</strong><i>{index === 0 && <Icon name="check" size={13} />}</i></button>)}</div>}
          {method === "Cards" && <button className="saved-card"><span>HDFC</span><div><strong>Visa ending 4218</strong><small>Expires 08/28</small></div><Icon name="check" /></button>}
          {method === "Netbanking" && <div className="payment-placeholder"><Icon name="wallet" /><span>Select your bank on the next secure screen.</span></div>}
          {method === "Wallets" && <div className="payment-placeholder"><Icon name="wallet" /><span>Paytm and supported wallets available.</span></div>}
          <button className="primary-button payment-primary" onClick={process}>Pay securely</button>
          <div className="payment-state-links"><button onClick={() => setState("failed")}>Failed</button><button onClick={() => setState("offline")}>Offline</button><button onClick={() => setState("expired")}>Hold expired</button></div>
        </>}
        {state === "processing" && <div className="payment-processing"><span><Icon name="loader" size={30} /></span><h2>Processing payment</h2><p>Don’t close the app or press back.</p><small>Secured by your payment provider</small></div>}
        {state === "failed" && <div className="payment-resolution error-payment"><span><Icon name="close" size={27} /></span><h2>Payment failed</h2><p>Your UPI bank declined this request. No money was deducted and your slot is still held.</p><button className="primary-button" onClick={() => setState("methods")}>Try again</button><button onClick={() => setState("methods")}>Use another method</button></div>}
        {state === "offline" && <div className="payment-resolution"><span><Icon name="shield" size={27} /></span><h2>You’re offline</h2><p>Reconnect to continue. Your selections are saved while the slot hold remains active.</p><button className="primary-button" onClick={() => setState("methods")}>Try again</button></div>}
        {state === "expired" && <div className="payment-resolution"><span><Icon name="clock" size={27} /></span><h2>Slot hold expired</h2><p>We released this slot because payment wasn’t completed in time.</p><button className="primary-button" onClick={recheck}>Re-check tee times</button></div>}
      </div>
    </div>
  )
}

function ConfirmationScreen({
  go,
  course,
  date,
  time,
  caddy,
  cartCount,
  total,
}: {
  go: (screen: CourseFlowScreen) => void
  course: BookingCourse
  date: string
  time: string
  caddy: string
  cartCount: number
  total: number
}) {
  const [reminders, setReminders] = useState<boolean | null>(null)
  return (
    <main className="screen confirmation-screen">
      <div className="success-animation"><span><Icon name="check" size={30} /></span><i /><i /></div>
      <ConfirmedBadge />
      <h1>You’re booked</h1>
      <p>{course.name} is expecting you.</p>
      <span className="booking-reference">Booking reference · <b>DGC-48213</b></span>
      <div className="confirmation-summary"><img src={course.image} alt={course.name} /><div><strong>{course.name}</strong><span>{date} Aug · {time}</span><span>{caddy} · {cartCount ? `${cartCount} cart${cartCount > 1 ? "s" : ""}` : "No cart"}</span><span>₹{total.toLocaleString("en-IN")} paid</span></div></div>
      <div className="confirmation-actions">
        <button><Icon name="calendar" /><span>Add to calendar</span><Icon name="chevron" /></button>
        <button><Icon name="directions" /><span>Get directions</span><Icon name="chevron" /></button>
        <button><Icon name="share" /><span>Invite players</span><Icon name="chevron" /></button>
      </div>
      <p className="confirmation-note"><Icon name="shield" size={14} /> Free cancellation until 24 hours before your tee time</p>
      <div className="bring-card"><strong>What to bring</strong><span>Collared shirt · Golf shoes · Photo ID</span></div>
      <p className="points-earned">+240 points earned <span>· Loyalty program TBD</span></p>
      <button className="confirmation-cross-sell" onClick={() => go("coachProfile")}><span><Avatar initials="SM" /><Avatar initials="AR" /></span><div><strong>Add a lesson at this course</strong><small>2 coaches teach at {course.name}</small></div><Icon name="chevron" /></button>
      {reminders === null ? <div className="notification-primer"><Icon name="bell" /><div><strong>Get reminders before your tee time</strong><small>Allow Fore! to send booking updates.</small><span><button onClick={() => setReminders(true)}>Allow</button><button onClick={() => setReminders(false)}>Not now</button></span></div></div> : <p className="primer-response">{reminders ? "Reminders enabled" : "You can enable reminders later in Settings"}</p>}
      <button className="primary-button confirmation-primary" onClick={() => go("bookingDetail")}>View booking</button>
      <button className="confirmation-home-link" onClick={() => go("discover")}>Back to Home</button>
    </main>
  )
}

function MyBookingsScreen({ go }: { go: (screen: CourseFlowScreen) => void }) {
  return (
    <main className="screen my-bookings-screen">
      <FlowHeader title="My bookings" back={() => go("confirmation")} />
      <div className="segment booking-history-tabs"><button className="active">Upcoming</button><button>Past</button></div>
      <h2>Tee times</h2>
      <button className="booking-history-row" onClick={() => go("bookingDetail")}><img src={photos.course} alt="" /><span><ConfirmedBadge /><strong>Delhi Golf Club</strong><small>Sat 22 Aug · 7:30 AM · 4 players</small></span><Icon name="chevron" /></button>
      <h2>Lessons</h2>
      <button className="booking-history-row muted-booking"><Avatar initials="SM" /><span><strong>Savdeep Mehta</strong><small>No upcoming lessons</small></span><Icon name="chevron" /></button>
      <h2>Range</h2>
      <button className="booking-history-row muted-booking"><span className="range-icon"><Icon name="flag" /></span><span><strong>Delhi Golf Club Range</strong><small>No upcoming sessions</small></span><Icon name="chevron" /></button>
    </main>
  )
}

function BookingDetailScreen({ go }: { go: (screen: CourseFlowScreen) => void }) {
  const [cancelOpen, setCancelOpen] = useState(false)
  return (
    <main className="screen booking-detail-screen">
      <FlowHeader title="Booking details" back={() => go("bookings")} />
      <div className="booking-detail-status"><ConfirmedBadge /><h1>Delhi Golf Club</h1><p>Sat 22 Aug · 7:30 AM · 4 players</p></div>
      <div className="detail-summary-card"><div><span><Icon name="calendar" /></span><p><small>DATE & TIME</small><strong>Saturday, 22 August</strong><em>7:30 AM</em></p></div><div><span><Icon name="users" /></span><p><small>PLAYERS</small><strong>4 players</strong><em>Arjun Kapoor + 3 guests</em></p></div><div><span><Icon name="wallet" /></span><p><small>PAID</small><strong>₹10,000</strong><em>UPI · arjun@upi</em></p></div></div>
      <button className="booking-map-card"><span><Icon name="map" size={25} /></span><div><strong>Delhi Golf Club</strong><small>Lodhi Road · 2.1 km</small></div><Icon name="directions" /></button>
      <div className="booking-manage-actions"><button className="primary-button">Change time</button><button onClick={() => setCancelOpen(true)}>Cancel booking</button></div>
      <div className="detail-links"><button>View receipt <Icon name="chevron" /></button><button>Contact the course <Icon name="chevron" /></button></div>
      {cancelOpen && <div className="sheet-backdrop" onClick={() => setCancelOpen(false)}><div className="sheet cancel-sheet" onClick={(event) => event.stopPropagation()}><div className="sheet-handle" /><div className="sheet-title"><span><p className="eyebrow">CANCEL BOOKING</p><h2>Cancel this tee time?</h2></span><button onClick={() => setCancelOpen(false)}><Icon name="close" /></button></div><p>You’ll receive a full refund because you’re cancelling more than 24 hours before the tee time.</p><div className="refund-row"><span>Refund to arjun@upi</span><strong>₹10,000</strong></div><button className="cancel-confirm-button">Cancel and refund ₹10,000</button><button className="primary-button" onClick={() => setCancelOpen(false)}>Keep booking</button></div></div>}
    </main>
  )
}

type RangeAvailabilityState = "ready" | "loading" | "empty" | "offline"

function RangeCard({
  qutub = false,
  onOpen,
  onBook,
}: {
  qutub?: boolean
  onOpen: () => void
  onBook: () => void
}) {
  const [saved, setSaved] = useState(false)
  const name = qutub ? "Qutub Practice Centre" : "Delhi Golf Club Range"
  const image = qutub ? photos.green : photos.golfer
  const rating = qutub ? "4.4" : "4.6"
  const distance = qutub ? "Mehrauli · 5.7 km" : "Lodhi Road · 2.8 km"
  return (
    <article className="range-card">
      <button className="range-card-main" onClick={onOpen}>
        <div className="range-card-image">
          <img src={image} alt={name} />
          <span className="range-status-pill">{qutub ? "Launch monitors" : "Open now"}</span>
          <span className="range-rating-pill"><Icon name="star" size={13} /> {rating}</span>
        </div>
        <div className="range-card-copy">
          <div className="range-card-title-row">
            <div>
              <h3>{name}</h3>
              <p><Icon name="pin" size={14} /> {distance}</p>
            </div>
            <button
              type="button"
              className={`range-save-button ${saved ? "saved" : ""}`}
              onClick={(event) => { event.stopPropagation(); setSaved(!saved) }}
              aria-label={saved ? "Remove saved range" : "Save range"}
            >
              <Icon name="heart" size={18} />
            </button>
          </div>
          <div className="range-card-meta">
            {qutub ? (
              <span className="availability-copy">7 bays available</span>
            ) : (
              <span className="range-live-status"><i /> Open · 42 of 60 bays occupied</span>
            )}
            <strong>from ₹900 <small>/ 60 min</small></strong>
          </div>
        </div>
      </button>
      <div className="range-card-actions">
        <button type="button" className="range-details-button" onClick={onOpen}>View details</button>
        <button type="button" className="range-book-button" onClick={onBook}>Book a bay <Icon name="arrow" size={15} /></button>
      </div>
    </article>
  )
}

function RangeDiscoverScreen({
  go,
  openSearch,
  setMode,
  openRangeBooking,
}: {
  go: (screen: CourseFlowScreen) => void
  openSearch: () => void
  setMode: (mode: "courses" | "ranges" | "coaches") => void
  openRangeBooking: () => void
}) {
  return (
    <main className="screen booking-discover-screen range-discover-screen">
      <SectionHeading title="Book Again" />
      <RangeCard onOpen={() => go("rangeProfile")} onBook={openRangeBooking} />
      <SectionHeading title="Near you" />
      <div className="near-you-range-list">
        <RangeCard onOpen={() => go("rangeProfile")} />
        <RangeCard qutub onOpen={() => go("rangeProfile")} onBook={openRangeBooking} />
      </div>
    </main>
  )
}

function RangeProfileScreen({ go, openRangeBooking }: { go: (screen: CourseFlowScreen) => void; openRangeBooking: () => void }) {
  return (
    <main className="course-profile-screen range-profile-screen">
      <div className="course-profile-hero"><img src={photos.golfer} alt="Delhi Golf Club Range" /><button onClick={() => go("rangeDiscover")}><Icon name="chevron" /></button><button><Icon name="heart" /></button><span>1 / 4</span></div>
      <div className="course-profile-content">
        <span className="featured-tag inline-badge">Open now · until 9:00 PM</span>
        <div className="course-title-row"><h1>Delhi Golf Club Range</h1><span className="rating"><Icon name="star" size={14} /> 4.6 (184)</span></div>
        <p className="course-address"><Icon name="pin" size={15} /> Lodhi Road, Delhi · 2.8 km</p>
        <div className="course-facts range-facts">
          {[["60","Bays"],["Mixed","Covered / open"],["Yes","Floodlit"],["TrackMan","Launch monitors"]].map(([value,label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </div>
        <div className="profile-section-heading"><h2>Packages</h2><button>View all</button></div>
        <div className="range-package-grid"><button><small>MONTHLY</small><strong>Unlimited Balls</strong><span>Practice any day</span><b>₹2,999</b></button><button><em>Save 15%</em><small>10 VISITS</small><strong>10 Bucket Pack</strong><span>Valid for 90 days</span><b>₹2,975</b></button></div>
        <h2>Add a coach to your session</h2>
        <button className="lesson-cross-sell" onClick={() => go("coachProfile")}><Avatar initials="SM" /><span><strong>Savdeep Mehta</strong><small>PGA Professional · 12 yrs · 4.9</small></span><Icon name="chevron" /></button>
        <div className="profile-section-heading"><h2>Reviews</h2><button>See all 184</button></div>
        <div className="profile-review"><span>★★★★★</span><p>“Plenty of space, good mats, and launch monitors were easy to reserve.”</p><small>Ankit R. · 6 days ago</small></div>
        <h2>Map & directions</h2>
        <button className="directions-card"><span><Icon name="map" size={24} /></span><div><strong>Delhi Golf Club Range</strong><small>Lodhi Road · 2.8 km</small></div><Icon name="directions" /></button>
      </div>
      <div className="booking-sticky-bar"><span><small>From</small><strong>₹900</strong></span><button className="primary-button" onClick={openRangeBooking}>Book a bay</button></div>
    </main>
  )
}

function RangeSelectScreen({
  go,
  time,
  setTime,
  duration,
  setDuration,
  bayType,
  setBayType,
  bucket,
  setBucket,
  state,
  setState,
}: {
  go: (screen: CourseFlowScreen) => void
  time: string
  setTime: (time: string) => void
  duration: number
  setDuration: (duration: number) => void
  bayType: "Standard" | "Launch monitor"
  setBayType: (type: "Standard" | "Launch monitor") => void
  bucket: boolean
  setBucket: (bucket: boolean) => void
  state: RangeAvailabilityState
  setState: (state: RangeAvailabilityState) => void
}) {
  const basePrice = duration === 60 ? 900 : duration === 90 ? 1250 : 1600
  const total = basePrice + (bayType === "Launch monitor" ? 300 : 0) + (bucket ? 350 : 0)
  const times = ["6:30 AM","7:00 AM","7:30 AM","8:00 AM","8:30 AM","9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","2:00 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM"]
  return (
    <main className="screen range-select-screen">
      <FlowHeader title="Delhi Golf Club Range" back={() => go("rangeProfile")} />
      {state === "offline" && <div className="booking-banner offline-banner"><Icon name="shield" /><span><strong>You’re offline</strong><small>Showing the last saved availability.</small></span></div>}
      <div className="tee-date-strip range-date-strip">{[["Thu","20"],["Fri","21"],["Sat","22"],["Sun","23"],["Mon","24"]].map(([day,date],index) => <button className={index === 0 ? "selected" : ""} key={date}><small>{day}</small><strong>{date}</strong><em>{index === 0 ? "Today" : "Open"}</em></button>)}</div>
      {state === "loading" && <div className="range-slot-skeleton">{Array.from({length:12}).map((_,index) => <i key={index} />)}<button onClick={() => setState("ready")}>Show availability</button></div>}
      {state === "empty" && <div className="tee-empty-state range-empty"><span><Icon name="clock" /></span><h2>No bays available at this time</h2><p>These are the next open times today.</p><div>{["11:30 AM","12:00 PM","2:00 PM"].map((slot) => <button key={slot} onClick={() => { setTime(slot); setState("ready") }}>{slot}</button>)}</div></div>}
      {(state === "ready" || state === "offline") && <><h2 className="range-section-title">Select a time</h2><div className="range-time-grid">{times.map((slot,index) => <button className={`${time === slot ? "selected" : ""} ${[3,8,11].includes(index) ? "full" : ""}`} disabled={[3,8,11].includes(index)} onClick={() => setTime(slot)} key={slot}>{slot}{[3,8,11].includes(index) && <small>Full</small>}</button>)}</div></>}
      <h2 className="range-section-title">Duration</h2>
      <div className="duration-cards">{[[60,900],[90,1250],[120,1600]].map(([minutes,price]) => <button className={duration === minutes ? "selected" : ""} onClick={() => setDuration(minutes)} key={minutes}><strong>{minutes} min</strong><span>₹{price.toLocaleString("en-IN")}</span><i>{duration === minutes && <Icon name="check" size={13} />}</i></button>)}</div>
      <h2 className="range-section-title">Bay type</h2>
      <div className="segment bay-type-toggle"><button className={bayType === "Standard" ? "active" : ""} onClick={() => setBayType("Standard")}>Standard</button><button className={bayType === "Launch monitor" ? "active" : ""} onClick={() => setBayType("Launch monitor")}>Launch monitor · +₹300</button></div>
      <div className="range-option-row"><span><strong>Add ball bucket</strong><small>Fresh practice balls · +₹350</small></span><button className={`checkout-toggle ${bucket ? "on" : ""}`} onClick={() => setBucket(!bucket)}><i /></button></div>
      <p className="range-capacity-note"><Icon name="users" size={15} /> One bay fits up to 4 players</p>
      <div className="booking-sticky-bar"><span><small>{time || "Select a time"}</small><strong>{time ? `₹${total.toLocaleString("en-IN")}` : "—"}</strong></span><button className="primary-button" disabled={!time} onClick={() => go("rangeCheckout")}>Continue</button></div>
    </main>
  )
}

function RangeCheckoutScreen({
  go,
  time,
  duration,
  bayType,
  bucket,
  setBucket,
  credits,
  setCredits,
  holdSeconds,
  openPayment,
}: {
  go: (screen: CourseFlowScreen) => void
  time: string
  duration: number
  bayType: "Standard" | "Launch monitor"
  bucket: boolean
  setBucket: (bucket: boolean) => void
  credits: boolean
  setCredits: (credits: boolean) => void
  holdSeconds: number
  openPayment: () => void
}) {
  const [addonsOpen, setAddonsOpen] = useState(false)
  const basePrice = duration === 60 ? 900 : duration === 90 ? 1250 : 1600
  const launchPrice = bayType === "Launch monitor" ? 300 : 0
  const subtotal = basePrice + launchPrice + (bucket ? 350 : 0)
  const creditValue = credits ? Math.min(1740, subtotal) : 0
  const total = subtotal - creditValue
  const minutes = Math.floor(holdSeconds / 60).toString().padStart(2,"0")
  const seconds = (holdSeconds % 60).toString().padStart(2,"0")
  return (
    <main className="screen checkout-screen range-checkout-screen">
      <FlowHeader title="Checkout" back={() => go("rangeSelect")} />
      <div className="hold-banner"><Icon name="clock" /><span><strong>We’re holding your bay</strong><small>Complete payment within {minutes}:{seconds}</small></span></div>
      <div className="checkout-summary"><img src={photos.golfer} alt="Delhi Golf Club Range" /><div><span><strong>Delhi Golf Club Range</strong><button onClick={() => go("rangeProfile")}>Edit</button></span><p>Today · {time || "9:30 AM"}</p><p>{duration} min · {bayType}</p></div></div>
      <button className="checkout-collapsible" onClick={() => setAddonsOpen(!addonsOpen)}><span><strong>Add-ons</strong><small>Ball bucket, rental equipment, coach</small></span><Icon name="chevron" /></button>
      {addonsOpen && <div className="addon-panel range-addons"><button className={bucket ? "selected" : ""} onClick={() => setBucket(!bucket)}><span><strong>Ball bucket</strong><small>Fresh practice balls · ₹350</small></span><i>{bucket && <Icon name="check" size={13} />}</i></button><button><span><strong>Rental equipment</strong><small>TaylorMade Qi10 set · ₹2,500</small></span><Icon name="plus" size={16} /></button><button onClick={() => go("coachProfile")}><Avatar initials="SM" /><span><strong>Add a coach</strong><small>Savdeep Mehta · from ₹1,800</small></span><Icon name="chevron" /></button></div>}
      <button className="range-savings-card"><span><Icon name="spark" /></span><div><small>PLAYING OFTEN?</small><strong>Save with a 10 Bucket Pack</strong><p>10 visits · ₹2,975 · Save 15%</p></div><Icon name="chevron" /></button>
      <div className="checkout-section-heading"><h2>Wallet & credits</h2></div>
      <div className="credit-row"><span><Icon name="wallet" /><div><strong>Use ₹1,740 credits</strong><small>Fore! wallet balance</small></div></span><button className={`checkout-toggle ${credits ? "on" : ""}`} onClick={() => setCredits(!credits)}><i /></button></div>
      <div className="checkout-section-heading"><h2>Payment method</h2><button onClick={openPayment}>Change</button></div>
      <button className="payment-method-row" onClick={openPayment}><span>UPI</span><div><strong>arjun@upi</strong><small>Default payment method</small></div><Icon name="chevron" /></button>
      <div className="checkout-section-heading"><h2>Price details</h2></div>
      <div className="price-breakdown">
        <div><span>{duration}-minute bay</span><strong>₹{basePrice.toLocaleString("en-IN")}</strong></div>
        <div><span>Launch monitor</span><strong>₹{launchPrice.toLocaleString("en-IN")}</strong></div>
        <div><span>Ball bucket</span><strong>₹{(bucket ? 350 : 0).toLocaleString("en-IN")}</strong></div>
        <div><span>GST</span><strong>Included</strong></div>
        {creditValue > 0 && <div className="credit-line"><span>Fore! credits</span><strong>−₹{creditValue.toLocaleString("en-IN")}</strong></div>}
        <div className="total-line"><span>Total</span><strong>₹{total.toLocaleString("en-IN")}</strong></div>
      </div>
      <p className="cancellation-copy">Free cancellation until 2 hours before your session. <button>Details</button></p>
      <div className="booking-sticky-bar pay-sticky"><span><small>Total</small><strong>₹{total.toLocaleString("en-IN")}</strong></span><button className="primary-button" onClick={openPayment}>Pay ₹{total.toLocaleString("en-IN")}</button></div>
    </main>
  )
}

function RangeConfirmationScreen({ go, date, bucketCount }: { go: (screen: CourseFlowScreen) => void; date: string; bucketCount: number }) {
  const [reminders, setReminders] = useState<boolean | null>(null)
  return (
    <main className="screen confirmation-screen range-confirmation-screen">
      <div className="success-animation"><span><Icon name="check" size={30} /></span><i /><i /></div>
      <ConfirmedBadge /><h1>You’re booked</h1><p>Delhi Golf Club Range is expecting you.</p>
      <span className="booking-reference">Booking reference · <b>DGCR-20931</b></span>
      <div className="confirmation-summary"><img src={photos.golfer} alt="Delhi Golf Club Range" /><div><strong>Delhi Golf Club Range</strong><span>{date || "Today"}</span><span>{bucketCount ? `${bucketCount} ${bucketCount === 1 ? "ball bucket" : "ball buckets"} included` : "Bay reservation"}</span></div></div>
      <div className="confirmation-actions"><button><Icon name="calendar" /><span>Add to calendar</span><Icon name="chevron" /></button><button><Icon name="directions" /><span>Get directions</span><Icon name="chevron" /></button></div>
      <div className="bring-card"><strong>Bay assigned on arrival</strong><span>Check in at the range desk</span></div>
      <button className="confirmation-cross-sell" onClick={() => go("coachProfile")}><span><Avatar initials="SM" /></span><div><strong>Add a coach to your session</strong><small>Savdeep Mehta · PGA Professional · 4.9</small></div><Icon name="chevron" /></button>
      {reminders === null ? <div className="notification-primer"><Icon name="bell" /><div><strong>Get reminders before your session</strong><small>Allow Fore! to send range booking updates.</small><span><button onClick={() => setReminders(true)}>Allow</button><button onClick={() => setReminders(false)}>Not now</button></span></div></div> : <p className="primer-response">{reminders ? "Reminders enabled" : "You can enable reminders later in Settings"}</p>}
      <button className="primary-button confirmation-primary" onClick={() => go("rangeDetail")}>View booking</button>
      <button className="confirmation-home-link" onClick={() => go("rangeDiscover")}>Back to Discover</button>
    </main>
  )
}

function RangeBookingDetailScreen({ go, date, bucketCount }: { go: (screen: CourseFlowScreen) => void; date: string; bucketCount: number }) {
  const [cancelOpen, setCancelOpen] = useState(false)
  return (
    <main className="screen booking-detail-screen range-detail-screen">
      <FlowHeader title="Range booking" back={() => go("rangeConfirmation")} />
      <div className="booking-detail-status"><ConfirmedBadge /><h1>Delhi Golf Club Range</h1><p>{date || "Today"}</p></div>
      <div className="detail-summary-card"><div><span><Icon name="calendar" /></span><p><small>SESSION</small><strong>{date || "Today"}</strong><em>Bay assigned on arrival</em></p></div><div><span><Icon name="flag" /></span><p><small>INCLUDED</small><strong>{bucketCount ? `${bucketCount} ball ${bucketCount === 1 ? "bucket" : "buckets"}` : "Bay reservation"}</strong><em>Practice balls added</em></p></div><div><span><Icon name="wallet" /></span><p><small>PAID</small><strong>₹{(900 + bucketCount * 350).toLocaleString("en-IN")}</strong><em>UPI · arjun@upi</em></p></div></div>
      <button className="booking-map-card"><span><Icon name="map" size={25} /></span><div><strong>Delhi Golf Club Range</strong><small>Lodhi Road · 2.8 km</small></div><Icon name="directions" /></button>
      <div className="booking-manage-actions"><button className="primary-button" onClick={() => go("rangeSelect")}>Change time</button><button onClick={() => setCancelOpen(true)}>Cancel booking</button></div>
      <div className="detail-links"><button>View receipt <Icon name="chevron" /></button><button>Contact the range <Icon name="chevron" /></button></div>
      {cancelOpen && <div className="sheet-backdrop" onClick={() => setCancelOpen(false)}><div className="sheet cancel-sheet" onClick={(event) => event.stopPropagation()}><div className="sheet-handle" /><div className="sheet-title"><span><p className="eyebrow">CANCEL RANGE</p><h2>Cancel this bay?</h2></span><button onClick={() => setCancelOpen(false)}><Icon name="close" /></button></div><p>You’re eligible for a full refund to your original UPI method.</p><div className="refund-row"><span>Refund amount</span><strong>₹1,250</strong></div><button className="cancel-confirm-button">Cancel and refund</button><button className="primary-button" onClick={() => setCancelOpen(false)}>Keep booking</button></div></div>}
    </main>
  )
}

type CoachDiscoverState = "ready" | "loading" | "error" | "offline" | "empty"
type CoachAvailabilityState = "ready" | "loading" | "empty"

function CoachCard({
  name,
  rating,
  price,
  image,
  onOpen,
  onBook,
}: {
  name: string
  rating: string
  price: number
  image?: string
  onOpen: () => void
  onBook: () => void
}) {
  const [saved, setSaved] = useState(false)
  const savdeep = name === "Savdeep Mehta"
  const specialties = savdeep ? ["Short game", "Swing", "Course play"] : name === "Neha Arora" ? ["Beginners", "Junior"] : ["Swing", "Driver"]
  return (
    <article className="coach-card">
      <button className="coach-card-main" onClick={onOpen}>
        <div className="coach-card-image">
          {image ? <img src={image} alt={name + " coaching"} /> : <div className="coach-photo-fallback"><Avatar initials={name.split(" ").map((part) => part[0]).join("")} /></div>}
          <span className="coach-status-pill">{savdeep ? "PGA Professional" : "Available this week"}</span>
          <span className="coach-rating-pill"><Icon name="star" size={13} /> {rating}</span>
        </div>
        <div className="coach-card-copy">
          <div className="coach-card-title-row">
            <div>
              <h3>{name}</h3>
              <p><Icon name="pin" size={14} /> Delhi · {savdeep ? "2.1 km" : "5.4 km"}</p>
            </div>
            <button type="button" className={"coach-save-button " + (saved ? "saved" : "")} onClick={(event) => { event.stopPropagation(); setSaved(!saved) }} aria-label={saved ? "Remove saved coach" : "Save coach"}>
              <Icon name="heart" size={18} />
            </button>
          </div>
          <div className="coach-specialties">
            {specialties.map((item) => <span key={item}>{item}</span>)}
          </div>
          <div className="coach-card-meta">
            <span>{savdeep ? "Next available tomorrow" : "Available this week"}</span>
            <strong>₹{price.toLocaleString("en-IN")} <small>/ lesson</small></strong>
          </div>
        </div>
      </button>
      <div className="coach-card-actions">
        <button type="button" className="coach-details-button" onClick={onOpen}>View details</button>
        <button type="button" className="coach-book-button" onClick={onBook}>Book a lesson <Icon name="arrow" size={15} /></button>
      </div>
    </article>
  )
}

function CoachDiscoverScreen({
  go,
  state,
  setState,
  setMode,
  openSearch,
}: {
  go: (screen: CourseFlowScreen) => void
  state: CoachDiscoverState
  setState: (state: CoachDiscoverState) => void
  setMode: (mode: "courses" | "ranges" | "coaches") => void
  openSearch: () => void
}) {
  return (
    <main className="screen booking-discover-screen coach-discover-screen">
      {state === "offline" && <div className="booking-banner offline-banner"><Icon name="shield" /><span><strong>You’re offline</strong><small>Showing coaches saved from your last search.</small></span></div>}
      {state === "loading" && <div className="coach-card-skeleton">{[1,2,3].map((item) => <div key={item}><i /><span><b /><b /><b /></span></div>)}<button onClick={() => setState("ready")}>Show coaches</button></div>}
      {state === "error" && <div className="booking-empty-state coach-error-state"><span><Icon name="close" /></span><h2>We couldn’t load coaches</h2><p>Check your connection and try again.</p><button className="primary-button" onClick={() => setState("ready")}>Try again</button></div>}
      {state === "empty" && <div className="booking-empty-state"><span><Icon name="search" /></span><h2>No coaches match</h2><p>Widen your filters or try another specialty.</p><button className="primary-button" onClick={() => setState("ready")}>Widen filters</button></div>}
      {(state === "ready" || state === "offline") && <>
        <SectionHeading title="Book Again" />
        <CoachCard name="Savdeep Mehta" rating="4.9" price={1800} image={photos.golfer} onOpen={() => go("coachProfile")} onBook={() => go("coachLesson")} />
        <SectionHeading title="Near you" />
        <div className="near-you-coach-list">
          <CoachCard name="Savdeep Mehta" rating="4.9" price={1800} image={photos.golfer} onOpen={() => go("coachProfile")} onBook={() => go("coachLesson")} />
          <CoachCard name="Neha Arora" rating="4.8" price={1500} image={photos.golfer} onOpen={() => go("coachProfile")} onBook={() => go("coachLesson")} />
          <CoachCard name="Imran Qureshi" rating="4.7" price={2200} image={photos.golfer} onOpen={() => go("coachProfile")} onBook={() => go("coachLesson")} />
        </div>
      </>}
    </main>
  )
}

function CoachProfileScreen({go,connectionStatus,onConnect}:{go:(screen:CourseFlowScreen)=>void;connectionStatus:ConnectionStatus;onConnect:()=>void}){
  return (
    <main className="course-profile-screen coach-profile-booking-screen">
      <div className="course-profile-hero"><img src={photos.golfer} alt="Savdeep Mehta coaching" /><button onClick={() => go("coachDiscover")}><Icon name="chevron" /></button><button><Icon name="heart" /></button></div>
      <div className="course-profile-content">
        <p className="eyebrow">PGA PROFESSIONAL · 12 YEARS</p>
        <div className="course-title-row"><h1>Savdeep Mehta</h1><span className="rating"><Icon name="star" size={14} /> 4.9 (86)</span></div>
        <div className="specialty-pills large"><i>Short game</i><i>Swing</i><i>Course play</i></div><section className="coach-connection-panel"><div><small>COACH CONNECTION</small><strong>{connectionStatus==="connected"?"You’re connected":connectionStatus==="pending"?"Request pending":"Build an ongoing coaching relationship"}</strong><span>{connectionStatus==="connected"?"Your lessons, feedback and practice plan are linked.":connectionStatus==="pending"?"Savdeep will review your profile and goals.":"Connect first to keep coaching, feedback and drills together."}</span></div>{connectionStatus==="none"&&<button type="button" onClick={onConnect}>Connect</button>}{connectionStatus==="pending"&&<span className="connection-badge pending"><Icon name="clock" size={13}/> Pending</span>}{connectionStatus==="connected"&&<span className="connection-badge"><Icon name="check" size={13}/> Connected</span>}</section>
        <h2>About Savdeep</h2><p className="body-copy">I help golfers build simple, repeatable technique and make better decisions on the course. Every session ends with a clear practice plan. <button>Read more</button></p>
        <h2>Lesson types</h2>
        <div className="coach-profile-lessons">{[["Individual lesson","60 min","₹1,800"],["Playing lesson","9 holes","₹3,500"],["Junior lesson","45 min","₹1,500"]].map(([title,duration,price]) => <button key={title} onClick={() => go("coachLesson")}><span><strong>{title}</strong><small>{duration}</small></span><b>{price}</b><Icon name="chevron" /></button>)}</div>
        <button className="coach-package-card" onClick={() => go("coachCheckout")}><span><small>BEST VALUE · SAVE 10%</small><strong>12-lesson pack</strong><p>12 individual lessons · Flexible scheduling</p></span><b>₹19,440</b></button>
        <h2>Teaching locations</h2>
        <div className="teaching-locations"><button><span><Icon name="pin" /></span><div><strong>Delhi Golf Club</strong><small>Lodhi Road · 2.1 km</small></div><Icon name="chevron" /></button><button><span><Icon name="pin" /></span><div><strong>Qutub Golf Course</strong><small>Mehrauli · 5.4 km</small></div><Icon name="chevron" /></button></div>
        <div className="profile-section-heading"><h2>Next available</h2><button onClick={() => go("coachDateTime")}>View calendar</button></div>
        <div className="availability-slots coach-availability-preview">{["Tomorrow 7:00","Tomorrow 9:30","Fri 4:00"].map((slot) => <button key={slot} onClick={() => go("coachDateTime")}><strong>{slot}</strong><span>Delhi Golf Club</span></button>)}</div>
        <div className="profile-section-heading"><h2>Reviews</h2><button>See all 86</button></div>
        <div className="profile-review"><span>★★★★★</span><p>“Savdeep made my short game feel simple and gave me a plan I can actually repeat.”</p><small>Armaan K. · 10 days ago</small></div>
        <h2>Cancellation policy</h2><p className="body-copy">Free cancellation until 24 hours before a confirmed lesson.</p>
        <p className="coach-trust-line"><Icon name="shield" size={15} /> You’re only charged when the coach accepts</p>
      </div>
      <div className="booking-sticky-bar"><span><small>From</small><strong>₹1,800</strong></span><button className="primary-button" onClick={() => go("coachLesson")}>Book a lesson</button></div>
    </main>
  )
}

function CoachLessonTypeScreen({ go, lesson, setLesson }: { go: (screen: CourseFlowScreen) => void; lesson: string; setLesson: (lesson: string) => void }) {
  const lessons = [
    ["Individual lesson", "60 min", 1800, "One-to-one coaching"],
    ["Playing lesson", "9 holes", 3500, "On-course strategy"],
    ["Junior lesson", "45 min", 1500, "Junior fundamentals"],
  ] as const

  return (
    <main className="booking-flow-page coach-modern-flow coach-premium-flow" aria-label="Book a lesson with Savdeep Mehta">
      <header className="booking-page-topbar">
        <button type="button" className="app-topbar-back" onClick={() => go("coachProfile")} aria-label="Go back">
          <Icon name="chevron" size={21} />
        </button>
      </header>
      <div className="booking-modern-scroll">
        <section className="booking-modern-hero coach-premium-hero">
          <img src={photos.golfer} alt="" />
          <span className="booking-modern-hero-shade" />
          <div className="booking-modern-hero-copy">
            <span className="eyebrow light">BOOK A LESSON</span>
            <strong>Savdeep Mehta</strong>
            <span>Choose how you'd like to learn</span>
          </div>
        </section>
        <div className="booking-modern-content coach-premium-content">
          <section className="coach-premium-section">
            <div className="coach-premium-heading">
              <h2>Choose a lesson</h2>
            </div>
            <div className="coach-premium-options">
              {lessons.map(([title, duration, cost, copy]) => (
                <button key={title} type="button" className={lesson === title ? "selected" : ""} onClick={() => setLesson(title)}>
                  <span className="coach-premium-option-copy">
                    <strong>{title}</strong>
                    <small>{duration} · {copy}</small>
                  </span>
                  <b>₹{cost.toLocaleString("en-IN")}</b>
                  <span className="coach-premium-radio" aria-hidden="true" />
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
      <footer className="booking-modern-footer coach-premium-footer">
        <button type="button" className="booking-modern-pay-button" disabled={!lesson} onClick={() => go("coachDateTime")}>
          <span>Choose a time</span><Icon name="arrow" size={18} />
        </button>
      </footer>
    </main>
  )
}

function CoachDateTimeScreen({ go, date, setDate, slot, setSlot, state, setState }: { go:(screen:CourseFlowScreen)=>void; date:string; setDate:(date:string)=>void; slot:string; setSlot:(slot:string)=>void; state:CoachAvailabilityState; setState:(state:CoachAvailabilityState)=>void }) {
  const dates=[["Thu","20","2"],["Fri","21","4"],["Sat","22","2"],["Sun","23","2"],["Mon","24","1"]] as const
  const dayLabel=dates.find(x=>x[1]===date)?.[0]||"Fri"

  return (
    <main className="booking-flow-page coach-modern-flow coach-premium-flow" aria-label="Choose a lesson time">
      <header className="booking-page-topbar">
        <button type="button" className="app-topbar-back" onClick={()=>go("coachLesson")} aria-label="Go back"><Icon name="chevron" size={21}/></button>
      </header>
      <div className="booking-modern-scroll">
        <section className="booking-modern-hero coach-premium-hero">
          <img src={photos.golfer} alt="" />
          <span className="booking-modern-hero-shade" />
          <div className="booking-modern-hero-copy">
            <span className="eyebrow light">CHOOSE A TIME</span>
            <strong>Savdeep Mehta</strong>
            <span>{slot ? dayLabel+" "+date+" Aug · "+slot : "Choose a day and time"}</span>
          </div>
        </section>
        <div className="booking-modern-content coach-premium-content">
          <section className="coach-premium-section">
            <div className="coach-premium-heading">
              <h2>Pick a day</h2>
              <span>Available this week</span>
            </div>
            <div className="coach-premium-dates">
              {dates.map(([day,d]) => (
                <button key={d} type="button" className={date===d?"selected":""} onClick={()=>{setDate(d);setSlot("")}}>
                  <small>{day}</small><strong>{d}</strong><span>Aug</span>
                </button>
              ))}
            </div>
          </section>
          {state==="loading" && <div className="coach-premium-loading">{Array.from({length:6}).map((_,i)=><i key={i}/>)}</div>}
          {state==="empty" && (
            <div className="coach-premium-empty">
              <h3>No times available</h3>
              <p>Try another day or ask Savdeep for a different time.</p>
              <button type="button" onClick={()=>setState("ready")}>Show available times</button>
            </div>
          )}
          {state==="ready" && (
            <section className="coach-premium-section coach-premium-time-section">
              <div className="coach-premium-heading">
                <h2>Pick a time</h2>
                <span>{slot || "Local time"}</span>
              </div>
              <div className="coach-premium-times">
                {["7:00 AM","8:30 AM","9:30 AM","11:00 AM","2:30 PM","4:00 PM"].map(time=>(
                  <button key={time} type="button" className={slot===time?"selected":""} onClick={()=>setSlot(time)}>{time}</button>
                ))}
              </div>
            </section>
          )}
          <div className="coach-premium-location">
            <Icon name="pin" size={17}/>
            <span><strong>Delhi Golf Club</strong><small>Lodhi Road · 2.1 km</small></span>
          </div>
        </div>
      </div>
      <footer className="booking-modern-footer coach-premium-footer">
        <button type="button" className="booking-modern-pay-button" disabled={!slot} onClick={()=>go("coachCheckout")}>
          <span>Review time</span><Icon name="arrow" size={18}/>
        </button>
      </footer>
    </main>
  )
}

function CoachCheckoutScreen({ go, lesson, date, slot, goals, toggleGoal, notes, setNotes }: { go:(screen:CourseFlowScreen)=>void; lesson:string; date:string; slot:string; goals:string[]; toggleGoal:(goal:string)=>void; notes:string; setNotes:(notes:string)=>void }) {
  const singlePrice=lesson==="Playing lesson"?3500:lesson==="Junior lesson"?1500:1800
  const total=singlePrice
  const dayLabel=date==="20"?"Thu":date==="22"?"Sat":date==="23"?"Sun":date==="24"?"Mon":"Fri"

  return (
    <main className="booking-flow-page coach-modern-flow coach-premium-flow" aria-label="Confirm lesson">
      <header className="booking-page-topbar">
        <button type="button" className="app-topbar-back" onClick={()=>go("coachDateTime")} aria-label="Go back"><Icon name="chevron" size={21}/></button>
      </header>
      <div className="booking-modern-scroll">
        <section className="booking-modern-hero coach-premium-hero">
          <img src={photos.golfer} alt="" />
          <span className="booking-modern-hero-shade" />
          <div className="booking-modern-hero-copy">
            <span className="eyebrow light">CONFIRM LESSON</span>
            <strong>Savdeep Mehta</strong>
            <span>{dayLabel} {date} August · {slot}</span>
          </div>
        </section>
        <div className="booking-modern-content coach-premium-content">

          <section className="coach-premium-summary">
            <div className="coach-premium-summary-main">
              <span className="coach-premium-summary-label">LESSON</span>
              <strong>{lesson}</strong>
              <span>{dayLabel} {date} August · {slot}</span>
            </div>
            <div className="coach-premium-summary-divider"/>
            <div className="coach-premium-summary-main">
              <span className="coach-premium-summary-label">LOCATION</span>
              <strong>Delhi Golf Club</strong>
              <span>Lodhi Road · 2.1 km</span>
            </div>
          </section>

          <details className="coach-premium-details">
            <summary>Add a note <span>Optional</span></summary>
            <div className="coach-premium-details-body">
              <div className="coach-premium-chips">
                {["Driver","Irons","Short game","Putting","Course strategy"].map(goal=>(
                  <button key={goal} type="button" className={goals.includes(goal)?"selected":""} onClick={()=>toggleGoal(goal)}>{goal}</button>
                ))}
              </div>
              <textarea value={notes} onChange={event=>setNotes(event.target.value)} placeholder="Anything you'd like Savdeep to know?" />
            </div>
          </details>

          <p className="coach-premium-authorise">No charge unless Savdeep accepts</p>
        </div>
      </div>
      <footer className="booking-modern-footer coach-premium-footer">
        <button type="button" className="booking-modern-pay-button" onClick={()=>go("coachRequestSent")}>
          <span>Send request · ₹{total.toLocaleString("en-IN")}</span><Icon name="arrow" size={18}/>
        </button>
      </footer>
    </main>
  )
}

function PendingBadge() {
  return <span className="booking-status pending"><Icon name="clock" size={14} /> Pending</span>
}

function CoachRequestSentScreen({ go }: { go: (screen: CourseFlowScreen) => void }) {
  const [reminders, setReminders] = useState<boolean | null>(null)
  return (
    <main className="screen coach-request-sent-screen">
      <div className="request-sent-mark"><Icon name="check" size={27} /></div>
      <PendingBadge /><h1>Request sent</h1><p>Waiting for Savdeep to accept.</p>
      <div className="request-timeline">{[["Request sent","Complete"],["Coach accepts","Waiting"],["Payment charged","After acceptance"],["Lesson","Fri 21 Aug · 7:00 AM"]].map(([title,note],index) => <div className={index === 0 ? "complete" : ""} key={title}><i>{index === 0 ? <Icon name="check" size={12} /> : index + 1}</i><span><strong>{title}</strong><small>{note}</small></span></div>)}</div>
      <button className="primary-button message-savdeep"><Icon name="message" size={17} /> Message Savdeep</button>
      <button className="secondary-request-button" onClick={() => go("coachBookingPending")}>View request</button>
      <p className="calendar-pending-note"><Icon name="calendar" size={15} /> Add to calendar once confirmed</p>
      {reminders === null ? <div className="notification-primer"><Icon name="bell" /><div><strong>Get notified when Savdeep responds</strong><small>Allow Fore! to send request updates.</small><span><button onClick={() => setReminders(true)}>Allow</button><button onClick={() => setReminders(false)}>Not now</button></span></div></div> : <p className="primer-response">{reminders ? "Request notifications enabled" : "You can enable notifications later"}</p>}
    </main>
  )
}

function CoachBookingDetailScreen({
  go,
  status,
}: {
  go: (screen: CourseFlowScreen) => void
  status: "Pending" | "Confirmed"
}) {
  return (
    <main className="screen booking-detail-screen coach-booking-detail">
      <FlowHeader title="Lesson request" back={() => go(status === "Pending" ? "coachRequestSent" : "coachBookingPending")} />
      <div className={`booking-detail-status ${status.toLowerCase()}`}>{status === "Pending" ? <PendingBadge /> : <ConfirmedBadge />}<h1>{status === "Pending" ? "Waiting for Savdeep" : "Lesson confirmed"}</h1><p>Individual lesson · Fri 21 Aug · 7:00 AM</p></div>
      <div className="detail-summary-card"><div><span><Icon name="user" /></span><p><small>COACH</small><strong>Savdeep Mehta</strong><em>PGA Professional · 4.9</em></p></div><div><span><Icon name="calendar" /></span><p><small>DATE & TIME</small><strong>Friday, 21 August</strong><em>7:00–8:00 AM</em></p></div><div><span><Icon name="pin" /></span><p><small>LOCATION</small><strong>Delhi Golf Club</strong><em>Lodhi Road · 2.1 km</em></p></div><div><span><Icon name="wallet" /></span><p><small>PAYMENT</small><strong>₹1,800</strong><em>{status === "Pending" ? "Authorised · Not charged" : "Charged to arjun@upi"}</em></p></div></div>
      {status === "Pending" ? <div className="booking-manage-actions coach-pending-actions"><button className="primary-button"><Icon name="message" size={16} /> Message coach</button><button>Cancel request · Free</button></div> : <div className="booking-manage-actions"><button className="primary-button"><Icon name="calendar" size={16} /> Add to calendar</button><button className="coach-reschedule-button">Reschedule</button></div>}
    </main>
  )
}

function CoachDeclinedScreen({ go }: { go: (screen: CourseFlowScreen) => void }) {
  return (
    <main className="screen coach-declined-screen">
      <FlowHeader title="Request update" back={() => go("coachBookingPending")} />
      <div className="declined-head"><span><Icon name="close" size={25} /></span><h1>Savdeep couldn’t accept</h1><p>You weren’t charged. Try one of his nearby times or another coach.</p></div>
      <h2>Alternative times with Savdeep</h2>
      <div className="declined-time-chips">{["Fri 9:30 AM","Sat 7:00 AM","Mon 4:00 PM"].map((time) => <button onClick={() => go("coachDateTime")} key={time}>{time}</button>)}</div>
      <h2>Similar coaches</h2>
      <CoachCard name="Neha Arora" rating="4.8" price={1500} onOpen={() => go("coachProfile")} onBook={() => go("coachLesson")} />
      <CoachCard name="Imran Qureshi" rating="4.7" price={2200} onOpen={() => go("coachProfile")} onBook={() => go("coachLesson")} />
    </main>
  )
}

function SearchExperience({
  denied,
  setDenied,
  primerSeen,
  setPrimerSeen,
  close,
  go,
}: {
  denied: boolean
  setDenied: (denied: boolean) => void
  primerSeen: boolean
  setPrimerSeen: (seen: boolean) => void
  close: () => void
  go: (screen: CourseFlowScreen) => void
}) {
  if (!primerSeen && !denied) {
    return (
      <div className="search-experience">
        <button className="search-close" onClick={close}><Icon name="close" /></button>
        <div className="location-primer"><span><Icon name="pin" size={28} /></span><h1>Find golf near you</h1><p>We use your location to show courses near you and estimate travel distance.</p><button className="primary-button" onClick={() => setPrimerSeen(true)}>Use my location</button><button onClick={() => { setPrimerSeen(true); setDenied(true) }}>Not now</button></div>
      </div>
    )
  }
  if (denied) {
    return (
      <div className="search-experience">
        <button className="search-close" onClick={close}><Icon name="close" /></button>
        <div className="city-picker"><span><Icon name="pin" size={25} /></span><h1>Choose your city</h1><p>Location access is off. Select a city to keep searching.</p>{["Delhi", "Gurugram", "Noida", "Faridabad"].map((city) => <button key={city} onClick={() => { close(); go("results") }}><strong>{city}</strong><Icon name="chevron" /></button>)}</div>
      </div>
    )
  }
  return (
    <div className="search-experience">
      <div className="search-overlay-bar"><Icon name="search" /><input autoFocus placeholder="Search golf in Delhi" /><button onClick={close}>Cancel</button></div>
      <div className="suggestion-content">
        <h2>Recent searches</h2><button onClick={() => { close(); go("results") }}><Icon name="clock" /><span><strong>Delhi · Today</strong><small>4 players</small></span><Icon name="chevron" /></button>
        <h2>Courses</h2>{["Delhi Golf Club", "Qutub Golf Course"].map((item) => <button key={item} onClick={() => { close(); go("course") }}><Icon name="flag" /><span><strong>{item}</strong><small>Delhi</small></span><Icon name="chevron" /></button>)}
        <h2>Ranges</h2><button onClick={() => { close(); go("rangeProfile") }}><Icon name="pin" /><span><strong>Delhi Golf Club Range</strong><small>2.8 km · 42 of 60 bays occupied</small></span><Icon name="chevron" /></button>
        <h2>Coaches</h2><button onClick={() => { close(); go("coachProfile") }}><Avatar initials="SM" /><span><strong>Savdeep Mehta</strong><small>PGA Professional · 4.9</small></span><Icon name="chevron" /></button>
      </div>
    </div>
  )
}

function FiltersSheet({ close }: { close: () => void }) {
  const [players, setPlayers] = useState(4)
  const [count, setCount] = useState(24)
  return (
    <div className="sheet-backdrop" onClick={close}>
      <div className="sheet filters-sheet" onClick={(event) => event.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="sheet-title"><span><p className="eyebrow">COURSE FILTERS</p><h2>Refine your search</h2></span><button onClick={close}><Icon name="close" /></button></div>
        <div className="filter-scroll">
          <div className="filter-row"><strong>Date</strong><button>Sat 22 Aug <Icon name="calendar" size={15} /></button></div>
          <div className="filter-row"><span><strong>Players</strong><small>Maximum four</small></span><div className="player-stepper"><button onClick={() => setPlayers(Math.max(1,players-1))}>−</button><b>{players}</b><button onClick={() => setPlayers(Math.min(4,players+1))}>+</button></div></div>
          <FilterChips title="Time of day" items={["Morning","Afternoon","Evening"]} />
          <label className="price-filter"><span><strong>Price range</strong><b>₹1,000 – ₹5,000</b></span><input type="range" min="1000" max="5000" defaultValue="3000" onChange={() => setCount(18)} /></label>
          <FilterChips title="Holes" items={["9 holes","18 holes"]} />
          <FilterChips title="Course type" items={["Public","Member rate"]} />
          <FilterChips title="Amenities" items={["Caddies","Golf carts","Driving range","Club rental"]} />
          <FilterChips title="Rating" items={["4+"]} />
          <FilterChips title="Sort" items={["Recommended","Nearest","Price low-high","Soonest slot"]} />
        </div>
        <div className="filter-footer"><button onClick={() => setCount(24)}>Clear all</button><button className="primary-button" onClick={close}>Show {count} courses</button></div>
      </div>
    </div>
  )
}

function FilterChips({ title, items }: { title: string; items: string[] }) {
  const [selected, setSelected] = useState(items[0])
  return <div className="filter-group"><strong>{title}</strong><div>{items.map((item) => <button className={selected === item ? "selected" : ""} onClick={() => setSelected(item)} key={item}>{item}</button>)}</div></div>
}

function SignInSheet({
  close,
  continuePayment,
}: {
  close: () => void
  continuePayment: () => void
}) {
  return (
    <div className="sheet-backdrop" onClick={close}>
      <div className="sheet sign-in-sheet" onClick={(event) => event.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="sheet-title"><span><p className="eyebrow">YOUR SLOT IS SAVED</p><h2>Sign in to continue</h2></span><button onClick={close}><Icon name="close" /></button></div>
        <p>Your tee time, players, and add-ons will stay exactly as selected.</p>
        <button className="primary-button" onClick={continuePayment}>Sign in and continue</button>
        <button className="sign-up-link" onClick={continuePayment}>Create a Fore! account</button>
      </div>
    </div>
  )
}

function CourseBookingPrototype({
  onModuleStateChange,
  initialSection,
  searchRequest,
}: {
  onModuleStateChange: (active: boolean, section?: DiscoverSection) => void
  initialSection: DiscoverSection
  searchRequest: number
}) {
  const initialScreen: CourseFlowScreen =
    initialSection === "Ranges" ? "rangeDiscover" :
    initialSection === "Coaches" ? "coachDiscover" : "discover"
  const initialMode = initialSection === "Ranges" ? "ranges" : initialSection === "Coaches" ? "coaches" : "courses"
  const [screen, setScreen] = useState<CourseFlowScreen>(initialScreen)
  const [mode, setMode] = useState<"courses" | "ranges" | "coaches">(initialMode)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [locationDenied, setLocationDenied] = useState(false)
  const [locationPrimerSeen, setLocationPrimerSeen] = useState(false)
  const [resultsState, setResultsState] = useState<"ready" | "empty" | "offline">("ready")
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingStep, setBookingStep] = useState<BookingStep>("select")
  const [bookingCourse, setBookingCourse] = useState<BookingCourse>(delhiCourse)
  const [selectedSlot, setSelectedSlot] = useState("")
  const [courseDate, setCourseDate] = useState("")
  const [courseCaddyMode, setCourseCaddyMode] = useState<"auto" | "own" | "none">("none")
  const [courseCartCount, setCourseCartCount] = useState(0)
  const [holdSeconds, setHoldSeconds] = useState(600)
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [paymentState, setPaymentState] = useState<PaymentState>("methods")
  const [paymentTarget, setPaymentTarget] = useState<"course" | "range">("course")
  const [coursePaymentMethod, setCoursePaymentMethod] = useState("UPI App")
  const [rangeState, setRangeState] = useState<RangeAvailabilityState>("ready")
  const [rangeTime, setRangeTime] = useState("")
  const [rangeDuration, setRangeDuration] = useState(90)
  const [rangeBayType, setRangeBayType] = useState<"Standard" | "Launch monitor">("Standard")
  const [rangeBucket, setRangeBucket] = useState(true)
  const [rangeBookingOpen, setRangeBookingOpen] = useState(false)
  const [rangeBookingStep, setRangeBookingStep] = useState<BookingStep>("select")
  const [rangeBookingDate, setRangeBookingDate] = useState("")
  const [rangeBucketCount, setRangeBucketCount] = useState(0)
  const [rangePaymentMethod, setRangePaymentMethod] = useState("UPI")
  const [rangeCredits, setRangeCredits] = useState(false)
  const [coachDiscoverState, setCoachDiscoverState] = useState<CoachDiscoverState>("ready")
  const [coachAvailabilityState, setCoachAvailabilityState] = useState<CoachAvailabilityState>("ready")
  const [coachLesson, setCoachLesson] = useState("")
  const [coachDate, setCoachDate] = useState("21")
  const [coachSlot, setCoachSlot] = useState("")
  const [coachGoals, setCoachGoals] = useState<string[]>([])
  const [coachNotes, setCoachNotes] = useState("")

  useEffect(() => {
    if (screen !== "rangeCheckout" || holdSeconds <= 0) return
    const timer = window.setInterval(() => setHoldSeconds((value) => Math.max(0, value - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [screen, holdSeconds])

  useEffect(() => {
    if (!bookingOpen || bookingStep !== "payment") return
    const timer = window.setTimeout(() => {
      setBookingOpen(false)
      setScreen("confirmation")
    }, 2000)
    return () => window.clearTimeout(timer)
  }, [bookingOpen, bookingStep])

  useEffect(() => {
    document.querySelector(".scroll-area")?.scrollTo({ top: 0, behavior: "smooth" })
  }, [screen])

  useEffect(() => {
    if (searchRequest > 0) setSearchOpen(true)
  }, [searchRequest])

  useEffect(() => {
    const active = screen !== "discover" || bookingOpen || filtersOpen || searchOpen || paymentOpen
    const section: DiscoverSection = screen.startsWith("range") ? "Ranges" : screen.startsWith("coach") ? "Coaches" : "Courses"
    onModuleStateChange(active, section)
  }, [screen, bookingOpen, filtersOpen, searchOpen, paymentOpen, onModuleStateChange])

  const go = (next: CourseFlowScreen) => {
    setScreen(next)
    if (next === "discover") setMode("courses")
  }
  const openRangeBooking = () => {
    setRangeBookingDate("")
    setRangeBucketCount(0)
    setRangePaymentMethod("UPI")
    setRangeBookingStep("select")
    setRangeBookingOpen(true)
  }

  const openBooking = (course: BookingCourse, slot?: string) => {
    setBookingCourse(course)
    setCourseDate(slot ? "Sat 22" : "")
    setSelectedSlot(slot ?? "")
    setCourseCaddyMode("none")
    setCourseCartCount(0)
    setCoursePaymentMethod("UPI")
    setBookingStep("select")
    setBookingOpen(true)
    setHoldSeconds(600)
  }
  const courseCaddyCost = courseCaddyMode === "auto" ? 320 : 0
  const courseCaddySummary = courseCaddyMode === "auto" ? "Auto-assigned caddy" : courseCaddyMode === "own" ? "I have my own caddy" : "Caddy not added"

  return (
    <>
      {screen === "discover" && <DiscoverCourses go={go} openFilters={() => setFiltersOpen(true)} openSearch={() => setSearchOpen(true)} openBooking={openBooking} mode={mode} setMode={setMode} />}
      {screen === "results" && <ResultsScreen go={go} openFilters={() => setFiltersOpen(true)} state={resultsState} setState={setResultsState} openBooking={openBooking} />}
      {screen === "course" && <CourseProfileScreen go={go} openBooking={openBooking} />}
      {screen === "confirmation" && <ConfirmationScreen go={go} course={bookingCourse} date={courseDate} time={selectedSlot} caddy={courseCaddySummary} cartCount={courseCartCount} total={bookingCourse.price + courseCaddyCost + courseCartCount * 800} />}
      {screen === "bookings" && <MyBookingsScreen go={go} />}
      {screen === "bookingDetail" && <BookingDetailScreen go={go} />}
      {screen === "rangeDiscover" && <RangeDiscoverScreen go={go} openSearch={() => setSearchOpen(true)} setMode={setMode} openRangeBooking={openRangeBooking} />}
      {screen === "rangeProfile" && <RangeProfileScreen go={go} openRangeBooking={openRangeBooking} />}
      {screen === "rangeSelect" && <RangeSelectScreen go={go} time={rangeTime} setTime={setRangeTime} duration={rangeDuration} setDuration={setRangeDuration} bayType={rangeBayType} setBayType={setRangeBayType} bucket={rangeBucket} setBucket={setRangeBucket} state={rangeState} setState={setRangeState} />}
      {screen === "rangeCheckout" && <RangeCheckoutScreen go={go} time={rangeTime} duration={rangeDuration} bayType={rangeBayType} bucket={rangeBucket} setBucket={setRangeBucket} credits={rangeCredits} setCredits={setRangeCredits} holdSeconds={holdSeconds} openPayment={() => { setPaymentTarget("range"); setPaymentState(holdSeconds === 0 ? "expired" : "methods"); setPaymentOpen(true) }} />}
      {screen === "rangeConfirmation" && <RangeConfirmationScreen go={go} date={rangeBookingDate} bucketCount={rangeBucketCount} />}
      {screen === "rangeDetail" && <RangeBookingDetailScreen go={go} date={rangeBookingDate} bucketCount={rangeBucketCount} />}
      {screen === "coachDiscover" && <CoachDiscoverScreen go={go} state={coachDiscoverState} setState={setCoachDiscoverState} setMode={setMode} openSearch={() => setSearchOpen(true)} />}
      {screen === "coachProfile" && <CoachProfileScreen go={go} connectionStatus={connectionStatus} onConnect={onConnect} />}
      {screen === "coachLesson" && <CoachLessonTypeScreen go={go} lesson={coachLesson} setLesson={setCoachLesson} />}
      {screen === "coachDateTime" && <CoachDateTimeScreen go={go} date={coachDate} setDate={setCoachDate} slot={coachSlot} setSlot={setCoachSlot} state={coachAvailabilityState} setState={setCoachAvailabilityState} />}
      {screen === "coachCheckout" && <CoachCheckoutScreen go={go} lesson={coachLesson} date={coachDate} slot={coachSlot} goals={coachGoals} toggleGoal={(goal) => setCoachGoals((items) => items.includes(goal) ? items.filter((item) => item !== goal) : [...items, goal])} notes={coachNotes} setNotes={setCoachNotes} />}
      {screen === "coachRequestSent" && <CoachRequestSentScreen go={go} />}
      {screen === "coachBookingPending" && <CoachBookingDetailScreen go={go} status="Pending" />}
      {screen === "coachBookingConfirmed" && <CoachBookingDetailScreen go={go} status="Confirmed" />}
      {screen === "coachDeclined" && <CoachDeclinedScreen go={go} />}
      {rangeBookingOpen && <RangeBookingFlowModal step={rangeBookingStep} setStep={setRangeBookingStep} date={rangeBookingDate} setDate={setRangeBookingDate} bucketCount={rangeBucketCount} setBucketCount={setRangeBucketCount} paymentMethod={rangePaymentMethod} setPaymentMethod={setRangePaymentMethod} close={() => setRangeBookingOpen(false)} complete={() => { setRangeBookingOpen(false); setScreen("rangeConfirmation") }} />}
      {bookingOpen && <BookingFlowModal course={bookingCourse} step={bookingStep} setStep={setBookingStep} date={courseDate} setDate={setCourseDate} time={selectedSlot} setTime={setSelectedSlot} caddyMode={courseCaddyMode} setCaddyMode={setCourseCaddyMode} cartCount={courseCartCount} setCartCount={setCourseCartCount} paymentMethod={coursePaymentMethod} setPaymentMethod={setCoursePaymentMethod} close={() => setBookingOpen(false)} pay={() => setBookingStep("payment")} />}
      {filtersOpen && <FiltersSheet close={() => { setFiltersOpen(false); setResultsState("ready"); go("results") }} />}
      {searchOpen && <SearchExperience denied={locationDenied} setDenied={setLocationDenied} primerSeen={locationPrimerSeen} setPrimerSeen={setLocationPrimerSeen} close={() => setSearchOpen(false)} go={go} />}
      {paymentOpen && <PaymentSheet state={paymentState} setState={setPaymentState} close={() => setPaymentOpen(false)} succeed={() => { setPaymentOpen(false); go(paymentTarget === "range" ? "rangeConfirmation" : "confirmation") }} recheck={() => { setPaymentOpen(false); setRangeState("ready"); go("rangeSelect") }} />}
    </>
  )
}

function Play({
  onModuleStateChange,
}: {
  onModuleStateChange: (active: boolean) => void
}) {
  const [tracking, setTracking] = useState(false)

  useEffect(() => {
    onModuleStateChange(tracking)
  }, [tracking, onModuleStateChange])
  const [hole, setHole] = useState(1)
  const [score, setScore] = useState(4)
  if (tracking) {
    return (
      <main className="screen round-screen">
        <div className="round-top">
          <button onClick={() => setTracking(false)}>Finish later</button>
          <span>Delhi Golf Club</span>
          <button>•••</button>
        </div>
        <div className="hole-heading">
          <span>HOLE</span>
          <strong>{hole}</strong>
          <small>PAR 4 · 389 YDS</small>
        </div>
        <div className="hole-map">
          <img src={photos.course} alt="Fairway overview" />
          <span className="distance-pill">214 yds to pin</span>
        </div>
        <div className="score-panel">
          <p>Score</p>
          <div className="score-stepper">
            <button onClick={() => setScore(Math.max(1, score - 1))}>−</button>
            <strong>{score}</strong>
            <button onClick={() => setScore(score + 1)}>+</button>
          </div>
          <div className="shot-pills">
            <button>Fairway</button>
            <button>GIR</button>
            <button>2 putts</button>
          </div>
          <button
            className="primary-button"
            onClick={() => {
              setHole(Math.min(18, hole + 1))
              setScore(4)
            }}
          >
            Save hole · Next <Icon name="arrow" size={17} />
          </button>
        </div>
      </main>
    )
  }
  return (
    <main className="screen">
      <div className="page-title">
        <p className="eyebrow">PERFORMANCE</p>
        <h1>Your game</h1>
        <p>Track rounds. See where every shot is going.</p>
      </div>
      <button
        className="primary-button start-round"
        onClick={() => setTracking(true)}
      >
        <Icon name="flag" size={18} /> Start a round
      </button>
      <div className="sg-card">
        <div className="sg-head">
          <span>
            <small>STROKES GAINED</small>
            <strong>−2.4</strong>
            <em>vs 10 handicap</em>
          </span>
          <span className="trend-badge">+1.2</span>
        </div>
        <div className="sg-bars">
          {[
            ["Off tee", 72, "+0.4"],
            ["Approach", 48, "−0.8"],
            ["Short game", 34, "−1.4"],
            ["Putting", 56, "−0.6"],
          ].map(([label, width, value]) => (
            <div key={label}>
              <span>{label}</span>
              <i>
                <b style={{ width: `${width}%` }} />
              </i>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>
      <SectionHeading title="Recent rounds" action="All rounds" />
      {[
        ["Delhi Golf Club", "18 Aug · 18 holes", "91", "+19"],
        ["Noida Golf Course", "10 Aug · 18 holes", "89", "+17"],
        ["Qutab Golf Course", "02 Aug · 9 holes", "44", "+8"],
      ].map((round) => (
        <button className="round-row" key={round[0]}>
          <span>
            <strong>{round[0]}</strong>
            <small>{round[1]}</small>
          </span>
          <span>
            <strong>{round[2]}</strong>
            <small>{round[3]}</small>
          </span>
          <Icon name="chevron" size={17} />
        </button>
      ))}
    </main>
  )
}

function Improve() {
  const [completed, setCompleted] = useState(false)
  return (
    <main className="screen">
      <div className="page-title">
        <p className="eyebrow">PRACTICE</p>
        <h1>Keep getting better</h1>
        <p>Your plan, feedback and progress in one place.</p>
      </div>
      <div className="plan-card">
        <div className="plan-top">
          <span>
            <small>THIS WEEK</small>
            <strong>2 of 4 sessions</strong>
          </span>
          <b>50%</b>
        </div>
        <div className="progress">
          <i />
        </div>
        <p>1h 20m completed · 55m remaining</p>
      </div>
      <SectionHeading title="Up next" action="View plan" />
      <div className={`drill-card ${completed ? "complete" : ""}`}>
        <div className="drill-icon">
          <Icon name={completed ? "check" : "flag"} />
        </div>
        <div>
          <small>PUTTING · 10 MIN</small>
          <h3>Gate putting</h3>
          <p>10 attempts · Target 8/10</p>
        </div>
        <button onClick={() => setCompleted(!completed)}>
          {completed ? "Done" : "Start"}
        </button>
      </div>
      <div className="drill-card">
        <div className="drill-icon">
          <Icon name="spark" />
        </div>
        <div>
          <small>SWING · 15 MIN</small>
          <h3>Slow takeaway</h3>
          <p>3 sets of 8 balls</p>
        </div>
        <button>Start</button>
      </div>
      <SectionHeading title="Swing feedback" action="Library" />
      <button className="video-card">
        <div className="video-thumb">
          <img src={photos.golfer} alt="Golfer working on their swing" />
          <span>
            <Icon name="video" size={20} />
          </span>
          <small>0:42</small>
        </div>
        <div>
          <small>NEW FEEDBACK</small>
          <strong>Driver · takeaway & transition</strong>
          <p>Savdeep added 3 frames and a voice note</p>
        </div>
      </button>
    </main>
  )
}

function Profile({ role, onSwitch }: { role: Role; onSwitch: () => void }) {
  return (
    <main className="screen">
      <div className="profile-head">
        <Avatar initials={role === "golfer" ? "AK" : "AR"} />
        <h1>{role === "golfer" ? "Alex Kapoor" : "Arjun Rao"}</h1>
        <p>
          {role === "golfer" ? "Amateur · HCP 14.2" : "PGA Coach · 12 years"}
        </p>
        <button>Edit profile</button>
      </div>
      <div className="profile-stats">
        {role === "golfer" ? (
          <>
            <div>
              <strong>37</strong>
              <span>Rounds</span>
            </div>
            <div>
              <strong>14.2</strong>
              <span>Handicap</span>
            </div>
            <div>
              <strong>4.8</strong>
              <span>Rating</span>
            </div>
          </>
        ) : (
          <>
            <div>
              <strong>18</strong>
              <span>Students</span>
            </div>
            <div>
              <strong>4.8</strong>
              <span>Rating</span>
            </div>
            <div>
              <strong>340+</strong>
              <span>Lessons</span>
            </div>
          </>
        )}
      </div>
      <div className="settings-list">
        <button>
          <span className="setting-icon">
            <Icon name="wallet" />
          </span>
          <span>
            <strong>Payments & wallet</strong>
            <small>
              {role === "golfer"
                ? "₹1,740 available credit"
                : "₹8,200 pending payout"}
            </small>
          </span>
          <Icon name="chevron" />
        </button>
        <button>
          <span className="setting-icon">
            <Icon name="message" />
          </span>
          <span>
            <strong>Messages</strong>
            <small>2 unread conversations</small>
          </span>
          <Icon name="chevron" />
        </button>
        <button onClick={onSwitch}>
          <span className="setting-icon">
            <Icon name="switch" />
          </span>
          <span>
            <strong>Switch to {role === "golfer" ? "Coach" : "Golfer"}</strong>
            <small>Preview the other side of Fore</small>
          </span>
          <Icon name="chevron" />
        </button>
      </div>
    </main>
  )
}

const students = [
  {
    initials: "MP",
    name: "Meera Pillai",
    meta: "HCP 6.4 · 2 open tasks",
    status: "Review due",
  },
  {
    initials: "AN",
    name: "Aditya Nair",
    meta: "HCP 11.8 · Lesson Sat",
    status: "On track",
  },
  {
    initials: "DI",
    name: "Divya Iyer",
    meta: "Junior · 1 open task",
    status: "On track",
  },
  {
    initials: "AK",
    name: "Ananya Kapoor",
    meta: "HCP 18.2 · 3 open tasks",
    status: "Needs plan",
  },
]

function CoachDashboardHome({go}:{go:(tab:CoachTab)=>void}){return <main className="screen coach-home-screen"><div className="coach-welcome-row"><p className="eyebrow">THURSDAY, 20 AUGUST</p><h1>Good morning, Arjun</h1><p className="coach-home-sub">Here is what needs your attention today.</p></div><div className="coach-summary"><button onClick={()=>go("schedule")}><small>TODAY</small><strong>4 lessons</strong><span>Next at 8:00 AM</span></button><button onClick={()=>go("students")}><small>STUDENTS</small><strong>18 active</strong><span>5 plans running</span></button><button onClick={()=>go("schedule")}><small>OPEN SLOTS</small><strong>6 available</strong><span>Across this week</span></button></div><SectionHeading title="Next up" action="Full schedule" onAction={()=>go("schedule")}/><button className="lesson-card coach-next-lesson" onClick={()=>go("students")}><div className="time-block"><strong>8:00</strong><small>AM</small></div><div><small>60 MIN · SHORT GAME</small><h3>Meera Pillai</h3><p>Delhi Golf Club · Practice green</p></div><span className="coach-lesson-arrow"><Icon name="chevron" size={18}/></span></button><SectionHeading title="Needs your attention" action="View students" onAction={()=>go("students")}/><div className="coach-attention-stack"><button className="attention-card" onClick={()=>go("students")}><span className="attention-icon"><Icon name="clipboard"/></span><span><small>PRACTICE RESULT</small><strong>Meera completed Gate Putting</strong><em>9/10 · Personal best · Review and respond</em></span><Icon name="chevron"/></button><button className="attention-card" onClick={()=>go("students")}><span className="attention-icon blue"><Icon name="video"/></span><span><small>NEW SWING VIDEO</small><strong>Aditya uploaded Driver — DTL</strong><em>Received 42 minutes ago</em></span><Icon name="chevron"/></button><button className="attention-card" onClick={()=>go("schedule")}><span className="attention-icon amber"><Icon name="bell"/></span><span><small>SESSION REQUEST</small><strong>3 requests need a response</strong><em>Review times and confirm a slot</em></span><Icon name="chevron"/></button></div><SectionHeading title="Today's schedule" action="Open" onAction={()=>go("schedule")}/><div className="timeline coach-home-timeline">{[["8:00","Meera Pillai","Short game · DGC"],["10:30","Karan Mehta","Swing lesson · KGA"],["14:00","Divya Iyer","Junior lesson · DGC"],["16:30","Open slot","Available to book"]].map((item,i)=><button className={i===3?"open":""} key={item[0]} onClick={()=>go("schedule")}><time>{item[0]}</time><i/><span><strong>{item[1]}</strong><small>{item[2]}</small></span><Icon name="chevron" size={15}/></button>)}</div></main>}

type CoachScheduleView="day"|"week"|"month"
type CoachScheduleEvent={id:string;date:string;start:string;duration:number;student:string;initials:string;type:string;location:string;status:"confirmed"|"request"|"completed"}
type CoachOpenSlot={date:string;start:string;duration:number}
const COACH_SCHEDULE_EVENTS:CoachScheduleEvent[]=[{id:"c1",date:"2026-08-20",start:"08:00",duration:60,student:"Meera Pillai",initials:"MP",type:"Short Game",location:"Delhi Golf Club",status:"confirmed"},{id:"c2",date:"2026-08-20",start:"10:30",duration:60,student:"Karan Mehta",initials:"KM",type:"Swing Lesson",location:"KGA",status:"confirmed"},{id:"c3",date:"2026-08-20",start:"14:00",duration:45,student:"Divya Iyer",initials:"DI",type:"Junior Lesson",location:"Delhi Golf Club",status:"confirmed"},{id:"c4",date:"2026-08-20",start:"16:30",duration:60,student:"",initials:"",type:"Open Slot",location:"KGA",status:"confirmed"},{id:"c5",date:"2026-08-21",start:"07:00",duration:60,student:"Aditya Nair",initials:"AN",type:"Swing Fix",location:"KGA",status:"confirmed"},{id:"c6",date:"2026-08-21",start:"11:00",duration:60,student:"",initials:"",type:"Open Slot",location:"Delhi Golf Club",status:"confirmed"},{id:"c7",date:"2026-08-22",start:"08:30",duration:60,student:"Rohit Jain",initials:"RJ",type:"Trial Lesson",location:"KGA",status:"request"},{id:"c8",date:"2026-08-22",start:"13:00",duration:60,student:"",initials:"",type:"Open Slot",location:"KGA",status:"confirmed"},{id:"c9",date:"2026-08-23",start:"09:00",duration:45,student:"Priya Sharma",initials:"PS",type:"Putting",location:"Prestige GC",status:"confirmed"},{id:"c10",date:"2026-08-24",start:"08:00",duration:60,student:"Ananya Kapoor",initials:"AK",type:"Approach Play",location:"Qutab Golf Course",status:"confirmed"},{id:"c11",date:"2026-08-25",start:"10:00",duration:60,student:"Vikram Singh",initials:"VS",type:"Full Swing",location:"Delhi Golf Club",status:"completed"},{id:"c12",date:"2026-08-26",start:"16:00",duration:60,student:"Aditya Nair",initials:"AN",type:"Driver Speed",location:"KGA",status:"confirmed"}]
const COACH_OPEN_SLOTS:CoachOpenSlot[]=[{date:"2026-08-21",start:"09:00",duration:60},{date:"2026-08-22",start:"13:00",duration:60},{date:"2026-08-23",start:"11:00",duration:60},{date:"2026-08-24",start:"10:00",duration:60},{date:"2026-08-25",start:"14:00",duration:60},{date:"2026-08-26",start:"09:00",duration:60}]
function coachDateKey(d:Date){return d.toISOString().slice(0,10)}function coachAddDays(d:Date,n:number){const x=new Date(d);x.setDate(x.getDate()+n);return x}function coachTimeToMinutes(v:string){const[a,b]=v.split(":").map(Number);return a*60+b}function coachFormatTime(v:string){const[a,b]=v.split(":").map(Number),s=a>=12?"PM":"AM",h=a%12||12;return b?h+":"+String(b).padStart(2,"0")+" "+s:h+" "+s}function coachFormatDate(d:Date){return d.toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short"})}
function CoachSchedule({go}:{go:(tab:CoachTab)=>void}){const[view,setView]=useState<CoachScheduleView>("day"),[selectedDate,setSelectedDate]=useState("2026-08-20"),[weekOffset,setWeekOffset]=useState(0),[monthOffset,setMonthOffset]=useState(0),[sheet,setSheet]=useState<"add"|"requests"|"event"|null>(null),[selectedEvent,setSelectedEvent]=useState<CoachScheduleEvent|null>(null),[draftDate,setDraftDate]=useState("2026-08-20"),[draftTime,setDraftTime]=useState("09:00"),[draftStudent,setDraftStudent]=useState("Meera Pillai"),[draftType,setDraftType]=useState("Lesson"),[events,setEvents]=useState(COACH_SCHEDULE_EVENTS),[openSlots,setOpenSlots]=useState(COACH_OPEN_SLOTS)
const selected=new Date(selectedDate+"T12:00:00"),dayEvents=events.filter(e=>e.date===selectedDate),requests=events.filter(e=>e.status==="request"),weekStart=coachAddDays(new Date("2026-08-17T12:00:00"),weekOffset*7),weekDates=Array.from({length:7},(_,i)=>coachAddDays(weekStart,i)),monthDate=new Date(2026,7+monthOffset,1),monthDays=new Date(monthDate.getFullYear(),monthDate.getMonth()+1,0).getDate(),monthStartDay=(monthDate.getDay()+6)%7
const openAdd=(date=selectedDate,time="09:00")=>{setDraftDate(date);setDraftTime(time);setSheet("add")}
const addSession=()=>{const s=students.find(x=>x.name===draftStudent);setEvents(c=>[...c,{id:"new-"+Date.now(),date:draftDate,start:draftTime,duration:60,student:draftStudent,initials:s?.initials||"NS",type:draftType,location:"Delhi Golf Club",status:"confirmed"}]);setSheet(null)}
const openEvent=(e:CoachScheduleEvent)=>{if(!e.student){openAdd(e.date,e.start);return}setSelectedEvent(e);setSheet("event")}
const toggleOpenSlot=(date:string,start:string)=>setOpenSlots(c=>c.some(s=>s.date===date&&s.start===start)?c.filter(s=>!(s.date===date&&s.start===start)):[...c,{date,start,duration:60}])
const updateEvent=(status:"confirmed"|"completed")=>{if(!selectedEvent)return;setEvents(c=>c.map(e=>e.id===selectedEvent.id?{...e,status}:e));setSelectedEvent(c=>c?{...c,status}:c)}
const renderDayStrip=()=> <div className="coach-date-strip">{Array.from({length:7},(_,i)=>{const d=coachAddDays(selected,i-3),k=coachDateKey(d);return <button key={k} className={k===selectedDate?"selected":""} onClick={()=>setSelectedDate(k)}><small>{d.toLocaleDateString("en-IN",{weekday:"short"}).toUpperCase()}</small><strong>{d.getDate()}</strong></button>})}</div>
const renderDay=()=> <>{renderDayStrip()}<div className="coach-day-caption"><span>{coachFormatDate(selected)}</span><button onClick={()=>openAdd()}>+ Add</button></div><div className="coach-day-timeline">{Array.from({length:13},(_,i)=>{const h=7+i,t=String(h).padStart(2,"0")+":00";return <div key={t} className="coach-hour-row"><span>{coachFormatTime(t)}</span><i/></div>})}{dayEvents.map(e=>{const top=(coachTimeToMinutes(e.start)-420)/60*58,height=Math.max(54,e.duration/60*58-5);return <button key={e.id} className={"coach-schedule-event "+(e.status==="request"?"request ":e.status==="completed"?"completed":"")} style={{top,height}} onClick={()=>openEvent(e)}><strong>{e.student||"Open slot"}</strong><small>{coachFormatTime(e.start)} · {e.type}</small><em>{e.location}</em></button>})}</div></>
const renderWeek=()=> <><div className="coach-week-controls"><button onClick={()=>setWeekOffset(v=>v-1)}>‹</button><strong>{coachFormatDate(weekDates[0])} – {coachFormatDate(weekDates[6])}</strong><button onClick={()=>setWeekOffset(v=>v+1)}>›</button></div><div className="coach-week-grid"><div className="coach-week-times">{Array.from({length:13},(_,i)=><span key={i}>{coachFormatTime(String(7+i).padStart(2,"0")+":00")}</span>)}</div><div className="coach-week-days">{weekDates.map(d=>{const k=coachDateKey(d),items=events.filter(e=>e.date===k),slots=openSlots.filter(s=>s.date===k);return <div className="coach-week-day" key={k}><button className={k===selectedDate?"selected":""} onClick={()=>{setSelectedDate(k);setView("day")}}><small>{d.toLocaleDateString("en-IN",{weekday:"short"}).toUpperCase()}</small><strong>{d.getDate()}</strong></button><div className="coach-week-column">{Array.from({length:13},(_,i)=><i key={i} style={{top:i*58}} onClick={()=>openAdd(k,String(7+i).padStart(2,"0")+":00")}/>)}{slots.map(s=>{const top=(coachTimeToMinutes(s.start)-420)/60*58;return <button key={s.date+"-"+s.start} className="coach-week-open" style={{top}} onClick={()=>toggleOpenSlot(s.date,s.start)}>Open</button>})}{items.map(e=>{const top=(coachTimeToMinutes(e.start)-420)/60*58;return <button key={e.id} className={"coach-week-event "+(e.status==="request"?"request ":e.status==="completed"?"completed":"")} style={{top}} onClick={()=>openEvent(e)}>{e.student||"Open"}<small>{coachFormatTime(e.start)}</small></button>})}</div></div>})}</div></div><div className="coach-schedule-legend"><span><i className="confirmed"/> Confirmed</span><span><i className="completed"/> Completed</span><span><i className="request"/> Request</span><span><i className="open"/> Open</span></div><p className="coach-schedule-hint">Tap a time to add a lesson. Tap an Open slot to close or reopen availability.</p></>
const renderMonth=()=>{const cells:React.ReactNode[]=[];for(let i=0;i<monthStartDay;i++)cells.push(<span className="coach-month-empty" key={"e-"+i}/>);for(let d=1;d<=monthDays;d++){const x=new Date(monthDate.getFullYear(),monthDate.getMonth(),d),k=coachDateKey(x),count=events.filter(e=>e.date===k&&e.student).length;cells.push(<button key={k} className={k===selectedDate?"selected":""} onClick={()=>{setSelectedDate(k);setView("day")}}><strong>{d}</strong>{count>0&&<i>{count}</i>}</button>)}return <><div className="coach-month-controls"><button onClick={()=>setMonthOffset(v=>v-1)}>‹</button><strong>{monthDate.toLocaleDateString("en-IN",{month:"long",year:"numeric"})}</strong><button onClick={()=>setMonthOffset(v=>v+1)}>›</button></div><div className="coach-month-weekdays">{["M","T","W","T","F","S","S"].map((d,i)=><span key={d+i}>{d}</span>)}</div><div className="coach-month-grid">{cells}</div><div className="coach-month-agenda"><div><strong>{coachFormatDate(selected)}</strong><button onClick={()=>openAdd(selectedDate)}>+ Add</button></div>{events.filter(e=>e.date===selectedDate&&e.student).map(e=><button key={e.id} onClick={()=>openEvent(e)}><span><strong>{e.student}</strong><small>{coachFormatTime(e.start)} · {e.type}</small></span><em>{e.status==="request"?"Request":e.location}</em></button>)}{!events.some(e=>e.date===selectedDate&&e.student)&&<p>No lessons scheduled.</p>}</div></>}
return <main className="screen coach-schedule-screen"><div className="page-title page-title-action"><span><p className="eyebrow">COACHING</p><h1>Schedule</h1><p>{dayEvents.filter(e=>e.student).length} lessons · {requests.length} requests</p></span><div className="coach-schedule-actions"><button onClick={()=>setSheet("requests")} aria-label="Session requests"><Icon name="bell" size={18}/>{requests.length>0&&<b>{requests.length}</b>}</button><button onClick={()=>openAdd()} aria-label="Add session"><Icon name="plus" size={18}/></button></div></div><div className="segment coach-schedule-segment">{(["day","week","month"] as CoachScheduleView[]).map(x=><button key={x} className={view===x?"active":""} onClick={()=>setView(x)}>{x[0].toUpperCase()+x.slice(1)}</button>)}</div>{view==="day"&&renderDay()}{view==="week"&&renderWeek()}{view==="month"&&renderMonth()}
{sheet==="add"&&<div className="sheet-backdrop" onClick={()=>setSheet(null)}><div className="sheet coach-schedule-sheet" onClick={e=>e.stopPropagation()}><div className="sheet-handle"/><div className="sheet-title"><span><p className="eyebrow">NEW SESSION</p><h2>Add to schedule</h2></span><button onClick={()=>setSheet(null)}><Icon name="close"/></button></div><label><span>Date</span><input type="date" value={draftDate} onChange={e=>setDraftDate(e.target.value)}/></label><label><span>Time</span><input type="time" value={draftTime} onChange={e=>setDraftTime(e.target.value)}/></label><label><span>Student</span><select value={draftStudent} onChange={e=>setDraftStudent(e.target.value)}>{students.map(s=><option key={s.name}>{s.name}</option>)}</select></label><label><span>Session type</span><select value={draftType} onChange={e=>setDraftType(e.target.value)}><option>Lesson</option><option>Playing lesson</option><option>Assessment</option><option>Video review</option></select></label><button className="primary-button" onClick={addSession}>Add session</button></div></div>}
{sheet==="requests"&&<div className="sheet-backdrop" onClick={()=>setSheet(null)}><div className="sheet coach-schedule-sheet" onClick={e=>e.stopPropagation()}><div className="sheet-handle"/><div className="sheet-title"><span><p className="eyebrow">INBOX</p><h2>Session requests</h2></span><button onClick={()=>setSheet(null)}><Icon name="close"/></button></div>{requests.map(e=><div className="coach-request-row" key={e.id}><Avatar initials={e.initials}/><span><strong>{e.student}</strong><small>{e.type} · {coachFormatDate(new Date(e.date+"T12:00:00"))} · {coachFormatTime(e.start)}</small><em>{e.location}</em></span><div><button className="primary-button" onClick={()=>setEvents(c=>c.map(x=>x.id===e.id?{...x,status:"confirmed"}:x))}>Accept</button><button onClick={()=>setEvents(c=>c.filter(x=>x.id!==e.id))}>Decline</button></div></div>)}{requests.length===0&&<p className="empty-state-copy">No outstanding requests.</p>}</div></div>}
{sheet==="event"&&selectedEvent&&<div className="sheet-backdrop" onClick={()=>setSheet(null)}><div className="sheet coach-schedule-sheet" onClick={e=>e.stopPropagation()}><div className="sheet-handle"/><div className="sheet-title"><span><p className="eyebrow">{selectedEvent.status==="request"?"SESSION REQUEST":"SCHEDULED SESSION"}</p><h2>{selectedEvent.student}</h2></span><button onClick={()=>setSheet(null)}><Icon name="close"/></button></div><div className="coach-event-summary"><span><small>DATE</small><strong>{coachFormatDate(new Date(selectedEvent.date+"T12:00:00"))}</strong></span><span><small>TIME</small><strong>{coachFormatTime(selectedEvent.start)}</strong></span><span><small>TYPE</small><strong>{selectedEvent.type}</strong></span><span><small>LOCATION</small><strong>{selectedEvent.location}</strong></span></div><div className="coach-event-actions">{selectedEvent.status==="request"?<><button className="primary-button" onClick={()=>{setEvents(c=>c.map(x=>x.id===selectedEvent.id?{...x,status:"confirmed"}:x));setSheet(null)}}>Accept request</button><button onClick={()=>{setEvents(c=>c.filter(x=>x.id!==selectedEvent.id));setSheet(null)}}>Decline request</button></>:<><button className="primary-button" onClick={()=>setEvents(c=>c.map(x=>x.id===selectedEvent.id?{...x,status:"completed"}:x))}>{selectedEvent.status==="completed"?"Completed":"Mark completed"}</button><button onClick={()=>{setSheet(null);go("students")}}>Open student profile</button></>}</div></div></div>}</main>}
function Students({openStudent,connectionStatus,onAccept,onDecline}:{openStudent:()=>void;connectionStatus:ConnectionStatus;onAccept:()=>void;onDecline:()=>void}){const[query,setQuery]=useState("");const filtered=useMemo(()=>students.filter(x=>x.name.toLowerCase().includes(query.toLowerCase())),[query]);return <main className="screen"><div className="page-title page-title-action"><span><p className="eyebrow">COACHING</p><h1>Students</h1><p>18 active · 5 packages</p></span><button><Icon name="plus" size={18}/></button></div>{connectionStatus==="pending"&&<section className="connection-request-card"><div className="connection-request-head"><Avatar initials="AK"/><span><small>NEW CONNECTION REQUEST</small><strong>Alex Kapoor</strong><em>Amateur · HCP 14.2</em></span><span className="connection-badge pending">Pending</span></div><p>Alex wants to connect for ongoing coaching and practice support.</p><div className="connection-request-actions"><button onClick={onDecline}>Decline</button><button className="primary-button" onClick={onAccept}>Accept connection</button></div></section>}{connectionStatus==="connected"&&<section className="connection-request-card connected"><div className="connection-request-head"><Avatar initials="AK"/><span><small>CONNECTED STUDENT</small><strong>Alex Kapoor</strong><em>Amateur · HCP 14.2 · New student</em></span><span className="connection-badge"><Icon name="check" size={13}/> Connected</span></div><button className="connection-inline-action" onClick={openStudent}>Open student profile <Icon name="arrow" size={15}/></button></section>}<label className="search-input"><Icon name="search" size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search students"/></label><div className="student-list">{filtered.map((student,index)=><button key={student.name} onClick={openStudent}><Avatar initials={student.initials}/><span><strong>{student.name}</strong><small>{student.meta}</small></span><em className={index===0||index===3?"warn":""}>{student.status}</em><Icon name="chevron" size={17}/></button>)}</div></main>}
function CoachPractice({ openAssign }: { openAssign: () => void }) {
  return (
    <main className="screen">
      <div className="page-title page-title-action">
        <span>
          <p className="eyebrow">BETWEEN LESSONS</p>
          <h1>Practice</h1>
          <p>Assign, review and adjust.</p>
        </span>
        <button onClick={openAssign}>+</button>
      </div>
      <div className="review-hero">
        <div>
          <small>NEEDS REVIEW</small>
          <strong>2 results</strong>
          <p>Both students completed their routines today.</p>
        </div>
        <Icon name="clipboard" size={30} />
      </div>
      <SectionHeading title="Results to review" />
      <button className="result-card">
        <div className="result-top">
          <Avatar initials="MP" />
          <span>
            <strong>Putting — Start Line</strong>
            <small>Meera Pillai · Completed today</small>
          </span>
          <b>86%</b>
        </div>
        <div className="result-metrics">
          <span>
            <strong>9/10</strong>
            <small>Gate</small>
          </span>
          <span>
            <strong>8/10</strong>
            <small>Distance</small>
          </span>
          <span>
            <strong>32%</strong>
            <small>Miss left</small>
          </span>
        </div>
        <div className="review-link">
          Review result <Icon name="arrow" size={16} />
        </div>
      </button>
      <SectionHeading
        title="Active routines"
        action="Assign new"
        onAction={openAssign}
      />
      <div className="routine-card">
        <span className="routine-letter">A</span>
        <span>
          <strong>Driver Speed — Phase 1</strong>
          <small>Aditya · 3× weekly · 3 drills</small>
        </span>
        <em>72%</em>
      </div>
      <div className="routine-card">
        <span className="routine-letter">B</span>
        <span>
          <strong>Junior Setup Routine</strong>
          <small>Divya · Daily · 2 drills</small>
        </span>
        <em>3 days</em>
      </div>
    </main>
  )
}

function Business() {
  const [view, setView] = useState<"bookings" | "payments">("bookings")
  return (
    <main className="screen">
      <div className="page-title">
        <p className="eyebrow">YOUR BUSINESS</p>
        <h1>Business</h1>
        <p>Bookings, payments and packages.</p>
      </div>
      <div className="segment">
        <button
          className={view === "bookings" ? "active" : ""}
          onClick={() => setView("bookings")}
        >
          Bookings
        </button>
        <button
          className={view === "payments" ? "active" : ""}
          onClick={() => setView("payments")}
        >
          Payments
        </button>
      </div>
      {view === "bookings" ? (
        <>
          <div className="business-stats">
            <div>
              <strong>12</strong>
              <span>Upcoming</span>
            </div>
            <div>
              <strong>3</strong>
              <span>Requests</span>
            </div>
            <div>
              <strong>₹18k</strong>
              <span>Expected</span>
            </div>
          </div>
          <SectionHeading title="Upcoming bookings" action="Calendar" />
          {[
            ["AN", "Aditya Nair", "Sat 22 Aug · 8:00 AM", "₹2,500"],
            ["DI", "Divya Iyer", "Mon 24 Aug · 6:30 AM", "₹800"],
            ["RN", "Rahul Nath · Group", "Wed 26 Aug · 10:00 AM", "₹4,800"],
          ].map((item) => (
            <button className="booking-row" key={item[1]}>
              <Avatar initials={item[0]} />
              <span>
                <strong>{item[1]}</strong>
                <small>{item[2]}</small>
              </span>
              <em>{item[3]}</em>
            </button>
          ))}
        </>
      ) : (
        <>
          <div className="earnings-card">
            <small>AUGUST EARNINGS</small>
            <strong>₹62,000</strong>
            <span>↑ 12% from July</span>
            <div>
              <small>Pending payout</small>
              <b>₹8,200 · 25 Aug</b>
            </div>
          </div>
          <SectionHeading title="Recent payments" action="View all" />
          {[
            ["Aditya Nair", "Bundle L3 · UPI", "+₹2,500"],
            ["Rahul Nath", "Group lesson · Card", "+₹4,800"],
            ["Divya Iyer", "Trial lesson · Pending", "₹800"],
          ].map((item) => (
            <div className="payment-row" key={item[0]}>
              <span>
                <strong>{item[0]}</strong>
                <small>{item[1]}</small>
              </span>
              <b>{item[2]}</b>
            </div>
          ))}
        </>
      )}
    </main>
  )
}

function BottomNav({
  items,
  active,
  onChange,
}: {
  items: { id: PrimaryTab; label: string; icon: IconName }[]
  active: PrimaryTab
  onChange: (id: PrimaryTab) => void
}) {
  return (
    <nav className="bottom-nav bottom-nav-primary" aria-label="Primary navigation">
      <div className="bottom-nav-track">
        {items.map((item) => (
          <button type="button" key={item.id} className={item.id === active ? "active" : ""} onClick={() => onChange(item.id)} aria-current={item.id === active ? "page" : undefined}>
            <Icon name={item.icon} size={21} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}


function AppTopBar({
  title,
  initials,
  onHome,
  onProfile,
  back,
  discoverySection,
  onDiscoverySectionChange,
  onSearch,
}: {
  title: string
  initials: string
  onHome: () => void
  onProfile: () => void
  back?: () => void
  discoverySection?: DiscoverSection
  onDiscoverySectionChange?: (section: DiscoverSection) => void
  onSearch?: () => void
}) {
  const [selectorOpen, setSelectorOpen] = useState(false)
  const isDiscoverySelector = Boolean(discoverySection && onDiscoverySectionChange)
  const options: DiscoverSection[] = ["Courses", "Ranges", "Coaches"]

  return (
    <header className={`app-topbar ${back ? "app-topbar-child" : ""} ${isDiscoverySelector ? "app-topbar-discovery" : ""}`}>
      {back ? (
        <button type="button" className="app-topbar-back" onClick={back} aria-label="Go back"><Icon name="chevron" size={21} /></button>
      ) : (
        <button type="button" className="app-topbar-brand" onClick={onHome} aria-label="Go to Discover"><img src="/fore-logo-orange.svg" alt="Fore" /></button>
      )}
      {isDiscoverySelector ? (
        <div className="app-topbar-selector-wrap">
          <button type="button" className="app-topbar-selector" onClick={() => setSelectorOpen((open) => !open)} aria-expanded={selectorOpen}>
            <span>{discoverySection}</span>
            <Icon name="chevron" size={14} />
          </button>
          {selectorOpen && (
            <div className="app-topbar-selector-menu">
              {options.map((option) => (
                <button
                  type="button"
                  key={option}
                  className={option === discoverySection ? "active" : ""}
                  onClick={() => {
                    onDiscoverySectionChange?.(option)
                    setSelectorOpen(false)
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <h1>{title}</h1>
      )}
      {back ? (
        onSearch ? (
          <button type="button" className="app-topbar-search" onClick={onSearch} aria-label="Search"><Icon name="search" size={20} /></button>
        ) : <span className="app-topbar-spacer" aria-hidden="true" />
      ) : (
        <button type="button" className="app-topbar-profile" onClick={onProfile} aria-label="Open profile"><Avatar initials={initials} /></button>
      )}
    </header>
  )
}


function StudentDetail({close,assign,connectionStatus,onRemove}:{close:()=>void;assign:()=>void;connectionStatus:ConnectionStatus;onRemove:()=>void}){const connected=connectionStatus==="connected";return <div className="overlay light-overlay"><div className="overlay-bar"><button onClick={close}><Icon name="close"/></button><span>Student profile</span><button><Icon name="message"/></button></div><div className="student-profile"><Avatar initials={connected?"AK":"MP"}/><h1>{connected?"Alex Kapoor":"Meera Pillai"}</h1><p>{connected?"Amateur · HCP 14.2":"Intermediate · HCP 6.4"}</p>{connected&&<span className="connection-badge"><Icon name="check" size={13}/> Connected student</span>}<div><span><strong>{connected?"0":"8"}</strong><small>Lessons</small></span><span><strong>{connected?"3":"2"}</strong><small>Open tasks</small></span><span><strong>{connected?"1":"5"}</strong><small>Videos</small></span></div></div><div className="detail-content student-detail-content"><div className="student-actions"><button onClick={assign}><Icon name="clipboard"/><span>Assign drill</span></button><button><Icon name="video"/><span>Feedback</span></button><button><Icon name="flag"/><span>Add round</span></button></div><SectionHeading title="Performance" action="Full analysis"/><div className="performance-grid"><div><span>Avg score</span><strong>{connected?"91.0":"74.8"}</strong><small className="positive">{connected?"First baseline":"↓ 2.1"}</small></div><div><span>Strokes gained</span><strong>{connected?"-2.4":"+2.6"}</strong><small>{connected?"Last round":"Last 5 rounds"}</small></div></div><div className="sg-bars compact">{[["Off tee",72,"+0.4"],["Approach",64,"-0.8"],["Short game",48,"-1.1"],["Putting",58,"-0.9"]].map(([label,width,value])=><div key={label}><span>{label}</span><i><b style={{width:`${width}%`}}/></i><strong>{value}</strong></div>)}</div><SectionHeading title={connected?"Coaching relationship":"Current practice"} action={connected?"Message":"View all"}/><div className="routine-card"><span className="routine-letter">A</span><span><strong>{connected?"New student plan":"Putting — Start Line"}</strong><small>{connected?"Goals: consistency · short game · course strategy":"Daily · 3 drills · 86% complete"}</small></span><em>{connected?"Start plan":"On track"}</em></div>{connected&&<button className="disconnect-link" onClick={onRemove}>Remove student connection</button>}</div></div>}
function AssignSheet({ close }: { close: () => void }) {
  const [assigned, setAssigned] = useState(false)
  return (
    <div className="sheet-backdrop" onClick={close}>
      <div className="sheet" onClick={(event) => event.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="sheet-title">
          <span>
            <p className="eyebrow">NEW ASSIGNMENT</p>
            <h2>Assign practice</h2>
          </span>
          <button onClick={close}>
            <Icon name="close" />
          </button>
        </div>
        <label>
          <span>Student</span>
          <button className="select-row">
            <span>
              <Avatar initials="MP" /> Meera Pillai
            </span>
            <Icon name="chevron" />
          </button>
        </label>
        <label>
          <span>Routine</span>
          <button className="select-row">
            <span>
              <Icon name="clipboard" /> Putting — Start Line
            </span>
            <Icon name="chevron" />
          </button>
        </label>
        <div className="sheet-summary">
          <span>
            <Icon name="clock" />
            <strong>20 min</strong>
            <small>Estimated time</small>
          </span>
          <span>
            <Icon name="calendar" />
            <strong>Daily</strong>
            <small>For 7 days</small>
          </span>
        </div>
        <button className="primary-button" onClick={() => setAssigned(true)}>
          {assigned ? (
            <>
              <Icon name="check" /> Assigned to Meera
            </>
          ) : (
            "Assign routine"
          )}
        </button>
      </div>
    </div>
  )
}

function PerformanceHome({ openModule }: { openModule: (module: "sg" | "drills" | "video") => void }) {
  return (
    <main className="screen architecture-home performance-home">
      <div className="architecture-intro">
        <p className="eyebrow">YOUR GAME</p>
        <h1>Performance</h1>
        <p>Choose what you want to work on.</p>
      </div>
      <div className="performance-module-list">
        <button onClick={() => openModule("sg")}>
          <span className="performance-module-icon"><Icon name="chart" size={22} /></span>
          <span><small>STROKES GAINED</small><strong>Understand your game</strong><em>See where you gain and lose shots.</em></span>
          <Icon name="chevron" size={18} />
        </button>
        <button onClick={() => openModule("drills")}>
          <span className="performance-module-icon"><Icon name="clipboard" size={22} /></span>
          <span><small>DRILLS</small><strong>Practice with purpose</strong><em>Work through drills and track progress.</em></span>
          <Icon name="chevron" size={18} />
        </button>
        <button onClick={() => openModule("video")}>
          <span className="performance-module-icon"><Icon name="video" size={22} /></span>
          <span><small>VIDEO ANALYSIS</small><strong>See your swing</strong><em>Review swings and identify what to improve.</em></span>
          <Icon name="chevron" size={18} />
        </button>
      </div>
      <div className="performance-summary">
        <span><small>HANDICAP</small><strong>14.2</strong></span>
        <span><small>LAST ROUND</small><strong>91</strong></span>
        <span><small>STROKES GAINED</small><strong>-2.4</strong></span>
      </div>
    </main>
  )
}

function VideoAnalysisModule() {
  return (
    <main className="screen focused-module-screen">
      <div className="focused-module-intro">
        <p className="eyebrow">PERFORMANCE</p>
        <h1>Video Analysis</h1>
        <p>Review your swing, compare frames and build a clearer practice plan.</p>
      </div>
      <button className="video-analysis-hero">
        <div className="video-thumb">
          <img src={photos.golfer} alt="Golfer working on their swing" />
          <span><Icon name="video" size={22} /></span>
          <small>0:42</small>
        </div>
        <div><small>RECENT ANALYSIS</small><strong>Driver · takeaway & transition</strong><p>3 annotated frames · Coach feedback ready</p></div>
      </button>
      <div className="video-analysis-actions">
        <button><Icon name="video" size={18} /> Record a swing</button>
        <button><Icon name="arrow" size={18} /> View analysis</button>
      </div>
    </main>
  )
}

function CoachHome({openDiscovery,status,onCancelRequest}:{openDiscovery:()=>void;status:ConnectionStatus;onCancelRequest:()=>void}){return <main className="screen architecture-home coach-home"><div className="architecture-intro"><p className="eyebrow">YOUR LEARNING JOURNEY</p><h1>Coach</h1><p>Find the right coach, then keep everything you learn in one place.</p></div>{status==="connected"?<section className="connected-coach-card"><div className="connected-coach-head"><Avatar initials="SM" image={photos.golfer}/><span><small>YOUR COACH</small><strong>Savdeep Mehta</strong><em>PGA Professional · 4.9</em></span><span className="connection-badge"><Icon name="check" size={13}/> Connected</span></div><div className="connected-coach-stats"><span><strong>Next lesson</strong><small>Tomorrow · 7:00 AM</small></span><span><strong>Practice plan</strong><small>3 drills · 72% complete</small></span></div><div className="connected-coach-actions"><button><Icon name="message" size={17}/> Message</button><button><Icon name="calendar" size={17}/> Lessons</button></div></section>:status==="pending"?<section className="connected-coach-card pending"><div className="connected-coach-head"><Avatar initials="SM" image={photos.golfer}/><span><small>CONNECTION REQUEST</small><strong>Savdeep Mehta</strong><em>Waiting for coach to accept</em></span><span className="connection-badge pending"><Icon name="clock" size={13}/> Pending</span></div><p>Your profile and coaching goals will be shared once the coach accepts.</p><button className="secondary-button" onClick={onCancelRequest}>Cancel request</button></section>:<button className="coach-find-hero" onClick={openDiscovery}><span className="coach-find-icon"><Icon name="search" size={25}/></span><span><small>GET STARTED</small><strong>Find a coach</strong><em>Browse coaches, ratings, specialties and lesson options.</em></span><Icon name="arrow" size={19}/></button>}{status==="none"&&<section className="coach-journey-preview"><div><small>YOUR COACH</small><strong>Not connected yet</strong><span>Once you choose a coach, your lessons, feedback and practice plan will appear here.</span></div></section>}<SectionHeading title={status==="none"?"How coaching works":"What happens next"}/><div className="coach-journey-steps"><span><b>1</b><strong>{status==="none"?"Choose a coach":"Coach reviews"}</strong><small>{status==="none"?"Find someone who fits your game.":"Your request and goals are shared."}</small></span><span><b>2</b><strong>{status==="none"?"Connect":"Connection accepted"}</strong><small>{status==="none"?"Send a request and share your goals.":"Your coaching space opens."}</small></span><span><b>3</b><strong>Keep improving</strong><small>Feedback and drills stay with you.</small></span></div></main>}
function CoachApp({tab,setTab,profileOpen,setProfileOpen,overlay,setOverlay,connectionStatus,onAccept,onDecline,onRemove,onSwitch}:{tab:CoachTab;setTab:(t:CoachTab)=>void;profileOpen:boolean;setProfileOpen:(v:boolean)=>void;overlay:"student"|"assign"|null;setOverlay:(v:"student"|"assign"|null)=>void;connectionStatus:ConnectionStatus;onAccept:()=>void;onDecline:()=>void;onRemove:()=>void;onSwitch:()=>void}){const items:[CoachTab,string,IconName][]=[["home","Home","home"],["schedule","Schedule","calendar"],["students","Students","users"]],title=tab==="home"?"Home":tab==="schedule"?"Schedule":"Students";return <>{!profileOpen&&!overlay&&<AppTopBar title={title} initials="AR" onHome={()=>setTab("home")} onProfile={()=>setProfileOpen(true)}/>} {profileOpen&&!overlay&&<AppTopBar title="Profile" initials="AR" onHome={()=>setTab("home")} onProfile={()=>setProfileOpen(true)} back={()=>setProfileOpen(false)}/>}<div className="scroll-area">{profileOpen?<Profile role="coach" onSwitch={onSwitch}/>:<>{tab==="home"&&<CoachDashboardHome go={setTab}/>} {tab==="schedule"&&<CoachSchedule go={setTab}/>} {tab==="students"&&<Students openStudent={()=>setOverlay("student")} connectionStatus={connectionStatus} onAccept={onAccept} onDecline={onDecline}/>}</>}</div>{!profileOpen&&!overlay&&<nav className="bottom-nav bottom-nav-primary" aria-label="Coach navigation"><div className="bottom-nav-track">{items.map(([id,label,icon])=><button type="button" key={id} className={id===tab?"active":""} onClick={()=>setTab(id)}><Icon name={icon} size={21}/><span>{label}</span></button>)}</div></nav>}{overlay==="student"&&<StudentDetail close={()=>setOverlay(null)} assign={()=>setOverlay("assign")} connectionStatus={connectionStatus} onRemove={onRemove}/>} {overlay==="assign"&&<AssignSheet close={()=>setOverlay(null)}/>}</>}
function App(){
 const [role,setRole]=useState<Role>("golfer");const[coachTab,setCoachTab]=useState<CoachTab>("home");const[coachProfileOpen,setCoachProfileOpen]=useState(false);const[connectionStatus,setConnectionStatus]=useState<ConnectionStatus>("none");const [primaryTab, setPrimaryTab] = useState<PrimaryTab>("discover")
  const [profileOpen, setProfileOpen] = useState(false)
  const [module, setModule] = useState<"sg" | "drills" | "video" | null>(null)
  const [coachDiscoveryOpen, setCoachDiscoveryOpen] = useState(false)
  const [discoverChildOpen, setDiscoverChildOpen] = useState(false)
  const [discoverSection, setDiscoverSection] = useState<DiscoverSection>("Courses")
  const [overlay, setOverlay] = useState<"student" | "assign" | null>(null)
  const [discoverSearchRequest, setDiscoverSearchRequest] = useState(0)

  const goPrimaryTab = (tab: PrimaryTab) => {
    setPrimaryTab(tab)
    setProfileOpen(false)
    setModule(null)
    setCoachDiscoveryOpen(false)
    setDiscoverChildOpen(false)
    setDiscoverSection("Courses")
    setOverlay(null)
  }

  const openPerformanceModule = (next: "sg" | "drills" | "video") => {
    setModule(next)
    setProfileOpen(false)
  }

  const openDiscover = (section: DiscoverSection) => {
    setPrimaryTab("discover")
    setProfileOpen(false)
    setModule(null)
    setCoachDiscoveryOpen(false)
    setDiscoverSection(section)
    setDiscoverChildOpen(true)
    setOverlay(null)
  }

  const closeDiscover = () => {
    setDiscoverChildOpen(false)
    setDiscoverSection("Courses")
  }

  const switchRole=()=>{setRole(r=>r==="golfer"?"coach":"golfer");setProfileOpen(false);setCoachProfileOpen(false);setCoachDiscoveryOpen(false);setOverlay(null)};const sendConnectionRequest=()=>setConnectionStatus("pending");const cancelConnectionRequest=()=>setConnectionStatus("none");const acceptConnection=()=>setConnectionStatus("connected");const declineConnection=()=>setConnectionStatus("none");const removeConnection=()=>setConnectionStatus("none");if(role==="coach")return <div className="app-stage"><div className="phone-shell"><CoachApp tab={coachTab} setTab={t=>{setCoachTab(t);setCoachProfileOpen(false);setOverlay(null)}} profileOpen={coachProfileOpen} setProfileOpen={setCoachProfileOpen} overlay={overlay} setOverlay={setOverlay} connectionStatus={connectionStatus} onAccept={acceptConnection} onDecline={declineConnection} onRemove={removeConnection} onSwitch={switchRole}/></div></div>

  const primaryItems: { id: PrimaryTab; label: string; icon: IconName }[] = [
    { id: "discover", label: "Discover", icon: "search" },
    { id: "performance", label: "Performance", icon: "chart" },
    { id: "coach", label: "Coach", icon: "users" },
  ]

  const childTitle = profileOpen ? "Profile" : module === "sg" ? "Strokes Gained" : module === "drills" ? "Drills" : "Video Analysis"

  return (
    <div className="app-stage">
      <div className="phone-shell">
        {!module && !coachDiscoveryOpen && !profileOpen && !discoverChildOpen && !overlay && (
          <AppTopBar
            title={primaryTab === "discover" ? "Home" : primaryItems.find((item) => item.id === primaryTab)?.label ?? "Discover"}
            initials="AK"
            onHome={() => goPrimaryTab("discover")}
            onProfile={() => setProfileOpen(true)}
          />
        )}

        {discoverChildOpen && !module && !coachDiscoveryOpen && !profileOpen && !overlay && (
          <AppTopBar
            title={discoverSection}
            initials="AK"
            onHome={() => goPrimaryTab("discover")}
            onProfile={() => setProfileOpen(true)}
            back={closeDiscover}
            discoverySection={discoverSection}
            onDiscoverySectionChange={(section) => {
              setDiscoverSection(section)
              setDiscoverChildOpen(true)
            }}
            onSearch={() => setDiscoverSearchRequest((value) => value + 1)}
          />
        )}

        {module && !overlay && (
          <AppTopBar title={childTitle} initials="AK" onHome={() => goPrimaryTab("discover")} onProfile={() => setProfileOpen(true)} back={() => setModule(null)} />
        )}

        {profileOpen && !overlay && (
          <AppTopBar title="Profile" initials="AK" onHome={() => goPrimaryTab("discover")} onProfile={() => setProfileOpen(true)} back={() => setProfileOpen(false)} />
        )}

        <div className="scroll-area">
          {!profileOpen && !module && !coachDiscoveryOpen && (
            <>
              {primaryTab === "discover" && !discoverChildOpen && <DiscoverHome openDiscover={openDiscover} />}
              {primaryTab === "discover" && discoverChildOpen && (
                <Discover
                  key={discoverSection}
                  initialSection={discoverSection}
                  searchRequest={discoverSearchRequest}
                  onModuleStateChange={(_active, section) => {
                    if (section) setDiscoverSection(section)
                    setDiscoverChildOpen(true)
                  }}
                />
              )}
              {primaryTab === "performance" && <PerformanceHome openModule={openPerformanceModule} />}
              {primaryTab === "coach" && <CoachHome openDiscovery={()=>setCoachDiscoveryOpen(true)} status={connectionStatus} onCancelRequest={cancelConnectionRequest} />}
            </>
          )}

          {profileOpen && <Profile role="golfer" onSwitch={switchRole} />}

          {module === "sg" && <Play onModuleStateChange={() => undefined} />}
          {module === "drills" && <Improve />}
          {module === "video" && <VideoAnalysisModule />}

          {coachDiscoveryOpen && <CoachDiscoveryStandalone onClose={()=>setCoachDiscoveryOpen(false)} connectionStatus={connectionStatus} onConnect={sendConnectionRequest} />}
        </div>

        {!module && !coachDiscoveryOpen && !profileOpen && !discoverChildOpen && !overlay && (
          <BottomNav items={primaryItems} active={primaryTab} onChange={goPrimaryTab} />
        )}

        {overlay === "student" && <StudentDetail close={()=>setOverlay(null)} assign={()=>setOverlay("assign")} connectionStatus={connectionStatus} onRemove={removeConnection} />}
        {overlay === "assign" && <AssignSheet close={() => setOverlay(null)} />}
      </div>
    </div>
  )
}

function CoachDiscoveryStandalone({onClose,connectionStatus,onConnect}:{onClose:()=>void;connectionStatus:ConnectionStatus;onConnect:()=>void}){
  const [screen, setScreen] = useState<CourseFlowScreen>("coachDiscover")
  const [state, setState] = useState<CoachDiscoverState>("ready")
  const [coachAvailabilityState, setCoachAvailabilityState] = useState<CoachAvailabilityState>("ready")
  const [lesson, setLesson] = useState("")
  const [selectedDate, setSelectedDate] = useState("21")
  const [slot, setSlot] = useState("")
  const [goals, setGoals] = useState<string[]>([])
  const [coachNotes, setCoachNotes] = useState("")
  const [plan, setPlan] = useState<"single" | "pack">("single")
  const [credits, setCredits] = useState(false)

  const go = (next: CourseFlowScreen) => {
    if (next === "coachDiscover") {
      setScreen("coachDiscover")
      return
    }
    setScreen(next)
  }

  const toggleGoal = (goal: string) => {
    setGoals((current) => current.includes(goal) ? current.filter((item) => item !== goal) : [...current, goal])
  }

  return (
    <>
      {screen === "coachDiscover" && (
        <main className="screen coach-discovery-standalone">
          <div className="coach-discovery-heading">
            <p className="eyebrow">COACHING</p>
            <h1>Find a coach</h1>
            <p>Choose someone who fits your game, goals and way of learning.</p>
          </div>
          <button className="search-box coach-discovery-search">
            <Icon name="search" size={19} /><span>Search coaches</span><Icon name="filter" size={17} />
          </button>
          <SectionHeading title="Recommended for you" />
          <div className="coach-booking-list">
            <CoachCard name="Savdeep Mehta" rating="4.9" price={1800} image={photos.golfer} onOpen={()=>go("coachProfile")} onBook={()=>go("coachLesson")} />
            <CoachCard name="Neha Arora" rating="4.8" price={1500} image={photos.golfer} onOpen={()=>go("coachProfile")} onBook={()=>go("coachLesson")} />
            <CoachCard name="Imran Qureshi" rating="4.7" price={2200} image={photos.golfer} onOpen={()=>go("coachProfile")} onBook={()=>go("coachLesson")} />
          </div>
        </main>
      )}

      {screen === "coachProfile" && <CoachProfileScreen go={go} />}

      {screen === "coachLesson" && <CoachLessonTypeScreen go={go} lesson={lesson} setLesson={setLesson} />}

      {screen === "coachDateTime" && (
        <CoachDateTimeScreen go={go} date={selectedDate} setDate={setSelectedDate} slot={slot} setSlot={setSlot} state={coachAvailabilityState} setState={setCoachAvailabilityState} />
      )}

      {screen === "coachCheckout" && (
        <CoachCheckoutScreen go={go} lesson={lesson} date={selectedDate} slot={slot} goals={goals} toggleGoal={toggleGoal} notes={coachNotes} setNotes={setCoachNotes} plan={plan} setPlan={setPlan} credits={credits} setCredits={setCredits} />
      )}

      {screen === "coachRequestSent" && <CoachRequestSentScreen go={go} />}

      {screen === "coachBookingPending" && <CoachBookingDetailScreen go={go} status="Pending" />}

      {screen === "coachBookingConfirmed" && <CoachBookingDetailScreen go={go} status="Confirmed" />}

      {screen === "coachDeclined" && (
        <main className="screen booking-empty-state"><span><Icon name="close" /></span><h2>Request declined</h2><p>The coach wasn't able to accept this request.</p><button className="primary-button" onClick={() => go("coachDiscover")}>Find another coach</button></main>
      )}
    </>
  )
}

export default App
