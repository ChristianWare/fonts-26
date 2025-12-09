import Project1 from "../../public/images/thunder.jpg";
import Nier from "../../public/images/nier.jpg";
import Project3 from "../../public/images/dog.jpg";
import BookingSystem from "../../public/images/bookingSystemii.png";
import AppointmentAlerts from "../../public/images/AppointmentAlerts.png";
import NoShow from "../../public/images/NoShow.png";
import NierHome from "../../public/images/nierHome.png";
import NierAbout from "../../public/images/nierAbout.png";
import NierServices from "../../public/images/nierServices.png";
import NierOther from "../../public/images/NierOther.png";
import GroomerHome from "../../public/images/groomerHome.png";
import GroomerAbout from "../../public/images/groomerAbout.png";
import GroomerServices from "../../public/images/groomerServices.png";
import GroomerAdmin from "../../public/images/groomerAdmin.png";
import velevtandvineImg from "../../public/images/velevtandvince.jpg";
import VelvetHome from "../../public/images/velvetHome.png";
import VelvetAbout from "../../public/images/velvetAbout.png";
import VelvetServices from "../../public/images/velvetServices.png";
import VelvetGallery from "../../public/images/velvetGallery.png";
import ThunderHome from "../../public/images/thunderHome.png";
import ThunderProduct from "../../public/images/thunderProduct.png";
import ThunderProductii from "../../public/images/thunderProductii.png";
import ThunderAbout from "../../public/images/thunderAbout.png";

export const process = [
  {
    id: 1,
    title: "Project Discovery",
    desc: "Focused conversations and light research to understand your services, audience, and goals—then define simple success metrics to guide the build.",
  },
  {
    id: 2,
    title: "Strategy & Creative Direction",
    desc: "We turn insights into a clear plan: refine your offer, name straightforward options, and outline the few easy steps clients take to book.",
  },
  {
    id: 3,
    title: "Design & Project Build",
    desc: "We craft an on-brand website and a smooth one-screen booking flow (service → pro → time → pay), built with precision, accessibility, and attention to detail.",
  },
  {
    id: 4,
    title: "Launch & Handoff",
    desc: "We go live with a calm, confidence-building experience and show your team exactly how to manage bookings day-to-day.",
  },
  {
    id: 5,
    title: "Project Scale & Optimization",
    desc: "We monitor early results and fine-tune copy, layout, and offer structure to lift conversions—then support growth with add-ons, memberships, and campaigns.",
  },
] as const;

export const footerData = [
  {
    id: 1,
    title: "Quick Links",
    options: [
      {
        id: 1.1,
        option: "Home",
        href: "/",
      },
      // {
      //   id: 1.2,
      //   option: "About",
      // },
      // {
      //   id: 1.3,
      //   option: "Work",
      //   href: "/work",
      // },
      {
        id: 1.4,
        option: "Pricing",
        href: "/pricing",
      },
      {
        id: 1.5,
        option: "Blog",
        href: "/blog",
      },
      {
        id: 1.56,
        option: "Faqs",
        href: "/faqs",
      },
      {
        id: 1.6,
        option: "Login",
        href: "/login",
      },
      {
        id: 1.7,
        option: "Register",
        href: "/register",
      },
      {
        id: 1.8,
        option: "My Account",
        href: "/account",
      },
    ],
  },
  {
    id: 2,
    title: "Legal",
    options: [
      {
        id: 2.1,
        option: "Terms and Conditions",
        href: "/terms",
      },
      {
        id: 2.2,
        option: "Privacy Policy",
        href: "/privacy",
      },
      {
        id: 2.3,
        option: "Accessibility",
        href: "/accessibility",
      },
      // {
      //   id: 2.4,
      //   option: "Careers",
      // },
    ],
  },
  {
    id: 3,
    title: "Company",
    options: [
      {
        id: 3.1,
        option: "Contact Us",
        href: "/contact",
      },
      {
        id: 3.2,
        option: "About",
        href: "/about",
      },
      {
        id: 3.3,
        option: "FAQ's",
        href: "/faqs",
      },
      {
        id: 3.4,
        option: "Blog",
        href: "/blog",
      },
      // {
      //   id: 3.4,
      //   option: "FAQs",
      // },
    ],
  },
];

export const footerData2 = [
  {
    id: 4,
    title: "Privacy Policy",
  },
  {
    id: 5,
    title: "Terms & Conditions",
  },
  {
    id: 6,
    title: "Cookie Preferences",
  },
  {
    id: 7,
    title: "Legal Information",
  },
] as const;

