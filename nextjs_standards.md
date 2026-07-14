# NEXTJS_RULES.md

> **Project Standards**
>
> Framework: **Next.js 16+**
>
> React: **React 19**
>
> Styling: **Tailwind CSS v4**
>
> Language: **TypeScript**
>
> Routing: **App Router**
>
> Package Manager: **pnpm (Preferred)**

---

# Tech Stack

- Next.js 16+
- React 19
- TypeScript
- Tailwind CSS v4
- ESLint
- Prettier
- React Hook Form
- Zod
- class-variance-authority (CVA)
- clsx
- tailwind-merge
- Lucide React
- Zustand (Only when required)
- TanStack Query (Only for client-side data fetching)

---

# Core Principles

Every piece of code should be

- Clean
- Reusable
- Typed
- Accessible
- Performant
- Scalable
- Maintainable

Avoid unnecessary complexity.

---

# Folder Structure

```
src/
│
├── app/
├── components/
│   ├── ui/
│   ├── layouts/
│   ├── shared/
│   └── forms/
│
├── features/
│
├── hooks/
│
├── lib/
│
├── services/
│
├── actions/
│
├── providers/
│
├── utils/
│
├── constants/
│
├── types/
│
├── styles/
│
├── assets/
│
└── middleware.ts
```

---

# App Router Rules

Always use App Router.

Never use Pages Router.

Every route should be inside

```
app/
```

Example

```
app/

dashboard/

settings/

profile/

login/
```

---

# Layout Rules

Use layouts whenever UI is shared.

Examples

- Sidebar
- Header
- Footer
- Dashboard

Never duplicate layouts.

---

# Routing

Supported

```
app/blog/page.tsx

app/blog/[slug]/page.tsx

app/dashboard/page.tsx

app/(auth)/login/page.tsx

app/@modal/(.)profile/page.tsx
```

Use

- Route Groups
- Dynamic Routes
- Parallel Routes
- Intercepting Routes

when appropriate.

---

# Server Components

Server Components are the default.

Use them whenever possible.

Good for

- API calls
- Database
- Authentication
- SEO
- Static UI

Avoid

```
"use client"
```

unless required.

---

# Client Components

Only use when needed.

Examples

- useState
- useEffect
- Browser APIs
- Event handlers
- Animations

Keep Client Components small.

---

# Rendering Strategy

## Static Rendering (SSG)

Use for

- Landing Pages
- About
- Documentation
- Marketing

---

## Dynamic Rendering (SSR)

Use for

- Dashboard
- User Profile
- Authenticated Pages
- Orders

---

## ISR

Use for

- Blogs
- Products
- News

Example

```ts
export const revalidate = 3600
```

---

## CSR

Use only when required.

Examples

- Charts
- Maps
- Drag & Drop
- Live Dashboard

---

# Data Fetching

Priority

1. Server Component
2. Server Action
3. Route Handler
4. Client Fetch

Never fetch inside multiple nested components.

---

# Server Actions

Use Server Actions for

- Forms
- Mutations
- Database
- Authentication

Business logic belongs inside

```
actions/
```

---

# Route Handlers

Use

```
app/api/
```

Example

```
app/api/users/route.ts
```

Always

- Validate input
- Return proper status codes
- Handle errors

---

# API Rules

Never call fetch directly inside components.

Create

```
services/

auth.ts

user.ts

booking.ts
```

---

# Components

Every component must

- Be reusable
- Be typed
- Have one responsibility
- Support accessibility

Maximum

300 lines.

Split large components.

---

# Component Structure

```
Imports

Types

Constants

Hooks

Component

Export
```

---

# Component Naming

Correct

```
UserCard

BookingCard

PrimaryButton

LoginForm

UserAvatar
```

Wrong

```
card

newButton

component

demo
```

---

# UI Components

Place reusable components inside

```
components/ui
```

Examples

```
Button

Input

Textarea

Card

Badge

Avatar

Dialog

Modal

Table

Tabs

Tooltip

Dropdown
```

---

# Feature Components

Place inside

```
features/auth/

features/dashboard/

features/profile/
```

---

# Props Rules

Always

