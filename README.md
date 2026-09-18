# Production Control Dashboard

A production operations dashboard for tracking manufacturing work orders, machine assignments, and delivery schedules.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Icons**: Lucide React

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Architecture & Component Structure

- `src/app/page.tsx`: Main dashboard view coordinating state across metrics, filters, table, and details drawer.
- `src/components/MetricCards.tsx`: Operations KPI cards calculating dynamic stats (Total, Delayed, Due Today, Completed).
- `src/components/FilterBar.tsx`: Real-time search across product/customer/job ID, status filter, and multi-field sorting.
- `src/components/JobsTable.tsx`: Compact tabular data view with status badges, machine indicators, and row click handling.
- `src/components/JobDetailSheet.tsx`: Side drawer showing full order specifications, shop floor notes, and status transition control.
- `src/components/ThemeToggle.tsx`: Minimalist 3-state switcher (Light, Dark, System) with instant system scheme detection.
- `src/lib/types.ts` & `src/lib/mock-data.ts`: Strict TypeScript schemas and realistic factory machining work orders.

## Assumptions

1. **Operational Focus**: Designed specifically for a plant operations supervisor who values dense, legible data and quick status triage over decorative elements.
2. **State Updates**: Status changes update active dashboard state immediately; a companion mock API route (`/api/jobs`) demonstrates backend contract compatibility.
3. **Machine Fleet**: Standard shop floor setup with fixed machine codes (CNC, Press, Mill, Lathe, Grinder).

## What I Would Improve With More Time

1. **Server Sync & Optimistic Updates**: Wire up React Server Actions or SWR/TanStack Query with toast notifications and optimistic rollback.
2. **Batch Operations**: Allow multi-row selection for bulk status updates or machine reassignments.
3. **Machine Utilization Matrix**: Add a secondary view showing workload distribution and idle/busy states per machine.
4. **CSV Export**: Direct export of filtered work orders for shift handover reports.
