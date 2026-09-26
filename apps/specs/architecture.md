# Project Architecture & Development Guidelines

## 1. Overview

This project is a **Turborepo monorepo** managed using **npm workspaces**.

The repository contains:

* A Next.js frontend application
* An Express + TypeScript backend application
* Shared TypeScript types
* Shared API contracts/validators
* Shared utilities
* A dedicated database package using Prisma + PostgreSQL
* Shared configuration packages

The primary goals of this architecture are:

1. Clear separation of concerns
2. Reusable code
3. Strong type safety
4. No unnecessary duplication
5. Consistent file naming
6. Easy scalability
7. Clear frontend/backend boundaries
8. Preventing database/server dependencies from leaking into the frontend
9. Making the codebase easy for both developers and AI coding agents to understand

---

# 2. Repository Structure

The expected repository structure is:

```text
root/
│
├── apps/
│   │
│   ├── web/
│   │   ├── app/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── constants/
│   │   ├── lib/
│   │   ├── providers/
│   │   ├── types/
│   │   ├── public/
│   │   ├── next.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── server/
│       ├── src/
│       │   ├── config/
│       │   ├── controllers/
│       │   ├── middleware/
│       │   ├── routes/
│       │   ├── services/
│       │   ├── constants/
│       │   ├── utils/
│       │   ├── types/
│       │   ├── lib/
│       │   ├── app.ts
│       │   └── index.ts
│       ├── tsconfig.json
│       └── package.json
│
├── packages/
│   ├── types/
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── api/
│   │   ├── src/
│   │   └── package.json
│   │
│   ├── db/
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   ├── src/
│   │   │   ├── client.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── utils/
│   │   ├── src/
│   │   └── package.json
│   │
│   ├── eslint-config/
│   └── typescript-config/
│
├── package.json
├── package-lock.json
├── turbo.json
└── architecture.md
```

---

# 3. Workspace Responsibilities

## apps/web

The Next.js frontend.

Responsible for:

* Pages
* Layouts
* Client-side state
* UI rendering
* React hooks
* API consumption
* TanStack Query
* Axios
* Form handling
* Frontend-specific business logic
* Frontend-specific validation
* User interactions

The web application must **never directly access the database**.

---

## apps/server

The Express backend.

Responsible for:

* HTTP API
* Authentication/authorization
* Request validation
* Controllers
* Business logic
* Database operations
* Prisma usage
* Error handling
* Middleware
* API responses

The server is the only application layer allowed to communicate with the database.

---

## apps/web/components/ui

UI component library.

Responsible for:

* shadcn/ui components
* Generic reusable components
* Design-system components
* UI primitives

Examples:

```text
Button
Input
Select
Dialog
Dropdown
Modal
Table
Tabs
Badge
Card
Tooltip
Sheet
```

These components should be reusable and should not contain application-specific business logic.

---

## packages/types

Shared TypeScript types.

Examples:

```text
user.types.ts
auth.types.ts
api.types.ts
pagination.types.ts
common.types.ts
```

Types that are genuinely shared between frontend and backend should live here.

---

## packages/api

Shared API contracts and validation schemas.

This package can contain:

* Zod schemas
* Request schemas
* Response schemas
* API contracts
* Shared API-related types

Example:

```text
packages/api/src/
├── auth/
│   ├── auth.schema.ts
│   └── auth.types.ts
├── user/
│   ├── user.schema.ts
│   └── user.types.ts
└── index.ts
```

---

## packages/db

Database package.

The database layer must be isolated here.

Technology:

* PostgreSQL
* Prisma ORM

Example:

```text
packages/db/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
└── src/
    ├── client.ts
    └── index.ts
```

The Prisma client must be exported from this package.

Only server-side code may depend on `@repo/db`.

### Critical Rule

```text
apps/web
    ❌
    ↓
packages/db
```

This is forbidden.

The web application must never import:

```text
Prisma
@prisma/client
@repo/db
DATABASE_URL
database repositories
database services
```

The correct flow is:

```text
Next.js
   │
   │ HTTP
   ▼
Express Server
   │
   ▼
@repo/db
   │
   ▼
Prisma
   │
   ▼
PostgreSQL
```

