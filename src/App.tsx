import { useEffect, useMemo, useState } from "react"
import VenueCard, { type VenueCardProps } from "./components/VenueCard"
import "./venue-card.css"

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
        <Avatar initials="RM" />
        <span>
          <small>NEW FROM ROHAN</small>
          <strong>Swing feedback is ready</strong>
          <em>3 annotated frames · 0:42 voice note</em>
        </span>
        <Icon name="chevron" size={18} />
      </button>
    </main>
  )
}

type DiscoverSection = "Courses" | "Facilities" | "Coaches"

function Discover({
  onModuleStateChange,
  initialSection,
  searchRequest,
  initialScreen,
}: {
  onModuleStateChange: (active: boolean, section?: DiscoverSection, screen?: CourseFlowScreen) => void
  initialSection: DiscoverSection
  searchRequest: number
  initialScreen?: CourseFlowScreen
}) {
  return <CourseBookingPrototype onModuleStateChange={onModuleStateChange} initialSection={initialSection} searchRequest={searchRequest} initialScreen={initialScreen} />
}

function DiscoverHome({
  openDiscover,
}: {
  openDiscover: (section: DiscoverSection) => void
}) {
  return (
    <main className="screen discover-home-screen">
      <button className="next-card discover-home-round" type="button" data-prototype="Upcoming round" data-prototype-body="Open your upcoming Delhi Golf Club round. View your upcoming round details.">
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
        <button type="button" onClick={() => openDiscover("Facilities")}>
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
  | "venueDetails"
  | "dwarkaCourseProfile"
  | "bhalswaCourseProfile"
  | "confirmation"
  | "bookings"
  | "bookingDetail"
  | "rangeDiscover"
  | "rangeProfile"
  | "hamoniRangeProfile"
  | "bhalswaRangeProfile"
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
type RangeVenue = "delhi" | "hamoni" | "bhalswa"

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


type VenueKey = "dgc" | "qutub-course" | "karma-lakelands" | "dwarka" | "lakeview-course" | "hamoni" | "dgc-range" | "qutub-practice" | "lakeview-practice"
function mapVenueCardData(key: VenueKey, onOpen: () => void, onBook: () => void, featured = false): VenueCardProps {
  const venues: Record<VenueKey, Omit<VenueCardProps, "onOpen" | "onBook" | "featured">> = {
    dgc: { venueType: "course", name: "Delhi Golf Club", image: "https://upload.wikimedia.org/wikipedia/commons/9/97/Delhi_Golf_Club_2133934588_2459ee4064_o.jpg", rating: 4.7, locality: "Lodhi Road", city: "New Delhi", distanceKm: 2.1, tags: [{ label: "18 holes" }, { label: "Championship" }], price: "₹2,500", priceUnit: "/ round" },
    "qutub-course": { venueType: "course", name: "Qutub Golf Course", image: "https://www.indiagolfweekly.com/wp-content/uploads/2020/10/qgc5.jpg", rating: 4.4, locality: "Mehrauli", city: "New Delhi", distanceKm: 5.4, tags: [{ label: "18 holes" }, { label: "Public" }], price: "₹1,100", priceUnit: "/ 9 holes weekday" },
    "karma-lakelands": { venueType: "course", name: "Karma Lakelands", image: "https://assets.simplotel.com/simplotel/image/upload/x_0,y_0,w_3000,h_2000,r_0,c_crop,q_80,fl_progressive/w_1200,f_auto,c_fit/karma-lakelands/golf-course", rating: 4.6, locality: "Sector 80, NH 8", city: "Gurugram", distanceKm: 25, tags: [{ label: "9-hole course" }, { label: "Eco-friendly" }], price: "₹2,400", priceUnit: "/ 9 holes weekday" },
    dwarka: { venueType: "course", name: "DDA Dwarka Golf Course", image: "https://lg.delhi.gov.in/sites/default/files/media-gallery/gfe_su9wuaaa68a.jpg", rating: 4.8, locality: "Sector 24, Dwarka", distanceKm: 3.2, tags: [{ label: "9 holes" }, { label: "Special offer", tone: "offer" }], price: "₹660", priceUnit: "/ 9 holes weekday" },
    "lakeview-course": { venueType: "course", name: "DDA Lake View Golf Course", image: "https://pbs.twimg.com/media/DfFl35WU0AAzyYG.jpg", rating: 4.0, locality: "Bhalswa Lake", city: "North Delhi", distanceKm: 8.4, tags: [{ label: "9 holes" }, { label: "Driving range" }], price: "₹440", priceUnit: "/ 9 holes weekday" },
    hamoni: { venueType: "practice", name: "Hamoni Golf Camp", image: "https://imgmediagumlet.lbb.in/media/2020/02/5e452f5b5d18a4654a80681a_1581592411705.JPG", rating: 4.8, locality: "Sector 23A", city: "Gurugram", distanceKm: 4.1, tags: [{ label: "Driving range" }, { label: "Floodlit" }, { label: "Special offer", tone: "offer" }], price: "₹500", priceUnit: "/ person + GST" },
    "dgc-range": { venueType: "practice", name: "Delhi Golf Club Range", image: "https://upload.wikimedia.org/wikipedia/commons/9/97/Delhi_Golf_Club_2133934588_2459ee4064_o.jpg", rating: 4.6, locality: "Lodhi Road", city: "New Delhi", distanceKm: 2.8, tags: [{ label: "Driving range" }, { label: "Open now", tone: "positive" }], price: "₹900", priceUnit: "/ 60 min" },
    "qutub-practice": { venueType: "practice", name: "Qutub Practice Centre", image: "https://www.indiagolfweekly.com/wp-content/uploads/2020/10/qgc5.jpg", rating: 4.4, locality: "Mehrauli", city: "New Delhi", distanceKm: 5.7, tags: [{ label: "Driving range" }, { label: "Short game area" }], price: "₹900", priceUnit: "/ 60 min" },
    "lakeview-practice": { venueType: "practice", name: "DDA Lake View Golf Course", image: "https://pbs.twimg.com/media/DfFl35WU0AAzyYG.jpg", rating: 4.0, locality: "Bhalswa Lake", city: "North Delhi", distanceKm: 8.4, tags: [{ label: "Driving range" }, { label: "Pay & play" }], price: "₹82.50", priceUnit: "/ 50 balls" },
  }
  return { ...venues[key], featured, onOpen, onBook }
}

function DiscoverCourses({
  go,
  openFilters,
  openSearch,
  openBooking,
  openRangeBooking,
  openVenueDetails,
  mode,
  setMode,
}: {
  go: (screen: CourseFlowScreen) => void
  openFilters: () => void
  openSearch: () => void
  openBooking: (course: BookingCourse, slot?: string) => void
  openRangeBooking: (range?: RangeVenue) => void
  openVenueDetails: (key: VenueKey) => void
  mode: "courses" | "ranges" | "coaches"
  setMode: (mode: "courses" | "ranges" | "coaches") => void
}) {
  return (
    <main className="screen booking-discover-screen">
      <SectionHeading title="Book Again" />
      <div className="book-again-course-list">
        <VenueCard variant="default" {...mapVenueCardData("dwarka", () => openVenueDetails("dwarka"), () => openBooking({ name: "DDA Dwarka Golf Course", image: photos.course, price: 660 }), true)} />
      </div>
      <SectionHeading title="Near you" />
      <div className="near-you-course-list">
        <VenueCard variant="default" {...mapVenueCardData("dgc", () => openVenueDetails("dgc"), () => openBooking(delhiCourse))} />
        <VenueCard variant="default" {...mapVenueCardData("qutub-course", () => openVenueDetails("qutub-course"), () => openBooking(qutubCourse))} />
        <VenueCard variant="default" {...mapVenueCardData("karma-lakelands", () => openVenueDetails("karma-lakelands"), () => openBooking({ name: "Karma Lakelands", image: photos.green, price: 2400 }))} />
        <VenueCard variant="default" {...mapVenueCardData("dwarka", () => openVenueDetails("dwarka"), () => openBooking({ name: "DDA Dwarka Golf Course", image: photos.course, price: 660 }), true)} />
        <VenueCard variant="default" {...mapVenueCardData("lakeview-course", () => openVenueDetails("lakeview-course"), () => openBooking({ name: "DDA Lake View Golf Course", image: photos.green, price: 440 }))} />
      </div>
    </main>
  )
}


function OfficialDdaCourseProfileScreen({ venue, go }: { venue: "dwarka" | "bhalswa"; go: (screen: CourseFlowScreen) => void }) {
  const dwarka = venue === "dwarka"
  const name = dwarka ? "DDA Dwarka Golf Course" : "DDA Lake View Golf Course"
  const address = dwarka ? "Sector 24, Dwarka, New Delhi 110075" : "Near Bhalswa Lake, Outer Ring Road, Mukundpur, New Delhi 110042"
  const [saved, setSaved] = useState(false)
  const dwarkaRates = [
    ["9 holes", "₹660", "₹1,320"],
    ["13 holes", "₹900", "₹1,800"],
    ["18 holes", "₹1,080", "₹2,160"],
  ]
  const lakeViewRates = [
    ["Government category", "₹265", "₹500", "₹465", "₹925"],
    ["Non-government", "₹440", "₹825", "₹770", "₹1,540"],
    ["Foreigner", "₹880", "₹1,540", "₹1,650", "₹2,640"],
    ["Student under 18", "₹220", "₹415", "₹385", "₹770"],
  ]
  const facts = dwarka
    ? [["Holes", "18"], ["Par", "72"], ["Length", "7,377 yards"], ["Practice", "Driving range and golf academy"]]
    : [["Holes", "9"], ["Driving range", "Practice range, green and chipping area"], ["Clubhouse", "Hall, open terrace and lawns"], ["Course area", "79 acres"]]
  const quickTimes = ["6:10 AM", "6:40 AM", "7:20 AM"]
  return (
    <main className="course-profile-screen course-template-detail dda-course-detail">
      <section className="facility-template-hero">
        <img src={dwarka ? photos.course : photos.green} alt={name} />
        <span className="facility-template-hero-gradient" />
        <button type="button" className="facility-hero-button facility-hero-back" onClick={() => go("discover")} aria-label="Go back"><Icon name="chevron" size={20} /></button>
        <button type="button" className={`facility-hero-button facility-hero-save ${saved ? "saved" : ""}`} onClick={() => setSaved((value) => !value)} aria-label={saved ? "Remove course from saved" : "Save course"} aria-pressed={saved}><Icon name="heart" size={20} /></button>
        <div className="course-template-hero-label"><span className="eyebrow light">{dwarka ? "DWARKA · SECTOR 24" : "NORTH DELHI · BHALSWA LAKE"}</span></div>
      </section>
      <div className="facility-template-content">
        <header className="facility-template-heading">
          <h1>{name}</h1>
          <div className="facility-template-stat">
            {dwarka && <span><Icon name="star" size={15} /><strong>4.6</strong> (128 reviews)</span>}
            <span><span className="facility-location-icon"><Icon name="pin" size={15} /></span><strong>{dwarka ? "Sector 24, Dwarka" : "Mukundpur, North Delhi"}</strong></span>
          </div>
        </header>
        <section className="facility-template-section">
          <h2>Next available tee times</h2>
          <div className="course-template-tee-times">
            {quickTimes.map((slot) => <button type="button" key={slot} onClick={() => go("discover")}><span><strong>{slot}</strong><small>Today</small></span><b>{dwarka ? "₹1,080" : "₹440"}</b><Icon name="chevron" size={17} /></button>)}
          </div>
        </section>
        <section className="facility-template-section">
          <h2>About the course</h2>
          <p className="course-template-description">{dwarka ? "An 18-hole, par-72 championship course in Sector 24, Dwarka, with expansive fairways, a driving range and golf training facilities. The course offers pay-and-play access alongside membership options." : "A public, pay-and-play 9-hole course beside Bhalswa Lake, with a driving range, practice green, chipping area and clubhouse."}</p>
        </section>
        <section className="facility-template-section">
          <h2>At a glance</h2>
          <table className="facility-score"><tbody>{facts.map(([label, value]) => <tr key={label}><td>{label}</td><th>{value}</th></tr>)}</tbody></table>
        </section>
        <section className="facility-template-section">
          <h2>Pricing</h2>
          <div className="facility-rate-list dda-simple-rates">
            {(dwarka
              ? [["9 holes · weekday", "₹660"], ["9 holes · weekend", "₹1,320"], ["Driving range entry", "₹150"], ["Bucket · 50 balls", "₹100"]]
              : [["9 holes · weekday", "₹440"], ["9 holes · weekend", "₹825"], ["Driving range entry", "₹82.50"], ["Bucket · 50 balls", "₹82.50"], ["Coaching · 30 min", "₹650"]]
            ).map(([label, price]) => <div className="facility-rate" key={label}><span><b>{label}</b></span><strong>{price}</strong></div>)}
          </div>
        </section>
        <section className="facility-template-section">
          <h2>Course amenities</h2>
          <div className="facility-amenities">
            {(dwarka ? ["Driving range", "Golf academy", "Clubhouse", "Caddies available", "Golf carts", "Pay & play"] : ["Driving range", "Practice green", "Chipping area", "Clubhouse", "Caddies available", "Golf carts"]).map((item) => <span key={item}><Icon name="check" size={15} />{item}</span>)}
          </div>
        </section>
        <section className="facility-template-section">
          <h2>Getting there</h2>
          <div className="facility-map-graphic" role="img" aria-label={`Map showing the location of ${name}`}>
            <span className="facility-map-road facility-map-road-a" aria-hidden="true" /><span className="facility-map-road facility-map-road-b" aria-hidden="true" /><span className="facility-map-road facility-map-road-c" aria-hidden="true" /><span className="facility-map-park facility-map-park-a" aria-hidden="true" /><span className="facility-map-park facility-map-park-b" aria-hidden="true" /><span className="facility-map-label facility-map-label-a" aria-hidden="true">{dwarka ? "Sector 24" : "Bhalswa Lake"}</span><span className="facility-map-label facility-map-label-b" aria-hidden="true">{dwarka ? "Dwarka" : "Outer Ring Road"}</span><span className="facility-map-marker" aria-hidden="true"><Icon name="pin" size={18} /></span>
          </div>
          <button className="facility-directions" data-prototype="Directions" data-prototype-body={`Directions to ${name}.`}><span><b>{name}</b><small>{address}</small></span><strong>Directions</strong></button>
        </section>
      </div>
      <div className="facility-template-action"><button type="button" className="primary-button" onClick={() => go("discover")}>Book tee time <Icon name="arrow" size={16} /></button></div>
    </main>
  )
}
function CourseProfileScreen({ go, openBooking }: { go: (screen: CourseFlowScreen) => void; openBooking: (course: BookingCourse, slot?: string) => void }) {
  const [saved, setSaved] = useState(false)
  const quickTimes = ["6:10 AM", "6:40 AM", "7:20 AM"]

  return (
    <main className="course-profile-screen course-template-detail">
      <section className="facility-template-hero">
        <img src={photos.course} alt="Delhi Golf Club fairway" />
        <span className="facility-template-hero-gradient" />
        <button type="button" className="facility-hero-button facility-hero-back" onClick={() => go("discover")} aria-label="Go back"><Icon name="chevron" size={20} /></button>
        <button type="button" className={`facility-hero-button facility-hero-save ${saved ? "saved" : ""}`} onClick={() => setSaved((value) => !value)} aria-label={saved ? "Remove course from saved" : "Save course"} aria-pressed={saved}><Icon name="heart" size={20} /></button>
        <div className="course-template-hero-label"><span className="eyebrow light">DELHI · 18 HOLES</span></div>
      </section>
      <div className="facility-template-content">
        <header className="facility-template-heading">
          <h1>Delhi Golf Club</h1>
          <div className="facility-template-stat">
            <span><Icon name="star" size={15} /><strong>4.7</strong> (312 reviews)</span>
            <span><span className="facility-location-icon"><Icon name="pin" size={15} /></span><strong>Lodhi Road, Delhi · 2.1 km</strong></span>
          </div>
        </header>
        <section className="facility-template-section">
          <h2>Next available tee times</h2>
          <div className="course-template-tee-times">
            {quickTimes.map((slot) => <button type="button" key={slot} onClick={() => openBooking(delhiCourse, slot)}><span><strong>{slot}</strong><small>Sat, 22 Aug</small></span><b>₹2,500</b><Icon name="chevron" size={17} /></button>)}
          </div>
          <button type="button" className="course-template-all-times" onClick={() => openBooking(delhiCourse)}>See all tee times <Icon name="arrow" size={15} /></button>
        </section>
        <section className="facility-template-section">
          <h2>About the course</h2>
          <p className="course-template-description">A Delhi classic, built for strategic golf. Tree-lined fairways, strategic bunkering and fast greens reward accuracy and thoughtful approach play.</p>
        </section>
        <section className="facility-template-section">
          <h2>At a glance</h2>
          <table className="facility-score"><tbody>
            <tr><td>Holes</td><th>18</th></tr>
            <tr><td>Par</td><th>72</th></tr>
            <tr><td>Length</td><th>6,935 yards</th></tr>
            <tr><td>Typical pace</td><th>4 hours</th></tr>
          </tbody></table>
        </section>
        <section className="facility-template-section">
          <h2>Green fees</h2>
          <div className="dda-pricing-table-wrap"><table className="dda-pricing-table"><thead><tr><th>Round</th><th>Weekday</th><th>Weekend</th></tr></thead><tbody>
            <tr><th>18 holes</th><td>₹2,500</td><td>₹2,500</td></tr>
          </tbody></table></div>
        </section>
        <section className="facility-template-section">
          <h2>Course amenities</h2>
          <div className="facility-amenities">
            {["Caddies available", "Walking available", "Driving range", "Golf carts", "Club rental", "Restaurant"].map((item) => <span key={item}><Icon name="check" size={15} />{item}</span>)}
          </div>
        </section>
        <section className="facility-template-section">
          <h2>Getting there</h2>
          <div className="facility-map-graphic" role="img" aria-label="Map showing the location of Delhi Golf Club">
            <span className="facility-map-road facility-map-road-a" aria-hidden="true" />
            <span className="facility-map-road facility-map-road-b" aria-hidden="true" />
            <span className="facility-map-road facility-map-road-c" aria-hidden="true" />
            <span className="facility-map-park facility-map-park-a" aria-hidden="true" />
            <span className="facility-map-park facility-map-park-b" aria-hidden="true" />
            <span className="facility-map-label facility-map-label-a" aria-hidden="true">Lodhi Road</span>
            <span className="facility-map-label facility-map-label-b" aria-hidden="true">Golf area</span>
            <span className="facility-map-marker" aria-hidden="true"><Icon name="pin" size={18} /></span>
          </div>
          <button className="facility-directions" data-prototype="Directions" data-prototype-body="View directions and travel details."><span><b>Delhi Golf Club</b><small>Lodhi Road, Delhi</small></span><strong>Directions</strong></button>
        </section>
        <section className="facility-template-section facility-reviews">
          <h2><Icon name="star" size={18} /> 4.7 from 312 golfers</h2>
          <blockquote>“Beautiful course, smooth check-in, and excellent caddies.”</blockquote>
          <small>Rohit S. · Played 2 weeks ago</small>
          <button className="course-template-all-times" data-prototype="Course reviews" data-prototype-body="Read recent golfer reviews and ratings.">Read all reviews <Icon name="arrow" size={14} /></button>
        </section>
      </div>
      <div className="facility-template-action">
        <button type="button" className="primary-button" onClick={() => openBooking(delhiCourse)}>Book tee time <Icon name="arrow" size={16} /></button>
      </div>
    </main>
  )
}


type VenueDetailInfo = {
 address:string; description:string; facts:Array<[string,string]>; rates:Array<[string,string,string]>;
 passes:Array<[string,string,string]>; passNote:string; amenities:string[]; hours:Array<[string,string]>;
 policies:Array<[string,string]>; reviews:Array<[string,string]>; coaches:Array<[string,string,string,string]>;
}
const venueDetailInfo:Record<VenueKey,VenueDetailInfo> = {
 dgc:{address:"Delhi Golf Club, Lodhi Road, New Delhi",description:"A historic Delhi golf destination with tree-lined fairways, strategic bunkering and a classic parkland feel. The Lodhi Course is the main 18-hole layout; the club also has the 9-hole Peacock Course and a practice driving range.",facts:[["Holes","18-hole Lodhi Course"],["Par","72"],["Typical round","Around 4 hours"],["Setting","Tree-lined parkland"]],rates:[["18 holes","Weekday · Price","₹2,500"],["18 holes","Weekend · Price","₹2,500"],["Caddie","Per round · Price","₹500"],["Golf cart","Per round · Price","₹800"],["Club rental","Per set · Price","₹1,000"]],passes:[["5 rounds","₹11,250","Save 10%"],["10 rounds","₹21,000","Save 16%"]],passNote:"Multi-round packages",amenities:["Practice driving range","Pro shop","Caddies","Golf carts","Dining","Changing rooms","Fitness facilities","Clubhouse"],hours:[["Course","Tee times vary by day"],["Practice range","Hours vary by season"]],policies:[["Dress code","Golf attire and appropriate golf shoes are recommended."],["Cancellation","Changes depend on the tee-time provider and club terms."],["What to bring","Golf shoes, collared golf shirt and personal clubs if preferred."]],reviews:[["Rohit S.","Beautiful course, smooth check-in and excellent caddies."],["Meera K.","A memorable round in the middle of Delhi."],["Arjun M.","A classic course with a memorable parkland layout."]],coaches:[["Rohan Malhotra","PGA Professional · 12 years","4.9","Course strategy · Short game"],["Ananya Sethi","Golf coach · 8 years","4.8","Putting · Beginners"]]},
 "qutub-course":{address:"Qutab Golf Course, Press Enclave Road, New Delhi 110017",description:"Delhi's first public golf course opened with nine holes in 2000 and expanded to 18 holes in 2002. It has a night-lit, double-decker driving range.",facts:[["Holes","18"],["Par","70"],["Length","6,184 yards"],["Course area","107 acres"]],rates:[["9 holes · Indian citizen","Weekday · incl. GST","₹1,100"],["9 holes · Indian citizen","Weekend / holiday · incl. GST","₹2,200"],["18 holes · Indian citizen","Weekday · incl. GST","₹1,980"],["18 holes · Indian citizen","Weekend / holiday · incl. GST","₹3,960"],["Golf cart","9 / 18 holes","₹440 / ₹880"],["Caddie","9 / 18 holes","₹300 / ₹500"]],passes:[["Monthly pay & play","₹25,960","Published monthly total incl. GST"],["Student concession","50% concession","Up to age 18, subject to eligibility"]],passNote:"Published fees can change. Confirm the current fee category and tee-time availability with Qutab Golf Course.",amenities:["18-hole course","Driving range","Night-lit bays","Putting area","Pro shop","Simulator room","Cafeteria","Clubhouse"],hours:[["Course","Tee-off times vary; check current notices"],["Driving range","Summer 6 AM–1 AM · Winter 6:30 AM–1 AM"],["Weekly closure","Driving range closed Wednesday"]],policies:[["Dress code","Proper golf attire and golf/sports shoes are required."],["Cancellation","Check the terms of the official booking channel."],["What to bring","Golf shoes, appropriate clothing and booking confirmation."]],reviews:[["Ankit R.","A public course with a championship feel and useful practice range."],["Meera S.","The night-lit range is convenient for evening practice."],["Vikram T.","Check tee-off notices before travelling"]],coaches:[["Arjun Khanna","Golf coach","4.9","Course management · Scoring"],["Neha Bedi","Golf coach","4.8","Short game · Putting"]]},
 "karma-lakelands":{address:"Karma Lakelands, Sector 80, NH 8, Naurangpur, Gurugram, Haryana 122051",description:"An award-winning, eco-conscious boutique golf destination with a nine-hole course designed by Phil Ryan of Pacific Coast Design. The layout can be played as an 18-hole experience and sits within the Karma Lakelands resort.",facts:[["Holes","9-hole course"],["18-hole option","Play the 9-hole layout twice"],["Designer","Phil Ryan · Pacific Coast Design"],["Setting","Eco-conscious resort landscape"]],rates:[["9 holes · walk-in","Weekday · incl. taxes","₹2,400"],["9 holes · member guest","Weekday · incl. taxes","₹2,100"],["18 holes · walk-in","Weekday · incl. taxes","₹3,200"],["18 holes · member guest","Weekday · incl. taxes","₹2,800"],["9 holes · walk-in","Weekend / holiday · incl. taxes","₹3,200"],["9 holes · member guest","Weekend / holiday · incl. taxes","₹2,800"],["18 holes · walk-in","Weekend / holiday · incl. taxes","₹4,600"],["18 holes · member guest","Weekend / holiday · incl. taxes","₹4,000"],["Golf cart","9 / 18 holes","₹1,300 / ₹1,900"],["Caddie","9 / 18 holes","₹900 / ₹1,300"],["Golf rental set","Per set","₹2,500"],["Junior green fee · under 15","Weekday / weekend after 3 PM","₹1,400 / ₹2,100"]],passes:[],passNote:"No public pass pricing found on the official golf-course page. Tee-time booking is advised; weekend rates also apply on public holidays.",amenities:["9-hole course","18-hole playing option","Golf academy","Driving range","Caddies","Golf carts","Golf rental sets","Pro shop","Resort dining"],hours:[["Course","Book tee time in advance"],["Location","Sector 80, NH 8, Naurangpur, Gurugram"]],policies:[["Pricing","Published green fees include applicable taxes. Weekend rates apply on public holidays."],["Tee times","The venue advises booking a tee time in advance."],["What to bring","Golf attire and golf shoes; rental sets are available."]],reviews:[["Course profile","Boutique nine-hole layout with an 18-hole playing option."],["Practice","Golf academy and practice opportunities are listed by the venue."],["Setting","Located within the Karma Lakelands resort landscape."]],coaches:[["Golf academy","Lessons and practice","Contact venue","Golf instruction · Practice"]]},
 dwarka:{address:"Sector 24, Dwarka, New Delhi 110075",description:"An expansive DDA golf facility in Sector 24, Dwarka, with an 18-hole layout, driving range and golf training facilities. Pay-and-play options sit alongside membership offerings.",facts:[["Holes","18"],["Par","72"],["Length","7,377 yards"],["Practice","Driving range and golf academy"]],rates:[["9 holes","Weekday · GST included","₹660"],["9 holes","Weekend / holiday · GST included","₹1,320"],["13 holes","Weekday · GST included","₹900"],["13 holes","Weekend / holiday · GST included","₹1,800"],["18 holes","Weekday · GST included","₹1,080"],["18 holes","Weekend / holiday · GST included","₹2,160"],["Driving range entry","Per person","₹150"],["Driving range bucket","50 balls","₹100"]],passes:[["3-year playing rights · government","Revised membership fee","₹1,20,000"],["3-year playing rights · non-government","Revised membership fee","₹3,60,000"],["5-year playing rights · government","Revised membership fee","₹1,80,000"],["5-year playing rights · non-government","Revised membership fee","₹5,40,000"]],passNote:"DDA revised tenure-based playing-rights fees (circular dated 30 September 2025). Eligibility and application requirements apply.",amenities:["Driving range","Golf academy","Clubhouse","Caddies","Golf carts","Pay & play","Parking"],hours:[["Course","Confirm tee-off schedule before visiting"],["Last tee-off","Varies by season and availability"]],policies:[["Dress code","Golf attire and golf shoes are recommended."],["Cancellation","Changes depend on selected tee-time terms."],["What to bring","Booking confirmation, golf shoes and appropriate golf attire."]],reviews:[["Rohit S.","Good value for a practice or casual round in Dwarka."],["Karan P.","A spacious layout; check tee-time details before leaving."],["Ananya D.","Useful to have course play and practice facilities together."]],coaches:[["Kabir Mehra","Golf coach","4.8","Beginners · Course basics"]]},
 "lakeview-course":{address:"Near Bhalswa Lake, Outer Ring Road, Mukundpur, New Delhi 110042",description:"A public pay-and-play course beside Bhalswa Lake with a driving range, practice green, chipping area and clubhouse. Confirm the current course and range schedule before travelling.",facts:[["Holes","9"],["Course area","79 acres"],["Practice","Driving range, putting and chipping"],["Clubhouse","Hall, terrace and lawns"]],rates:[["9 holes · government category","Weekday · GST included","₹265"],["9 holes · government category","Weekend / holiday · GST included","₹500"],["9 holes · non-government","Weekday · GST included","₹440"],["9 holes · non-government","Weekend / holiday · GST included","₹825"],["9 holes · foreigner","Weekday / weekend · GST included","₹880 / ₹1,540"],["18 holes · government category","Weekday / weekend · GST included","₹465 / ₹925"],["18 holes · non-government","Weekday / weekend · GST included","₹770 / ₹1,540"],["18 holes · foreigner","Weekday / weekend · GST included","₹1,650 / ₹2,640"],["Student under 18 · 9 holes","Weekday / weekend · 10 AM–4 PM","₹220 / ₹415"],["Driving range entry · Indian","GST included","₹82.50"],["Driving range entry · foreigner / NRI","GST included","₹165"],["Bucket of 50 balls","GST included","₹82.50"],["Coaching","30 minutes","₹650"]],passes:[],passNote:"No public multi-visit pass pricing found on the official DDA page. Government/student rates are category-specific; confirm eligibility with the course.",amenities:["9-hole course","Driving range","Putting green","Chipping area","Practice bunker","Clubhouse","Parking"],hours:[["Course","Hours vary by season"],["Driving range","Same-day availability through reception"]],policies:[["Dress code","Golf or sports clothing and golf shoes are recommended."],["Cancellation","Refunds and cancellations follow the booking terms."],["What to bring","Golf shoes, water and booking confirmation."]],reviews:[["Vikram T.","A practical option for a short round and range session."],["Meera S.","Useful practice areas for working on the short game."],["Rohan K.","Same-day access through reception operating hours and availability."]],coaches:[["Rohan Malhotra","Golf coach","4.7","Swing basics · Short game"]]},
 hamoni:{address:"CK Farm, Carterpuri, Sector 23A, Gurugram",description:"An open-air golf practice venue with grass and covered bays, floodlights, launch monitors and options for regular practice. Entry, ball buckets and club rental are priced separately.",facts:[["Bays","105"],["Target greens","9"],["Practice greens","4"],["Bunkers","19"]],rates:[["Entry fee","Per person · before GST","₹500"],["Bag of 50 Srixon balls","Per bag · before GST","₹150"],["Club rental","Per club · before GST","₹200"],["HGC Master Pass · 1 month","30 days · before GST","₹12,000"],["HGC Master Pass · 3 months","90 days · before GST","₹24,000"],["HGC Master Pass · 6 months","180 days · before GST","₹50,000"],["HGC Master Pass · 1 year","Before GST","₹80,000"],["Day pass","Eligible elite amateurs / ranked juniors / pros · before GST","₹1,000"],["Adult individual coaching","45 min · coach-dependent · before GST","₹2,000–₹3,000"],["Junior individual coaching","30 / 45 min · coach-dependent · before GST","₹1,600–₹1,800"],["FlightScope golf session","30 minutes · before GST","₹1,500"],["Club fitting service","Per hour · before GST","₹3,000"]],passes:[["HGC Master Pass · 1 month","₹12,000","Unlimited ball rentals + grass bays"],["HGC Master Pass · 3 months","₹24,000","Unlimited ball rentals + grass bays"],["HGC Master Pass · 6 months","₹50,000","Includes Ace Pen access"],["HGC Master Pass · 1 year","₹80,000","Includes Ace Pen access"]],passNote:"Official pricing is subject to an additional 18% GST. Master Pass is personal, non-transferable and non-refundable; it covers unlimited ball rentals and grass-bay access during the pass period.",amenities:["Grass bays","Covered bays","Floodlights","Launch monitors","Pro shop","Parking","Coaching","Practice greens"],hours:[["Monday","Closed"],["Tuesday–Sunday","6 AM–10 PM"]],policies:[["Cancellation","Reschedule before your slot."],["What is included","Entry covers access; balls and club rental are charged separately."],["What to bring","Golf shoes or trainers and your clubs, if you have them."]],reviews:[["Ankit R.","Plenty of space, good mats and launch monitors were easy to reserve."],["Meera S.","Floodlit evenings are convenient for practice."],["Vikram T.","Clean bays and a useful setup for regular range sessions."]],coaches:[["Rohan Malhotra","PGA Professional · 12 years","4.9","Swing basics · Short game"],["Ananya Sethi","Junior & beginner coach · 8 years","4.8","Grip · Stance · Kids programs"]]},
 "dgc-range":{address:"Delhi Golf Club, Lodhi Road, New Delhi",description:"A practice option associated with Delhi Golf Club. Practice bays and range sessions are available to book. Club access rules apply.",facts:[["Bays","60"],["Bay type","Covered and open"],["Floodlit","Yes"],["Technology","Launch monitor"]],rates:[["60-minute bay","Per session · Price","₹900"],["90-minute bay","Per session · Price","₹1,250"],["Launch monitor","Per session · Price","₹1,200"],["Club rental","Per club · Price","₹200"]],passes:[["5 sessions","₹4,000","Bundle offer"],["10 sessions","₹7,500","Bundle offer"]],passNote:"Practice packages",amenities:["Practice bays","Club rental","Coaching","Parking","Pro shop access"],hours:[["Opening hours","Confirm directly with Delhi Golf Club"],["Access","Club access rules may apply"]],policies:[["Access","Check whether your booking includes range access."],["Cancellation","Reschedule according to your booking terms."],["What to bring","Golf clubs, golf shoes and booking confirmation."]],reviews:[["Rohit S.","Convenient for a focused session before a round."],["Karan P.","Confirm access and bay type when booking."],["Ananya D.","A useful option for short practice sessions."]],coaches:[["Rohan Malhotra","PGA Professional","4.9","Swing basics · Short game"]]},
 "qutub-practice":{address:"Qutab Golf Course, Press Enclave Road, New Delhi 110017",description:"A double-decker, night-lit driving range with 28 bays across two levels, a putting area, pro shop, simulator room and cafeteria. The range is closed on Wednesdays.",facts:[["Bays","28 · two levels"],["Length","250 yards"],["Lighting","Night-lit"],["Weekly closure","Wednesday"]],rates:[["Range entry","Non-member · incl. GST","₹165"],["Range entry","Foreigner / NRI · incl. GST","₹330"],["Bucket of 50 balls","Incl. GST","₹110"],["Simulator","1 hour · one person","₹1,000"],["Coaching","Depends on coach category","₹350–₹1,400"]],passes:[["Monthly pay & play","₹25,960","Published monthly total incl. GST"],["5 range visits","₹825","Bundle offer"]],passNote:"Range packages",amenities:["28 driving bays","Night-lit range","Putting area","Pro shop","Simulator room","Cafeteria","Coaching"],hours:[["Summer (Mar–Nov)","6 AM–1 AM"],["Winter (Dec–Feb)","6:30 AM–1 AM"],["Weekly closure","Wednesday"]],policies:[["Range rules","Follow the range's published safety rules and staff instructions."],["Cancellation","Check terms of the selected booking or simulator session."],["What to bring","Clubs and golf shoes; confirm rentals in advance."]],reviews:[["Ankit R.","The night-lit range makes after-work practice possible."],["Meera S.","Useful mix of bays, simulator and putting area."],["Vikram T.","Remember that the range is closed on Wednesdays."]],coaches:[["Arjun Khanna","Golf coach","4.9","Driving · Launch monitor"],["Neha Bedi","Golf coach","4.8","Short game · Beginners"]]},
 "lakeview-practice":{address:"Near Bhalswa Lake, Outer Ring Road, Mukundpur, New Delhi 110042",description:"Practice facilities associated with DDA Lake View Golf Course. Range access and same-day availability should be confirmed with reception before travelling.",facts:[["Course","9 holes"],["Range entry","₹82.50"],["Ball bucket","50 balls"],["Practice areas","Putting and chipping"]],rates:[["Driving range entry · Indian","Per visit · GST included","₹82.50"],["Driving range entry · Foreigner / NRI","Per visit · GST included","₹165"],["Bucket of 50 balls","GST included","₹82.50"],["9 holes · government category","Weekday / weekend · GST included","₹265 / ₹500"],["9 holes · non-government","Weekday / weekend · GST included","₹440 / ₹825"],["18 holes · government category","Weekday / weekend · GST included","₹465 / ₹925"],["18 holes · non-government","Weekday / weekend · GST included","₹770 / ₹1,540"],["Coaching","30 minutes","₹650"]],passes:[],passNote:"No public range-pass or bucket-bundle pricing found on the official DDA page.",amenities:["Driving range","9-hole course","Putting green","Chipping area","Practice bunker","Clubhouse","Parking"],hours:[["Opening hours","Hours vary by season"],["Same-day access","Same-day access through reception"]],policies:[["Availability","Range operations and same-day access may vary; contact reception before travelling."],["Cancellation","Refunds and cancellations follow the booking terms."],["What to bring","Golf shoes, water and booking confirmation."]],reviews:[["Vikram T.","A practical place for range practice and a short round."],["Meera S.","Same-day access through reception the range is operating."],["Rohan K.","The short-game areas are useful for focused practice."]],coaches:[["Rohan Malhotra","Golf coach","4.7","Swing basics · Short game"]]}
}
function VenueDetailsScreen({ venueKey, go, openBooking, openRangeBooking }: { venueKey: VenueKey; go: (screen: CourseFlowScreen) => void; openBooking: (course: BookingCourse, slot?: string) => void; openRangeBooking: (range?: RangeVenue) => void }) {
  const venue = mapVenueCardData(venueKey, () => {}, () => {})
  const info = venueDetailInfo[venueKey]
  const [saved, setSaved] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [selectedPass, setSelectedPass] = useState<number | null>(null)
  const [expandedInfo, setExpandedInfo] = useState<number | null>(null)
  const facility = venue.venueType === "practice"
  const images = [venue.image || photos.course, facility ? photos.course : photos.green, venue.image || photos.course]
  const reviews = venueKey === "dgc" ? 312 : venueKey === "qutub-course" ? 184 : venueKey === "dwarka" ? 128 : venueKey === "lakeview-course" ? 96 : venueKey === "hamoni" ? 228 : venueKey === "qutub-practice" ? 142 : venueKey === "lakeview-practice" ? 96 : 184
  const book = () => {
    if (facility) openRangeBooking(venueKey === "hamoni" ? "hamoni" : venueKey === "lakeview-practice" ? "bhalswa" : "delhi")
    else openBooking({ name: venue.name, image: venue.image || photos.course, price: venueKey === "qutub-course" ? 1100 : venueKey === "karma-lakelands" ? 2400 : venueKey === "dwarka" ? 1080 : venueKey === "lakeview-course" ? 440 : 2500 })
  }
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  const sections = [["overview", "Overview"], ["pricing", "Pricing"], ["coaches", "Coaches"], ["reviews", "Reviews & info"]]
  const goodToKnow: Array<[string, string]> = [["Opening hours", info.hours.map(([day, time]) => day + ": " + time).join(" · ")]]
  return (
    <main className="course-profile-screen venue-details-v8">
      <section className="venue-v8-hero" onClick={() => setGalleryIndex((i) => (i + 1) % images.length)}>
        <img src={images[galleryIndex]} alt={venue.name + " grounds"} />
        <span className="venue-v8-hero-shade" />
        <button type="button" className="venue-v8-icon venue-v8-back" onClick={(e) => { e.stopPropagation(); go(facility ? "rangeDiscover" : "discover") }} aria-label="Go back"><Icon name="chevron" size={20} /></button>
        <div className="venue-v8-actions">
          <button type="button" className="venue-v8-icon" onClick={(e) => { e.stopPropagation(); const url = window.location.href; if (navigator.share) navigator.share({ title: venue.name, text: "View " + venue.name + " on Fore", url }).catch(() => undefined); else { navigator.clipboard?.writeText(url).catch(() => undefined); emitPrototypeEvent("Link copied", "The link to " + venue.name + " is ready to share.") } }} aria-label={"Share " + venue.name}><Icon name="share" size={18} /></button>
          <button type="button" className={"venue-v8-icon " + (saved ? "is-saved" : "")} onClick={(e) => { e.stopPropagation(); setSaved((v) => !v) }} aria-label={saved ? "Remove from saved" : "Save venue"} aria-pressed={saved}><Icon name="heart" size={18} /></button>
        </div>
        <div className="venue-v8-dots" aria-hidden="true">{images.map((_, i) => <i key={i} className={galleryIndex === i ? "active" : ""} />)}</div>
      </section>
      <div className="venue-v8-sheet">
        <header className="venue-v8-heading">
          <h1>{venue.name}</h1>
          <div className="venue-v8-meta">
            <span><Icon name="star" size={15} /><b>{venue.rating}</b> ({reviews} reviews)</span>
            <span><Icon name="pin" size={16} />{venue.locality}{venue.city ? ", " + venue.city : ""}</span>
          </div>
        </header>
        <nav className="venue-v8-tabs" aria-label="Venue details sections">{sections.map(([id, label]) => <button key={id} type="button" onClick={() => scrollTo("venue-v8-" + id)}>{label}</button>)}</nav>
        <div className="venue-v8-content">
          <section id="venue-v8-overview" className="venue-v8-section venue-v8-anchor">
            <div className="venue-v8-stats">{(facility ? info.facts.slice(0, 3) : info.facts.slice(0, 3)).map(([label, value]) => <div className="venue-v8-stat" key={label}><b>{value}</b><span>{label}</span></div>)}</div>
            <div className="venue-v8-section">
              <h2>About</h2><p className="venue-v8-note">{info.description}</p>
            </div>
            {!facility && <div className="venue-v8-section"><h2>The course</h2><div className="venue-v8-card venue-v8-kv">{info.facts.map(([label, value]) => <div key={label}><span>{label}</span><b>{value}</b></div>)}</div></div>}
            <div className="venue-v8-section"><h2>{facility ? "On site" : "Course amenities"}</h2><div className="venue-v8-card venue-v8-amenities">{info.amenities.map((item) => <span key={item}><i><Icon name="check" size={13} /></i>{item}</span>)}</div></div>
          </section>
          <section id="venue-v8-pricing" className="venue-v8-section venue-v8-anchor">
            <div className="venue-v8-section"><h2>{facility ? "Rates" : "Green fees"}</h2><div className="venue-v8-card venue-v8-rates">{info.rates.map(([label, sub, price]) => <div key={label + sub}><span>{label}<small>{sub}</small></span><b>{price}</b></div>)}</div></div>
            {venueKey === "hamoni" && info.passes.length > 0 && <div className="venue-v8-section"><h2>Passes</h2><div className="venue-v8-pass-grid">{info.passes.map(([label, price, note], i) => <button type="button" key={label} className={"venue-v8-pass " + (selectedPass === i ? "selected" : "")} onClick={() => setSelectedPass(selectedPass === i ? null : i)} aria-pressed={selectedPass === i}><span className="venue-v8-pass-tag">{i === 1 ? "POPULAR" : i === info.passes.length - 1 ? "BEST VALUE" : ""}</span><b className="venue-v8-pass-name">{label}</b><strong>{price}</strong><small>{note}</small><span className="venue-v8-check"><Icon name="check" size={12} /></span></button>)}</div></div>}
          </section>
          <section id="venue-v8-coaches" className="venue-v8-section venue-v8-anchor">
            <h2>Coaches</h2><div className="venue-v8-coaches">{info.coaches.map(([name, credential, rating, focus], i) => <article className="venue-v8-card venue-v8-coach" key={name}><div className={"venue-v8-avatar venue-v8-avatar-" + (i % 3)}>{name.split(" ").map((part) => part[0]).join("")}</div><div className="venue-v8-coach-copy"><b>{name}</b><small>{credential}</small><span><Icon name="star" size={12} />{rating}</span><small>{focus}</small><div className="venue-v8-coach-footer"><b>₹{i === 0 ? "1,500" : "1,200"}<small>per 30 min</small></b><button type="button" onClick={() => go("coachDiscover")}>Book lesson</button></div></div></article>)}</div><button type="button" className="venue-v8-more" onClick={() => go("coachDiscover")}>See all coaches <Icon name="arrow" size={15} /></button>
          </section>
          <section id="venue-v8-reviews" className="venue-v8-section venue-v8-anchor">
            <div className="venue-v8-section"><h2>What golfers say</h2><div className="venue-v8-rating"><Icon name="star" size={18} /><b>{venue.rating}</b> from {reviews} golfers</div>{info.reviews.map(([author, quote]) => <div className="venue-v8-card venue-v8-review" key={author}><p>“{quote}”</p><span>{author} · Golfer review</span></div>)}<p className="venue-v8-more">See all {reviews} reviews</p></div>
            <div className="venue-v8-section"><h2>Good to know</h2><div className="venue-v8-accordion">{goodToKnow.map(([title, body], i) => <div key={title}><button type="button" aria-expanded={expandedInfo === i} onClick={() => setExpandedInfo(expandedInfo === i ? null : i)}>{title}<Icon name="chevron" size={16} /></button>{expandedInfo === i && <p>{body}</p>}</div>)}</div></div>
            <div className="venue-v8-section"><h2>Getting there</h2><div className="venue-v8-map"><span className="venue-v8-map-park a" /><span className="venue-v8-map-park b" /><span className="venue-v8-map-road a" /><span className="venue-v8-map-road b" /><span className="venue-v8-map-label">{venue.locality}</span><span className="venue-v8-map-marker"><Icon name="pin" size={19} /></span></div><div className="venue-v8-address"><span>{info.address}</span><button type="button" onClick={() => emitPrototypeEvent("Directions", "Open directions to " + venue.name + ": " + info.address)}>Directions <Icon name="arrow" size={14} /></button></div></div>
          </section>
        </div>
      </div>
      <div className="venue-v8-cta"><div><small>{selectedPass !== null ? info.passes[selectedPass][0] : facility ? "Entry, per person" : "18 holes, weekday"}</small><b>{selectedPass !== null ? info.passes[selectedPass][1] : "from " + venue.price}</b></div><button type="button" onClick={book}>{selectedPass !== null ? "Buy pass" : facility ? "Book a bay" : "Book a tee time"} <Icon name="arrow" size={16} /></button></div>
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
  hamoni = false,
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
  hamoni?: boolean
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
  const entryFee = hamoni ? 500 : 900
  const ballPrice = hamoni ? 150 : 350
  const total = entryFee + bucketCount * ballPrice
  const venueName = hamoni ? "Hamoni Golf Camp" : "Delhi Golf Club Range"
  const paymentLabel = paymentMethod === "Net banking" ? "Net banking" : paymentMethod

  useEffect(() => {
    if (step !== "payment") return
    const timer = window.setTimeout(complete, 2000)
    return () => window.clearTimeout(timer)
  }, [step, complete])

  return (
    <main className="booking-flow-page" aria-label={`Book ${venueName}`}>
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
            <strong>{venueName}</strong>
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
              <div className="booking-modern-section-heading"><h2>Ball buckets</h2><span>₹{ballPrice} each</span></div>
              <div className="range-bucket-input">
                <button type="button" onClick={() => setBucketCount(Math.max(0, bucketCount - 1))} disabled={bucketCount === 0} aria-label="Remove bucket">−</button>
                <label><strong>{bucketCount}</strong><span>{bucketCount === 1 ? "bucket" : "buckets"}</span></label>
                <button type="button" onClick={() => setBucketCount(bucketCount + 1)} aria-label="Add bucket">+</button>
              </div>
              <small className="range-bucket-hint">{hamoni ? "1 bag = 50 Srixon balls. Entry fee is ₹500 per person." : "Add as many practice ball buckets as you need."}</small>
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
  const [selectedInstrument, setSelectedInstrument] = useState("GPay")
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
          {method === "UPI" && <div className="payment-choice-list">{["GPay", "PhonePe", "Paytm", "arjun@upi"].map(item => <button className={selectedInstrument === item ? "selected" : ""} onClick={() => setSelectedInstrument(item)} key={item}><span className="payment-logo">{item[0]}</span><strong>{item}</strong><i>{selectedInstrument === item && <Icon name="check" size={13} />}</i></button>)}</div>}
          {method === "Cards" && <button className="saved-card selected" onClick={() => setSelectedInstrument("Visa ending 4218")}><span>HDFC</span><div><strong>Visa ending 4218</strong><small>Expires 08/28</small></div><Icon name="check" /></button>}
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
        <button data-prototype="Calendar event added" data-prototype-body="Add this booking to your calendar."><Icon name="calendar" /><span>Add to calendar</span><Icon name="chevron" /></button>
        <button data-prototype="Directions" data-prototype-body="View directions and travel details."><Icon name="directions" /><span>Get directions</span><Icon name="chevron" /></button>
        <button data-prototype="Invite players" data-prototype-body="Share this booking with your playing partners."><Icon name="share" /><span>Invite players</span><Icon name="chevron" /></button>
      </div>
      <p className="confirmation-note"><Icon name="shield" size={14} /> Free cancellation until 24 hours before your tee time</p>
      <div className="bring-card"><strong>What to bring</strong><span>Collared shirt · Golf shoes · Photo ID</span></div>
      <p className="points-earned">+240 points earned <span>· </span></p>
      <button className="confirmation-cross-sell" onClick={() => go("coachProfile")}><span><Avatar initials="RM" /><Avatar initials="AR" /></span><div><strong>Add a lesson at this course</strong><small>2 coaches teach at {course.name}</small></div><Icon name="chevron" /></button>
      {reminders === null ? <div className="notification-primer"><Icon name="bell" /><div><strong>Get reminders before your tee time</strong><small>Allow Fore! to send booking updates.</small><span><button onClick={() => setReminders(true)}>Allow</button><button onClick={() => setReminders(false)}>Not now</button></span></div></div> : <p className="primer-response">{reminders ? "Reminders enabled" : "You can enable reminders later in Settings"}</p>}
      <button className="primary-button confirmation-primary" onClick={() => go("bookingDetail")}>View booking</button>
      <button className="confirmation-home-link" onClick={() => go("discover")}>Back to Home</button>
    </main>
  )
}

function MyBookingsScreen({ go }: { go: (screen: CourseFlowScreen) => void }) {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming")
  return <main className="screen my-bookings-screen"><FlowHeader title="My bookings" back={() => go("confirmation")} /><div className="segment booking-history-tabs"><button className={tab === "upcoming" ? "active" : ""} onClick={() => setTab("upcoming")}>Upcoming</button><button className={tab === "past" ? "active" : ""} onClick={() => setTab("past")}>Past</button></div>{tab === "upcoming" ? <><h2>Tee times</h2><button className="booking-history-row" onClick={() => go("bookingDetail")}><img src={photos.course} alt="" /><span><ConfirmedBadge /><strong>Delhi Golf Club</strong><small>Sat 22 Aug · 7:30 AM · 4 players</small></span><Icon name="chevron" /></button><h2>Lessons</h2><button className="booking-history-row" onClick={() => go("coachBookingConfirmed")}><Avatar initials="RM" /><span><ConfirmedBadge /><strong>Rohan Malhotra</strong><small>Fri 21 Aug · 7:00 AM · Individual lesson</small></span><Icon name="chevron" /></button><h2>Range</h2><button className="booking-history-row" onClick={() => go("rangeDetail")}><span className="range-icon"><Icon name="flag" /></span><span><ConfirmedBadge /><strong>Delhi Golf Club Range</strong><small>Thu 20 Aug · 6:30 PM · 1 bucket</small></span><Icon name="chevron" /></button></> : <><h2>Past tee times</h2><button className="booking-history-row" data-prototype="Round history" data-prototype-body="View the completed Delhi Golf Club round and scorecard."><img src={photos.course} alt="" /><span><strong>Delhi Golf Club</strong><small>18 Aug · 18 holes · Score 91</small></span><Icon name="chevron" /></button><button className="booking-history-row" data-prototype="Round history" data-prototype-body="View the completed Noida Golf Course round and scorecard."><img src={photos.course} alt="" /><span><strong>Noida Golf Course</strong><small>10 Aug · 18 holes · Score 89</small></span><Icon name="chevron" /></button><h2>Past lessons</h2><button className="booking-history-row" data-prototype="Lesson history" data-prototype-body="Review your past lesson notes, feedback and outcomes."><Avatar initials="RM" /><span><strong>Rohan Malhotra</strong><small>14 Aug · Short game · Completed</small></span><Icon name="chevron" /></button></>}</main>
}

function BookingDetailScreen({ go }: { go: (screen: CourseFlowScreen) => void }) {
  const [cancelOpen, setCancelOpen] = useState(false)
  return (
    <main className="screen booking-detail-screen">
      <FlowHeader title="Booking details" back={() => go("bookings")} />
      <div className="booking-detail-status"><ConfirmedBadge /><h1>Delhi Golf Club</h1><p>Sat 22 Aug · 7:30 AM · 4 players</p></div>
      <div className="detail-summary-card"><div><span><Icon name="calendar" /></span><p><small>DATE & TIME</small><strong>Saturday, 22 August</strong><em>7:30 AM</em></p></div><div><span><Icon name="users" /></span><p><small>PLAYERS</small><strong>4 players</strong><em>Arjun Kapoor + 3 guests</em></p></div><div><span><Icon name="wallet" /></span><p><small>PAID</small><strong>₹10,000</strong><em>UPI · arjun@upi</em></p></div></div>
      <button className="booking-map-card" data-prototype="Directions" data-prototype-body="View directions and travel details."><span><Icon name="map" size={25} /></span><div><strong>Delhi Golf Club</strong><small>Lodhi Road · 2.1 km</small></div><Icon name="directions" /></button>
      <div className="booking-manage-actions"><button className="primary-button" data-prototype="Change tee time" data-prototype-body="Choose another available tee time and confirm the change.">Change time</button><button onClick={() => setCancelOpen(true)}>Cancel booking</button></div>
      <div className="detail-links"><button data-prototype="Receipt" data-prototype-body="Booking receipt and payment breakdown.">View receipt <Icon name="chevron" /></button><button data-prototype="Contact course" data-prototype-body="Contact the course for booking support.">Contact the course <Icon name="chevron" /></button></div>
      {cancelOpen && <div className="sheet-backdrop" onClick={() => setCancelOpen(false)}><div className="sheet cancel-sheet" onClick={(event) => event.stopPropagation()}><div className="sheet-handle" /><div className="sheet-title"><span><p className="eyebrow">CANCEL BOOKING</p><h2>Cancel this tee time?</h2></span><button onClick={() => setCancelOpen(false)}><Icon name="close" /></button></div><p>You’ll receive a full refund because you’re cancelling more than 24 hours before the tee time.</p><div className="refund-row"><span>Refund to arjun@upi</span><strong>₹10,000</strong></div><button className="cancel-confirm-button" data-prototype="Booking cancelled" data-prototype-body="Cancel this tee time and refund ₹10,000 to the original UPI method.">Cancel and refund ₹10,000</button><button className="primary-button" onClick={() => setCancelOpen(false)}>Keep booking</button></div></div>}
    </main>
  )
}

type RangeAvailabilityState = "ready" | "loading" | "empty" | "offline"

function RangeDiscoverScreen({
  go,
  openSearch,
  setMode,
  openRangeBooking,
  openVenueDetails,
}: {
  go: (screen: CourseFlowScreen) => void
  openSearch: () => void
  setMode: (mode: "courses" | "ranges" | "coaches") => void
  openRangeBooking: (range?: RangeVenue) => void
  openVenueDetails: (key: VenueKey) => void
}) {
  return (
    <main className="screen booking-discover-screen range-discover-screen">
      <SectionHeading title="Book Again" />
      <VenueCard variant="default" {...mapVenueCardData("hamoni", () => openVenueDetails("hamoni"), () => openRangeBooking("hamoni"), true)} />
      <SectionHeading title="Near you" />
      <div className="near-you-range-list">
        <VenueCard variant="default" {...mapVenueCardData("hamoni", () => openVenueDetails("hamoni"), () => openRangeBooking("hamoni"), true)} />
        <VenueCard variant="default" {...mapVenueCardData("dgc-range", () => openVenueDetails("dgc-range"), openRangeBooking)} />
        <VenueCard variant="default" {...mapVenueCardData("qutub-practice", () => openVenueDetails("qutub-practice"), openRangeBooking)} />
        <VenueCard variant="default" {...mapVenueCardData("lakeview-practice", () => openVenueDetails("lakeview-practice"), () => emitPrototypeEvent("Contact Lake View Golf Course", "Call reception on 8800639123 (10 AM–5 PM) to confirm range availability and booking procedures."))} />
      </div>
    </main>
  )
}
function RangeProfileScreen({ go, openRangeBooking, hamoni = false, bhalswa = false }: { go: (screen: CourseFlowScreen) => void; openRangeBooking: (range?: RangeVenue) => void; hamoni?: boolean; bhalswa?: boolean }) {
  const [saved, setSaved] = useState(false)
  const name = bhalswa ? "DDA Lake View Golf Course" : hamoni ? "Hamoni Golf Camp" : "Delhi Golf Club Range"
  const rating = hamoni ? "4.8" : bhalswa ? "4.0" : "4.6"
  const reviewCount = hamoni ? 228 : bhalswa ? 0 : 184
  const area = bhalswa ? "Bhalswa Lake, North Delhi" : hamoni ? "Sector 23A, Gurugram" : "Lodhi Road, Delhi"
  const address = bhalswa ? "DDA Lake View Golf Course, near Bhalswa Lake, Outer Ring Road, Mukundpur, New Delhi 110042" : hamoni ? "CK Farm, Carterpuri, Sector 23A, Gurugram" : "Lodhi Road, Delhi"
  const facts = bhalswa ? [["Driving bays", "10"], ["Driving range", "220 yards"], ["Course", "9 holes"], ["Practice areas", "Putting, chipping & bunker"]] : hamoni ? [["Bays", "105"], ["Target greens", "9"], ["Practice greens", "4"], ["Bunkers", "19"]] : [["Bays", "60"], ["Covered / open", "Mixed"], ["Floodlit", "Yes"], ["Launch monitors", "TrackMan"]]
  const rates = bhalswa ? [["Driving range entry (Indian)", "per visit · GST included", "₹82.50"], ["Bucket of 50 balls", "GST included", "₹82.50"], ["9 holes · non-government", "weekday · GST included", "₹440"], ["9 holes · non-government", "weekend/holiday · GST included", "₹825"], ["18 holes · repeat 9 · non-government", "weekday · GST included", "₹770"], ["18 holes · repeat 9 · non-government", "weekend/holiday · GST included", "₹1,540"], ["9 holes · government category", "weekday / weekend", "₹265 / ₹500"], ["Coaching", "30 minutes", "₹650"]] : hamoni ? [["Entry fee", "per person", "₹500"], ["Bag of 50 Srixon balls", "per bag", "₹150"], ["Club rental", "per club", "₹200"]] : [["60-minute bay", "per session", "₹900"], ["90-minute bay", "per session", "₹1,250"], ["Launch monitor", "per session", "₹1,200"]]
  const passes = [["1 month", "₹12,000", "Monthly access"], ["3 months", "₹24,000", "Save 33% · Most popular"], ["6 months", "₹50,000", "Save 31%"], ["1 year", "₹80,000", "Save 44% · Best value"]]
  const [selectedPassIndex, setSelectedPassIndex] = useState(1)
  const amenities = bhalswa ? ["9-hole course", "Driving range", "Putting green", "Chipping area", "Practice bunker", "Clubhouse", "Parking"] : hamoni ? ["Grass bays", "Covered bays", "Floodlights", "Launch monitors", "Pro shop", "Parking"] : ["Covered bays", "Floodlights", "Launch monitors", "Club rental", "Parking"]
  const selectedPass = passes[selectedPassIndex]
  const book = () => bhalswa ? emitPrototypeEvent("Contact Lake View Golf Course", "Call reception on 8800639123 (10 AM–5 PM) to confirm range availability and booking.") : openRangeBooking(hamoni ? "hamoni" : "delhi")
  return (
    <main className="course-profile-screen range-profile-screen range-template-detail">
      <section className="facility-template-hero">
        <img src={photos.golfer} alt={name} />
        <span className="facility-template-hero-gradient" />
        <button type="button" className="facility-hero-button facility-hero-back" onClick={() => go("rangeDiscover")} aria-label="Go back"><Icon name="chevron" size={20} /></button>
        <button type="button" className="facility-hero-button facility-hero-share" onClick={() => {
          const facilityUrl = new URL(window.location.href)
          facilityUrl.searchParams.set("facility", hamoni ? "hamoni" : "range")
          const shareData = { title: name, text: `Check out ${name} on Fore`, url: facilityUrl.toString() }
          if (navigator.share) navigator.share(shareData).catch(() => undefined)
          else {
            navigator.clipboard?.writeText(shareData.url).catch(() => undefined)
            emitPrototypeEvent("Facility link copied", `The direct link to ${name} was copied to your clipboard.`)
          }
        }} aria-label={`Share ${name}`}><Icon name="share" size={19} /></button>
        <button type="button" className={`facility-hero-button facility-hero-save ${saved ? "saved" : ""}`} onClick={() => setSaved((value) => !value)} aria-label={saved ? "Remove facility from saved" : "Save facility"} aria-pressed={saved}><Icon name="heart" size={20} /></button>
      </section>
      <div className="facility-template-content">
        <header className="facility-template-heading">
          <h1>{name}</h1>
          <div className="facility-template-stat"><span><Icon name="star" size={15} /><strong>{rating}</strong> ({reviewCount} reviews)</span><span className="facility-location-stat"><span className="facility-location-icon"><Icon name="pin" size={15} /></span><strong>{area}</strong></span></div>
        </header>
        <section className="facility-template-section"><h2>At a glance</h2><table className="facility-score"><tbody>{!bhalswa && <tr><td>Open</td><th>{hamoni ? "Tue – Sun, 6 AM – 10 PM" : "Daily, 6 AM – 9 PM"}</th></tr>}{facts.map(([label, value]) => <tr key={label}><td>{label}</td><th>{value}</th></tr>)}</tbody></table></section>
        <section className="facility-template-section"><h2>Rates</h2><div className="facility-rate-list">{rates.filter(([label]) => !/18 holes|13 holes/i.test(label)).slice(0, 5).map(([label, sub, price]) => <div className="facility-rate" key={label}><span><b>{label.replace(/\s*\([^)]*\)/g, "")}</b></span><strong>{price}</strong></div>)}</div></section>
        {hamoni && <section className="facility-template-section"><h2>Passes</h2><div className="facility-pass-list" role="radiogroup" aria-label="Choose a pass">{passes.map(([label, price, note], index) => {
          const selected = index === selectedPassIndex
          const badge = index === 1 ? "Most popular" : index === 3 ? "Best value" : ""
          const saving = index === 1 ? "Save 33%" : index === 2 ? "Save 31%" : index === 3 ? "Save 44%" : ""
          return <button type="button" role="radio" aria-checked={selected} className={`facility-pass ${selected ? "selected" : ""}`} key={label} onClick={() => setSelectedPassIndex(index)}>
            {badge && <span className="facility-pass-badge">{badge}</span>}
            <span className="facility-pass-radio" aria-hidden="true" />
            <span className="facility-pass-copy"><b>{label}</b><small>{note}</small></span>
            <span className="facility-pass-price"><strong>{price}</strong>{saving && <small>{saving}</small>}</span>
          </button>
        })}</div><button type="button" className="primary-button facility-pass-button" onClick={() => emitPrototypeEvent("Select facility pass", `Selected ${selectedPass[0]} pass at ${name} for ${selectedPass[1]}.`)}>{`Continue with ${selectedPass[0]} · ${selectedPass[1]}`}</button></section>}
        <section className="facility-template-section"><h2>On site</h2><div className="facility-amenities">{amenities.map((item) => <span key={item}><Icon name="check" size={15} />{item}</span>)}</div></section>
        {!bhalswa && <section className="facility-template-section"><h2>Coaching here</h2><button className="facility-coach-card" onClick={() => go("coachProfile")}><Avatar initials="RM" /><span><b>Rohan Malhotra</b><small>PGA Professional · 12 yrs · 4.9</small></span><Icon name="chevron" /></button></section>}
        <section className="facility-template-section"><h2>Getting there</h2><div className="facility-map-graphic" role="img" aria-label={`Map showing the location of ${name}`}>
          <span className="facility-map-road facility-map-road-a" aria-hidden="true" />
          <span className="facility-map-road facility-map-road-b" aria-hidden="true" />
          <span className="facility-map-road facility-map-road-c" aria-hidden="true" />
          <span className="facility-map-park facility-map-park-a" aria-hidden="true" />
          <span className="facility-map-park facility-map-park-b" aria-hidden="true" />
          <span className="facility-map-label facility-map-label-a" aria-hidden="true">Lodhi Road</span>
          <span className="facility-map-label facility-map-label-b" aria-hidden="true">Golf area</span>
          <span className="facility-map-marker" aria-hidden="true"><Icon name="pin" size={18} /></span>
        </div><button className="facility-directions" data-prototype="Directions" data-prototype-body="View directions and travel details."><span><b>{name}</b><small>{address}</small></span><strong>Directions</strong></button></section>
        {!bhalswa && <section className="facility-template-section facility-reviews"><h2><Icon name="star" size={18} /> {rating} from {reviewCount} golfers</h2><blockquote>“Plenty of space, good mats, and launch monitors were easy to reserve.”</blockquote><small>Ankit R. · 6 days ago</small></section>}
      </div>
      <div className="facility-template-action"><button type="button" className="primary-button" onClick={book}>{bhalswa ? "Contact range" : "Book a bay"} <Icon name="arrow" size={16} /></button></div>
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
  const [selectedDate, setSelectedDate] = useState("20")
  const times = ["6:30 AM","7:00 AM","7:30 AM","8:00 AM","8:30 AM","9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","2:00 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM"]
  return (
    <main className="screen range-select-screen">
      <FlowHeader title="Delhi Golf Club Range" back={() => go("rangeProfile")} />
      {state === "offline" && <div className="booking-banner offline-banner"><Icon name="shield" /><span><strong>You’re offline</strong><small>Showing the last saved availability.</small></span></div>}
      <div className="tee-date-strip range-date-strip">{[["Thu","20"],["Fri","21"],["Sat","22"],["Sun","23"],["Mon","24"]].map(([day,date]) => <button className={selectedDate === date ? "selected" : ""} onClick={() => setSelectedDate(date)} key={date}><small>{day}</small><strong>{date}</strong><em>{date === "20" ? "Today" : "Open"}</em></button>)}</div>
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
      {addonsOpen && <div className="addon-panel range-addons"><button className={bucket ? "selected" : ""} onClick={() => setBucket(!bucket)}><span><strong>Ball bucket</strong><small>Fresh practice balls · ₹350</small></span><i>{bucket && <Icon name="check" size={13} />}</i></button><button><span><strong>Rental equipment</strong><small>TaylorMade Qi10 set · ₹2,500</small></span><Icon name="plus" size={16} /></button><button onClick={() => go("coachProfile")}><Avatar initials="RM" /><span><strong>Add a coach</strong><small>Rohan Malhotra · from ₹1,800</small></span><Icon name="chevron" /></button></div>}
      <button className="range-savings-card" data-prototype="Range package" data-prototype-body="Review range packages and choose an option."><span><Icon name="spark" /></span><div><small>PLAYING OFTEN?</small><strong>Save with a 10 Bucket Pack</strong><p>10 visits · ₹2,975 · Save 15%</p></div><Icon name="chevron" /></button>
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
      <button className="confirmation-cross-sell" onClick={() => go("coachProfile")}><span><Avatar initials="RM" /></span><div><strong>Add a coach to your session</strong><small>Rohan Malhotra · PGA Professional · 4.9</small></div><Icon name="chevron" /></button>
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
      <div className="detail-links"><button data-prototype="Range receipt" data-prototype-body="Range booking receipt.">View receipt <Icon name="chevron" /></button><button data-prototype="Contact range" data-prototype-body="Contact the range for booking support.">Contact the range <Icon name="chevron" /></button></div>
      {cancelOpen && <div className="sheet-backdrop" onClick={() => setCancelOpen(false)}><div className="sheet cancel-sheet" onClick={(event) => event.stopPropagation()}><div className="sheet-handle" /><div className="sheet-title"><span><p className="eyebrow">CANCEL RANGE</p><h2>Cancel this bay?</h2></span><button onClick={() => setCancelOpen(false)}><Icon name="close" /></button></div><p>You’re eligible for a full refund to your original UPI method.</p><div className="refund-row"><span>Refund amount</span><strong>₹1,250</strong></div><button className="cancel-confirm-button" data-prototype="Range booking cancelled" data-prototype-body="Cancel this bay and refund the eligible amount.">Cancel and refund</button><button className="primary-button" onClick={() => setCancelOpen(false)}>Keep booking</button></div></div>}
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
  const rohan = name === "Rohan Malhotra"
  const specialties = rohan ? ["Short game", "Swing", "Course play"] : name === "Ananya Sethi" ? ["Beginners", "Junior"] : ["Swing", "Driver"]
  return (
    <article className="coach-card">
      <button className="coach-card-main" onClick={onOpen}>
        <div className="coach-card-image">
          {image ? <img src={image} alt={name + " coaching"} /> : <div className="coach-photo-fallback"><Avatar initials={name.split(" ").map((part) => part[0]).join("")} /></div>}
          <span className="coach-status-pill">{rohan ? "PGA Professional" : "Available this week"}</span>
          <span className="coach-rating-pill"><Icon name="star" size={13} /> {rating}</span>
        </div>
        <div className="coach-card-copy">
          <div className="coach-card-title-row">
            <div>
              <h3>{name}</h3>
              <p><Icon name="pin" size={14} /> Delhi · {rohan ? "2.1 km" : "5.4 km"}</p>
            </div>
            <button type="button" className={"coach-save-button " + (saved ? "saved" : "")} onClick={(event) => { event.stopPropagation(); setSaved(!saved) }} aria-label={saved ? "Remove saved coach" : "Save coach"}>
              <Icon name="heart" size={18} />
            </button>
          </div>
          <div className="coach-specialties">
            {specialties.map((item) => <span key={item}>{item}</span>)}
          </div>
          <div className="coach-card-meta">
            <span>{rohan ? "Next available tomorrow" : "Available this week"}</span>
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
        <CoachCard name="Rohan Malhotra" rating="4.9" price={1800} image={photos.golfer} onOpen={() => go("coachProfile")} onBook={() => go("coachLesson")} />
        <SectionHeading title="Near you" />
        <div className="near-you-coach-list">
          <CoachCard name="Rohan Malhotra" rating="4.9" price={1800} image={photos.golfer} onOpen={() => go("coachProfile")} onBook={() => go("coachLesson")} />
          <CoachCard name="Ananya Sethi" rating="4.8" price={1500} image={photos.golfer} onOpen={() => go("coachProfile")} onBook={() => go("coachLesson")} />
          <CoachCard name="Kabir Mehra" rating="4.7" price={2200} image={photos.golfer} onOpen={() => go("coachProfile")} onBook={() => go("coachLesson")} />
        </div>
      </>}
    </main>
  )
}

function CoachProfileScreen({go,connectionStatus,onConnect}:{go:(screen:CourseFlowScreen)=>void;connectionStatus:ConnectionStatus;onConnect:()=>void}){
  return (
    <main className="course-profile-screen coach-profile-booking-screen">
      <div className="course-profile-hero"><img src={photos.golfer} alt="Rohan Malhotra coaching" /><button onClick={() => go("coachDiscover")}><Icon name="chevron" /></button><button data-prototype="Coach saved" data-prototype-body="Rohan Malhotra has been saved to your coaches."><Icon name="heart" /></button></div>
      <div className="course-profile-content">
        <p className="eyebrow">PGA PROFESSIOASL · 12 YEARS</p>
        <div className="course-title-row"><h1>Rohan Malhotra</h1><span className="rating"><Icon name="star" size={14} /> 4.9 (86)</span></div>
        <div className="specialty-pills large"><i>Short game</i><i>Swing</i><i>Course play</i></div><section className="coach-connection-panel"><div><small>COACH CONNECTION</small><strong>{connectionStatus==="connected"?"You’re connected":connectionStatus==="pending"?"Request pending":"Build an ongoing coaching relationship"}</strong><span>{connectionStatus==="connected"?"Your lessons, feedback and practice plan are linked.":connectionStatus==="pending"?"Rohan will review your profile and goals.":"Connect first to keep coaching, feedback and drills together."}</span></div>{connectionStatus==="none"&&<button type="button" onClick={onConnect}>Connect</button>}{connectionStatus==="pending"&&<span className="connection-badge pending"><Icon name="clock" size={13}/> Pending</span>}{connectionStatus==="connected"&&<span className="connection-badge"><Icon name="check" size={13}/> Connected</span>}</section>
        <h2>About Rohan</h2><p className="body-copy">I help golfers build simple, repeatable technique and make better decisions on the course. Every session ends with a clear practice plan. <button data-prototype="Coach bio" data-prototype-body="Learn more about Rohan’s coaching philosophy and experience.">Read more</button></p>
        <h2>Lesson types</h2>
        <div className="coach-profile-lessons">{[["Individual lesson","60 min","₹1,800"],["Playing lesson","9 holes","₹3,500"],["Junior lesson","45 min","₹1,500"]].map(([title,duration,price]) => <button key={title} onClick={() => go("coachLesson")}><span><strong>{title}</strong><small>{duration}</small></span><b>{price}</b><Icon name="chevron" /></button>)}</div>
        <button className="coach-package-card" onClick={() => go("coachCheckout")}><span><small>BEST VALUE · SAVE 10%</small><strong>12-lesson pack</strong><p>12 individual lessons · Flexible scheduling</p></span><b>₹19,440</b></button>
        <h2>Teaching locations</h2>
        <div className="teaching-locations"><button data-prototype="Teaching location" data-prototype-body="View teaching details and directions for Delhi Golf Club."><span><Icon name="pin" /></span><div><strong>Delhi Golf Club</strong><small>Lodhi Road · 2.1 km</small></div><Icon name="chevron" /></button><button data-prototype="Teaching location" data-prototype-body="View teaching details and directions for Qutub Golf Course."><span><Icon name="pin" /></span><div><strong>Qutub Golf Course</strong><small>Mehrauli · 5.4 km</small></div><Icon name="chevron" /></button></div>
        <div className="profile-section-heading"><h2>Next available</h2><button onClick={() => go("coachDateTime")}>View calendar</button></div>
        <div className="availability-slots coach-availability-preview">{["Tomorrow 7:00","Tomorrow 9:30","Fri 4:00"].map((slot) => <button key={slot} onClick={() => go("coachDateTime")}><strong>{slot}</strong><span>Delhi Golf Club</span></button>)}</div>
        <div className="profile-section-heading"><h2>Reviews</h2><button data-prototype="Coach reviews" data-prototype-body="Read all 86 coach reviews.">See all 86</button></div>
        <div className="profile-review"><span>★★★★★</span><p>“Rohan made my short game feel simple and gave me a plan I can actually repeat.”</p><small>Armaan K. · 10 days ago</small></div>
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
    <main className="booking-flow-page coach-modern-flow coach-premium-flow" aria-label="Book a lesson with Rohan Malhotra">
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
            <strong>Rohan Malhotra</strong>
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
            <strong>Rohan Malhotra</strong>
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
              <p>Try another day or ask Rohan for a different time.</p>
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
            <strong>Rohan Malhotra</strong>
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
              <textarea value={notes} onChange={event=>setNotes(event.target.value)} placeholder="Anything you'd like Rohan to know?" />
            </div>
          </details>

          <p className="coach-premium-authorise">No charge unless Rohan accepts</p>
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
      <PendingBadge /><h1>Request sent</h1><p>Waiting for Rohan to accept.</p>
      <div className="request-timeline">{[["Request sent","Complete"],["Coach accepts","Waiting"],["Payment charged","After acceptance"],["Lesson","Fri 21 Aug · 7:00 AM"]].map(([title,note],index) => <div className={index === 0 ? "complete" : ""} key={title}><i>{index === 0 ? <Icon name="check" size={12} /> : index + 1}</i><span><strong>{title}</strong><small>{note}</small></span></div>)}</div>
      <button className="primary-button message-rohan" data-prototype="Message coach" data-prototype-body="Open your conversation with the coach."><Icon name="message" size={17} /> Message Rohan</button>
      <button className="secondary-request-button" onClick={() => go("coachBookingPending")}>View request</button>
      <p className="calendar-pending-note"><Icon name="calendar" size={15} /> Add to calendar once confirmed</p>
      {reminders === null ? <div className="notification-primer"><Icon name="bell" /><div><strong>Get notified when Rohan responds</strong><small>Allow Fore! to send request updates.</small><span><button onClick={() => setReminders(true)}>Allow</button><button onClick={() => setReminders(false)}>Not now</button></span></div></div> : <p className="primer-response">{reminders ? "Request notifications enabled" : "You can enable notifications later"}</p>}
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
      <div className={`booking-detail-status ${status.toLowerCase()}`}>{status === "Pending" ? <PendingBadge /> : <ConfirmedBadge />}<h1>{status === "Pending" ? "Waiting for Rohan" : "Lesson confirmed"}</h1><p>Individual lesson · Fri 21 Aug · 7:00 AM</p></div>
      <div className="detail-summary-card"><div><span><Icon name="user" /></span><p><small>COACH</small><strong>Rohan Malhotra</strong><em>PGA Professional · 4.9</em></p></div><div><span><Icon name="calendar" /></span><p><small>DATE & TIME</small><strong>Friday, 21 August</strong><em>7:00–8:00 AM</em></p></div><div><span><Icon name="pin" /></span><p><small>LOCATION</small><strong>Delhi Golf Club</strong><em>Lodhi Road · 2.1 km</em></p></div><div><span><Icon name="wallet" /></span><p><small>PAYMENT</small><strong>₹1,800</strong><em>{status === "Pending" ? "Authorised · Not charged" : "Charged to arjun@upi"}</em></p></div></div>
      {status === "Pending" ? <div className="booking-manage-actions coach-pending-actions"><button className="primary-button" data-prototype="Message coach" data-prototype-body="Open your conversation with the coach."><Icon name="message" size={16} /> Message coach</button><button data-prototype="Request cancelled" data-prototype-body="Cancel this pending lesson request with no charge.">Cancel request · Free</button></div> : <div className="booking-manage-actions"><button className="primary-button" data-prototype="Calendar event added" data-prototype-body="Add this lesson to your calendar."><Icon name="calendar" size={16} /> Add to calendar</button><button className="coach-reschedule-button" data-prototype="Reschedule lesson" data-prototype-body="Choose another lesson date and time. Choose another lesson date and time.">Reschedule</button></div>}
    </main>
  )
}

function CoachDeclinedScreen({ go }: { go: (screen: CourseFlowScreen) => void }) {
  return (
    <main className="screen coach-declined-screen">
      <FlowHeader title="Request update" back={() => go("coachBookingPending")} />
      <div className="declined-head"><span><Icon name="close" size={25} /></span><h1>Rohan couldn’t accept</h1><p>You weren’t charged. Try one of his nearby times or another coach.</p></div>
      <h2>Alternative times with Rohan</h2>
      <div className="declined-time-chips">{["Fri 9:30 AM","Sat 7:00 AM","Mon 4:00 PM"].map((time) => <button onClick={() => go("coachDateTime")} key={time}>{time}</button>)}</div>
      <h2>Similar coaches</h2>
      <CoachCard name="Ananya Sethi" rating="4.8" price={1500} onOpen={() => go("coachProfile")} onBook={() => go("coachLesson")} />
      <CoachCard name="Kabir Mehra" rating="4.7" price={2200} onOpen={() => go("coachProfile")} onBook={() => go("coachLesson")} />
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
        <h2>Facilities</h2><button onClick={() => { close(); go("rangeProfile") }}><Icon name="pin" /><span><strong>Delhi Golf Club Range</strong><small>2.8 km · 42 of 60 bays occupied</small></span><Icon name="chevron" /></button>
        <h2>Coaches</h2><button onClick={() => { close(); go("coachProfile") }}><Avatar initials="RM" /><span><strong>Rohan Malhotra</strong><small>PGA Professional · 4.9</small></span><Icon name="chevron" /></button>
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
  initialScreen: requestedInitialScreen,
}: {
  onModuleStateChange: (active: boolean, section?: DiscoverSection) => void
  initialSection: DiscoverSection
  searchRequest: number
  initialScreen?: CourseFlowScreen
}) {
  const initialScreen: CourseFlowScreen =
    requestedInitialScreen ??
    (initialSection === "Facilities" ? "rangeDiscover" :
    initialSection === "Coaches" ? "coachDiscover" : "discover")
  const initialMode = initialSection === "Facilities" ? "ranges" : initialSection === "Coaches" ? "coaches" : "courses"
  const [screen, setScreen] = useState<CourseFlowScreen>(initialScreen)
  const [selectedVenueKey, setSelectedVenueKey] = useState<VenueKey>("dgc")
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
    const section: DiscoverSection = screen === "venueDetails" ? (["hamoni","dgc-range","qutub-practice","lakeview-practice"].includes(selectedVenueKey) ? "Facilities" : "Courses") : screen === "hamoniRangeProfile" || screen.startsWith("range") ? "Facilities" : screen.startsWith("coach") ? "Coaches" : "Courses"
    onModuleStateChange(active, section, screen)
  }, [screen, bookingOpen, filtersOpen, searchOpen, paymentOpen, onModuleStateChange])

  const go = (next: CourseFlowScreen) => {
    setScreen(next)
    if (next === "discover") {
      setMode("courses")
      onModuleStateChange(false, "Courses", next)
      return
    }
    if (next === "hamoniRangeProfile" || next.startsWith("range")) {
      setMode("ranges")
      onModuleStateChange(true, "Facilities", next)
      return
    }
    if (next.startsWith("coach")) {
      setMode("coaches")
      onModuleStateChange(true, "Coaches", next)
      return
    }
    onModuleStateChange(true, "Courses", next)
  }
  const [rangeBookingVenue, setRangeBookingVenue] = useState<RangeVenue>("delhi")

  const openVenueDetails = (key: VenueKey) => { setSelectedVenueKey(key); setMode(["hamoni","dgc-range","qutub-practice","lakeview-practice"].includes(key) ? "ranges" : "courses"); setScreen("venueDetails"); onModuleStateChange(true, ["hamoni","dgc-range","qutub-practice","lakeview-practice"].includes(key) ? "Facilities" : "Courses", "venueDetails") }

  const openRangeBooking = (range: RangeVenue = "delhi") => {
    setRangeBookingVenue(range)
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
      {screen === "discover" && <DiscoverCourses go={go} openFilters={() => setFiltersOpen(true)} openSearch={() => setSearchOpen(true)} openBooking={openBooking} openRangeBooking={openRangeBooking} openVenueDetails={openVenueDetails} mode={mode} setMode={setMode} />}
      {screen === "results" && <ResultsScreen go={go} openFilters={() => setFiltersOpen(true)} state={resultsState} setState={setResultsState} openBooking={openBooking} />}
      {screen === "course" && <CourseProfileScreen go={go} openBooking={openBooking} />}
      {screen === "venueDetails" && <VenueDetailsScreen venueKey={selectedVenueKey} go={go} openBooking={openBooking} openRangeBooking={openRangeBooking} />}
      {screen === "confirmation" && <ConfirmationScreen go={go} course={bookingCourse} date={courseDate} time={selectedSlot} caddy={courseCaddySummary} cartCount={courseCartCount} total={bookingCourse.price + courseCaddyCost + courseCartCount * 800} />}
      {screen === "bookings" && <MyBookingsScreen go={go} />}
      {screen === "bookingDetail" && <BookingDetailScreen go={go} />}
      {screen === "rangeDiscover" && <RangeDiscoverScreen go={go} openSearch={() => setSearchOpen(true)} setMode={setMode} openRangeBooking={openRangeBooking} openVenueDetails={openVenueDetails} />}
      {screen === "rangeProfile" && <RangeProfileScreen go={go} openRangeBooking={openRangeBooking} />}
      {screen === "hamoniRangeProfile" && <RangeProfileScreen go={go} openRangeBooking={openRangeBooking} hamoni />}
      {screen === "bhalswaRangeProfile" && <RangeProfileScreen go={go} openRangeBooking={openRangeBooking} bhalswa />}
      {screen === "dwarkaCourseProfile" && <OfficialDdaCourseProfileScreen venue="dwarka" go={go} />}
      {screen === "bhalswaCourseProfile" && <OfficialDdaCourseProfileScreen venue="bhalswa" go={go} />}
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
      {rangeBookingOpen && <RangeBookingFlowModal hamoni={rangeBookingVenue === "hamoni"} step={rangeBookingStep} setStep={setRangeBookingStep} date={rangeBookingDate} setDate={setRangeBookingDate} bucketCount={rangeBucketCount} setBucketCount={setRangeBucketCount} paymentMethod={rangePaymentMethod} setPaymentMethod={setRangePaymentMethod} close={() => setRangeBookingOpen(false)} complete={() => { setRangeBookingOpen(false); setScreen("rangeConfirmation") }} />}
      {bookingOpen && <BookingFlowModal course={bookingCourse} step={bookingStep} setStep={setBookingStep} date={courseDate} setDate={setCourseDate} time={selectedSlot} setTime={setSelectedSlot} caddyMode={courseCaddyMode} setCaddyMode={setCourseCaddyMode} cartCount={courseCartCount} setCartCount={setCourseCartCount} paymentMethod={coursePaymentMethod} setPaymentMethod={setCoursePaymentMethod} close={() => setBookingOpen(false)} pay={() => setBookingStep("payment")} />}
      {filtersOpen && <FiltersSheet close={() => { setFiltersOpen(false); setResultsState("ready"); go("results") }} />}
      {searchOpen && <SearchExperience denied={locationDenied} setDenied={setLocationDenied} primerSeen={locationPrimerSeen} setPrimerSeen={setLocationPrimerSeen} close={() => setSearchOpen(false)} go={go} />}
      {paymentOpen && <PaymentSheet state={paymentState} setState={setPaymentState} close={() => setPaymentOpen(false)} succeed={() => { setPaymentOpen(false); go(paymentTarget === "range" ? "rangeConfirmation" : "confirmation") }} recheck={() => { setPaymentOpen(false); setRangeState("ready"); go("rangeSelect") }} />}
    </>
  )
}

function Play({ onModuleStateChange }: { onModuleStateChange: (active: boolean) => void }) {
  const [tracking, setTracking] = useState(false)
  const [finished, setFinished] = useState(false)
  const [hole, setHole] = useState(1)
  const [score, setScore] = useState(4)
  const [fairway, setFairway] = useState(false)
  const [gir, setGir] = useState(false)
  const [putts, setPutts] = useState(2)
  const [savedHoles, setSavedHoles] = useState(0)
  useEffect(() => { onModuleStateChange(tracking) }, [tracking, onModuleStateChange])
  const startRound = () => { setFinished(false); setTracking(true); setHole(1); setScore(4); setFairway(false); setGir(false); setPutts(2); setSavedHoles(0) }
  const saveHole = () => { setSavedHoles(value => value + 1); if (hole >= 18) { setTracking(false); setFinished(true); return }; setHole(value => value + 1); setScore(4); setFairway(false); setGir(false); setPutts(2) }
  if (finished) return <main className="screen round-complete-screen"><div className="page-title"><p className="eyebrow">ROUND COMPLETE</p><h1>Delhi Golf Club</h1><p>Your round has been saved to your history.</p></div><div className="stats-card"><div><strong>91</strong><span>Score</span><small>+19 to par</small></div><div><strong>18</strong><span>Holes</span><small>Completed</small></div></div><div className="detail-summary-card"><div><span><Icon name="flag" /></span><p><small>ROUND SUMMARY</small><strong>14 fairways · 9 GIR · 34 putts</strong><em>18 holes tracked · {savedHoles} saved in this session</em></p></div></div><button className="primary-button start-round" onClick={() => setFinished(false)}>Back to your game</button></main>
  if (tracking) return <main className="screen round-screen"><div className="round-top"><button onClick={() => setTracking(false)}>Finish later</button><span>Delhi Golf Club</span><button data-prototype="Round options" data-prototype-body="Round settings, scorecard and exit options.">•••</button></div><div className="hole-heading"><span>HOLE</span><strong>{hole}</strong><small>PAR 4 · 389 YDS</small></div><div className="hole-map"><img src={photos.course} alt="Fairway overview" /><span className="distance-pill">214 yds to pin</span></div><div className="score-panel"><p>Score</p><div className="score-stepper"><button onClick={() => setScore(value => Math.max(1, value - 1))}>−</button><strong>{score}</strong><button onClick={() => setScore(value => value + 1)}>+</button></div><div className="shot-pills"><button className={fairway ? "selected" : ""} onClick={() => setFairway(value => !value)}>Fairway</button><button className={gir ? "selected" : ""} onClick={() => setGir(value => !value)}>GIR</button><button className={putts === 2 ? "selected" : ""} onClick={() => setPutts(value => value === 1 ? 2 : value === 2 ? 3 : 1)}>{putts} putts</button></div><div className="round-progress-note">Hole {hole} of 18 · {savedHoles} saved</div><button className="primary-button" onClick={saveHole}>{hole === 18 ? "Finish round" : "Save hole · Next"} <Icon name="arrow" size={17} /></button></div></main>
  return <main className="screen"><div className="page-title"><p className="eyebrow">PERFORMANCE</p><h1>Your game</h1><p>Track rounds. See where every shot is going.</p></div><button className="primary-button start-round" onClick={startRound}><Icon name="flag" size={18} /> Start a round</button><div className="sg-bars">
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
        </div><SectionHeading title="Recent rounds" action="All rounds" onAction={() => emitPrototypeEvent("Round history","View your complete round history.")}/>{[["Delhi Golf Club","18 Aug · 18 holes","91","+19"],["Noida Golf Course","10 Aug · 18 holes","89","+17"],["Qutab Golf Course","02 Aug · 9 holes","44","+8"]].map(round => <button className="round-row" key={round[0]} data-prototype="Round details" data-prototype-body={"View " + round[0] + " with its scorecard, notes and saved statistics."}><span><strong>{round[0]}</strong><small>{round[1]}</small></span><span><strong>{round[2]}</strong><small>{round[3]}</small></span><Icon name="chevron" size={17}/></button>)}</main>
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
          <p>Rohan added 3 frames and a voice note</p>
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
        <button data-prototype="Edit profile" data-prototype-body="Edit your profile, handicap and preferences.">Edit profile</button>
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
        <button data-prototype="Payments & wallet" data-prototype-body="View saved payment methods, credits, receipts and coach payouts.">
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
        <button data-prototype="Messages" data-prototype-body="View conversations with coaches and students.">
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
            <small>Switch between golfer and coach views</small>
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
function CoachSchedule({go}:{go:(tab:CoachTab)=>void}){
  const[view,setView]=useState<CoachScheduleView>("day"),[selectedDate,setSelectedDate]=useState("2026-08-20"),[weekOffset,setWeekOffset]=useState(0),[monthOffset,setMonthOffset]=useState(0)
  const[events,setEvents]=useState<CoachScheduleEvent[]>(COACH_SCHEDULE_EVENTS),[openSlots,setOpenSlots]=useState<CoachOpenSlot[]>(COACH_OPEN_SLOTS),[personal,setPersonal]=useState<CoachPersonalBlock[]>([])
  const[sheet,setSheet]=useState<"add"|"requests"|"event"|null>(null),[selectedEvent,setSelectedEvent]=useState<CoachScheduleEvent|null>(null),[addKind,setAddKind]=useState<"lesson"|"personal">("lesson")
  const[draftDate,setDraftDate]=useState("2026-08-20"),[draftTime,setDraftTime]=useState("09:00"),[draftStudent,setDraftStudent]=useState(students[0].name),[draftDuration,setDraftDuration]=useState("60"),[draftType,setDraftType]=useState("Full Swing"),[draftTitle,setDraftTitle]=useState("")
  const selected=new Date(selectedDate+"T12:00:00"),dayEvents=events.filter(e=>e.date===selectedDate),requests=events.filter(e=>e.status==="request")
  const weekStart=coachAddDays(new Date("2026-08-17T12:00:00"),weekOffset*7),weekDates=Array.from({length:7},(_,i)=>coachAddDays(weekStart,i))
  const monthDate=new Date(2026,7+monthOffset,1),monthDays=new Date(monthDate.getFullYear(),monthDate.getMonth()+1,0).getDate(),monthStartDay=(monthDate.getDay()+6)%7
  const collision=(date:string,start:string,duration:number,id?:string)=>{const a=coachTimeToMinutes(start),b=a+duration;return events.some(e=>e.id!==id&&e.student&&e.date===date&&!(coachTimeToMinutes(e.start)+e.duration<=a||b<=coachTimeToMinutes(e.start)))}
  const openAdd=(date=selectedDate,time="09:00",kind:"lesson"|"personal"="lesson")=>{setDraftDate(date);setDraftTime(time);setAddKind(kind);setDraftTitle("");setDraftStudent(students[0].name);setDraftDuration("60");setDraftType("Full Swing");setSheet("add")}
  const saveAdd=()=>{const duration=Number(draftDuration);if(addKind==="personal"){if(!draftTitle.trim())return;setPersonal(c=>[...c,{id:"p"+Date.now(),date:draftDate,start:draftTime,duration,title:draftTitle.trim()}])}else{if(collision(draftDate,draftTime,duration))return;const s=students.find(x=>x.name===draftStudent)||students[0];setEvents(c=>[...c,{id:"n"+Date.now(),date:draftDate,start:draftTime,duration,student:s.name,initials:s.initials,type:draftType,location:"Delhi Golf Club",status:"confirmed"}]);setOpenSlots(c=>c.filter(o=>o.date!==draftDate||coachTimeToMinutes(o.start)+o.duration<=coachTimeToMinutes(draftTime)||coachTimeToMinutes(draftTime)+duration<=coachTimeToMinutes(o.start)))}setSheet(null)}
  const toggleOpen=(date:string,start:string)=>{if(openSlots.some(o=>o.date===date&&o.start===start))setOpenSlots(c=>c.filter(o=>!(o.date===date&&o.start===start)));else if(!collision(date,start,60))setOpenSlots(c=>[...c,{date,start,duration:60}])}
  const moveEvent=(id:string,date:string,start:string)=>{const e=events.find(x=>x.id===id);if(!e||collision(date,start,e.duration,id))return;setEvents(c=>c.map(x=>x.id===id?{...x,date,start}:x))}
  const dragLesson=(e:CoachScheduleEvent,ev:PointerEvent<HTMLButtonElement>)=>{if(!e.student)return;const y=ev.clientY,original=coachTimeToMinutes(e.start);let moved=false;const move=(p:PointerEvent)=>{if(Math.abs(p.clientY-y)>7)moved=true};const up=(p:PointerEvent)=>{document.removeEventListener("pointermove",move);document.removeEventListener("pointerup",up);if(!moved)return;const delta=Math.round(((p.clientY-y)/58*60)/15)*15;const next=Math.max(7*60,Math.min(19*60-e.duration,original+delta));moveEvent(e.id,e.date,String(Math.floor(next/60)).padStart(2,"0")+":"+String(next%60).padStart(2,"0"))};document.addEventListener("pointermove",move);document.addEventListener("pointerup",up,{once:true})}
  const openEvent=(e:CoachScheduleEvent)=>{if(!e.student){toggleOpen(e.date,e.start);return}setSelectedEvent(e);setSheet("event")}
  const stripDates=Array.from({length:7},(_,i)=>coachAddDays(selected,i-3))
  const renderDay=()=>{const hours=Array.from({length:13},(_,i)=>7+i);return <><div className="coach-day-caption"><strong>{selected.toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"short"})}</strong><div><button onClick={()=>openAdd(selectedDate,"09:00","personal")}>+ Block</button><button onClick={()=>openAdd()}>+ Add</button></div></div><div className="coach-day-timeline">{hours.map((h,i)=><div key={h} className="coach-hour-row" style={{top:i*58}}><span>{coachFormatTime(String(h).padStart(2,"0")+":00")}</span><i/></div>)}{hours.slice(0,-1).map((h,i)=><button key={"slot"+h} className="coach-day-empty-slot" style={{top:i*58,height:58}} onClick={()=>openAdd(selectedDate,String(h).padStart(2,"0")+":00")}/>)}{personal.filter(p=>p.date===selectedDate).map(p=>{const top=(coachTimeToMinutes(p.start)-420)/60*58;return <button key={p.id} className="coach-day-personal" style={{top,height:Math.max(36,p.duration/60*58-5)}} onClick={()=>setPersonal(c=>c.filter(x=>x.id!==p.id))}><strong>{p.title}</strong><small>{coachFormatTime(p.start)} · Tap to remove</small></button>})}{dayEvents.map(e=>{const top=(coachTimeToMinutes(e.start)-420)/60*58;return <button key={e.id} className={"coach-schedule-event "+(e.status==="request"?"request ":e.status==="completed"?"completed":"")} style={{top,height:Math.max(54,e.duration/60*58-5)}} onPointerDown={ev=>dragLesson(e,ev)} onClick={()=>openEvent(e)}><strong>{e.student||"Open slot"}</strong><small>{coachFormatTime(e.start)} · {e.type}</small><em>{e.location}</em></button>})}</div><p className="coach-schedule-hint">Tap an empty time to add. Drag a lesson to reschedule. Tap a personal block to remove it.</p></>}
  const renderWeek=()=> <><div className="coach-week-controls"><button onClick={()=>setWeekOffset(v=>v-1)}>‹</button><strong>{coachFormatDate(weekDates[0])} – {coachFormatDate(weekDates[6])}</strong><button onClick={()=>setWeekOffset(v=>v+1)}>›</button></div><div className="coach-week-grid"><div className="coach-week-times">{weekDates.length&&Array.from({length:13},(_,i)=><span key={i}>{coachFormatTime(String(7+i).padStart(2,"0")+":00")}</span>)}</div><div className="coach-week-days">{weekDates.map(d=>{const k=coachDateKey(d),items=events.filter(e=>e.date===k),slots=openSlots.filter(s=>s.date===k);return <div className="coach-week-day" key={k}><button className={k===selectedDate?"selected":""} onClick={()=>{setSelectedDate(k);setView("day")}}><small>{d.toLocaleDateString("en-IN",{weekday:"short"}).toUpperCase()}</small><strong>{d.getDate()}</strong></button><div className="coach-week-column">{Array.from({length:12},(_,i)=><button key={i} className="coach-week-cell" style={{top:i*58}} onClick={()=>toggleOpen(k,String(7+i).padStart(2,"0")+":00")}/>)}{slots.map(s=><button key={"o"+s.start} className="coach-week-open" style={{top:(coachTimeToMinutes(s.start)-420)/60*58}} onClick={()=>toggleOpen(s.date,s.start)}>Open</button>)}{items.filter(e=>e.student).map(e=>{const top=(coachTimeToMinutes(e.start)-420)/60*58;return <button key={e.id} className={"coach-week-event "+(e.status==="request"?"request ":"")} style={{top,height:Math.max(36,e.duration/60*58-5)}} onClick={()=>openEvent(e)}>{e.student}<small>{coachFormatTime(e.start)}</small></button>})}</div></div>})}</div></div><div className="coach-schedule-legend"><span><i className="confirmed"/> Confirmed</span><span><i className="completed"/> Completed</span><span><i className="request"/> Request</span><span><i className="open"/> Open</span></div></>
  const renderMonth=()=>{const cells:React.ReactNode[]=[];for(let i=0;i<monthStartDay;i++)cells.push(<span className="coach-month-empty" key={"e"+i}/>);for(let d=1;d<=monthDays;d++){const x=new Date(monthDate.getFullYear(),monthDate.getMonth(),d),k=coachDateKey(x),count=events.filter(e=>e.date===k&&e.student).length;cells.push(<button key={k} className={k===selectedDate?"selected":""} onClick={()=>setSelectedDate(k)}><strong>{d}</strong>{count>0&&<i>{count}</i>}</button>)}const agenda=events.filter(e=>e.date===selectedDate&&e.student);return <><div className="coach-month-controls"><button onClick={()=>setMonthOffset(v=>v-1)}>‹</button><strong>{monthDate.toLocaleDateString("en-IN",{month:"long",year:"numeric"})}</strong><button onClick={()=>setMonthOffset(v=>v+1)}>›</button></div><div className="coach-month-weekdays">{["M","T","W","T","F","S","S"].map((d,i)=><span key={i}>{d}</span>)}</div><div className="coach-month-grid">{cells}</div><div className="coach-month-agenda"><div><strong>{coachFormatDate(selected)}</strong><button onClick={()=>openAdd()}>+ Add</button></div>{agenda.map(e=><button key={e.id} onClick={()=>openEvent(e)}><span><strong>{e.student}</strong><small>{coachFormatTime(e.start)} · {e.type}</small></span><em>{e.status==="request"?"Request":e.location}</em></button>)}{agenda.length===0&&<p>No lessons scheduled.</p>}</div></>}
  const saveRequest=(id:string,action:"confirm"|"decline")=>{setEvents(c=>action==="decline"?c.filter(e=>e.id!==id):c.map(e=>e.id===id?{...e,status:"confirmed"}:e));setSheet(null)}
  return <main className={"screen coach-schedule-screen view-"+view}><div className="coach-page-subbar"><span>{dayEvents.filter(e=>e.student).length} lesson{dayEvents.filter(e=>e.student).length===1?"":"s"} · {requests.length} request{requests.length===1?"":"s"}</span><div className="coach-schedule-actions"><button onClick={()=>setSheet("requests")} aria-label="Session requests"><Icon name="bell" size={18}/>{requests.length>0&&<b>{requests.length}</b>}</button><button onClick={()=>openAdd()} aria-label="Add session"><Icon name="plus" size={18}/></button></div></div><div className="segment coach-schedule-segment"><button className={view==="day"?"active":""} onClick={()=>setView("day")}>Day</button><button className={view==="week"?"active":""} onClick={()=>setView("week")}>Week</button><button className={view==="month"?"active":""} onClick={()=>setView("month")}>Month</button></div>{view==="day"&&(<div className="coach-date-strip-wrap"><button className="coach-strip-arrow" onClick={()=>setSelectedDate(coachDateKey(coachAddDays(selected,-1)))}>‹</button><div className="coach-date-strip">{stripDates.map(d=>{const k=coachDateKey(d);return <button key={k} className={k===selectedDate?"selected":""} onClick={()=>setSelectedDate(k)}><small>{d.toLocaleDateString("en-IN",{weekday:"short"}).toUpperCase()}</small><strong>{d.getDate()}</strong></button>})}</div><button className="coach-strip-arrow" onClick={()=>setSelectedDate(coachDateKey(coachAddDays(selected,1)))}>›</button></div>)}{view==="day"&&renderDay()}{view==="week"&&renderWeek()}{view==="month"&&renderMonth()}
  {sheet==="add"&&<div className="sheet-backdrop" onClick={()=>setSheet(null)}><div className="sheet coach-schedule-sheet" onClick={e=>e.stopPropagation()}><div className="sheet-handle"/><div className="sheet-title"><span><p className="eyebrow">{addKind==="lesson"?"NEW SESSION":"PERSOASL TIME"}</p><h2>{addKind==="lesson"?"Add lesson":"Add personal block"}</h2></span><button onClick={()=>setSheet(null)}><Icon name="close"/></button></div>{addKind==="lesson"?<><label><span>Student</span><select value={draftStudent} onChange={e=>setDraftStudent(e.target.value)}>{students.map(s=><option key={s.name}>{s.name}</option>)}</select></label><div className="coach-form-grid"><label><span>Date</span><input type="date" value={draftDate} onChange={e=>setDraftDate(e.target.value)}/></label><label><span>Time</span><input type="time" value={draftTime} onChange={e=>setDraftTime(e.target.value)}/></label></div><div className="coach-form-grid"><label><span>Duration</span><select value={draftDuration} onChange={e=>setDraftDuration(e.target.value)}><option value="30">30 min</option><option value="45">45 min</option><option value="60">60 min</option><option value="90">90 min</option></select></label><label><span>Type</span><select value={draftType} onChange={e=>setDraftType(e.target.value)}><option>Full Swing</option><option>Short Game</option><option>Putting</option><option>Playing Lesson</option><option>Assessment</option><option>Trial Lesson</option></select></label></div></>:<><label><span>Title</span><input value={draftTitle} onChange={e=>setDraftTitle(e.target.value)} placeholder="Lunch, admin, travel..."/></label><div className="coach-form-grid"><label><span>Date</span><input type="date" value={draftDate} onChange={e=>setDraftDate(e.target.value)}/></label><label><span>Time</span><input type="time" value={draftTime} onChange={e=>setDraftTime(e.target.value)}/></label></div><label><span>Duration</span><select value={draftDuration} onChange={e=>setDraftDuration(e.target.value)}><option value="30">30 min</option><option value="60">60 min</option><option value="90">90 min</option><option value="120">2 hours</option></select></label></>}<button className="primary-button" onClick={saveAdd}>{addKind==="lesson"?"Add to schedule":"Add block"}</button></div></div>}
  {sheet==="requests"&&<div className="sheet-backdrop" onClick={()=>setSheet(null)}><div className="sheet coach-schedule-sheet" onClick={e=>e.stopPropagation()}><div className="sheet-handle"/><div className="sheet-title"><span><p className="eyebrow">INBOX</p><h2>Session requests</h2></span><button onClick={()=>setSheet(null)}><Icon name="close"/></button></div>{requests.map(e=><div className="coach-request-row" key={e.id}><Avatar initials={e.initials}/><span><strong>{e.student}</strong><small>{coachFormatDate(new Date(e.date+"T12:00:00"))} · {coachFormatTime(e.start)}</small><em>{e.type}</em></span><div><button className="primary-button" onClick={()=>saveRequest(e.id,"confirm")}>Confirm</button><button onClick={()=>saveRequest(e.id,"decline")}>Decline</button></div></div>)}{requests.length===0&&<p className="empty-state-copy">No outstanding requests.</p>}</div></div>}
  {sheet==="event"&&selectedEvent&&<div className="sheet-backdrop" onClick={()=>setSheet(null)}><div className="sheet coach-schedule-sheet" onClick={e=>e.stopPropagation()}><div className="sheet-handle"/><div className="sheet-title"><span><p className="eyebrow">{selectedEvent.status==="request"?"SESSION REQUEST":"SESSION"}</p><h2>{selectedEvent.student}</h2></span><button onClick={()=>setSheet(null)}><Icon name="close"/></button></div><div className="coach-event-summary"><span><small>DATE</small><strong>{coachFormatDate(new Date(selectedEvent.date+"T12:00:00"))}</strong></span><span><small>TIME</small><strong>{coachFormatTime(selectedEvent.start)}</strong></span><span><small>TYPE</small><strong>{selectedEvent.type}</strong></span><span><small>LOCATION</small><strong>{selectedEvent.location}</strong></span></div>{selectedEvent.status==="request"?<div className="coach-event-actions"><button className="primary-button" onClick={()=>saveRequest(selectedEvent.id,"confirm")}>Confirm request</button><button onClick={()=>saveRequest(selectedEvent.id,"decline")}>Decline</button></div>:<div className="coach-event-actions"><button className="primary-button" onClick={()=>{setEvents(c=>c.map(x=>x.id===selectedEvent.id?{...x,status:"completed"}:x));setSheet(null)}}>{selectedEvent.status==="completed"?"Completed":"Mark completed"}</button><button onClick={()=>{setSheet(null);go("students")}}>Open student</button></div>}</div></div>}
  </main>
}
function Students({openStudent,connectionStatus,onAccept,onDecline}:{openStudent:()=>void;connectionStatus:ConnectionStatus;onAccept:()=>void;onDecline:()=>void}){const[query,setQuery]=useState(""),[filter,setFilter]=useState<"all"|"attention">("all");const filtered=useMemo(()=>students.filter(x=>x.name.toLowerCase().includes(query.toLowerCase())).filter(x=>filter==="all"||x.status!=="On track"),[query,filter]);return <main className="screen coach-students-screen"><div className="coach-page-subbar coach-students-subbar"><span>18 active · 5 packages</span><button className="coach-add-student" onClick={()=>emitPrototypeEvent("Add student","Choose an existing Fore golfer or invite a new student. Add a student to your coaching roster.")} aria-label="Add student"><Icon name="plus" size={20}/></button></div>{connectionStatus==="pending"&&<section className="connection-request-card"><div className="connection-request-head"><Avatar initials="AK"/><span><small>NEW CONNECTION REQUEST</small><strong>Alex Kapoor</strong><em>Amateur · HCP 14.2</em></span><span className="connection-badge pending">Pending</span></div><p>Alex wants to connect for ongoing coaching and practice support.</p><div className="connection-request-actions"><button onClick={onDecline}>Decline</button><button className="primary-button" onClick={onAccept}>Accept connection</button></div></section>}{connectionStatus==="connected"&&<section className="connection-request-card connected"><div className="connection-request-head"><Avatar initials="AK"/><span><small>CONNECTED STUDENT</small><strong>Alex Kapoor</strong><em>Amateur · HCP 14.2 · New student</em></span><span className="connection-badge"><Icon name="check" size={13}/> Connected</span></div><button className="connection-inline-action" onClick={openStudent}>Open student profile <Icon name="arrow" size={15}/></button></section>}<label className="search-input"><Icon name="search" size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search students"/></label><div className="coach-student-filters"><button className={filter==="all"?"active":""} onClick={()=>setFilter("all")}>All</button><button className={filter==="attention"?"active":""} onClick={()=>setFilter("attention")}>Needs attention</button></div><div className="student-list">{filtered.map(student=><button key={student.name} onClick={openStudent}><Avatar initials={student.initials}/><span><strong>{student.name}</strong><small>{student.meta}</small></span><em className={student.status!=="On track"?"warn":""}>{student.status}</em><Icon name="chevron" size={17}/></button>)}</div></main>}

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
            <button className="booking-row" data-prototype="Lesson details" data-prototype-body="Open the lesson, student notes, payment status and scheduling controls." key={item[1]}>
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
  const options: DiscoverSection[] = ["Courses", "Facilities", "Coaches"]

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


function StudentDetail({close,assign,connectionStatus,onRemove}:{close:()=>void;assign:()=>void;connectionStatus:ConnectionStatus;onRemove:()=>void}){const connected=connectionStatus==="connected";const[tab,setTab]=useState("overview");const[tasks,setTasks]=useState(["Gate Putting · 10 attempts","Distance control · inside 2 ft","Play 9 holes and log misses"]);const stats=connected?{name:"Alex Kapoor",level:"Amateur · HCP 14.2",lessons:0,tasks:3,videos:1,score:"91.0",sg:"-2.4"}:{name:"Meera Pillai",level:"Intermediate · HCP 6.4",lessons:8,tasks:2,videos:5,score:"74.8",sg:"+2.6"};return <div className="overlay light-overlay"><div className="overlay-bar"><button onClick={close}><Icon name="close"/></button><span>Student profile</span><button onClick={()=>emitPrototypeEvent("Message sent","Message sent. Continue in Messages.")}><Icon name="message"/></button></div><div className="student-profile"><Avatar initials={connected?"AK":"MP"}/><h1>{stats.name}</h1><p>{stats.level}</p>{connected&&<span className="connection-badge"><Icon name="check" size={13}/> Connected student</span>}<div><span><strong>{stats.lessons}</strong><small>Lessons</small></span><span><strong>{stats.tasks}</strong><small>Open tasks</small></span><span><strong>{stats.videos}</strong><small>Videos</small></span></div></div><div className="detail-content student-detail-content"><div className="student-actions"><button onClick={assign}><Icon name="clipboard"/><span>Assign drill</span></button><button onClick={()=>emitPrototypeEvent("Feedback composer","Select a swing, add coach notes and send feedback.")}><Icon name="video"/><span>Feedback</span></button><button onClick={()=>emitPrototypeEvent("Round added","The student round has been added to the coaching record in this prototype.")}><Icon name="flag"/><span>Add round</span></button></div><div className="coach-student-tabs">{["overview","history","assignments","practice","rounds","videos"].map(x=><button key={x} className={tab===x?"active":""} onClick={()=>setTab(x)}>{x==="overview"?"Overview":x==="history"?"Lesson history":x==="assignments"?"Assignments":x==="practice"?"Practice":x==="rounds"?"Rounds":"Swing videos"}</button>)}</div>{tab==="overview"&&<><SectionHeading title="Performance" action="Full analysis"/><div className="performance-grid"><div><span>Avg score</span><strong>{stats.score}</strong><small className="positive">Last 5 rounds</small></div><div><span>Strokes gained</span><strong>{stats.sg}</strong><small>Latest round</small></div></div><div className="sg-bars compact">{[["Off tee",72,"+0.4"],["Approach",64,"-0.8"],["Short game",48,"-1.1"],["Putting",58,"-0.9"]].map(([label,width,value])=><div key={String(label)}><span>{String(label)}</span><i><b style={{width:String(width)+"%"}}/></i><strong>{String(value)}</strong></div>)}</div><div className="info-card"><div className="info-card-title">Current coaching plan</div><div className="info-card-sub">Consistency · short game · course strategy</div><div className="progress-track"><div className="progress-fill" style={{width:"72%"}}/></div></div></>}{tab==="history"&&<div className="student-detail-list">{["21 Aug · Short game · Delhi Golf Club","14 Aug · Putting · KGA","7 Aug · Approach · Delhi Golf Club","31 Jul · Assessment · KGA"].map(x=><div className="student-detail-row" key={x}><strong>{x}</strong><small>Coach notes and session outcomes recorded.</small></div>)}</div>}{tab==="assignments"&&<div className="student-detail-list">{tasks.map((x,i)=><button className="student-detail-row task" key={x} onClick={()=>setTasks(t=>t.filter((_,idx)=>idx!==i))}><strong>{x}</strong><small>Tap to mark complete</small></button>)}<button className="primary-button" onClick={assign}>+ Assign new drill</button></div>}{tab==="practice"&&<div className="student-detail-list"><div className="info-card"><div className="info-card-title">Putting — Start Line</div><div className="info-card-sub">Daily · 3 drills · 20 min</div><div className="progress-track"><div className="progress-fill" style={{width:"86%"}}/></div><p className="info-card-sub">9/10 gate · 8/10 distance · 86% complete</p></div><div className="info-card"><div className="info-card-title">Driver Speed — Phase 1</div><div className="info-card-sub">3× weekly · 4 drills · 25 min</div><div className="progress-track"><div className="progress-fill" style={{width:"72%"}}/></div></div></div>}{tab==="rounds"&&<div className="student-detail-list">{["Delhi Golf Club · 21 Aug · 73 (+1)","Delhi Golf Club · 20 Aug · 75 (+3)","KGA · 18 Aug · 69 (-3)"].map(x=><div className="student-detail-row" key={x}><strong>{x}</strong><small>31 putts · 11 GIR · 9/14 fairways</small></div>)}</div>}{tab==="videos"&&<div className="video-grid"><button className="video-new" onClick={()=>emitPrototypeEvent("New feedback","Start a new feedback thread for this swing.")}>+ New feedback</button><div className="video-card"><div className="video-thumb"><Icon name="video"/></div><div className="video-info"><div className="video-title">Driver · takeaway & transition</div><div className="video-date">42 sec · Today</div></div></div></div>}{connected&&<button className="disconnect-link" onClick={onRemove}>Remove student connection</button>}</div></div>}
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
          <button className="select-row" data-prototype="Choose student" data-prototype-body="Select a student for this practice assignment."><span><Avatar initials="MP" /> Meera Pillai
            </span>
            <Icon name="chevron" />
          </button>
        </label>
        <label>
          <span>Routine</span>
          <button className="select-row" data-prototype="Choose routine" data-prototype-body="Select a practice routine to assign."><span><Icon name="clipboard" /> Putting — Start Line
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
          <span><small>VIDEO AASLYSIS</small><strong>See your swing</strong><em>Review swings and identify what to improve.</em></span>
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
        <div><small>RECENT AASLYSIS</small><strong>Driver · takeaway & transition</strong><p>3 annotated frames · Coach feedback ready</p></div>
      </button>
      <div className="video-analysis-actions">
        <button><Icon name="video" size={18} /> Record a swing</button>
        <button><Icon name="arrow" size={18} /> View analysis</button>
      </div>
    </main>
  )
}

