# Accessibility Reference

## Built-in Accessibility (via Radix UI)

All Shadcn components inherit accessibility features from Radix UI primitives:

| Feature | Details |
|---------|---------|
| **ARIA attributes** | Correct `role`, `aria-expanded`, `aria-selected`, `aria-checked`, etc. automatically applied |
| **Keyboard navigation** | Arrow keys, Enter, Escape, Tab, Space — all handled per WAI-ARIA patterns |
| **Focus management** | Focus trapped in modals (Dialog, AlertDialog, Sheet), returned to trigger on close |
| **Screen reader support** | Semantic HTML structure, live regions for dynamic content |
| **Reduced motion** | Respects `prefers-reduced-motion` media query |

## Developer Responsibilities

While Radix handles the interaction layer, developers must provide semantic context:

### Labels

Always associate labels with form controls:

```tsx
{/* Shadcn Form (automatic via FormLabel) */}
<FormField render={({ field }) => (
  <FormItem>
    <FormLabel>Email</FormLabel>         {/* Auto-linked via context */}
    <FormControl><Input {...field} /></FormControl>
    <FormMessage />                       {/* Announces errors to screen readers */}
  </FormItem>
)} />

{/* Manual label association */}
<Label htmlFor="email">Email</Label>
<Input id="email" />

{/* Icon-only buttons need aria-label */}
<Button variant="ghost" size="icon" aria-label="Open menu">
  <Menu className="h-4 w-4" />
</Button>
```

### Screen Reader Only Text

Use Tailwind's `sr-only` class for visually hidden but accessible text:

```tsx
{/* Theme toggle */}
<Button variant="outline" size="icon">
  <Sun className="h-4 w-4 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
  <Moon className="absolute h-4 w-4 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
  <span className="sr-only">Toggle theme</span>
</Button>

{/* Sidebar trigger */}
<SidebarTrigger>
  <span className="sr-only">Toggle sidebar</span>
</SidebarTrigger>
```

### Dialog Accessibility

Dialogs require a title and optional description:

```tsx
<Dialog>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>              {/* Required: aria-labelledby */}
      <DialogDescription>                                   {/* Optional: aria-describedby */}
        Make changes to your profile here.
      </DialogDescription>
    </DialogHeader>
    {/* content */}
  </DialogContent>
</Dialog>
```

If no visible title, use `VisuallyHidden` from Radix:

```tsx
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

<DialogHeader>
  <VisuallyHidden>
    <DialogTitle>Search</DialogTitle>
  </VisuallyHidden>
</DialogHeader>
```

### Alert Dialog vs Dialog

| Component | Use Case | Behavior |
|-----------|----------|----------|
| `Dialog` | General content, forms, settings | Can be dismissed by clicking outside or pressing Escape |
| `AlertDialog` | Destructive/important actions | Cannot be dismissed by clicking outside; requires explicit action |

Always use `AlertDialog` for confirmations of destructive actions (delete, discard changes, etc.).

### Table Accessibility

```tsx
<Table>
  <TableCaption>A list of recent payments.</TableCaption>  {/* Describes the table */}
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>       {/* Semantic <th> */}
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>        {/* Semantic <td> */}
      <TableCell>Paid</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Navigation Accessibility

```tsx
{/* Breadcrumb with proper nav landmark */}
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current Page</BreadcrumbPage>    {/* aria-current="page" */}
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### Form Error Accessibility

Shadcn's `FormMessage` automatically:
- Associates error with the input via `aria-describedby`
- Sets `aria-invalid="true"` on the input when there's an error
- Announces errors to screen readers

For manual error handling outside of Shadcn Form:

```tsx
<div>
  <Label htmlFor="email">Email</Label>
  <Input id="email" aria-invalid={!!error} aria-describedby={error ? "email-error" : undefined} />
  {error && <p id="email-error" className="text-sm text-destructive" role="alert">{error}</p>}
</div>
```

### Charts Accessibility

Add `accessibilityLayer` to Recharts chart components:

```tsx
<BarChart accessibilityLayer data={chartData}>
  {/* This enables keyboard navigation and screen reader descriptions */}
</BarChart>
```

## Focus Visible

Shadcn components use `focus-visible` (not `focus`) for keyboard focus rings. This means focus rings appear only during keyboard navigation, not on mouse clicks. The ring color is controlled by the `--ring` CSS variable.

## Color Contrast

When customizing colors, ensure sufficient contrast ratios:
- **Normal text (< 18px):** Minimum 4.5:1 contrast ratio
- **Large text (>= 18px bold or >= 24px):** Minimum 3:1 contrast ratio
- **UI components and graphical objects:** Minimum 3:1 contrast ratio

The `foreground` pattern (`--primary` + `--primary-foreground`) helps maintain this by pairing background and text colors explicitly.
