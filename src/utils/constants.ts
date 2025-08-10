export const ROUTES = {
  HOME: "/",
  DESTINATIONS: "/destinations",
  DESTINATION_DETAIL: "/destinations/:destination",
  ABOUT: "/about",
  CONTACT: "/contact",
  ENQUIRY: "/enquiry",
  ADMIN: {
    LOGIN: "/admin/login",
    DASHBOARD: "/admin/dashboard",
    ENQUIRIES: "/admin/enquiries",
    CONTACT_MESSAGES: "/admin/contact-messages",
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
  address: "123 Travel Street, Adventure City, AC 12345",
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