function CoachHome({openDiscovery,status,onCancelRequest}:{openDiscovery:()=>void;status:ConnectionStatus;onCancelRequest:()=>void}){return <main className="screen architecture-home coach-home"><div className="architecture-intro"><p className="eyebrow">YOUR LEARNING JOURNEY</p><h1>Coach</h1><p>Find the right coach, then keep everything you learn in one place.</p></div>{status==="connected"?<section className="connected-coach-card"><div className="connected-coach-head"><Avatar initials="RM" image={photos.golfer}/><span><small>YOUR COACH</small><strong>Rohan Malhotra</strong><em>PGA Professional · 4.9</em></span><span className="connection-badge"><Icon name="check" size={13}/> Connected</span></div><div className="connected-coach-stats"><span><strong>Next lesson</strong><small>Tomorrow · 7:00 AM</small></span><span><strong>Practice plan</strong><small>3 drills · 72% complete</small></span></div><div className="connected-coach-actions"><button data-prototype="Message Rohan" data-prototype-body="Open your conversation with Rohan."><Icon name="message" size={17}/> Message</button><button data-prototype="Your lessons" data-prototype-body="View upcoming and past lessons with Rohan."><Icon name="calendar" size={17}/> Lessons</button></div></section>:status==="pending"?<section className="connected-coach-card pending"><div className="connected-coach-head"><Avatar initials="RM" image={photos.golfer}/><span><small>CONNECTION REQUEST</small><strong>Rohan Malhotra</strong><em>Waiting for coach to accept</em></span><span className="connection-badge pending"><Icon name="clock" size={13}/> Pending</span></div><p>Your profile and coaching goals will be shared once the coach accepts.</p><button className="secondary-button" onClick={onCancelRequest}>Cancel request</button></section>:<button className="coach-find-hero" onClick={openDiscovery}><span className="coach-find-icon"><Icon name="search" size={25}/></span><span><small>GET STARTED</small><strong>Find a coach</strong><em>Browse coaches, ratings, specialties and lesson options.</em></span><Icon name="arrow" size={19}/></button>}{status==="none"&&<section className="coach-journey-preview"><div><small>YOUR COACH</small><strong>Not connected yet</strong><span>Once you choose a coach, your lessons, feedback and practice plan will appear here.</span></div></section>}<SectionHeading title={status==="none"?"How coaching works":"What happens next"}/><div className="coach-journey-steps"><span><b>1</b><strong>{status==="none"?"Choose a coach":"Coach reviews"}</strong><small>{status==="none"?"Find someone who fits your game.":"Your request and goals are shared."}</small></span><span><b>2</b><strong>{status==="none"?"Connect":"Connection accepted"}</strong><small>{status==="none"?"Send a request and share your goals.":"Your coaching space opens."}</small></span><span><b>3</b><strong>Keep improving</strong><small>Feedback and drills stay with you.</small></span></div></main>}
function CoachApp({tab,setTab,profileOpen,setProfileOpen,overlay,setOverlay,connectionStatus,onAccept,onDecline,onRemove,onSwitch}:{tab:CoachTab;setTab:(t:CoachTab)=>void;profileOpen:boolean;setProfileOpen:(v:boolean)=>void;overlay:"student"|"assign"|null;setOverlay:(v:"student"|"assign"|null)=>void;connectionStatus:ConnectionStatus;onAccept:()=>void;onDecline:()=>void;onRemove:()=>void;onSwitch:()=>void}){const items:[CoachTab,string,IconName][]=[["home","Home","home"],["schedule","Schedule","calendar"],["students","Students","users"]],title=tab==="home"?"Home":tab==="schedule"?"Schedule":"Students";return <>{!profileOpen&&!overlay&&<AppTopBar title={title} initials="AR" onHome={()=>setTab("home")} onProfile={()=>setProfileOpen(true)}/>} {profileOpen&&!overlay&&<AppTopBar title="Profile" initials="AR" onHome={()=>setTab("home")} onProfile={()=>setProfileOpen(true)} back={()=>setProfileOpen(false)}/>}<div className="scroll-area">{profileOpen?<Profile role="coach" onSwitch={onSwitch}/>:<>{tab==="home"&&<CoachDashboardHome go={setTab}/>} {tab==="schedule"&&<CoachSchedule go={setTab}/>} {tab==="students"&&<Students openStudent={()=>setOverlay("student")} connectionStatus={connectionStatus} onAccept={onAccept} onDecline={onDecline}/>}</>}</div>{!profileOpen&&!overlay&&<nav className="bottom-nav bottom-nav-primary" aria-label="Coach navigation"><div className="bottom-nav-track">{items.map(([id,label,icon])=><button type="button" key={id} className={id===tab?"active":""} onClick={()=>setTab(id)}><Icon name={icon} size={21}/><span>{label}</span></button>)}</div></nav>}{overlay==="student"&&<StudentDetail close={()=>setOverlay(null)} assign={()=>setOverlay("assign")} connectionStatus={connectionStatus} onRemove={onRemove}/>} {overlay==="assign"&&<AssignSheet close={()=>setOverlay(null)}/>}</>}

