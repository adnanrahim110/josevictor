export type AppointmentCategory = 
  | "All Services"
  | "Business Orientation"
  | "Administrative Services"
  | "Financial Services"
  | "Legal Services"
  | "Social Services";

export interface Appointment {
  title: string;
  duration: string;
  price: string;
  category: AppointmentCategory;
}

export const APPOINTMENTS: Appointment[] = [
  // Business Orientation
  { title: "Initial Meeting- Orientation", duration: "15 mins", price: "Free", category: "Business Orientation" },
  
  // Administrative Services
  { title: "Profesional Consultation- Administrative", duration: "1 hr", price: "Price Varies", category: "Administrative Services" },
  { title: "Admin Support- Human Resources", duration: "1 hr", price: "Price Varies", category: "Administrative Services" },
  { title: "Admin Support- Grants and Agreements Management", duration: "1 hr", price: "Price Varies", category: "Administrative Services" },
  { title: "Admin Support- Performance Measurement", duration: "1 hr", price: "Price Varies", category: "Administrative Services" },
  { title: "Admin Support- Marketing, Advertising and Events", duration: "1 hr", price: "Price Varies", category: "Administrative Services" },
  { title: "Admin Support- Strategic Plan Development", duration: "1 hr", price: "Price Varies", category: "Administrative Services" },
  { title: "Admin Support- Strategic Problem Solving", duration: "1 hr", price: "Price Varies", category: "Administrative Services" },
  { title: "Admin Support- Educational Workshop", duration: "1 hr", price: "Price Varies", category: "Administrative Services" },
  { title: "Digital Media Support", duration: "1 hr", price: "Price Varies", category: "Administrative Services" },
  
  // Financial Services
  { title: "Professional Consult- Financial", duration: "1 hr", price: "Price Varies", category: "Financial Services" },
  { title: "Financial Support- Audit and Compliance", duration: "1 hr", price: "Price Varies", category: "Financial Services" },
  { title: "Financial Support- Business Valuation", duration: "1 hr", price: "Price Varies", category: "Financial Services" },
  { title: "Financial Support- Loss Prevention", duration: "1 hr", price: "Price Varies", category: "Financial Services" },
  { title: "Financial Support- Forensic Accounting", duration: "1 hr", price: "Price Varies", category: "Financial Services" },
  { title: "Financial Support- Mergers and Acquisitions", duration: "1 hr", price: "Price Varies", category: "Financial Services" },
  
  // Legal Services
  { title: "Professional Consult- Legal", duration: "1 hr", price: "Price Varies", category: "Legal Services" },
  { title: "Legal Support- Notary", duration: "1 hr", price: "Price Varies", category: "Legal Services" },
  { title: "Legal Support- Labor", duration: "1 hr", price: "Price Varies", category: "Legal Services" },
  { title: "Legal Support- Civil and Administrative", duration: "1 hr", price: "Price Varies", category: "Legal Services" },
  { title: "Legal Support- Criminal", duration: "1 hr", price: "Price Varies", category: "Legal Services" },
  { title: "Legal Support- Corporative and Contributions", duration: "1 hr", price: "Price Varies", category: "Legal Services" },
  { title: "Legal Support- Inheritance", duration: "1 hr", price: "Price Varies", category: "Legal Services" },
  { title: "Legal Support- Claims and Appeals", duration: "1 hr", price: "Price Varies", category: "Legal Services" },
  
  // Social Services
  { title: "Initial Consultation", duration: "1 hr", price: "$50", category: "Social Services" },
  { title: "Individual Session", duration: "1 hr", price: "$45", category: "Social Services" },
  { title: "Group Session", duration: "1 hr", price: "$30", category: "Social Services" },
  { title: "Case Management", duration: "1 hr", price: "Price Varies", category: "Social Services" },
];

export const APPOINTMENT_CATEGORIES: AppointmentCategory[] = [
  "All Services",
  "Business Orientation",
  "Administrative Services",
  "Financial Services",
  "Legal Services",
  "Social Services"
];