```ts
interface ButtonProps {
    variant: "primary" | "secondary"
    size: "sm" | "md" | "lg"
}
```

Never

```ts
props: any
```

---

# Tailwind CSS v4 Rules

Use

Design Tokens

CSS Variables

@theme

Avoid

- Random colors
- Random spacing
- Inline styles

Never write

```tsx
className="bg-[#123456]"
```

Instead

```tsx
className="bg-primary"
```

---

# Styling Rules

Prefer

```
flex

grid

gap

space

container

max-width

responsive utilities
```

Avoid

Absolute positioning unless necessary.

---

# CVA Rules

Every reusable component should use

class-variance-authority

Example

Button

Badge

Alert

Tag

Chip

---

# Utility Function

Always use

```
cn()
```

for merging classes.

Never concatenate class strings manually.

---

# Forms

Use

- React Hook Form
- Zod

Every form should include

- Validation
- Error state
- Loading state
- Disabled state

---

# Error Handling

Every page should support

- Loading
- Empty
- Error
- Success

Create

```
loading.tsx

error.tsx

not-found.tsx

global-error.tsx
```

Never expose stack traces.

---

# Authentication

Protect routes using

Middleware

Server validation

Cookies

Never trust client validation.

---

# Metadata

Every page must define

- Title
- Description
- OpenGraph
- Twitter
- Canonical

---

# SEO

Use

Semantic HTML

Proper headings

Alt text

Metadata API

Structured data when needed.

---

# Images

Always use

```
next/image
```

Never use

```
<img>
```

---

# Fonts

Always use

```
next/font
```

Never import Google Fonts manually.

---

# Navigation

Always use

```
next/link
```

Never use

```
<a>
```

for internal pages.

---

# Performance

Always

- Lazy load heavy components
- Optimize images
- Use Suspense
- Stream server content
- Minimize Client Components
- Cache intelligently

---

# Caching

Understand

- force-cache
- no-store
- revalidate

Choose intentionally.

---

# Accessibility

Every component must support

- Keyboard navigation
- Screen readers
- Focus states
- ARIA labels
- WCAG AA

---

# State Management

Priority

1. Server State
2. React State
3. Context
4. Zustand

Avoid global state unless required.

---

# TypeScript Rules

Never use

```
any
```

Always define

- Interfaces
- Types
- Enums (when appropriate)

Enable

```
strict: true
```

---

# Imports

Prefer

```
@/components

@/hooks

@/lib

@/utils
```

Avoid deep relative imports

```
../../../../../
```

---

# Code Style

Always

- Small functions
- Meaningful names
- Reusable logic
- DRY principle

Avoid

- Magic numbers
- Duplicate code
- Large files

---

# Logging

Allowed

- API Errors
- Validation Errors
- Unexpected Exceptions

Never log

- Passwords
- JWT Tokens
- Secrets
- Personal Data

---

# Security

Always

- Validate inputs
- Sanitize outputs
- Protect APIs
- Use HTTPS
- Prevent XSS
- Prevent CSRF
- Prevent SQL Injection

---

# Testing

Preferred

- Vitest
- Playwright

Test

- Components
- Forms
- API
- Critical Flows

---

# Code Review Checklist

Before every PR

- TypeScript passes
- ESLint passes
- Prettier passes
- No console.log
- No any
- Responsive
- Accessible
- SEO complete
- Error handling complete
- Loading state complete
- Empty state complete
- Uses Server Components where possible
- No duplicate code
- Reusable components
- Design tokens used
- Proper folder structure
- Images optimized
- Metadata added

---

# AI Coding Rules

When generating code

1. Prefer Server Components.
2. Create reusable components.
3. Follow feature-based architecture.
4. Keep components under 300 lines.
5. Never use any.
6. Never duplicate existing components.
7. Use TypeScript everywhere.
8. Use Tailwind CSS v4 utilities only.
9. Follow project design tokens.
10. Add loading, error, and empty states.
11. Use React Hook Form + Zod for forms.
12. Use CVA for component variants.
13. Use next/image and next/link.
14. Optimize for performance and accessibility.
15. Generate production-ready code only.