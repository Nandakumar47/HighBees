export const ROUTES = {
  HOME: "/",
  DESTINATIONS: "/destinations",
  DESTINATION_DETAIL: "/destinations/:destination",
  ABOUT: "/about",
  CONTACT: "/contact",
  ENQUIRY: "/enquiry",
  ERROR: "/error",
  ADMIN: {
    LOGIN: "/admin/login",
    REGISTER: "/admin/register",
    DASHBOARD: "/admin/dashboard",
    ENQUIRIES: "/admin/enquiries",
    CONTACT_MESSAGES: "/admin/contact-messages",
    ADD_DESTINATION: "/admin/add-destination",
  },
} as const;

export const STATUS_OPTIONS = [
  { value: "New", label: "New", color: "bg-blue-100 text-blue-800" },
  {
    value: "In Progress",
    label: "In Progress",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "Converted",
    label: "Converted",
    color: "bg-green-100 text-green-800",
  },
  {
    value: "Responded",
    label: "Responded",
    color: "bg-green-100 text-green-800",
  },
  { value: "Closed", label: "Closed", color: "bg-gray-100 text-gray-800" },
] as const;

export const PRIORITY_OPTIONS = [
  { value: "High", label: "High", color: "bg-red-100 text-red-800" },
  { value: "Medium", label: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { value: "Low", label: "Low", color: "bg-green-100 text-green-800" },
] as const;

export const DEMO_CREDENTIALS = {
  username: "admin",
  password: "highbees2024",
} as const;

export const CONTACT_INFO = {
  phone: "+9 170198 67571",
  email: "info@highbeesholidays.com",
  address:
    "High Bees Holidays, Om Chambers, 648/A, 4th Floor, Binnamangala 1st Stage, Indiranagar, Banglore - 560 038",
  whatsapp: "+9170198 67571",
} as const;

export const ANIMATION_DURATIONS = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// Navigation breadcrumbs
export const BREADCRUMBS = {
  [ROUTES.DESTINATIONS]: [
    { label: "Home", href: ROUTES.HOME },
    { label: "Destinations", href: ROUTES.DESTINATIONS },
  ],
} as const;

export const SOCIAL_LINKS = {
  FACEBOOK: "https://www.facebook.com/share/1A1KyGTwoj/",
  INSTAGRAM: "https://www.instagram.com/highbeesholidays/",
} as const;

export const ASSETS = {
  LOGO: "/logo.png",
  HERO: {
    SLIDE_1:
      "https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?auto=compress&cs=tinysrgb&w=1920",
    SLIDE_2:
      "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280",
    SLIDE_3:
      "https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
  TESTIMONIALS: {
    SARAH:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
    MICHAEL:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150",
    EMMA:
      "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150",
    DAVID:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
    LISA:
      "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150",
    ROBERT:
      "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  SPECIAL_OFFERS: {
    EARLY_BIRD:
      "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=600",
    HONEYMOON:
      "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600",
    GROUP:
      "https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg?auto=compress&cs=tinysrgb&w=600",
    BALI:
      "https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=400",
    DUBAI:
      "https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=400",
    COSTA_RICA:
      "https://images.pexels.com/photos/1119783/pexels-photo-1119783.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  TRIP_TYPES: {
    HONEYMOON:
      "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800",
    FAMILY:
      "https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg?auto=compress&cs=tinysrgb&w=800",
    ADVENTURE:
      "https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=800",
    CULTURAL:
      "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=800",
    LUXURY:
      "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800",
    BEACH:
      "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800",
    NATURE:
      "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800",
    SOLO:
      "https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  ABOUT: {
    IMAGE_1:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300",
    IMAGE_2:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300",
    IMAGE_3:
      "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300",
    IMAGE_4:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
} as const;

export const API_ENDPOINTS = {
  DESTINATIONS: "/api/destinations",
  ENQUIRY: "/api/enquiry",
  CONTACT: "/api/contact",
} as const;