export const projects = [
  {
    id: 1,
    title: "Thundertrails Clips",
    slug: "thundertrails",
    src: Project1,
    description:
      "Thundertrails started in 2019 renting premium mountain and e-bikes to riders exploring desert singletrack and high-country trails. Demand outgrew their manual, message-based booking flow—double-bookings, missed deposits, and no-shows were common. We built a direct-booking platform that fills calendars (not inboxes) with real-time availability, deposits, and guided add-ons like helmet, rack, or child-seat rentals.",
    tags: [
      { id: 1.98, tag: "Bike Rentals" },
      { id: 1.99, tag: "Booking Platform" },
    ],
    h1: "From DMs to deposits: a direct-booking system for premium bike rentals",
    year: 2025,
    platform: "Direct Booking",
    tech: "Next.js + Stripe + iCal/Google Sync + Twilio",
    href: "https://thunder-wix.vercel.app/",
    challenge: [
      {
        id: 1.1,
        challengeDetail:
          "Inventory conflicts and double-bookings across walk-ins, phone calls, and marketplace listings. No centralized calendar or automated cutoff for same-day rentals.",
      },
      {
        id: 1.2,
        challengeDetail:
          "High no-show rate due to pay-at-pickup; staff spent hours chasing confirmations and manual waivers.",
      },
      {
        id: 1.3,
        challengeDetail:
          "Upsells (protective gear, racks, premium batteries) were offered ad-hoc and rarely captured at checkout.",
      },
    ],
    results: [
      {
        id: 1.4,
        resultDetail:
          "Introduced deposit-secured checkout with automated SMS/email reminders and e-waivers. No-shows down 62%; waiver completion before pickup up 94%.",
      },
      {
        id: 1.5,
        resultDetail:
          "Live inventory with per-model buffers and blackout windows eliminated conflicts. Staff scheduling and maintenance holds sync to Google Calendar.",
      },
      {
        id: 1.6,
        resultDetail:
          "In-flow add-ons increased average order value by 37%. Guided trail add-ons and damage-waiver toggle boosted attachment rate to 58%.",
      },
    ],
    stats: [
      { id: 1, title: "No-show reduction", desc: "-62%" },
      { id: 2, title: "Increase in AOV", desc: "+37%" },
      { id: 3, title: "Waivers completed pre-arrival", desc: "94%" },
      { id: 4, title: "Double-booking incidents", desc: "0 after launch" },
    ],
    testimonial:
      "From juggling DMs to a clean calendar with deposits and no double-bookings.",
    owner: "Chris Barton",
    src2: ThunderHome,
    src3: ThunderProduct,
    src4: ThunderProductii,
    src5: ThunderAbout,
  },
  {
    id: 2,
    title: "Nier Transportation",
    slug: "nier-transportation",
    src: Nier,
    description:
      "Nier Transportation provides high-end black-car service across Phoenix and all of Arizona—airport transfers, hourly charters, and long-distance city-to-city. They needed a luxury-grade booking experience with instant quotes, vehicle selection, deposits, and chauffeur/vehicle dispatch—without endless phone tag.",
    tags: [
      { id: 2.98, tag: "Transportation" },
      { id: 2.99, tag: "Black-Car / Chauffeur" },
    ],
    h1: "A luxury booking flow for Phoenix’s black-car service—built for speed and zero friction",
    year: 2025,
    platform: "Direct Booking",
    tech: "Next.js + Stripe + Maps/Distance Matrix + iCal/365 + Twilio",
    href: "https://newnier-17bd.vercel.app/",
    challenge: [
      {
        id: 2.1,
        challengeDetail:
          "Manual quoting slowed conversions. Airport/point-to-point pricing required zones, distance tiers, surcharges, and wait-time logic.",
      },
      {
        id: 2.2,
        challengeDetail:
          "Last-minute cancellations and no-shows impacted utilization. No card-on-file or deposit policy enforced at booking.",
      },
      {
        id: 2.3,
        challengeDetail:
          "Dispatching chauffeurs and vehicles required juggling texts, spreadsheets, and separate calendars with frequent assignment errors.",
      },
    ],
    results: [
      {
        id: 2.4,
        resultDetail:
          "Instant quote engine with live distance/time pricing, airport surcharges, and gratuity presets increased completed bookings by 54%.",
      },
      {
        id: 2.5,
        resultDetail:
          "Deposit-first checkout and tiered cancellation windows cut late cancels by 49%. Automated SMS with driver/vehicle details reduced support calls.",
      },
      {
        id: 2.6,
        resultDetail:
          "Role-based dispatch assigns vehicles and chauffeurs, pushes events to 365/Google calendars, and blocks conflicts. On-time pickup rate reached 98.7%.",
      },
    ],
    stats: [
      { id: 1, title: "Completed bookings", desc: "+54%" },
      { id: 2, title: "Late cancellations", desc: "-49%" },
      { id: 3, title: "On-time pickup rate", desc: "98.7%" },
      { id: 4, title: "Quote-to-book time", desc: "-68%" },
    ],
    testimonial:
      "Clients book in under a minute with a polished quote and deposit.",
    owner: "Chris Barton",
    src2: NierHome,
    src3: NierAbout,
    src4: NierServices,
    src5: NierOther,
  },
  {
    id: 3,
    title: "Great Groomers of California",
    slug: "great-groomers-of-california",
    src: Project3,
    description:
      "Great Groomers of California is a boutique dog-grooming salon in San Diego. They needed a stress-free booking flow that handled breed/size complexity, stylist selection, and add-ons—while reducing no-shows and phone time. We built a direct-booking experience with smart pricing, deposit-secured checkout, automated reminders, and an add-on step that lifts average order value.",
    tags: [
      { id: 3.98, tag: "Dog Spa" },
      { id: 3.99, tag: "Salon Booking" },
    ],
    h1: "A no-stress spa booking flow for pups—and their humans",
    year: 2025,
    platform: "Direct Booking",
    tech: "Next.js + Stripe + Prisma/PostgreSQL + NextAuth + Twilio",
    href: "https://muchacho-grooming-demo.vercel.app/",
    challenge: [
      {
        id: 3.1,
        challengeDetail:
          "Breed/size complexity made quoting inconsistent. Staff capacity and service durations varied by stylist and service.",
      },
      {
        id: 3.2,
        challengeDetail:
          "High day-of cancellations and no-shows from pay-later flow; phones tied up with reschedule calls.",
      },
      {
        id: 3.3,
        challengeDetail:
          "Upsells (teeth brushing, de-shed, paw balm) were forgotten at the counter instead of captured online.",
      },
    ],
    results: [
      {
        id: 3.4,
        resultDetail:
          "Smart pricing by breed/size with service-duration templates. Calendar shows only realistic time slots per stylist.",
      },
      {
        id: 3.5,
        resultDetail:
          "Deposit-required checkout with automated reminders and self-serve reschedule link cut no-shows by 58% and phone time by 41%.",
      },
      {
        id: 3.6,
        resultDetail:
          "Add-on step in flow increased attachment rate to 63% and lifted AOV by 29%.",
      },
    ],
    stats: [
      { id: 1, title: "No-show reduction", desc: "-58%" },
      { id: 2, title: "AOV lift from add-ons", desc: "+29%" },
      { id: 3, title: "Phone time reduction", desc: "-41%" },
      { id: 4, title: "Online reschedules self-serve", desc: "87%" },
    ],
    testimonial:
      "Our calendar has real capacity by stylist. And no more no-shows!",
    owner: "Chris Barton",
    src2: GroomerHome,
    src3: GroomerAbout,
    src4: GroomerServices,
    src5: GroomerAdmin,
  },
  {
    id: 4,
    title: "Velvet & Vine",
    slug: "velvet-and-vine",
    src: velevtandvineImg,
    description:
      "Great Groomers of California is a boutique dog-grooming salon in San Diego. They needed a stress-free booking flow that handled breed/size complexity, stylist selection, and add-ons—while reducing no-shows and phone time. We built a direct-booking experience with smart pricing, deposit-secured checkout, automated reminders, and an add-on step that lifts average order value.",
    tags: [
      { id: 3.98, tag: "Dog Spa" },
      { id: 3.99, tag: "Salon Booking" },
    ],
    h1: "A no-stress spa booking flow for pups—and their humans",
    year: 2025,
    platform: "Direct Booking",
    tech: "Next.js + Stripe + Prisma/PostgreSQL + NextAuth + Twilio",
    href: "https://muchacho-grooming-demo.vercel.app/",
    challenge: [
      {
        id: 3.1,
        challengeDetail:
          "Breed/size complexity made quoting inconsistent. Staff capacity and service durations varied by stylist and service.",
      },
      {
        id: 3.2,
        challengeDetail:
          "High day-of cancellations and no-shows from pay-later flow; phones tied up with reschedule calls.",
      },
      {
        id: 3.3,
        challengeDetail:
          "Upsells (teeth brushing, de-shed, paw balm) were forgotten at the counter instead of captured online.",
      },
    ],
    results: [
      {
        id: 3.4,
        resultDetail:
          "Smart pricing by breed/size with service-duration templates. Calendar shows only realistic time slots per stylist.",
      },
      {
        id: 3.5,
        resultDetail:
          "Deposit-required checkout with automated reminders and self-serve reschedule link cut no-shows by 58% and phone time by 41%.",
      },
      {
        id: 3.6,
        resultDetail:
          "Add-on step in flow increased attachment rate to 63% and lifted AOV by 29%.",
      },
    ],
    stats: [
      { id: 1, title: "No-show reduction", desc: "-58%" },
      { id: 2, title: "AOV lift from add-ons", desc: "+29%" },
      { id: 3, title: "Phone time reduction", desc: "-41%" },
      { id: 4, title: "Online reschedules self-serve", desc: "87%" },
    ],
    testimonial:
      "Our calendar has real capacity by stylist. And no more no-shows!",
    owner: "Chris Barton",
    src2: VelvetHome,
    src3: VelvetAbout,
    src4: VelvetServices,
    src5: VelvetGallery,
  },
  // {
  //   id: 4,
  //   title: "Elite Retreat Rentals",
  //   slug: "elite-retreat-rentals",
  //   src: Project4,
  //   video: "/videos/rentals.mp4",
  //   description:
  //     "Elite Retreat Rentals manages three luxury vacation properties in the Phoenix metro. We built a direct booking experience with real-time calendars, dynamic pricing, digital guidebooks, and a guest portal—reducing reliance on OTAs while improving margins and stay quality.",
  //   tags: [
  //     { id: 4.98, tag: "Hospitality" },
  //     { id: 4.99, tag: "Booking Platform" },
  //   ],
  //   h1: "A premium direct-booking engine for luxury vacation rentals in Phoenix",
  //   year: 2025,
  //   platform: "Direct Booking",
  //   tech: "Next.js + Prisma/PostgreSQL + Stripe + iCal/OTA Sync + NextAuth",
  //   href: "https://case-study-one-git-main-christianwares-projects.vercel.app/",
  //   challenge: [
  //     {
  //       id: 4.1,
  //       challengeDetail:
  //         "OTA fees eroded margins and limited brand storytelling; manual calendars created double-booking risk.",
  //     },
  //     {
  //       id: 4.2,
  //       challengeDetail:
  //         "No integrated upsells for add-on experiences (early check-in, private chef, pool heat), leaving revenue on the table.",
  //     },
  //     {
  //       id: 4.3,
  //       challengeDetail:
  //         "Guest communication was scattered across email threads; property ops (cleaning, maintenance) weren’t synced.",
  //     },
  //   ],
  //   results: [
  //     {
  //       id: 4.4,
  //       resultDetail:
  //         "Direct bookings now drive 78% of reservations. Integrated OTA/iCal sync eliminated conflicts and stabilized occupancy.",
  //     },
  //     {
  //       id: 4.5,
  //       resultDetail:
  //         "Add-on marketplace increased ancillary revenue by 45%; dynamic pricing improved shoulder-season occupancy by 41%.",
  //     },
  //     {
  //       id: 4.6,
  //       resultDetail:
  //         "Guest portal centralizes messages, digital guidebooks, and check-in. Ops calendar syncs cleans/turnovers to reduce misses.",
  //     },
  //   ],
  //   stats: [
  //     { id: 1, title: "Bookings made directly", desc: "78%" },
  //     { id: 2, title: "Profit-margin increase", desc: "+32%" },
  //     { id: 3, title: "Increase in avg. stay length", desc: "+2.4 nights" },
  //     { id: 4, title: "Occupancy lift in slow periods", desc: "+41%" },
  //   ],
  //   testimonial:
  //     "We reclaimed margins from OTA fees and finally control the guest journey. The guest portal and add-ons pay for themselves every month.",
  //   src2: Project1,
  //   src3: NierAbout,
  //   src4: NierAbout,
  //   src5: NierAbout,
  // },
] as const;