---

# 4. Naming Conventions

All project files should follow the naming convention:

```text
<name>.<purpose>.ts
```

Examples:

```text
user.types.ts
user.controller.ts
user.service.ts
user.routes.ts
user.constant.ts
user.schema.ts
user.hooks.ts
user.utils.ts
user.repository.ts
```

Do not use inconsistent naming such as:

```text
userTypes.ts
UserTypes.ts
userController.ts
UserController.ts
```

Prefer:

```text
user.types.ts
user.controller.ts
```

---

# 5. File Naming Rules

## Types

```text
user.types.ts
auth.types.ts
pagination.types.ts
```

## Controllers

```text
user.controller.ts
auth.controller.ts
payment.controller.ts
```

## Services

```text
user.service.ts
auth.service.ts
payment.service.ts
```

## Routes

```text
user.routes.ts
auth.routes.ts
payment.routes.ts
```

## Constants

```text
user.constant.ts
auth.constant.ts
app.constant.ts
tanstack-keys.constant.ts
```

## Hooks

```text
auth.hooks.ts
user.hooks.ts
payment.hooks.ts
```

## Schemas

```text
user.schema.ts
auth.schema.ts
```

## Utilities

```text
user.utils.ts
date.utils.ts
string.utils.ts
```

---

# 6. Frontend Architecture

The frontend uses:

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* Axios
* TanStack Query

The frontend should follow this general flow:

```text
Page / Component
       │
       ▼
     Hook
       │
       ▼
    Service
       │
       ▼
     Axios
       │
       ▼
 Express API
```

A component should not directly perform API requests.

Avoid:

```tsx
const response = await axios.get("/users");
```

inside a component.

Instead:

```text
component
    ↓
user.hooks.ts
    ↓
user.service.ts
    ↓
axios
```

---

# 7. Frontend Hooks

All frontend application logic that belongs to reusable React behavior should be placed in hooks.

Examples:

```text
hooks/
├── auth.hooks.ts
├── user.hooks.ts
├── dashboard.hooks.ts
└── payment.hooks.ts
```

For example:

```ts
export function useUser(userId: string) {
  return useQuery({
    queryKey: [TANSTACK_KEYS.USER, userId],
    queryFn: () => getUser(userId),
  });
}
```

Components should consume the hook:

```tsx
const { data, isLoading, error } = useUser(userId);
```

Do not duplicate query logic across multiple components.

---

# 8. Frontend Services

All API calls related to a specific domain/module must be placed inside the corresponding service.

Example:

```text
services/
├── auth.service.ts
├── user.service.ts
├── payment.service.ts
└── dashboard.service.ts
```

`user.service.ts` is responsible for API communication related to users.

Example:

```ts
import { apiClient } from "@/lib/api-client";

export const getUser = async (userId: string) => {
  const response = await apiClient.get(`/users/${userId}`);

  return response.data;
};

export const createUser = async (payload: CreateUserInput) => {
  const response = await apiClient.post("/users", payload);

  return response.data;
};
```

Services should not contain React-specific logic.

Do not use `useQuery` or `useMutation` inside service files.

TanStack Query belongs in hooks.

---

# 9. TanStack Query

TanStack Query logic belongs inside hooks.

Example:

```text
hooks/
└── user.hooks.ts
```

```ts
export function useUsers() {
  return useQuery({
    queryKey: [TANSTACK_KEYS.USERS],
    queryFn: getUsers,
  });
}
```

Mutations:

```ts
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_KEYS.USERS],
      });
    },
  });
}
```

---

# 10. TanStack Query Keys

All TanStack Query keys must be centralized.

Create:

```text
constants/tanstack-keys.constant.ts
```

Example:

```ts
export const TANSTACK_KEYS = {
  USERS: "users",
  USER: "user",
  AUTH: "auth",
  CURRENT_USER: "current-user",
  DASHBOARD: "dashboard",
} as const;
```

Use:

```ts
queryKey: [TANSTACK_KEYS.USERS]
```

instead of:

```ts
queryKey: ["users"]
```

