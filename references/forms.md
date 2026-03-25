# Form Patterns

## Stack Overview

Shadcn forms combine three libraries:

| Library | Purpose | Install |
|---------|---------|---------|
| **React Hook Form** | Form state management, validation, submission | Auto-installed with `form` component |
| **Zod** | Schema validation, type inference | Auto-installed with `form` component |
| **@hookform/resolvers** | Connects Zod schemas to React Hook Form | Auto-installed with `form` component |

## Setup

```bash
npx shadcn@latest add form input label select checkbox textarea switch
```

This installs the Form component and its peer dependencies (`react-hook-form`, `@hookform/resolvers`, `zod`).

## Form Component Anatomy

```tsx
<Form {...form}>                              {/* Provides form context */}
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField                                  {/* Connects to RHF controller */}
      control={form.control}
      name="fieldName"
      render={({ field }) => (
        <FormItem>                              {/* Wrapper div */}
          <FormLabel>Label</FormLabel>          {/* Accessible label */}
          <FormControl>                         {/* Passes aria attributes */}
            <Input {...field} />                {/* Actual input element */}
          </FormControl>
          <FormDescription>Help text</FormDescription>
          <FormMessage />                       {/* Validation error */}
        </FormItem>
      )}
    />
  </form>
</Form>
```

## Core Pattern

```tsx
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Form, FormField, FormItem, FormLabel, FormControl,
  FormDescription, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// 1. Define schema
const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  bio: z.string().max(160).optional(),
})

// 2. Infer TypeScript type from schema
type FormValues = z.infer<typeof formSchema>

// 3. Create form component
export function ProfileForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      bio: "",
    },
  })

  function onSubmit(values: FormValues) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormDescription>Your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}
```

## Field Types

### Select

```tsx
<FormField
  control={form.control}
  name="role"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Role</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="viewer">Viewer</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Checkbox

```tsx
<FormField
  control={form.control}
  name="terms"
  render={({ field }) => (
    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
      <FormControl>
        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
      </FormControl>
      <div className="space-y-1 leading-none">
        <FormLabel>Accept terms and conditions</FormLabel>
        <FormDescription>You agree to our Terms of Service.</FormDescription>
      </div>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Switch

```tsx
<FormField
  control={form.control}
  name="notifications"
  render={({ field }) => (
    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
      <div className="space-y-0.5">
        <FormLabel className="text-base">Notifications</FormLabel>
        <FormDescription>Receive email notifications.</FormDescription>
      </div>
      <FormControl>
        <Switch checked={field.value} onCheckedChange={field.onChange} />
      </FormControl>
    </FormItem>
  )}
/>
```

### Textarea

```tsx
<FormField
  control={form.control}
  name="bio"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Bio</FormLabel>
      <FormControl>
        <Textarea placeholder="Tell us about yourself" className="resize-none" {...field} />
      </FormControl>
      <FormDescription>Max 160 characters.</FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Date Picker

Combine `Calendar` + `Popover`:

```tsx
<FormField
  control={form.control}
  name="dob"
  render={({ field }) => (
    <FormItem className="flex flex-col">
      <FormLabel>Date of birth</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button variant="outline" className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  )}
/>
```

Install: `npx shadcn@latest add calendar popover` and `npm install date-fns`

## Zod Schema Patterns

### Common validations

```tsx
const schema = z.object({
  // String validations
  name: z.string().min(1, "Required").max(100),
  email: z.string().email("Invalid email"),
  url: z.string().url("Invalid URL").optional(),

  // Number
  age: z.coerce.number().min(18, "Must be 18+").max(120),

  // Enum
  role: z.enum(["admin", "user", "viewer"], { required_error: "Select a role" }),

  // Boolean
  terms: z.boolean().refine(val => val === true, "Must accept terms"),

  // Date
  dob: z.date({ required_error: "Pick a date" }),

  // Optional with default
  bio: z.string().max(160).optional().default(""),

  // Array
  tags: z.array(z.string()).min(1, "Add at least one tag"),
})
```

### Conditional validation

```tsx
const schema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("email"), email: z.string().email() }),
  z.object({ type: z.literal("phone"), phone: z.string().min(10) }),
])
```

## Server Actions Integration

Submit form data to a Next.js Server Action:

```tsx
// app/actions.ts
"use server"

import { z } from "zod"

const schema = z.object({ name: z.string().min(1), email: z.string().email() })

export async function createUser(values: z.infer<typeof schema>) {
  const parsed = schema.safeParse(values)
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors }

  // Save to database
  return { success: true }
}
```

```tsx
// app/create/page.tsx
"use client"

import { createUser } from "../actions"
import { useTransition } from "react"

export function CreateUserForm() {
  const [isPending, startTransition] = useTransition()
  const form = useForm<FormValues>({ resolver: zodResolver(schema) })

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      const result = await createUser(values)
      if (result.error) {
        // Set server errors on form fields
        Object.entries(result.error).forEach(([key, messages]) => {
          form.setError(key as keyof FormValues, { message: messages?.[0] })
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* fields... */}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  )
}
```

## Dynamic Array Fields

Use `useFieldArray` for repeatable field groups:

```tsx
import { useFieldArray } from "react-hook-form"

const schema = z.object({
  links: z.array(z.object({
    url: z.string().url(),
    label: z.string().min(1),
  })).min(1),
})

export function LinksForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { links: [{ url: "", label: "" }] },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <FormField control={form.control} name={`links.${index}.url`} render={({ field }) => (
              <FormItem><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name={`links.${index}.label`} render={({ field }) => (
              <FormItem><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <Button variant="ghost" size="icon" onClick={() => remove(index)}>
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={() => append({ url: "", label: "" })}>
          Add Link
        </Button>
        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}
```