export const pricingData = [
  {
    id: 1,
    btnColor: "black",
    service: "Solo",
    headline: "One-person calendar, zero double-bookings",
    desc: "Perfect for solo stylists, consultants, and single-property hosts who need a simple booking flow with payments.",
    descii:
      "Built for independent pros who want to stop back-and-forth scheduling and double-bookings. A branded calendar with deposits, automated reminders, and easy rescheduling reduces no-shows and protects your income. Move from DMs to a reliable, professional booking experience—without the overhead of staff or multiple locations.",
    price: "$375",
    servicesInclude: [
      {
        id: 1.1,
        serviceName: "Single-resource calendar",
        description: "One master calendar with day, week, and agenda views.",
      },
      {
        id: 1.2,
        serviceName: "Stripe deposit checkout",
        description:
          "Collect non-refundable deposits or full payment at booking.",
      },
      {
        id: 1.3,
        serviceName: "SMS / email reminders",
        description: "24 h and 2 h nudges reduce no-shows fast.",
      },
      {
        id: 1.4,
        serviceName: "Guest reschedule link",
        description: "Clients manage changes without DMing you.",
      },
    ],
    addonSectionData: [
      {
        id: 1.01,
        expansionblock: "Extra Reminder Tier",
        details: "Add a 7-day “Are you still coming?” SMS",
        price: "$100",
      },
      {
        id: 1.02,
        expansionblock: "Gift-Card Module",
        details: "Sell digital gift cards from the same checkout",
        price: "$200",
      },
    ],
  },
  {
    id: 2,
    btnColor: "accent",
    service: "Team",
    headline: "Up to 15 stylists, trainers, or practitioners—one dashboard",
    desc: "Built for salons, fitness studios, and clinics where clients choose a staff member and pay a deposit.",
    descii:
      "For growing teams—up to 15 stylists, trainers, or practitioners—who need a shared booking hub. Staff get color-coded schedules while admins control deposits and permissions; clients choose their provider at checkout and the front desk manages bookings without touching financial data. Upsells at checkout and Google/365 sync lift revenue and keep availability accurate.",
    price: "$450",
    servicesInclude: [
      {
        id: 2.1,
        serviceName: "Multi-staff calendar",
        description: "Colour-coded schedules for up to 15 team members.",
      },
      {
        id: 2.2,
        serviceName: "Google / 365 sync",
        description:
          "Two-way sync keeps personal and booking calendars aligned.",
      },
      {
        id: 2.3,
        serviceName: "Upsell add-ons",
        description: "Offer treatments or extras during checkout.",
      },
      {
        id: 2.4,
        serviceName: "Role-based access",
        description:
          "Front-desk staff manage bookings without touching financials.",
      },
    ],
    addonSectionData: [
      {
        id: 2.01,
        expansionblock: "Resource Tier",
        details: "Each additional 5 staff calendars beyond 15",
        price: "$600",
      },
      {
        id: 2.02,
        expansionblock: "Membership Module",
        details: "Auto-bill recurring packages with usage tracking",
        price: "$1,200",
      },
      // {
      //   id: 2.03,
      //   expansionblock: "CRM Link",
      //   details: "Push booking data to HubSpot or Klaviyo",
      //   price: "$800",
      // },
    ],
  },
  {
    id: 3,
    btnColor: "black",
    service: "Rental/Fleet",
    headline: "Real-time stock, deposits, and damage-hold authorisations",
    desc: "For car-hire companies, equipment rental shops, or kayak fleets that rent assets by time or day.",
    descii:
      "Built for car hire, equipment shops, and adventure outfitters renting physical assets. Real-time inventory with maintenance/blackout controls prevents overbooking, while Stripe damage-hold pre-authorizations and QR check-in/out streamline handovers and protect revenue. Automated late-return fees and scalable options grow with your fleet.",
    price: "$525",
    servicesInclude: [
      {
        id: 4.1,
        serviceName: "Inventory manager",
        description:
          "Track availability, maintenance blocks, and blackout dates.",
      },
      {
        id: 4.2,
        serviceName: "Damage-hold payments",
        description:
          "Pre-authorise security deposits on Stripe, auto-release at return.",
      },
      {
        id: 4.3,
        serviceName: "QR check-in",
        description:
          "Scan items out and in via mobile to update stock instantly.",
      },
      {
        id: 4.4,
        serviceName: "Late-return fees",
        description: "Automatic overtime charges keep customers accountable.",
      },
    ],
    addonSectionData: [
      {
        id: 4.01,
        expansionblock: "Insurance API",
        details: "Real-time policy issuance at checkout",
        price: "$1,500",
      },
      {
        id: 4.02,
        expansionblock: "Fleet Size Tier",
        details: "Every additional block of 25 rental units beyond 50",
        price: "$700",
      },
      // {
      //   id: 4.03,
      //   expansionblock: "Analytics Tier",
      //   details: "Custom Power BI or Looker Studio dashboards",
      //   price: "$900",
      // },
    ],
  },
  {
    id: 4,
    btnColor: "black",
    service: "Multi-Location",
    headline: "One backend, many branches or villas",
    desc: "Ideal for spa chains, franchise gyms, or vacation-rental portfolios with 2-10 locations.",
    descii:
      "Centralize multiple branches or properties under one backend. Guests pick a location first, while each branch keeps its own pricing, tax, and currency, and HQ tracks utilization and revenue in a single dashboard. Dynamic pricing rules help maximize occupancy as you scale.",
    price: "$650",
    servicesInclude: [
      {
        id: 3.1,
        serviceName: "Location switcher",
        description: "Guests pick branch or property before choosing services.",
      },
      {
        id: 3.2,
        serviceName: "Per-location pricing",
        description: "Each branch sets its own fees, tax, and currency.",
      },
      {
        id: 3.3,
        serviceName: "Central admin",
        description: "HQ dashboard shows combined utilisation and revenue.",
      },
      {
        id: 3.4,
        serviceName: "Dynamic pricing",
        description:
          "Yield-management rules raise or lower prices automatically.",
      },
    ],
    addonSectionData: [
      {
        id: 3.01,
        expansionblock: "Location Tier",
        details: "Each extra branch or property beyond the first 10",
        price: "$800",
      },
      {
        id: 3.02,
        expansionblock: "Accounting API",
        details: "Sync payouts to Xero or QuickBooks",
        price: "$1,800",
      },
    ],
  },
  // {
  //   id: 5,
  //   service: "Custom",
  //   headline: "Bespoke architecture for unique booking models",
  //   desc: "For enterprise chains or complex use-cases—think 50+ locations, hybrid rentals, or regulated medical workflows—where off-the-shelf logic won’t cut it. Timeline and cost are scoped after a technical discovery sprint.",
  //   descii:
  //     "For large or regulated operations that need bespoke logic. We begin with a discovery sprint, then design custom architecture—HIPAA-ready intake, multi-tenant roles, enterprise hosting/SLAs, and deep ERP/CRM integrations. Includes monitoring and priority support; pricing is tailored to your scope.",
  //   price: "$Custom Quote",
  //   servicesInclude: [
  //     {
  //       id: 5.1,
  //       serviceName: "Discovery sprint",
  //       description:
  //         "Two-week deep dive into API landscape, compliance needs, and workflow mapping.",
  //     },
  //     {
  //       id: 5.2,
  //       serviceName: "Bespoke feature engineering",
  //       description:
  //         "Custom modules such as insurance underwriting, multi-tenant role layers, or HIPAA-secure intake forms.",
  //     },
  //     {
  //       id: 5.3,
  //       serviceName: "Dedicated SLA & hosting",
  //       description:
  //         "24-7 monitoring, 99.9 % uptime, and priority support response under 2 hours.",
  //     },
  //     {
  //       id: 5.4,
  //       serviceName: "Enterprise integrations",
  //       description:
  //         "Real-time data bridges to ERP, CRM, PMS, or proprietary internal systems.",
  //     },
  //   ],
  //   addonSectionData: [
  //     {
  //       id: 5.01,
  //       expansionblock: "Compliance Tier",
  //       details: "SOC 2, HIPAA, or GDPR audit package",
  //       price: "POA",
  //     },
  //     {
  //       id: 5.02,
  //       expansionblock: "Scalability Tier",
  //       details: "Horizontal scaling for 1 000+ concurrent bookings",
  //       price: "POA",
  //     },
  //   ],
  // },
] as const;