Do not scatter string literals throughout the codebase.

For nested/domain-specific keys, use a structured object when useful:

```ts
export const TANSTACK_KEYS = {
  USERS: {
    ALL: "users",
    DETAIL: "user",
  },
  AUTH: {
    CURRENT_USER: "current-user",
  },
} as const;
```

The project should follow one consistent convention.

---

# 11. Axios

Create a centralized Axios client.

Example:

```text
apps/web/lib/api-client.ts
```

```ts
import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
```

Do not create separate Axios instances unnecessarily.

Do not hardcode API URLs.

Bad:

```ts
axios.get("http://localhost:4000/api/users");
```

Good:

```ts
apiClient.get("/users");
```

---

# 12. Frontend Components

Use reusable components wherever possible.

Avoid creating large components containing:

* API logic
* State logic
* Form logic
* Business logic
* UI markup
* Data transformation

all in one file.

Instead:

```text
components/
├── user/
│   ├── user-table.tsx
│   ├── user-form.tsx
│   ├── user-card.tsx
│   └── user-dialog.tsx
│
└── common/
    ├── loading.tsx
    ├── empty-state.tsx
    └── error-state.tsx
```

Components should focus primarily on rendering and user interaction.

---

# 13. shadcn/ui

Shared shadcn components belong in:

```text
web/components/ui/
```

Example:

```text
web/components/ui/
├── button.tsx
├── input.tsx
├── dialog.tsx
├── select.tsx
├── table.tsx
└── dropdown-menu.tsx
```

Application-specific compositions belong in:

```text
apps/web/components/
```

For example:

```text
apps/web/components/user/user-form.tsx
```

may compose:

```text
@repo/ui/Input
@repo/ui/Button
@repo/ui/Select
```

### Rule

Generic:

```text
packages/ui
```

Application-specific:

```text
apps/web/components
```

Do not put application-specific business logic inside the shared UI package.

---

# 14. Server Architecture

The Express application should follow:

```text
Request
   │
   ▼
Route
   │
   ▼
Middleware
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Database / External Service
```

Example:

```text
POST /users
      │
      ▼
user.routes.ts
      │
      ▼
auth.middleware.ts
      │
      ▼
user.controller.ts
      │
      ▼
user.service.ts
      │
      ▼
@repo/db
      │
      ▼
Prisma
      │
      ▼
PostgreSQL
```

---

# 15. Server Routes

Routes should only define HTTP routing.

Example:

```ts
router.post(
  "/",
  authenticate,
  createUser
);
```

Do not put business logic inside routes.

Avoid:

```ts
router.post("/users", async (req, res) => {
  const user = await prisma.user.create(...);
});
```

Instead:

```text
route
  ↓
controller
  ↓
service
```

---

# 16. Server Controllers

Controllers are responsible for:

* Reading request parameters
* Reading request body
* Calling services
* Returning HTTP responses
* Passing errors to the error middleware

Example:

```ts
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.createUser(req.body);

    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
```

Controllers should remain thin.

Do not place complex business logic in controllers.

---

# 17. Server Services

Services contain business logic.

Example:

```text
services/
├── user.service.ts
├── auth.service.ts
└── payment.service.ts
```

Example:

```ts
export const createUser = async (
  payload: CreateUserInput
) => {
  // Business rules

  // Database operation

  // Return domain result
};
```

Services may use:

```text
@repo/db
external APIs
repositories
utilities
```

---

# 18. Prisma & Database

Prisma must live inside:

```text
packages/db
```

Example:

```text
packages/db/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
└── src/
    ├── client.ts
    └── index.ts
```

Example Prisma client:

```ts
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
```

Export it:

```ts
export { prisma } from "./client";
```

Server:

```ts
import { prisma } from "@repo/db";
```

The frontend must never import it.

---

# 19. Database Rules

Use PostgreSQL as the database.

Use Prisma as the ORM.

Database schema changes must be made through Prisma migrations.

Do not manually modify production database structure unless explicitly required by the deployment/migration process.

Do not expose:

```text
DATABASE_URL
Prisma Client
database credentials
database models
```

to the frontend.

