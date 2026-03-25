# Component Reference

All components install to `components/ui/` via `npx shadcn@latest add [name]`.

## Form Controls

| Component | CLI Name | Import | Key Variants/Props |
|-----------|----------|--------|--------------------|
| Button | `button` | `Button` | `variant`: default, destructive, outline, secondary, ghost, link. `size`: default, sm, lg, icon |
| Input | `input` | `Input` | Standard `<input>` props. Use with `Label` for accessibility |
| Textarea | `textarea` | `Textarea` | Standard `<textarea>` props |
| Select | `select` | `Select, SelectTrigger, SelectValue, SelectContent, SelectItem` | Radix-based. For native: use `native-select` |
| Native Select | `native-select` | `NativeSelect` | Browser-native `<select>` |
| Checkbox | `checkbox` | `Checkbox` | `checked`, `onCheckedChange`. Tri-state support |
| Radio Group | `radio-group` | `RadioGroup, RadioGroupItem` | `value`, `onValueChange` |
| Switch | `switch` | `Switch` | `checked`, `onCheckedChange` |
| Slider | `slider` | `Slider` | `value`, `onValueChange`, `min`, `max`, `step` |
| Date Picker | `date-picker` | Use `Calendar` + `Popover` | Composed pattern (not a single component) |
| Calendar | `calendar` | `Calendar` | Built on `react-day-picker`. `mode`: single, range, multiple |
| Input OTP | `input-otp` | `InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator` | `maxLength`, pattern validation |
| Label | `label` | `Label` | Accessible label, associates with controls via `htmlFor` |
| Form | `form` | `Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage` | React Hook Form integration. Installs `react-hook-form`, `@hookform/resolvers`, `zod` |
| Field | `field` | `Field, FieldLabel, FieldControl, FieldMessage` | Simpler form field wrapper (no RHF dependency) |
| Combobox | `combobox` | Use `Command` + `Popover` | Composed pattern for autocomplete/search |

## Data Display

| Component | CLI Name | Import | Key Variants/Props |
|-----------|----------|--------|--------------------|
| Card | `card` | `Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter` | Compound component pattern |
| Table | `table` | `Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption, TableFooter` | Use with TanStack Table for data tables |
| Badge | `badge` | `Badge` | `variant`: default, secondary, destructive, outline |
| Avatar | `avatar` | `Avatar, AvatarImage, AvatarFallback` | Image with text fallback |
| Tooltip | `tooltip` | `Tooltip, TooltipTrigger, TooltipContent, TooltipProvider` | Requires `TooltipProvider` ancestor |
| Hover Card | `hover-card` | `HoverCard, HoverCardTrigger, HoverCardContent` | Rich preview on hover |
| Separator | `separator` | `Separator` | `orientation`: horizontal, vertical |
| Skeleton | `skeleton` | `Skeleton` | Loading placeholder. Style with `className` |
| Empty | `empty` | `Empty` | Empty state display |
| Typography | `typography` | Various heading/text components | Consistent text styling |
| Kbd | `kbd` | `Kbd` | Keyboard shortcut display |
| Spinner | `spinner` | `Spinner` | Loading indicator |
| Progress | `progress` | `Progress` | `value` (0-100) |
| Chart | `chart` | `ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent` | Recharts wrapper. See `references/charts.md` |
| Pagination | `pagination` | `Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis` | Navigation pagination |
| Aspect Ratio | `aspect-ratio` | `AspectRatio` | `ratio` prop (e.g., `16/9`) |

## Navigation

| Component | CLI Name | Import | Key Variants/Props |
|-----------|----------|--------|--------------------|
| Navigation Menu | `navigation-menu` | `NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink` | Desktop nav with dropdowns |
| Menubar | `menubar` | `Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem` | Desktop application menu |
| Breadcrumb | `breadcrumb` | `Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage` | Path hierarchy |
| Tabs | `tabs` | `Tabs, TabsList, TabsTrigger, TabsContent` | `defaultValue`, `value`, `onValueChange` |
| Sidebar | `sidebar` | `SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset` | Collapsible sidebar system. See `references/blocks.md` |
| Command | `command` | `Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator` | Command palette / search |

## Overlays & Feedback

| Component | CLI Name | Import | Key Variants/Props |
|-----------|----------|--------|--------------------|
| Dialog | `dialog` | `Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose` | Modal window |
| Alert Dialog | `alert-dialog` | `AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel` | Confirmation dialog |
| Sheet | `sheet` | `Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription` | Slide-over panel. `side`: top, right, bottom, left |
| Drawer | `drawer` | `Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter` | Bottom drawer (mobile). Built on `vaul` |
| Popover | `popover` | `Popover, PopoverTrigger, PopoverContent` | Positioned popup |
| Dropdown Menu | `dropdown-menu` | `DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent` | Action menu |
| Context Menu | `context-menu` | `ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem` | Right-click menu |
| Alert | `alert` | `Alert, AlertTitle, AlertDescription` | `variant`: default, destructive |
| Toast | `toast` | `toast()` function via `useToast` | Imperative API. Import `Toaster` in layout |
| Sonner | `sonner` | `toast` from `sonner` | Alternative toast. Import `Toaster` from `sonner` in layout |

## Layout

| Component | CLI Name | Import | Key Variants/Props |
|-----------|----------|--------|--------------------|
| Accordion | `accordion` | `Accordion, AccordionItem, AccordionTrigger, AccordionContent` | `type`: single, multiple. `collapsible` |
| Collapsible | `collapsible` | `Collapsible, CollapsibleTrigger, CollapsibleContent` | `open`, `onOpenChange` |
| Resizable | `resizable` | `ResizablePanelGroup, ResizablePanel, ResizableHandle` | `direction`: horizontal, vertical |
| Scroll Area | `scroll-area` | `ScrollArea, ScrollBar` | Custom scrollbar styling |
| Carousel | `carousel` | `Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext` | Built on `embla-carousel-react` |
| Toggle | `toggle` | `Toggle` | `variant`: default, outline. `pressed`, `onPressedChange` |
| Toggle Group | `toggle-group` | `ToggleGroup, ToggleGroupItem` | `type`: single, multiple |
| Button Group | `button-group` | `ButtonGroup` | Group of related buttons |
| Item | `item` | `Item` | List item component |
| Direction | `direction` | `DirectionProvider` | RTL/LTR text direction |

## Common Compositions

These components are frequently used together:

| Pattern | Components |
|---------|------------|
| Form with validation | `form` + `input` + `label` + `button` + `select` |
| Data table | `table` + `dropdown-menu` + `button` + `input` |
| Search/command palette | `command` + `dialog` |
| Autocomplete (Combobox) | `command` + `popover` |
| Date picker | `calendar` + `popover` + `button` |
| Dashboard layout | `sidebar` + `breadcrumb` + `separator` + `card` |
| Settings page | `tabs` + `card` + `form` + `separator` |
| Confirmation flow | `alert-dialog` + `button` |
| Notification system | `sonner` or `toast` + layout `Toaster` |