// lib/data.ts (excerpt) — Route-aware FAQs

export type SectionKey =
  | "home"
  | "pricing"
  | "about"
  | "work"
  | "blog"
  | "contact";

export type QuestionItem = {
  id: number;
  question: string;
  answer: string;
  sections: SectionKey[]; // which routes this FAQ should appear on
};

export const questions: readonly QuestionItem[] = [
  {
    id: 1,
    question: "What exactly does Fonts & Footers build?",
    answer:
      "We specialize in high-conversion direct-booking websites for service businesses—salons, wellness studios, clinics, trainers, chauffeurs, pet groomers, equipment/vehicle rentals, and more. Our sites focus on one thing: turning visitors into paid, deposit-secured appointments.",
    sections: ["home", "about"],
  },
  {
    id: 2,
    question: "How long does it take to launch?",
    answer:
      "Typical ranges: Solo (single calendar) 10–21 days, Team (multi-staff) 3–6 weeks, Multi-Location/Rental 6–10 weeks. Timelines include discovery, design, build, integrations, and QA. Rush options are available when content and decisions are ready on day one.",
    sections: ["home", "work"],
  },
  {
    id: 3,
    question:
      "How do your plans differ (Solo vs Team vs Multi-Location vs Rental/Fleet vs Custom)?",
    answer:
      "Solo: one bookable calendar and simple upsells. Team: multiple staff calendars, role-based access, Google/365 sync. Multi-Location: location routing, hours/policies per site. Rental/Fleet: inventory, blackout dates, holds/returns. Custom: bespoke features and integrations.",
    sections: ["work", "pricing", "home"],
  },
  {
    id: 4,
    question: "How do deposits, cancellations, and no-shows work?",
    answer:
      "Your site enforces your policy. We can collect non-refundable deposits or full prepayment, set cancellation windows, require card-on-file, charge late/no-show fees, and auto-send SMS/email reminders with links to reschedule inside your policy rules.",
    sections: ["home", "pricing", "contact"],
  },
  {
    id: 5,
    question: "Which payment processor do you use?",
    answer:
      "Stripe is our default for cards, Apple Pay, Google Pay, and subscription/membership billing. We can also integrate PayPal or regional options on request. You keep the merchant account and receive payouts directly.",
    sections: ["home", "pricing"],
  },
  {
    id: 6,
    question: "How is billing structured (setup fee and monthly)?",
    answer:
      "Most clients choose a one-time setup fee plus a monthly platform fee. You can either: (A) pay setup + first month at signup, renew on the 1st, or (B) pay setup + a prorated first month and then renew on the 1st. Annual prepay gets 20% off the monthly rate.",
    sections: ["pricing"],
  },
  {
    id: 7,
    question: "What’s included in the monthly fee?",
    answer:
      "Hosting, security updates, core feature updates, uptime monitoring, minor content tweaks, and support. Optional add-ons include growth experiments (A/B tests), SEO/content retainers, advanced dashboards, and custom feature work.",
    sections: ["pricing", "home"],
  },
  {
    id: 8,
    question: "Do SMS reminders cost extra?",
    answer:
      "Yes. SMS is billed at pass-through vendor rates (usage-based). We’ll estimate volumes during onboarding and set sensible limits so you control costs while keeping no-shows low.",
    sections: ["pricing"],
  },
  {
    id: 9,
    question:
      "Can you migrate me from Calendly, GlossGenius, Vagaro, Mindbody, or Square?",
    answer:
      "Yes. We migrate services, staff, locations, and—where exportable—clients and future bookings. We also set up redirects and ‘we’ve moved’ messaging to make the transition painless for your customers.",
    sections: ["contact", "work"],
  },
  {
    id: 10,
    question: "Will this replace my existing CRM or POS?",
    answer:
      "Often we complement them. We can push new leads/clients to your CRM, sync calendars (Google/365), and keep Stripe as your payments source of truth. If you need a full replacement, we’ll scope what’s realistic.",
    sections: ["contact", "about"],
  },
  {
    id: 11,
    question: "Do you support memberships, packages, and gift cards?",
    answer:
      "Yes—memberships with recurring billing, credit packs, punch cards, promo codes, and digital gift cards. Redemptions and balances are handled inside the booking flow.",
    sections: ["pricing", "home"],
  },
  {
    id: 12,
    question: "How do you handle multi-location and staff availability?",
    answer:
      "Rules per location (hours, buffers, services) and per staff (skills, breaks, travel time). Users pick location → provider → time, or we auto-assign by rules. Everything respects your blackout dates and real-time conflicts.",
    sections: ["work"],
  },
  {
    id: 13,
    question: "Can I upsell add-ons during booking?",
    answer:
      "Absolutely. We support one-click add-ons, bundles, and time-aware upsells that adjust service length and price. Cross-sells can appear on confirmation and reminder flows too.",
    sections: ["pricing", "work", "home"],
  },
  {
    id: 14,
    question: "What about rentals, fleets, or equipment scheduling?",
    answer:
      "We track inventory per asset, availability windows, prep/turnover time, holds/returns, deposits, and damages. Pricing can vary by day, duration, or season, with blackout logic for maintenance.",
    sections: ["work", "pricing"],
  },
  {
    id: 15,
    question: "What tech stack do you use?",
    answer:
      "Next.js for the front end, a Postgres database via Prisma, NextAuth for secure access, Stripe for payments, and best-in-class services for email/SMS and analytics. It’s fast, secure, and highly customizable.",
    sections: ["about", "work"],
  },
  {
    id: 16,
    question: "Where is my site hosted? Vercel or AWS?",
    answer:
      "By default we deploy on Vercel for speed and reliability. If you have specific requirements (VPC, regional data residency, enterprise SLAs), we can architect an AWS deployment as a custom engagement.",
    sections: ["about", "pricing"],
  },
  {
    id: 17,
    question: "Is the site fast and SEO-ready?",
    answer:
      "Yes. We build for Core Web Vitals with image optimization, code splitting, caching/CDN, and schema markup for services, reviews, and FAQs. We set up GA4 (or privacy-friendly analytics) and basic on-page SEO at launch.",
    sections: ["home", "blog"],
  },
  {
    id: 18,
    question: "Do you handle accessibility?",
    answer:
      "We design against WCAG 2.1 AA guidelines—color contrast, focus states, keyboard navigation, and semantic structure. Accessibility is an ongoing discipline; we include audits and fixes before launch.",
    sections: ["about", "work"],
  },
  {
    id: 19,
    question: "Is this HIPAA compliant for clinics/med-spas?",
    answer:
      "We’re not an EHR. We minimize PHI in the booking layer and integrate HIPAA-eligible vendors for intake forms and messaging when needed. For regulated workflows, we’ll scope compliant patterns with your counsel and vendors.",
    sections: ["about"],
  },
  {
    id: 20,
    question: "Who owns the content and data?",
    answer:
      "You own your brand, domain, copy, images, and customer/booking data. We license the platform code to you as part of your subscription. On request, we can export your data if you decide to move.",
    sections: ["about", "pricing"],
  },
  {
    id: 21,
    question: "What happens if I cancel?",
    answer:
      "We’ll schedule a clean wind-down, turn off renewals, and provide a data export (clients, bookings, products/services). If you need migration support or a static export, we can add that as a one-time service.",
    sections: ["contact", "pricing"],
  },
  {
    id: 22,
    question: "Can my team edit content without code?",
    answer:
      "Yes. You’ll get an admin with safe controls to manage services, pricing, staff schedules, blackout dates, policies, FAQs, promos, and blog posts. We also provide quick-reference docs and a training call.",
    sections: ["work", "contact"],
  },
  {
    id: 23,
    question: "Do you provide copywriting and photography?",
    answer:
      "We can. Many clients start with our conversion-ready defaults, then add on brand copy and photography to elevate the experience. We also offer guided prompts to move fast if you’re DIY-inclined.",
    sections: ["blog", "about"],
  },
  {
    id: 24,
    question: "Can you integrate reviews and UGC?",
    answer:
      "Yes—native testimonials, Google reviews pull-ins, and simple UGC uploads (with moderation) to showcase real results. We add schema so those reviews help search visibility.",
    sections: ["blog", "work"],
  },
  {
    id: 25,
    question: "Do you guarantee traffic or rankings?",
    answer:
      "We focus on conversion and retention—turning your existing attention into paid appointments. We’ll set a foundation for SEO and ads, but traffic volume depends on your market and marketing. We can run experiments to grow it.",
    sections: ["home", "blog"],
  },
  {
    id: 26,
    question: "Will you copy components from Webflow or Framer templates?",
    answer:
      "We reference patterns that work but build original, code-owned components tailored to your brand and flow. That keeps you fast, unique, and legally clean with full control over UX and performance.",
    sections: ["work", "about"],
  },
  {
    id: 27,
    question: "What analytics and dashboards do I get?",
    answer:
      "A bookings dashboard with revenue, utilization, no-show rate, channel attribution, and cohort retention. We wire GA4 (or Plausible/Matomo) and set up event tracking for funnel steps and conversions.",
    sections: ["work", "pricing"],
  },
  {
    id: 28,
    question: "Do you support multi-language or international customers?",
    answer:
      "Yes—language toggles, localized content, and time-zone-aware scheduling. If you serve multiple regions, we can vary services, pricing, and policies by locale.",
    sections: ["blog", "work"],
  },
  {
    id: 29,
    question: "How do refunds and disputes work?",
    answer:
      "Refunds follow your policy and are issued through Stripe. For disputes, we help assemble evidence (policy acceptance, reminder logs, visit history) to improve win rates.",
    sections: ["pricing", "contact"],
  },
  {
    id: 30,
    question: "What about emails and notifications?",
    answer:
      "We brand your transactional emails and SMS, including confirmations, reminders, reschedules, waitlist clears, membership renewals, and review requests. You control timing and tone.",
    sections: ["work", "contact"],
  },
  {
    id: 31,
    question: "Can you import my existing client list and future appointments?",
    answer:
      "Yes—CSV imports for clients and services are straightforward. Future bookings can usually be migrated if your current system supports export; we’ll map fields and validate before going live.",
    sections: ["work", "contact"],
  },
  {
    id: 32,
    question: "What security measures do you take?",
    answer:
      "End-to-end HTTPS, role-based access, regular dependency updates, WAF/CDN shielding, automated backups, and Stripe for PCI-scoped payments. We monitor uptime and errors continuously.",
    sections: ["work", "about"],
  },
  {
    id: 33,
    question: "Do you offer support after launch?",
    answer:
      "Definitely. You’ll have a dedicated support channel for fixes and small changes, plus options for ongoing experiments and new features. Most questions are answered same or next business day.",
    sections: ["about", "contact", "home"],
  },
  {
    id: 34,
    question: "Can I run promotions, discounts, and limited-time offers?",
    answer:
      "Yes—promo codes, first-visit offers, membership-only pricing, and time-boxed discounts. We can show urgency variables (spots left, timers) without harming UX.",
    sections: ["pricing"],
  },
  {
    id: 35,
    question: "What content do you need from me to start?",
    answer:
      "Brand assets (logo, colors, fonts), services and pricing, policies, hours, staff bios, location details, and any photos. If anything is missing, we’ll provide guided templates and fill gaps with best-practice defaults.",
    sections: ["contact", "work"],
  },
  {
    id: 36,
    question: "Do you work on contracts or month-to-month?",
    answer:
      "Most clients are month-to-month after setup. Annual prepay is available at a discount. Custom/enterprise builds may include specific statements of work and milestones.",
    sections: ["pricing", "about"],
  },
  {
    id: 37,
    question: "Can you add a blog or resources section?",
    answer:
      "Yes. We can ship a lightweight blog you can edit in the admin, or integrate a headless CMS if your team prefers. Posts include SEO schema and are optimized for speed.",
    sections: ["blog"],
  },
  {
    id: 38,
    question: "Do you handle email marketing and CRM automations?",
    answer:
      "We’ll integrate your tool of choice (Klaviyo, Mailchimp, HubSpot, etc.) and tag key events (lead, booking, no-show, renewal). If you need flows built, we can add that as a growth engagement.",
    sections: ["blog", "work"],
  },
  {
    id: 39,
    question: "Can I approve the design before development?",
    answer:
      "Yes. We work in short, visual sprints—wireframes to hi-fi mockups—so you can approve structure, copy, and style before we lock in and build.",
    sections: ["work", "about"],
  },
  {
    id: 40,
    question: "What makes Fonts & Footers different?",
    answer:
      "We’re laser-focused on bookings—not generic websites. Our flows are tested to reduce no-shows, capture deposits, and surface upsells without friction. You get speed to launch, measurable outcomes, and a partner who cares about filled calendars—not vanity metrics.",
    sections: ["about", "home"],
  },
] as const;

export const AboutUsData = [
  {
    id: 1,
    title: "Booking System",
    desc: "Within a set budget, we launch fast and learn quickly.",
    src: BookingSystem,
  },
  {
    id: 2,
    title: "Appointment Alerts",
    desc: "Scale what works so you can focus on your craft",
    src: AppointmentAlerts,
  },
  {
    id: 3,
    title: "No-show Protection",
    desc: "Multi-location/team operations",
    src: NoShow,
  },
  // {
  //   id: 4,
  //   title: "Staff Scheduling & Management",
  //   desc: "Assign staff or manager roles to your team members and let them manage their own schedules, leaves, etc. ",
  // },
  // {
  //   id: 5,
  //   title: "Reports and Analytics",
  //   desc: "Gain insights into your business performance with comprehensive reporting tools.",
  // },
  {
    id: 6,
    title: "Payments",
    desc: "Accept deposits or full payments at booking via Stripe or PayPal.",
    src: NoShow,
  },
] as const;