Never use:

```text
NEXT_PUBLIC_DATABASE_URL
```

or any equivalent frontend-exposed database environment variable.

---

# 20. Constants

Do not hardcode configuration, identifiers, limits, labels, URLs, query keys, or other important values throughout the codebase.

Bad:

```ts
if (role === "ADMIN") {
}
```

Prefer:

```ts
if (role === USER_ROLES.ADMIN) {
}
```

Bad:

```ts
queryKey: ["users"]
```

Prefer:

```ts
queryKey: [TANSTACK_KEYS.USERS]
```

Bad:

```ts
const maxFileSize = 10485760;
```

Prefer:

```ts
const MAX_FILE_SIZE = 10 * 1024 * 1024;
```

and place it in the appropriate constant file.

---

# 21. Constant File Organization

Constants should be grouped by domain.

Example:

```text
constants/
├── app.constant.ts
├── auth.constant.ts
├── user.constant.ts
├── payment.constant.ts
└── tanstack-keys.constant.ts
```

Example:

```ts
export const USER_ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;
```

Do not create one giant constant file containing unrelated values.

---

# 22. Environment Variables

Environment-specific configuration must use environment variables.

Examples:

```env
DATABASE_URL=
NEXT_PUBLIC_API_URL=
JWT_SECRET=
REDIS_URL=
S3_BUCKET=
```

Never hardcode:

```text
API URLs
Database URLs
Secrets
Tokens
Credentials
Encryption keys
External service credentials
```

Use appropriate `.env` files.

Frontend variables that must be exposed to the browser should use:

```text
NEXT_PUBLIC_
```

Only expose values that are genuinely safe for the client.

---

# 23. Secrets

Never commit:

```text
.env
.env.local
.env.production
private keys
API secrets
database credentials
JWT secrets
cloud credentials
```

Use:

```text
.env.example
```

to document required environment variables.

Example:

```env
NEXT_PUBLIC_API_URL=
DATABASE_URL=
JWT_SECRET=
```

Do not put actual credentials in `.env.example`.

---

# 24. TypeScript Rules

Use strict TypeScript.

Avoid:

```ts
any
```

unless there is a legitimate reason.

Prefer:

```ts
unknown
```

when the type is genuinely unknown.

Avoid unnecessary type assertions:

```ts
value as User
```

Prefer proper validation and type narrowing.

Shared types should live in:

```text
packages/types
```

when used by multiple applications/packages.

---

# 25. API Response Structure

APIs should follow a consistent response structure.

For example:

```ts
{
  success: true,
  data: {},
  message: "User created successfully"
}
```

Errors should follow a predictable structure:

```ts
{
  success: false,
  message: "User not found",
  errorCode: "USER_NOT_FOUND"
}
```

The exact format should be centralized and reused rather than reinvented per endpoint.

---

# 26. Error Handling

Do not silently swallow errors.

Bad:

```ts
try {
  ...
} catch {
}
```

Use centralized error handling on the server.

Expected architecture:

```text
Controller
    │
    ▼
Service
    │
    ▼
throw Error
    │
    ▼
Global Error Middleware
    │
    ▼
HTTP Response
```

The server should have a centralized error middleware.

---

# 27. Validation

Validate external input.

External input includes:

* Request body
* Query parameters
* Route parameters
* Headers
* User-provided data
* External API responses where necessary

Use Zod or another agreed validation library.

Example:

```ts
const result = CreateUserSchema.safeParse(req.body);

if (!result.success) {
  throw new ValidationError(result.error);
}
```

Never assume incoming HTTP data is valid.

---

# 28. Separation of Concerns

Each layer should have one primary responsibility.

### Component

Rendering/UI.

### Hook

React behavior and TanStack Query state.

### Service

API communication.

### Controller

HTTP request/response handling.

### Service (server)

Business logic.

### Database package

Database access.

### UI package

Reusable UI components.

### Types package

Shared TypeScript types.

---

# 29. Avoid Circular Dependencies

Avoid dependencies such as:

```text
A → B → C → A
```

Keep dependency direction clear.

Preferred:

