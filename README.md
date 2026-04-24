# HR Workflow Designer

A production-grade visual workflow designer for HR operations teams. Build, configure, validate, and simulate HR workflows on a drag-and-drop canvas with real-time Supabase persistence and comprehensive fallback mock data.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Supabase Setup (Optional)](#supabase-setup-optional)
- [Available Scripts](#available-scripts)
- [Application Pages](#application-pages)
- [Project Structure](#project-structure)
- [Architecture & Design Decisions](#architecture--design-decisions)
- [Database Schema](#database-schema)
- [API Layer](#api-layer)
- [Node Types](#node-types)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)

---

## Features

- **Visual Workflow Designer** — Drag-and-drop node canvas powered by React Flow
- **5 Node Types** — Start, Task, Approval, Automated, and End nodes with dedicated config forms
- **Workflow Validation** — Structural checks (single start, reachable end, no cycles) + field-level validation
- **Simulation Engine** — BFS graph traversal with per-node executor functions and step-by-step results
- **Dashboard** — Live stats (total workflows, active, failed, pending), recent workflows table, activity timeline
- **Workflow Management** — Full CRUD: list, create, edit, delete workflows with status filtering
- **Automation Templates** — Browse 8 automation action types with parameter definitions
- **Execution Logs** — Expandable log entries with step-by-step drill-down and computed metrics
- **Supabase Integration** — Optional real-time persistence; runs fully offline with mock data when not configured
- **Undo/Redo** — Full canvas history support
- **Export/Import** — JSON workflow serialization
- **Responsive Design** — Dark theme with TailwindCSS, adaptive grid layouts

---

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | React | 19.x |
| Build Tool | Vite | 8.x |
| Language | TypeScript | 6.x |
| Canvas | @xyflow/react (React Flow) | 12.x |
| State Management | Zustand | 5.x |
| Routing | React Router DOM | 7.x |
| Database | Supabase (PostgreSQL) | 2.x client |
| Styling | TailwindCSS | 3.x |
| Icons | Google Material Symbols | via CDN |
| Utilities | clsx, tailwind-merge | latest |

---

## Prerequisites

- **Node.js** >= 18
- **npm** >= 9 (or yarn / pnpm)
- **Supabase account** (optional — app works fully without it)

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# → http://localhost:5173
```

The app will launch with **fallback mock data** on all pages. No Supabase or environment setup is required for local development.

---

## Supabase Setup (Optional)

To connect to a live Supabase database:

1. **Create a Supabase project** at [supabase.com](https://supabase.com) (free tier works)

2. **Run the schema** in the Supabase SQL Editor:
   - Open your project dashboard → **SQL Editor**
   - Paste the contents of `supabase/schema.sql`
   - Click **Run** — this creates all tables AND inserts seed data

3. **Configure environment variables** — create a `.env` file in the project root:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. **Restart the dev server** — the app will now read/write from Supabase

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check with `tsc` + production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## Application Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | **Dashboard** | Stats cards, recent workflows table, activity timeline, system health |
| `/workflows` | **Workflow List** | Searchable/filterable workflow table with New Workflow button and CRUD |
| `/designer` | **Workflow Designer** | React Flow canvas with node palette, form panel, simulation panel |
| `/automations` | **Automations** | Browse 8 automation action types, template library, system health sidebar |
| `/logs` | **Execution Logs** | Expandable execution log table with status filter and computed metrics |
| `/simulation` | **Simulation Instance** | Detailed single simulation run visualization |

---

## Project Structure

```
hrwork/
├── public/                       # Static assets
├── supabase/
│   └── schema.sql                # Full database schema + seed data
├── src/
│   ├── types/
│   │   └── workflow.types.ts     # Core data model: Workflow, WorkflowNode, WorkflowEdge, etc.
│   ├── store/
│   │   └── workflowStore.ts      # Zustand store: nodes, edges, undo/redo, selection, simulation
│   ├── services/
│   │   ├── supabase.ts           # Supabase client initialization + isSupabaseConfigured()
│   │   ├── api.ts                # All API functions with Supabase + fallback mock data
│   │   ├── simulationEngine.ts   # BFS graph traversal + per-node execution
│   │   ├── executors.ts          # Node executor functions (decoupled from registry)
│   │   └── nodeRegistry.ts       # Registry: type → {label, icon, form component, executor}
│   ├── hooks/
│   │   ├── useWorkflow.ts        # Save/load/export/import workflow orchestration
│   │   ├── useNodeConfig.ts      # Selected node read/write hook
│   │   └── useSimulation.ts      # Validate + simulate orchestrator hook
│   ├── utils/
│   │   ├── graph.ts              # Adjacency list, BFS, cycle detection, topological sort
│   │   ├── validators.ts         # Structural + field-level validation
│   │   └── timeFormat.ts         # Date/time formatting utilities
│   ├── components/
│   │   ├── Layout.tsx            # App shell with sidebar and top bar
│   │   ├── Sidebar.tsx           # Navigation sidebar
│   │   ├── TopAppBar.tsx         # Header bar
│   │   ├── canvas/
│   │   │   └── WorkflowCanvas.tsx  # React Flow canvas (Zustand-controlled)
│   │   ├── nodes/
│   │   │   └── CustomNodes.tsx     # Memoized custom node renderers (5 types)
│   │   ├── forms/
│   │   │   ├── NodeFormPanel.tsx    # Registry-driven form switcher with React.lazy
│   │   │   ├── StartNodeForm.tsx
│   │   │   ├── TaskNodeForm.tsx
│   │   │   ├── ApprovalNodeForm.tsx
│   │   │   ├── AutomatedNodeForm.tsx
│   │   │   ├── EndNodeForm.tsx
│   │   │   └── KeyValueEditor.tsx   # Reusable key-value pair editor
│   │   ├── sidebar/
│   │   │   └── NodePalette.tsx      # Drag-and-drop node type library
│   │   └── simulation/
│   │       └── SimulationPanel.tsx   # Step-by-step execution log UI
│   ├── pages/
│   │   ├── Dashboard.tsx            # Stats + recent workflows + activity timeline
│   │   ├── WorkflowList.tsx         # Workflow CRUD table + New Workflow modal
│   │   ├── WorkflowDesigner.tsx     # Main designer orchestrator
│   │   ├── AutomationTemplates.tsx  # Automation actions + template library
│   │   ├── ExecutionLogs.tsx        # Expandable execution log table
│   │   ├── SimulationInstance.tsx   # Single simulation detail view
│   │   └── AdvancedCanvas.tsx       # Advanced canvas variant
│   ├── App.tsx                      # Route definitions
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Tailwind imports + custom utilities
├── TESTING.md                       # Comprehensive testing guide
├── tailwind.config.js               # Custom design tokens
├── vite.config.ts                   # Vite configuration
├── tsconfig.json                    # TypeScript configuration
└── package.json
```

---

## Architecture & Design Decisions

### 1. State Management — Zustand as Single Source of Truth

The React Flow canvas reads nodes/edges directly from the Zustand store instead of using React Flow's internal `useNodesState`/`useEdgesState`. All mutations go through `applyNodeChanges`/`applyEdgeChanges` applied directly to the store. This eliminates dual-state sync bugs at the cost of slightly more re-renders.

### 2. Registry Pattern

`nodeRegistry` maps each node type to its metadata:

```typescript
{
  label: string;        // Display name
  icon: string;         // Material Symbol icon name
  color: string;        // TailwindCSS color class
  form: React.LazyExoticComponent;  // Lazy-loaded config form
  executor: Function;   // Simulation executor
}
```

Adding a new node type requires only: one registry entry + one form component + one executor function.

### 3. Separation of Concerns

| Layer | Location | Responsibility |
|-------|----------|---------------|
| Business logic | `utils/`, `services/` | Validation, simulation, graph traversal, API |
| State | `store/` | Zustand store with undo/redo history |
| UI Components | `components/` | Stateless renderers |
| Hooks | `hooks/` | Bridge store actions to component lifecycle |
| Pages | `pages/` | Route-level composition |

### 4. Graph Algorithms

- **Simulation**: BFS from Start node via adjacency list built from edges
- **Cycle Detection**: DFS 3-color algorithm (white → gray → black)
- **Validation**: Structural (single start, reachable end, connected graph, acyclic) → field-level

### 5. Supabase Integration with Fallback

Every API function checks `isSupabaseConfigured()` first. If `VITE_SUPABASE_URL` or `VITE_SUPABASE_ANON_KEY` is missing, functions return comprehensive mock data. This ensures:

- **Zero-config local development** — just `npm run dev`
- **Graceful degradation** — app never breaks if Supabase is unreachable
- **Easy onboarding** — new developers can explore immediately

### 6. Lazy-Loaded Forms

Node config forms are loaded via `React.lazy()` and wrapped in `Suspense`. This keeps the initial bundle small — form code is only fetched when a node is selected.

---

## Database Schema

Six PostgreSQL tables managed by Supabase:

| Table | Description | Key Columns |
|-------|-------------|-------------|
| `workflows` | Workflow metadata | `id`, `name`, `description`, `status`, `node_count`, `created_at`, `updated_at` |
| `workflow_nodes` | Canvas node positions + data | `id`, `workflow_id`, `type`, `position_x`, `position_y`, `data` (JSONB) |
| `workflow_edges` | Connections between nodes | `id`, `workflow_id`, `source`, `target` |
| `automations` | Available automation action types | `id`, `label`, `description`, `icon`, `icon_color`, `icon_bg`, `params` |
| `simulation_logs` | Execution/simulation run logs | `id`, `workflow_id`, `workflow_name`, `steps` (JSONB), `status`, `duration_ms` |
| `activity_log` | Dashboard activity timeline | `id`, `action`, `description`, `actor`, `icon`, `icon_color` |

**Workflow statuses**: `active`, `draft`, `archived`, `error`

**Seed data included**: 10 workflows, 8 automation types, 8 execution logs, 8 activity entries

Full schema: `supabase/schema.sql`

---

## API Layer

All API functions live in `src/services/api.ts`. Each function has a Supabase path and a fallback path:

| Function | Description | Returns |
|----------|-------------|---------|
| `fetchDashboardStats()` | Aggregated dashboard metrics | `DashboardStats` |
| `listWorkflows()` | All workflows ordered by update time | `WorkflowListItem[]` |
| `createWorkflow(name, desc)` | Insert a new workflow | `WorkflowListItem` |
| `deleteWorkflow(id)` | Delete a workflow and its nodes/edges | `void` |
| `fetchWorkflow(id)` | Full workflow with nodes and edges | `Workflow` |
| `saveWorkflow(workflow)` | Upsert workflow + nodes + edges | `void` |
| `fetchAutomationsFull()` | All automation action types | `AutomationListItem[]` |
| `fetchExecutionLogs()` | All simulation/execution logs | `ExecutionLogItem[]` |
| `fetchActivityLog(limit)` | Recent activity entries | `ActivityLogItem[]` |
| `saveSimulationResult(...)` | Persist a simulation run | `void` |

---

## Node Types

| Type | Icon | Description | Configurable Fields |
|------|------|-------------|-------------------|
| **Start** | `play_arrow` | Entry point of workflow | Trigger type, description |
| **Task** | `task_alt` | Manual task assignment | Assignee, due date, priority, description |
| **Approval** | `verified` | Human approval gate | Approver, escalation policy, SLA |
| **Automated** | `bolt` | Automated action execution | Action type (from automations), parameters |
| **End** | `stop_circle` | Workflow termination | Summary message, send summary flag |

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SUPABASE_URL` | No | Supabase project URL (e.g., `https://xyz.supabase.co`) |
| `VITE_SUPABASE_ANON_KEY` | No | Supabase anonymous/public API key |

Both must be set for Supabase to be used. If either is missing, the app runs with mock data.

---

## Testing

See **[TESTING.md](./TESTING.md)** for a comprehensive testing guide covering:

- Environment setup (mock mode vs Supabase mode)
- Page-by-page test cases
- Cross-cutting tests (navigation, responsive, loading states, fallback)
- Build verification commands
- Quick smoke test checklist

### Quick Verification

```bash
# Type check
npx tsc --noEmit

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Deployment

### Build for Production

```bash
npm run build
```

Output goes to `dist/`. Deploy this folder to any static hosting provider:

- **Netlify** — auto-detects Vite; set environment variables in dashboard
- **Vercel** — auto-detects Vite; set environment variables in dashboard
- **AWS S3 + CloudFront** — upload `dist/` to S3, configure CloudFront for SPA routing
- **GitHub Pages** — configure `base` in `vite.config.ts` if using a subpath

For SPA routing, configure your host to redirect all paths to `index.html`.

---

## Future Improvements

- **Auto-layout** — Dagre-based automatic node positioning
- **Conditional Branching** — Edge expressions for decision logic
- **Real-time Collaboration** — Supabase Realtime subscriptions for multi-user editing
- **Role-Based Access Control** — Supabase Auth + RLS policies for team permissions
- **Webhook Triggers** — External event-driven workflow execution
- **Version History** — Workflow snapshot versioning with diff/rollback
- **Batch Operations** — Bulk workflow actions (archive, duplicate, export)
- **Advanced Filtering** — Full-text search across workflows and logs
- **Custom Node SDK** — Plugin API for third-party node types

---

## License

Private project. All rights reserved.
