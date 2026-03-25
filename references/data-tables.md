# Data Table Patterns

## Stack Overview

| Library | Purpose |
|---------|---------|
| **@tanstack/react-table** | Headless table logic (sorting, filtering, pagination, selection) |
| **Shadcn Table** | Styled table UI components |

## Setup

```bash
npx shadcn@latest add table button input dropdown-menu
npm install @tanstack/react-table
```

## Architecture: 3-File Pattern

| File | Purpose | Component Type |
|------|---------|----------------|
| `columns.tsx` | Column definitions (`ColumnDef[]`) | Shared (can be used in Server or Client) |
| `data-table.tsx` | Reusable `<DataTable>` component | Client Component (`"use client"`) |
| `page.tsx` | Data fetching + renders `<DataTable>` | Server Component |

---

## Column Definitions (`columns.tsx`)

```tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  // Simple accessor
  {
    accessorKey: "email",
    header: "Email",
  },

  // Sortable header
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Amount
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },

  // Custom cell with Badge
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return <Badge variant={status === "success" ? "default" : "secondary"}>{status}</Badge>
    },
  },

  // Actions column
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
```

---

## DataTable Component (`data-table.tsx`)

### Basic Version

```tsx
"use client"

import {
  ColumnDef, flexRender, getCoreRowModel, useReactTable,
} from "@tanstack/react-table"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
```

### With Sorting + Filtering + Pagination

```tsx
"use client"

import { useState } from "react"
import {
  ColumnDef, ColumnFiltersState, SortingState, flexRender,
  getCoreRowModel, getFilteredRowModel, getPaginationRowModel,
  getSortedRowModel, useReactTable,
} from "@tanstack/react-table"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
}

export function DataTable<TData, TValue>({
  columns, data, searchKey = "email",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: { sorting, columnFilters },
  })

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center">
        <Input
          placeholder={`Filter by ${searchKey}...`}
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  )
}
```

---

## Page Integration (`page.tsx`)

### Server Component Pattern

```tsx
// app/payments/page.tsx (Server Component)
import { DataTable } from "./data-table"
import { columns, Payment } from "./columns"

async function getPayments(): Promise<Payment[]> {
  // Fetch from database or API
  const res = await fetch("https://api.example.com/payments", { cache: "no-store" })
  return res.json()
}

export default async function PaymentsPage() {
  const data = await getPayments()
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Payments</h1>
      <DataTable columns={columns} data={data} searchKey="email" />
    </div>
  )
}
```

---

## Row Selection

Add a selection column and track selected rows:

```tsx
// In columns.tsx - add as first column
import { Checkbox } from "@/components/ui/checkbox"

{
  id: "select",
  header: ({ table }) => (
    <Checkbox
      checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  ),
  enableSorting: false,
  enableHiding: false,
}
```

Add to `useReactTable`:
```tsx
import { RowSelectionState } from "@tanstack/react-table"

const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

const table = useReactTable({
  // ...existing config
  onRowSelectionChange: setRowSelection,
  state: { sorting, columnFilters, rowSelection },
})
```

Display selected count:
```tsx
<div className="text-sm text-muted-foreground">
  {table.getFilteredSelectedRowModel().rows.length} of{" "}
  {table.getFilteredRowModel().rows.length} row(s) selected.
</div>
```

---

## Column Visibility Toggle

```tsx
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { VisibilityState } from "@tanstack/react-table"

// Add state
const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

// Add to useReactTable
const table = useReactTable({
  // ...existing
  onColumnVisibilityChange: setColumnVisibility,
  state: { sorting, columnFilters, columnVisibility },
})

// Add toggle button in toolbar
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" className="ml-auto">Columns</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    {table.getAllColumns().filter((col) => col.getCanHide()).map((column) => (
      <DropdownMenuCheckboxItem
        key={column.id}
        className="capitalize"
        checked={column.getIsVisible()}
        onCheckedChange={(value) => column.toggleVisibility(!!value)}
      >
        {column.id}
      </DropdownMenuCheckboxItem>
    ))}
  </DropdownMenuContent>
</DropdownMenu>
```
