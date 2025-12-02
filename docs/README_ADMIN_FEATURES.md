# Onboarding Record - Admin Features Documentation

## Overview
This document describes the admin panel features of the Onboarding Record application, including user management with full CRUD operations (Create, Read, Update, Delete).

## Features Implemented

### 1. Role-Based Access Control (RBAC)
The application implements three user roles:
- **Admin (0):** Full access to user management panel
- **Usuario (1):** Standard user (limited features)
- **Recruiter (2):** Recruiter role (for future expansion)

### 2. Vertical Sidebar Navigation
- Visible only to authenticated users
- Fixed width: 200px
- Contains main menu sections:
  - **Menú:** "Inicio" link (for all authenticated users)
  - **Administración:** "Gestión de Usuarios" link (visible only to admin users)

### 3. User Management Dashboard (/admin/users)

#### Features:
- **List Users:** Displays all users with columns:
  - Email
  - ID
  - Role (with color-coded badges: Admin=blue, Recruiter=orange, Usuario=green)
  - Created date (formatted)
  - Actions (Edit, Delete)

- **Create User:** (/admin/users/new)
  - Form fields: Email, Password, Password Confirmation, Role selection
  - Validation: Email must be unique, password strength validation
  - Success message: "Usuario creado correctamente"

- **Edit User:** (/admin/users/:id/edit)
  - Form fields: Email, Password (optional), Password Confirmation, Role
  - Password field can be left empty to skip password change
  - Validation: Email uniqueness checked
  - Success message: "Usuario actualizado correctamente"

- **Delete User:** (/admin/users/:id via DELETE)
  - Confirmation dialog before deletion
  - Prevents accidental deletion with JavaScript confirm
  - Success message: "Usuario eliminado correctamente"

## Authorization

All admin routes are protected by:
1. `authenticate_user!` - Ensures user is logged in
2. `authorize_admin!` - Ensures user has admin role
3. `set_user` - Loads user for edit/delete actions (before_action)

Non-admin users attempting to access /admin/users will be redirected to home with an alert message.

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id bigint PRIMARY KEY,
  email varchar(255) UNIQUE NOT NULL,
  encrypted_password varchar(255) NOT NULL,
  reset_password_token varchar(255),
  reset_password_sent_at timestamp,
  remember_created_at timestamp,
  created_at timestamp NOT NULL,
  updated_at timestamp NOT NULL,
  role integer DEFAULT 1 NOT NULL,
  FOREIGN KEY (role) -- Actually an enum
);

CREATE INDEX index_users_on_role ON users(role);
```

### Enum Values for Role
- 0 = admin
- 1 = usuario
- 2 = recruiter

## Routes

All admin routes are namespaced under `/admin`:

```
GET    /admin/users              -> Admin::UsersController#index
GET    /admin/users/new          -> Admin::UsersController#new
POST   /admin/users              -> Admin::UsersController#create
GET    /admin/users/:id/edit     -> Admin::UsersController#edit
PATCH  /admin/users/:id          -> Admin::UsersController#update
DELETE /admin/users/:id          -> Admin::UsersController#destroy
```

## Controller: Admin::UsersController

Location: `app/controllers/admin/users_controller.rb`

### Actions:

#### index
- Lists all users with their roles
- Renders: `app/views/admin/users/index.html.erb`

#### new
- Displays form to create a new user
- Renders: `app/views/admin/users/new.html.erb`

#### create
- Creates a new user from form submission
- Parameters: email, password, password_confirmation, role
- Validation: Email must be unique, passwords must match
- On success: Redirects to index with success message
- On failure: Re-renders form with error messages

#### edit
- Displays form to edit existing user
- Requires: User must be logged in and have admin role
- Renders: `app/views/admin/users/edit.html.erb`

#### update
- Updates user attributes from form submission
- Parameters: email, password (optional), password_confirmation, role
- Password can be left blank to keep existing password
- On success: Redirects to index with success message
- On failure: Re-renders form with error messages

#### destroy
- Deletes user from database
- Confirmation: JavaScript dialog prevents accidental deletion
- On success: Redirects to index with success message
- On failure: Redirects with error message

## Views

### app/views/admin/users/index.html.erb
Main admin dashboard showing list of all users with:
- Table with sortable headers (email, ID, role, created date)
- Color-coded role badges
- Edit button (yellow) - links to edit form
- Delete button (red) - triggers confirmation before deletion
- "Crear nuevo usuario" button (blue) - links to create form

### app/views/admin/users/new.html.erb
Form to create new user with:
- Email field (required, must be unique)
- Password field (required)
- Password Confirmation field (required)
- Role dropdown (Admin, Usuario, Recruiter)
- Error summary (if validation fails)
- "Crear usuario" submit button
- Form styling matches Devise authentication forms

### app/views/admin/users/edit.html.erb
Form to edit existing user with:
- Email field (required, must be unique)
- Password field (optional) with label "Nueva contraseña (dejar vacío para no cambiar)"
- Password Confirmation field
- Role dropdown
- Error summary (if validation fails)
- "Actualizar usuario" submit button
- "Cancelar" button with flex layout for positioning

## Localization (Spanish)

All admin interface text is in Spanish:
- "Gestión de Usuarios" - User Management
- "Crear nuevo usuario" - Create New User
- "Actualizar usuario" - Update User
- "Editar" - Edit
- "Eliminar" - Delete
- "Usuario creado correctamente" - User created successfully
- "Usuario actualizado correctamente" - User updated successfully
- "Usuario eliminado correctamente" - User deleted successfully
- Role labels: "Admin", "Usuario", "Reclutador"

## Testing the Features

### Access the Admin Panel
1. Navigate to `http://localhost:3000/admin/users`
2. If not logged in, you'll be redirected to login
3. If logged in as non-admin, you'll see an alert and be redirected to home

### Create a User
1. Click "Crear nuevo usuario" button
2. Fill in email and password
3. Select role from dropdown
4. Click "Crear usuario"
5. Should see user added to list with success message

### Edit a User
1. On user list, click "Editar" button for any user
2. Modify email, password (optional), or role
3. Click "Actualizar usuario"
4. Should see updated user in list with success message

### Delete a User
1. On user list, click "Eliminar" button for any user
2. Confirm in the JavaScript dialog that appears
3. User should be removed from list with success message

## Development Notes

- Devise authentication is integrated for all password handling
- bcrypt is used for password hashing
- Strong params are enforced on all controller actions
- Authorization checks happen at controller level via before_action filters
- All error messages are translated to Spanish via I18n
- Email uniqueness is validated at both model and database level

## Future Enhancements

- Pagination for large user lists
- Search/filter by email or role
- Bulk actions (select multiple users)
- User activity logs/audit trail
- Email address verification for new users
- Password strength indicator
- Two-factor authentication for admin accounts