```text
UI
 ↓
Hooks
 ↓
Services
 ↓
API
 ↓
Server
 ↓
DB
```

Shared packages should remain low-level and should not import application-specific code.

---

# 30. Do Not Duplicate Code

Before creating a new utility/component/helper:

1. Search the repository.
2. Check whether an existing implementation already exists.
3. Reuse it if appropriate.
4. If multiple modules need it, move it into the appropriate shared package.

Do not create:

```text
formatDate()
formatDate2()
formatDateHelper()
formatDateUtil()
```

when one reusable implementation is sufficient.

---

# 31. Reusable Components

Components should be designed for reuse when they have common behavior.

Instead of duplicating:

```tsx
<Button>Save</Button>
```

with different custom implementations throughout the application, use the shared UI component.

For domain-specific reusable components:

```text
apps/web/components/user/
```

For globally reusable UI primitives:

```text
packages/ui/
```

---

# 32. Do Not Over-Abstraction

Do not create abstractions just for the sake of abstraction.

Bad:

```text
UserServiceFactory
UserServiceProvider
UserServiceManager
UserServiceResolver
```

for a simple CRUD operation.

Prefer simple, understandable code.

Create an abstraction when:

* It removes duplication
* It isolates infrastructure
* It improves testability
* It represents a real domain boundary
* It is reused
* It makes the architecture clearer

---

# 33. Logging

Use a centralized logging mechanism on the server.

Do not scatter random:

```ts
console.log()
```

through production code.

Development debugging can use console logging temporarily, but production logging should be structured and meaningful.

Never log:

```text
Passwords
Tokens
JWTs
API keys
Database credentials
Sensitive personal information
```

---

# 34. Authentication

Authentication logic belongs on the server.

The frontend may:

* Store/use authentication state according to the chosen auth strategy
* Call authentication APIs
* Display authenticated UI
* Handle login/logout interactions

The frontend must not independently determine whether a user is authorized to perform a protected operation.

Authorization must be enforced server-side.

---

# 35. Security

Always:

* Validate input
* Authenticate protected routes
* Authorize sensitive operations
* Sanitize external input where appropriate
* Use secure cookies/token handling
* Avoid exposing secrets
* Configure CORS deliberately
* Apply rate limiting where appropriate
* Use HTTPS in production
* Avoid leaking internal errors to clients

Never trust frontend validation as a security boundary.

---

# 36. Git Practices

Use small, focused commits.

Good:

```text
feat: add user creation API
feat: add user management UI
fix: handle expired auth token
refactor: extract user query hook
```

Avoid large commits containing unrelated changes.

Do not commit:

```text
.env
node_modules/
.next/
dist/
coverage/
generated secrets
```

---

# 37. Dependency Rules

Before adding a dependency:

1. Check whether the functionality already exists.
2. Check whether an existing dependency can solve the problem.
3. Consider bundle size.
4. Consider maintenance status.
5. Add the dependency to the correct workspace.

Do not install a frontend dependency in the server package or vice versa.

Example:

```text
React dependency
    → apps/web

Express dependency
    → apps/server

Prisma dependency
    → packages/db

Shared UI dependency
    → packages/ui
```

---

# 38. Turborepo Rules

Turborepo should be used for:

* Running tasks across workspaces
* Caching
* Build orchestration
* Dependency-aware execution

Common commands:

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```

Turbo should understand dependencies between packages.

For example:

```text
packages/types
      ↓
apps/web
```

If the types package changes, dependent tasks should be rebuilt/revalidated as required.

Do not bypass workspace boundaries unnecessarily.

---

# 39. Package Dependency Direction

Preferred dependency direction:

```text
apps/web
   ↓
packages/ui
packages/types
packages/api
packages/utils


apps/server
   ↓
