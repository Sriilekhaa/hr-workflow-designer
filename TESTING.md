# HR Workflow Designer — Testing Guide

This document explains how to test the entire HR Workflow Designer website end-to-end.

---

## Prerequisites

1. **Node.js** >= 18 installed
2. **npm** or **yarn** installed
3. A **Supabase** project (free tier works) — OR the app works with fallback mock data without Supabase

---

## 1. Environment Setup

### Without Supabase (Mock Data Mode)

The app works out of the box with hardcoded fallback data. Just run:

```bash
npm install
npm run dev
```

All pages will display realistic mock data.

### With Supabase (Live Data Mode)

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Fill in your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
4. Run the SQL schema in Supabase SQL Editor:
   - Open the **SQL Editor** in your Supabase dashboard
   - Copy the contents of `supabase/schema.sql`
   - Execute it — this creates all tables **and** inserts seed data
5. Start the dev server:
   ```bash
   npm install
   npm run dev
   ```

---

## 2. Page-by-Page Testing

### 2.1 Dashboard (`/`)

| Test | Expected Result |
|------|----------------|
| Page loads | Shows loading spinner, then displays stats cards |
| Stats cards | Total Workflows, Active Now, Failed Runs, Pending/Draft — all show numeric values |
| Recent Workflows table | Lists up to 5 workflows with name, status badge, and relative time |
| Activity Timeline | Shows recent activity entries with icons, descriptions, and timestamps |
| "View all" link | Navigates to `/workflows` |
| "Open Designer" button | Navigates to `/designer` |
| System Health section | Shows uptime and API bars (static display) |

### 2.2 Workflow List (`/workflows`)

| Test | Expected Result |
|------|----------------|
| Page loads | Shows loading spinner, then a table of workflows |
| Workflow table | Each row shows: name, description, created date, last updated, status badge, node count |
| Status filter dropdown | Selecting "Active", "Draft", "Error", "Archived" filters the table; "All Statuses" shows everything |
| Workflow count | Footer shows correct filtered count (e.g., "6 workflows") |
| **New Workflow button** | Clicking "New Workflow" opens a modal dialog |
| Create modal | Enter a name, click "Create & Open Designer" — creates workflow and navigates to `/designer` |
| Create modal (Enter key) | Pressing Enter in the input field triggers creation |
| Create modal (Cancel) | Clicking Cancel or clicking outside the modal closes it |
| Create modal (empty name) | "Create" button is disabled when name is blank |
| Edit button (hover) | Hovering a row reveals Edit and Delete icons |
| Delete button | Clicking Delete shows a confirm dialog; confirming removes the row |

### 2.3 Automations (`/automations`)

| Test | Expected Result |
|------|----------------|
| Page loads | Shows loading spinner, then automation action cards |
| Automation cards | Each card shows: icon, label, description, and required parameters as code chips |
| Card count badge | Header shows correct count (e.g., "8 AVAILABLE") |
| First card glow | The first automation card has a purple glow effect |
| Sidebar panels | "Live Execution" and "System Health" panels display correctly |
| Template Library section | 3 template cards at bottom with images and "Use Template" buttons |

### 2.4 Execution Logs (`/logs`)

| Test | Expected Result |
|------|----------------|
| Page loads | Shows loading spinner, then execution log table |
| Header stats | Success Rate (%) and Total Runs are computed from actual data |
| Status filter | Dropdown filters by Success, Error, Running, Pending |
| Log rows | Each row shows: Run ID (first 8 chars), workflow name, start time, duration, status badge |
| Expandable rows | Clicking a row expands it to show the Step Execution Sequence |
| Step details | Each step shows an icon (check/close/refresh/block), step name, and optional message |
| Error rows | Error rows have a red left border and red-tinted background |
| Bottom stats cards | Success Rate, Total Errors, and Active Connectors panels |

### 2.5 Workflow Designer (`/designer`)

| Test | Expected Result |
|------|----------------|
| Page loads | Shows the React Flow canvas with Node Palette sidebar |
| Drag nodes | Drag a node type from the sidebar palette onto the canvas |
| Connect nodes | Drag from one node's handle to another to create an edge |
| Select node | Click a node to open the Node Form Panel on the right |
| Edit node data | Modify fields in the form panel; changes reflect on the canvas |
| Delete node | Click "Delete Node" in the form panel; node and its edges are removed |
| Undo/Redo | Toolbar buttons undo and redo canvas changes |
| Save workflow | Toolbar "Save" button persists to Supabase (or logs to console in mock mode) |
| Validate | Toolbar "Validate" button checks for errors (e.g., missing start/end nodes) |
| Simulate | Toolbar "Simulate" button runs through the workflow and shows simulation panel |
| Export/Import | JSON export downloads workflow; import loads a JSON file |

### 2.6 Simulation Instance (`/simulation`)

| Test | Expected Result |
|------|----------------|
| Page loads | Displays a static simulation visualization with sidebar and execution log |

---

## 3. Cross-Cutting Tests

| Area | Test |
|------|------|
| **Navigation** | Click each sidebar link — Dashboard, Workflows, Automations, Logs navigate correctly |
| **Responsive** | Resize browser; grid layouts should reflow at md/lg breakpoints |
| **Loading states** | All pages show a spinner while fetching data |
| **Fallback data** | Remove `.env` or set invalid Supabase URL — all pages should still render with mock data |
| **Console errors** | Open DevTools Console; there should be no React errors or unhandled rejections |

---

## 4. Build Verification

```bash
# Type check
npx tsc --noEmit

# Production build
npm run build

# Preview production build
npm run preview
```

All three commands should complete without errors.

---

## 5. Supabase Data Verification

If using Supabase, open the **Table Editor** in your dashboard and verify:

| Table | Expected Rows |
|-------|--------------|
| `workflows` | 10 seed workflows with various statuses |
| `automations` | 8 automation action types |
| `simulation_logs` | 8 execution log entries |
| `activity_log` | 8 activity timeline entries |
| `workflow_nodes` | Empty initially (populated when saving from designer) |
| `workflow_edges` | Empty initially (populated when saving from designer) |

---

## 6. Quick Smoke Test Checklist

- [ ] `npm run dev` starts without errors
- [ ] Dashboard shows stats and recent workflows
- [ ] Workflow List shows all workflows with correct statuses
- [ ] "New Workflow" button opens modal and creates a workflow
- [ ] Automations page shows all 8 automation types
- [ ] Execution Logs shows expandable log entries
- [ ] Workflow Designer canvas loads and accepts node drag-and-drop
- [ ] `npm run build` succeeds
