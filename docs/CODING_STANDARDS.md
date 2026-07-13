# Coding Standards

## 1. Naming Conventions
- **Files/Folders (Frontend)**: `kebab-case` for folders (e.g., `booking-form`), `PascalCase` for React components (e.g., `BookingForm.tsx`), `camelCase` for utilities/hooks (e.g., `useBooking.ts`).
- **Files/Folders (Backend)**: `snake_case` for all Python files and folders.
- **Variables/Functions (TypeScript)**: `camelCase`.
- **Variables/Functions (Python)**: `snake_case`.
- **Classes/Models (Python)**: `PascalCase`.
- **Database Tables/Columns**: `snake_case`.

## 2. Folder Organization
- Feature-based architecture is preferred on the frontend (e.g., placing components, hooks, and services related to 'bookings' in a `features/bookings` folder).
- Layered architecture on the backend (`routers` -> `services` -> `repositories/models`). Avoid putting business logic directly in route handlers.

## 3. Component Philosophy (Frontend)
- **Dumb vs Smart**: Keep UI components (like buttons, inputs) "dumb" (relying on props). Keep logic and state in "smart" container components or custom hooks.
- **Composition**: Prefer composing smaller components over creating large monolithic components with massive prop lists.
- **Styling**: Use Tailwind utility classes directly in the `className`. Abstract repeated patterns into local variables or small components, not `@apply` in CSS, unless defining global base styles.

## 4. API Standards
- Always return standard JSON responses.
- Use appropriate HTTP status codes (200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Server Error).
- FastAPI models (Pydantic) should strictly define inputs and outputs to generate accurate OpenAPI specs.

## 5. Git Commit Conventions
Use Conventional Commits:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting, missing semi colons, etc.
- `refactor:` for refactoring production code
- `chore:` for updating build tasks, package manager configs, etc.

Example: `feat(booking): integrate razorpay checkout`

## 6. Branch Strategy
- `main`: Represents production-ready code.
- `dev`: Active development branch.
- Feature branches should branch off `dev` and be named `feature/description` (e.g., `feature/admin-dashboard`).
- Merge via Pull Requests to ensure review (even if solo, good for tracking).

## 7. Documentation
- Update `API.md` when endpoints change.
- Keep `TASKS.md` updated as progress is made.
- Complex backend services or frontend hooks should have brief docstrings/comments explaining *why* it does something, not *what* it does (code should be self-documenting for the *what*).
