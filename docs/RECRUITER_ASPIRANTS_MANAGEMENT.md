# Gestión de Aspirantes - Rol Reclutador

## Descripción General

Se ha implementado una funcionalidad completa de gestión de aspirantes para el rol **Reclutador**. Los reclutadores pueden crear, editar y eliminar cuentas de **aspirantes** (rol=1) a través de un panel dedicado.

---

## Características Implementadas

### 1. Controlador: `Recruiter::AspirantsController`

**Ubicación:** `app/controllers/recruiter/aspirants_controller.rb`

**Acciones implementadas:**

- **`index`** - Listar todos los aspirantes
  - URL: `GET /recruiter/aspirants`
  - Filtra automáticamente por `role: :aspirante`
  - Solo muestra aspirantes, no otros roles

- **`new`** - Formulario para crear nuevo aspirante
  - URL: `GET /recruiter/aspirants/new`
  - Formulario vacío listo para ingreso de datos

- **`create`** - Guardar nuevo aspirante
  - URL: `POST /recruiter/aspirants`
  - Fuerza rol `aspirante` automáticamente
  - No permite que reclutadores asignen otros roles

- **`edit`** - Formulario para editar aspirante
  - URL: `GET /recruiter/aspirants/:id/edit`
  - Solo edita aspirantes, rechaza otros roles

- **`update`** - Guardar cambios de aspirante
  - URL: `PATCH/PUT /recruiter/aspirants/:id`
  - Permite actualizar email y contraseña

- **`destroy`** - Eliminar aspirante
  - URL: `DELETE /recruiter/aspirants/:id`
  - Rechaza si el usuario no es aspirante

### 2. Autorización y Seguridad

**Filtros implementados:**

```ruby
before_action :authenticate_user!      # Requiere login
before_action :authorize_recruiter!    # Solo reclutadores
before_action :set_aspirant, only: [:edit, :update, :destroy]
```

**Validaciones:**

- `authorize_recruiter!` - Verifica que `current_user.recruiter?` sea true
  - Redirige a root con alerta si no tiene permiso
  
- `set_aspirant` - Verifica que el usuario sea aspirante
  - Redirige a `/recruiter/aspirants` si intenta editar otro rol
  - Seguridad contra manipulación de IDs

**Parámetros permitidos:**

```ruby
params.require(:user).permit(:email, :password, :password_confirmation)
```

- Solo email y contraseña
- **No incluye `:role`** para prevenir escalación de privilegios
- Los reclutadores no pueden cambiar roles de usuarios

---

## Interfaces de Usuario

### 1. Índice de Aspirantes (`/recruiter/aspirants`)

**Elementos:**

- Título: "Panel de Reclutador - Gestión de Aspirantes"
- Botón: "Crear nuevo aspirante" (azul)
- Tabla con columnas:
  - Email
  - ID
  - Creado (fecha/hora formateada)
  - Acciones (Editar/Eliminar)
- Mensaje si no hay aspirantes: "No hay aspirantes registrados en el sistema."

**Acciones por fila:**

- Botón "Editar" (amarillo) → Abre formulario de edición
- Botón "Eliminar" (rojo) → Solicita confirmación, luego elimina

### 2. Crear Aspirante (`/recruiter/aspirants/new`)

**Campos del formulario:**

- Email (obligatorio, debe ser válido)
- Contraseña (obligatorio, mínimo 6 caracteres)
- Confirmación de contraseña (debe coincidir)

**Validaciones:**

- Email único (por validación de Devise)
- Contraseña mínimo 6 caracteres
- Confirmación debe coincidir

**Botones:**

- "Crear aspirante" (verde) - Guarda y redirige a índice
- "Cancelar" (gris) - Vuelve a índice sin guardar

**Manejo de errores:**

- Muestra resumen de errores de validación
- Mantiene datos ingresados si hay error

### 3. Editar Aspirante (`/recruiter/aspirants/:id/edit`)

**Campos del formulario:**

- Email (editable)
- Nueva contraseña (opcional, para no cambiar dejar vacío)
- Confirmación de contraseña

**Validaciones:**

- Email único
- Si se ingresa contraseña, mínimo 6 caracteres y confirmación requerida

**Botones:**

- "Actualizar aspirante" (verde) - Guarda cambios
- "Cancelar" (gris) - Vuelve a índice sin guardar

---

## Rutas Implementadas

```ruby
# En config/routes.rb
namespace :recruiter do
  resources :aspirants, only: [:index, :new, :create, :edit, :update, :destroy]
end
```

**Rutas generadas:**

| Verbo | Ruta | Acción | Nombre de ruta |
|-------|------|--------|----------------|
| GET | `/recruiter/aspirants` | index | `recruiter_aspirants_path` |
| GET | `/recruiter/aspirants/new` | new | `new_recruiter_aspirant_path` |
| POST | `/recruiter/aspirants` | create | `recruiter_aspirants_path` |
| GET | `/recruiter/aspirants/:id/edit` | edit | `edit_recruiter_aspirant_path(id)` |
| PATCH | `/recruiter/aspirants/:id` | update | `recruiter_aspirant_path(id)` |
| PUT | `/recruiter/aspirants/:id` | update | `recruiter_aspirant_path(id)` |
| DELETE | `/recruiter/aspirants/:id` | destroy | `recruiter_aspirant_path(id)` |

---

## Menú Lateral (Sidebar)

**Adición al layout:** `app/views/layouts/application.html.erb`

**Sección Reclutamiento (visible solo para reclutadores):**

```html
<% if current_user.recruiter? %>
  <div style="...">
    <p>RECLUTAMIENTO</p>
    <li>
      <%= link_to "Gestión de Aspirantes", recruiter_aspirants_path %>
    </li>
  </div>
<% end %>
```

