export interface Template {
  id: string;
  title: string;
  description: string;
  image: string;
  isPopular?: boolean;
  icons: { name: string; bg: string }[];
}

export const templatesData: Template[] = [
  {
    id: "t1",
    title: "Employee Onboarding",
    description: "Complete multi-stage flow including document signing, account provisioning, and welcome sequences.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    icons: [
      { name: "mail", bg: "bg-blue-500" },
      { name: "description", bg: "bg-amber-500" },
      { name: "chat", bg: "bg-pink-500" }
    ]
  },
  {
    id: "t2",
    title: "Leave Approval",
    description: "Manager approval chain with automated calendar sync and balance deduction logic.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
    icons: [
      { name: "database", bg: "bg-indigo-500" },
      { name: "mail", bg: "bg-blue-500" }
    ]
  },
  {
    id: "t3",
    title: "Document Verification",
    description: "Automated OCR and compliance check for IDs, certifications, and legal documents.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    icons: [
      { name: "description", bg: "bg-amber-500" },
      { name: "chat", bg: "bg-pink-500" },
      { name: "verified_user", bg: "bg-emerald-500" }
    ]
  },
  {
    id: "t4",
    title: "Performance Review",
    description: "End-to-end 360 review cycle management with automated reminders and peer feedback aggregation.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    icons: [
      { name: "trending_up", bg: "bg-emerald-500" },
      { name: "group", bg: "bg-blue-500" }
    ]
  },
  {
    id: "t5",
    title: "Offboarding & Exit",
    description: "Seamless offboarding including IT asset revocation, exit interview scheduling, and final payroll.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    icons: [
      { name: "logout", bg: "bg-red-500" },
      { name: "inventory_2", bg: "bg-indigo-500" }
    ]
  },
  {
    id: "t6",
    title: "Asset Allocation",
    description: "Manage laptop and software license provisioning with automatic IT ticket creation.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    icons: [
      { name: "devices", bg: "bg-gray-500" },
      { name: "receipt_long", bg: "bg-amber-500" }
    ]
  },
  {
    id: "t7",
    title: "Expense Reimbursement",
    description: "Receipt OCR scanning, multi-tier manager approval, and automated finance ledger sync.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    icons: [
      { name: "payments", bg: "bg-emerald-500" },
      { name: "account_balance", bg: "bg-blue-500" }
    ]
  },
  {
    id: "t8",
    title: "Offer Letter Gen",
    description: "Dynamic generation of offer letters via DocuSign based on structured compensation data.",
    image: "https://images.unsplash.com/photo-1565224345247-a87d0ec7eef3?auto=format&fit=crop&w=800&q=80",
    icons: [
      { name: "draw", bg: "bg-violet-500" },
      { name: "send", bg: "bg-blue-500" }
    ]
  },
  {
    id: "t9",
    title: "Background Checks",
    description: "Trigger background check vendor APIs and update candidate profiles upon clearance.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    icons: [
      { name: "security", bg: "bg-slate-500" },
      { name: "policy", bg: "bg-amber-500" }
    ]
  },
  {
    id: "t10",
    title: "Salary Adjustments",
    description: "Secure workflow for compensation changes requiring executive approval and HRIS updates.",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
    icons: [
      { name: "price_change", bg: "bg-emerald-500" },
      { name: "lock", bg: "bg-red-500" }
    ]
  },
  {
    id: "t11",
    title: "Compliance Sync",
    description: "Automate quarterly compliance training assignments and escalate overdue completions.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    icons: [
      { name: "gavel", bg: "bg-amber-500" },
      { name: "warning", bg: "bg-orange-500" }
    ]
  },
  {
    id: "t12",
    title: "1-on-1 Feedback",
    description: "Recurring Slack/Teams prompts to managers and reports to log 1-on-1 discussion notes.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
    icons: [
      { name: "forum", bg: "bg-pink-500" },
      { name: "sync", bg: "bg-blue-500" }
    ]
  },
  {
    id: "t13",
    title: "PTO Accrual Config",
    description: "Nightly cron job to adjust PTO balances based on tenure and state-specific labor laws.",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=800&q=80",
    icons: [
      { name: "schedule", bg: "bg-violet-500" },
      { name: "calculate", bg: "bg-indigo-500" }
    ]
  },
  {
    id: "t14",
    title: "Promotion Approval",
    description: "Multi-department sign-offs for role changes, updating org charts and access controls.",
    image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    icons: [
      { name: "stars", bg: "bg-amber-400" },
      { name: "assignment_ind", bg: "bg-blue-500" }
    ]
  },
  {
    id: "t15",
    title: "Interview Scheduling",
    description: "Integrate with candidate calendars to automatically find available 45-minute slots.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
    icons: [
      { name: "calendar_month", bg: "bg-emerald-500" },
      { name: "person_search", bg: "bg-violet-500" }
    ]
  },
  {
    id: "t16",
    title: "Equity Processing",
    description: "Trigger grant assignments in Carta or Shareworks following a new hire's 90-day cliff.",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&q=80",
    icons: [
      { name: "pie_chart", bg: "bg-blue-500" },
      { name: "timeline", bg: "bg-emerald-500" }
    ]
  },
  {
    id: "t17",
    title: "Relocation Help",
    description: "Coordinate with moving vendors, issue stipends, and update tax jurisdictions automatically.",
    image: "https://images.unsplash.com/photo-1494412519320-aa3da60ed1c6?auto=format&fit=crop&w=800&q=80",
    icons: [
      { name: "flight_takeoff", bg: "bg-sky-500" },
      { name: "home", bg: "bg-amber-500" }
    ]
  },
  {
    id: "t18",
    title: "Benefits Enrollment",
    description: "Open enrollment reminder drips, document collection, and carrier API synchronization.",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
    icons: [
      { name: "health_and_safety", bg: "bg-red-500" },
      { name: "family_restroom", bg: "bg-blue-400" }
    ]
  },
  {
    id: "t19",
    title: "Payroll Discrepancy",
    description: "Employee ticket routing for timesheet errors directly to the designated payroll specialist.",
    image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=800&q=80",
    icons: [
      { name: "request_quote", bg: "bg-emerald-500" },
      { name: "support_agent", bg: "bg-indigo-500" }
    ]
  },
  {
    id: "t20",
    title: "Contract Renewal",
    description: "Alert managers 60 days prior to contractor end dates to initiate renewal or offboarding.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66cb85?auto=format&fit=crop&w=800&q=80",
    icons: [
      { name: "history", bg: "bg-gray-500" },
      { name: "autorenew", bg: "bg-blue-500" }
    ]
  },
  {
    id: "t21",
    title: "Diversity Training",
    description: "Assign localized DEI modules based on global region and track completion certificates.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    icons: [
      { name: "diversity_3", bg: "bg-pink-500" },
      { name: "school", bg: "bg-violet-500" }
    ]
  },
  {
    id: "t22",
    title: "Referral Bonus",
    description: "Track candidate hire date and trigger payout to the referring employee after 90 days.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&w=800&q=80",
    icons: [
      { name: "card_giftcard", bg: "bg-amber-500" },
      { name: "monetization_on", bg: "bg-emerald-500" }
    ]
  },
  {
    id: "t23",
    title: "Visa Tracking",
    description: "Monitor H1-B/OPT expiration dates, alert legal counsel, and notify employees to submit docs.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
    icons: [
      { name: "public", bg: "bg-blue-500" },
      { name: "warning", bg: "bg-orange-500" }
    ]
  },
  {
    id: "t24",
    title: "Maternity Leave",
    description: "Calculate FMLA eligibility, block calendar availability, and adjust short-term disability payload.",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
    icons: [
      { name: "child_care", bg: "bg-pink-400" },
      { name: "event_busy", bg: "bg-gray-500" }
    ]
  }
];