type PrototypeAction = { title: string; body: string }
function emitPrototypeEvent(title: string, body?: string) { window.dispatchEvent(new CustomEvent("fore:prototype-action", { detail: { title, body: body ?? "Your selection has been noted." } })) }
function PrototypeActionSheet({ action, close }: { action: PrototypeAction | null; close: () => void }) {
  if (!action) return null
  return <div className="prototype-action-backdrop" onClick={close}><div className="prototype-action-sheet" onClick={event => event.stopPropagation()}><div className="sheet-handle" /><div className="prototype-action-icon"><Icon name="check" size={22} /></div><h2>{action.title}</h2><p>{action.body}</p><button className="primary-button" onClick={close}>Done</button></div></div>
}

function App(){
 const [role,setRole]=useState<Role>("golfer");const[coachTab,setCoachTab]=useState<CoachTab>("home");const[coachProfileOpen,setCoachProfileOpen]=useState(false);const[connectionStatus,setConnectionStatus]=useState<ConnectionStatus>("none");const [primaryTab, setPrimaryTab] = useState<PrimaryTab>("discover")
  const [profileOpen, setProfileOpen] = useState(false)
  const [module, setModule] = useState<"sg" | "drills" | "video" | null>(null)
  const [coachDiscoveryOpen, setCoachDiscoveryOpen] = useState(false)
  const [discoverChildOpen, setDiscoverChildOpen] = useState(false)
  const [discoverSection, setDiscoverSection] = useState<DiscoverSection>("Courses")
  const [facilityDetailOpen, setFacilityDetailOpen] = useState(false)
  const [overlay, setOverlay] = useState<"student" | "assign" | null>(null)
  const [discoverSearchRequest, setDiscoverSearchRequest] = useState(0)
  const [sharedFacility, setSharedFacility] = useState<"hamoni" | "range" | null>(null)
  const [prototypeAction, setPrototypeAction] = useState<PrototypeAction | null>(null)
  useEffect(() => {
    const facility = new URLSearchParams(window.location.search).get("facility")
    if (facility === "hamoni" || facility === "range") {
      setPrimaryTab("discover")
      setDiscoverSection("Facilities")
      setDiscoverChildOpen(true)
      setFacilityDetailOpen(true)
      setSharedFacility(facility)
    }
  }, [])
  useEffect(() => { const handler = (event: Event) => { const detail = (event as CustomEvent<{title?: string; body?: string}>).detail; if (detail?.title) setPrototypeAction({ title: detail.title, body: detail.body ?? "Your selection has been noted." }) }; window.addEventListener("fore:prototype-action", handler); return () => window.removeEventListener("fore:prototype-action", handler) }, [])
  const handlePrototypeCapture = (event: React.MouseEvent) => { const target = (event.target as HTMLElement).closest("[data-prototype]") as HTMLElement | null; if (target) setPrototypeAction({ title: target.dataset.prototype ?? "Action", body: target.dataset.prototypeBody ?? "Your selection has been noted." }) }

  const goPrimaryTab = (tab: PrimaryTab) => {
    setPrimaryTab(tab)
    setProfileOpen(false)
    setModule(null)
    setCoachDiscoveryOpen(false)
    setDiscoverChildOpen(false)
    setDiscoverSection("Courses")
    setSharedFacility(null)
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
    setSharedFacility(null)
    setOverlay(null)
  }

  const closeDiscover = () => {
    setDiscoverChildOpen(false)
    setDiscoverSection("Courses")
  }

  const switchRole=()=>{setRole(r=>r==="golfer"?"coach":"golfer");setProfileOpen(false);setCoachProfileOpen(false);setCoachDiscoveryOpen(false);setOverlay(null)};const sendConnectionRequest=()=>setConnectionStatus("pending");const cancelConnectionRequest=()=>setConnectionStatus("none");const acceptConnection=()=>setConnectionStatus("connected");const declineConnection=()=>setConnectionStatus("none");const removeConnection=()=>setConnectionStatus("none");if(role==="coach")return <div className="app-stage"><div className="phone-shell" onClickCapture={handlePrototypeCapture}><CoachApp tab={coachTab} setTab={t=>{setCoachTab(t);setCoachProfileOpen(false);setOverlay(null)}} profileOpen={coachProfileOpen} setProfileOpen={setCoachProfileOpen} overlay={overlay} setOverlay={setOverlay} connectionStatus={connectionStatus} onAccept={acceptConnection} onDecline={declineConnection} onRemove={removeConnection} onSwitch={switchRole}/></div></div>

  const primaryItems: { id: PrimaryTab; label: string; icon: IconName }[] = [
    { id: "discover", label: "Discover", icon: "search" },
    { id: "performance", label: "Performance", icon: "chart" },
    { id: "coach", label: "Coach", icon: "users" },
  ]

  const childTitle = profileOpen ? "Profile" : module === "sg" ? "Strokes Gained" : module === "drills" ? "Drills" : "Video Analysis"

  return (
    <div className="app-stage">
      <div className="phone-shell" onClickCapture={handlePrototypeCapture}>
        {!module && !coachDiscoveryOpen && !profileOpen && !discoverChildOpen && !overlay && (
          <AppTopBar
            title={primaryTab === "discover" ? "Home" : primaryItems.find((item) => item.id === primaryTab)?.label ?? "Discover"}
            initials="AK"
            onHome={() => goPrimaryTab("discover")}
            onProfile={() => setProfileOpen(true)}
          />
        )}

        {discoverChildOpen && !facilityDetailOpen && !module && !coachDiscoveryOpen && !profileOpen && !overlay && (
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
                  initialScreen={sharedFacility === "hamoni" ? "hamoniRangeProfile" : sharedFacility === "range" ? "rangeProfile" : undefined}
                  onModuleStateChange={(_active, section, screen) => {
                    if (section) setDiscoverSection(section)
                    setFacilityDetailOpen(screen === "venueDetails" || screen === "hamoniRangeProfile" || screen === "rangeProfile")
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
        <PrototypeActionSheet action={prototypeAction} close={() => setPrototypeAction(null)} />
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
          <button className="search-box coach-discovery-search" data-prototype="Search coaches" data-prototype-body="Search, filter and sort coaches by fit and playing goals.">
            <Icon name="search" size={19} /><span>Search coaches</span><Icon name="filter" size={17} />
          </button>
          <SectionHeading title="Recommended for you" />
          <div className="coach-booking-list">
            <CoachCard name="Rohan Malhotra" rating="4.9" price={1800} image={photos.golfer} onOpen={()=>go("coachProfile")} onBook={()=>go("coachLesson")} />
            <CoachCard name="Ananya Sethi" rating="4.8" price={1500} image={photos.golfer} onOpen={()=>go("coachProfile")} onBook={()=>go("coachLesson")} />
            <CoachCard name="Kabir Mehra" rating="4.7" price={2200} image={photos.golfer} onOpen={()=>go("coachProfile")} onBook={()=>go("coachLesson")} />
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