- Visible solo si `current_user.recruiter?` es true
- Estilo distintivo: fondo púrpura suave (#e2d5f0)
- Contrasta con azul de admin (#d1ecf1)

---

## Datos de Prueba

Se creó automáticamente un usuario reclutador:

- **Email:** `recruiter@example.com`
- **Contraseña:** `password123`
- **Rol:** Reclutador

### Usuarios existentes para prueba:

1. **test@example.com** (Admin)
   - Acceso a: Gestión de Usuarios (todos los roles)
   
2. **recruiter@example.com** (Reclutador) - NUEVO
   - Acceso a: Gestión de Aspirantes (solo aspirantes)
   
3. **capaisa12@gmail.com** (Aspirante)
   - Sin acceso a paneles de gestión
   
4. **capaisa12@hotmail.com** (Aspirante)
   - Sin acceso a paneles de gestión

---

## Flujos de Operación

### Crear Aspirante

```
Reclutador
    ↓
Navega a /recruiter/aspirants
    ↓
Click en "Crear nuevo aspirante"
    ↓
Ingresa email y contraseña
    ↓
Click en "Crear aspirante"
    ↓
Si válido:
  └─ Guarda en BD con role=aspirante
  └─ Redirige a /recruiter/aspirants
  └─ Muestra mensaje: "Aspirante creado correctamente."
    
Si inválido:
  └─ Muestra errores de validación
  └─ Mantiene datos ingresados
```

### Editar Aspirante

```
Reclutador
    ↓
Navega a /recruiter/aspirants
    ↓
Click en "Editar" de un aspirante
    ↓
Modifica email y/o contraseña
    ↓
Click en "Actualizar aspirante"
    ↓
Si válido:
  └─ Guarda cambios
  └─ Redirige a /recruiter/aspirants
  └─ Muestra mensaje: "Aspirante actualizado correctamente."
    
Si inválido:
  └─ Muestra errores de validación
```

### Eliminar Aspirante

```
Reclutador
    ↓
Navega a /recruiter/aspirants
    ↓
Click en "Eliminar" de un aspirante
    ↓
Navegador muestra diálogo: "¿Está seguro?"
    ↓
Si confirma:
  └─ DELETE /recruiter/aspirants/:id
  └─ Redirige a /recruiter/aspirants
  └─ Muestra mensaje: "Aspirante [email] eliminado correctamente."
    
Si cancela:
  └─ Permanece en la página
```

---

## Seguridad Implementada

### 1. Autenticación
- ✅ `authenticate_user!` - Requiere estar logueado
- ✅ Devise maneja sesiones y tokens

### 2. Autorización
- ✅ `authorize_recruiter!` - Solo reclutadores acceden
- ✅ `set_aspirant` - Valida que sea aspirante antes de editar
- ✅ Previene acceso a otros roles

### 3. Validaciones
- ✅ Email único y válido
- ✅ Contraseña mínimo 6 caracteres
- ✅ Confirmación de contraseña requerida
- ✅ Bcrypt hashing de contraseñas

### 4. Prevención de Escalación
- ✅ Parámetros permitidos no incluyen `:role`
- ✅ Reclutadores no pueden crear admin
- ✅ Reclutadores no pueden cambiar roles existentes
- ✅ Solo pueden crear/editar aspirantes

---

## Diferencias con Admin

| Característica | Admin | Reclutador |
|---|---|---|
| **Acceso a** | Todos los usuarios | Solo aspirantes |
| **Puede crear** | Cualquier rol | Solo aspirantes |
| **Puede editar** | Cualquier rol | Solo aspirantes |
| **Puede eliminar** | Cualquier rol | Solo aspirantes |
| **Puede cambiar roles** | Sí (formulario incluye :role) | No |
| **Menú visible** | "Gestión de Usuarios" | "Gestión de Aspirantes" |
| **Rutas** | `/admin/users/*` | `/recruiter/aspirants/*` |
| **Controlador** | Admin::UsersController | Recruiter::AspirantsController |

---

## Archivos Modificados/Creados

**Creados:**

- ✅ `app/controllers/recruiter/aspirants_controller.rb`
- ✅ `app/views/recruiter/aspirants/index.html.erb`
- ✅ `app/views/recruiter/aspirants/new.html.erb`
- ✅ `app/views/recruiter/aspirants/edit.html.erb`
- ✅ `app/views/recruiter/aspirants/create.html.erb` (placeholder)

**Modificados:**

- ✅ `config/routes.rb` - Agregado namespace recruiter
- ✅ `app/views/layouts/application.html.erb` - Agregado menú reclutador

---

## Testing Manual

### Para probar como Reclutador:

1. Accede a: http://localhost:3000/users/sign_in
2. Email: `recruiter@example.com`
3. Contraseña: `password123`
4. Click "Iniciar Sesión"
5. Haz click en "Gestión de Aspirantes" en el sidebar
6. Verás los dos aspirantes registrados (capaisa12@gmail.com y capaisa12@hotmail.com)
7. Puedes crear, editar o eliminar aspirantes

### Para probar las restricciones:

1. Intenta acceder a `/recruiter/aspirants` sin estar logueado
   - ✅ Redirige a login

2. Intenta acceder como aspirante (capaisa12@gmail.com)
   - ✅ Redirige a root con alerta

3. Intenta editar un usuario no-aspirante siendo reclutador
   - ✅ Redirige a /recruiter/aspirants con alerta

4. Intenta POST a `/recruiter/aspirants` con role=admin
   - ✅ Se ignora, siempre guarda con role=aspirante