packages/api
packages/types
packages/utils
packages/db
```

Important:

```text
apps/web ──X──> packages/db
```

This is prohibited.

Also avoid:

```text
packages/ui → apps/web
packages/types → apps/web
packages/utils → apps/web
```

Shared packages must not depend on applications.

---

# 40. AI Agent Rules

When an AI agent modifies this repository, it must follow these rules.

## Before creating a new file

Check whether an existing file already serves the same purpose.

Do not create duplicate:

```text
services
hooks
components
constants
utilities
types
```

without checking the existing architecture.

---

## Before adding a dependency

Check the existing package dependencies and determine which workspace owns the dependency.

---

## Before adding a constant

Search for an existing related constant file.

For example, before creating:

```text
user-role.constant.ts
```

check whether:

```text
user.constant.ts
```

already exists.

Reuse or extend the existing domain constant file when appropriate.

---

## Before adding API logic

Check:

```text
apps/web/services/
apps/web/hooks/
```

and reuse the existing service/hook architecture.

Do not make API calls directly from UI components.

---

## Before adding database logic

Database operations must go through:

```text
packages/db
```

Never add Prisma/database logic to:

```text
apps/web
```

---

## Before creating UI

Check:

```text
packages/ui
```

for an existing reusable component.

Prefer composition over duplication.

---

# 41. Example Feature Structure

For a `User` feature:

```text
apps/
├── web/
│   ├── components/
│   │   └── user/
│   │       ├── user-form.tsx
│   │       ├── user-table.tsx
│   │       └── user-dialog.tsx
│   │
│   ├── hooks/
│   │   └── user.hooks.ts
│   │
│   ├── services/
│   │   └── user.service.ts
│   │
│   └── constants/
│       ├── user.constant.ts
│       └── tanstack-keys.constant.ts
│
└── server/
    └── src/
        ├── controllers/
        │   └── user.controller.ts
        │
        ├── services/
        │   └── user.service.ts
        │
        ├── routes/
        │   └── user.routes.ts
        │
        ├── constants/
        │   └── user.constant.ts
        │
        └── types/
            └── user.types.ts
```

Shared types:

```text
packages/types/
└── src/
    └── user.types.ts
```

Database:

```text
packages/db/
└── prisma/
    └── schema.prisma
```

---

# 42. Example Request Flow

For:

```text
Create User
```

the complete flow should be:

```text
User Form
   │
   ▼
useCreateUser()
   │
   ▼
user.service.ts
   │
   ▼
Axios
   │
   ▼
POST /api/users
   │
   ▼
user.routes.ts
   │
   ▼
Validation Middleware
   │
   ▼
user.controller.ts
   │
   ▼
user.service.ts
   │
   ▼
@repo/db
   │
   ▼
Prisma
   │
   ▼
PostgreSQL
```

Response:

```text
PostgreSQL
   │
   ▼
Prisma
   │
   ▼
Server Service
   │
   ▼
Controller
   │
   ▼
HTTP Response
   │
   ▼
Axios
   │
   ▼
TanStack Query
   │
   ▼
React Component
```

---

# 43. General Best Practices

Follow these principles throughout the project:

1. Keep components small.
2. Keep controllers thin.
3. Keep business logic in services.
4. Keep API calls in frontend services.
5. Keep TanStack Query logic in hooks.
6. Keep shared UI in `packages/ui`.
7. Keep shared types in `packages/types`.
8. Keep API schemas/contracts in `packages/api`.
9. Keep database access in `packages/db`.
10. Never access the database from the frontend.
11. Avoid hardcoded configuration.
12. Centralize constants.
13. Reuse existing components/utilities.
14. Avoid unnecessary abstractions.
15. Avoid circular dependencies.
16. Use strict TypeScript.
17. Avoid `any`.
18. Validate all external input.
19. Handle errors centrally.
20. Never expose secrets to the frontend.
21. Keep environment-specific values in environment variables.
22. Keep dependencies in the correct workspace.
23. Follow consistent naming conventions.
24. Prefer composition over duplication.
25. Keep modules/domain boundaries clear.
26. Search before creating new code.
27. Do not silently change architecture.
28. Do not introduce a new library when an existing project dependency is sufficient.
29. Keep changes focused and minimal.
30. Preserve existing behavior unless the task explicitly requires changing it.

---

# 44. Golden Rules

The following rules are mandatory:

```text
1. UI component
      ↓
2. Hook
      ↓
3. Frontend service
      ↓
4. Axios
      ↓
5. Express API
```
