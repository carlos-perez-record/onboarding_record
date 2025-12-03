# Sistema de Registro de Currículum - Aspirantes

## Descripción General

Se ha implementado un sistema completo de registro y gestión de currículum para aspirantes. Los aspirantes pueden registrar su información personal, cargar una foto de perfil, describir su perfil profesional y especificar sus idiomas.

---

## Características Implementadas

### 1. Modelo: `Curriculum`

**Ubicación:** `app/models/curriculum.rb`

**Relación:**
- Pertenece a: `User` (one-to-one)
- Tiene adjunto: `photo` (Active Storage)

**Campos:**

```ruby
# Asociaciones
user_id (foreign key, unique)
photo (active storage)

# Datos Personales
first_name        : string (required, 2-50 chars)
last_name         : string (required, 2-50 chars)
birth_date        : date (required, must be 18+)
identification    : string (required, unique, 5-20 chars)
phone_number      : string (required, phone format)
address           : string (required, 2-100 chars)
city              : string (required, 2-100 chars)
department        : string (required, 2-100 chars)
country           : string (default: "Colombia", 2-100 chars)

# Perfil
profile_description : text (max 2000 chars)

# Disponibilidad
available_to_travel    : boolean (default: false)
available_to_relocate  : boolean (default: false)

# Idiomas
languages : text (JSON array)

# Timestamps
created_at, updated_at
```

**Validaciones:**

- ✅ **Nombres/Apellidos:** Obligatorios, 2-50 caracteres
- ✅ **Fecha de Nacimiento:** Obligatoria, MAYOR de 18 años (validación crucial)
- ✅ **Identificación:** Única, 5-20 caracteres
- ✅ **Teléfono:** Formato válido de teléfono
- ✅ **Ubicación:** Todos los campos requeridos
- ✅ **Foto:** JPEG o PNG, máximo 2 MB
- ✅ **Descripción:** Máximo 2000 caracteres
- ✅ **Idiomas:** Almacenados como JSON array

**Validación de Edad (18+ años):**

```ruby
validate :must_be_at_least_18_years_old

def calculate_age
  today = Date.today
  age = today.year - birth_date.year
  age -= 1 if today.month < birth_date.month || 
             (today.month == birth_date.month && today.day < birth_date.day)
  age
end
```

---

### 2. Controlador: `CurriculumsController`

**Ubicación:** `app/controllers/curriculums_controller.rb`

**Filtros:**
- `authenticate_user!` - Requiere estar logueado
- `authorize_aspirant!` - Solo aspirantes pueden acceder
- `set_curriculum` - Valida propiedad del currículum

**Acciones:**

#### `new` - Crear Nuevo Currículum
- URL: `GET /curriculums/new`
- Vista: Formulario de registro
- Restricción: Solo aspirantes sin currículum

#### `create` - Guardar Currículum
- URL: `POST /curriculums`
- Valida todos los campos
- Crea registro único por usuario

#### `show` - Visualizar Currículum
- URL: `GET /curriculums/:id`
- Muestra información formateada
- Solo el dueño puede verlo

#### `edit` - Editar Currículum
- URL: `GET /curriculums/:id/edit`
- Precarga datos existentes
- Permite cambiar foto

#### `update` - Guardar Cambios
- URL: `PATCH/PUT /curriculums/:id`
- Valida datos antes de guardar

#### `destroy` - Eliminar Currículum
- URL: `DELETE /curriculums/:id`
- Elimina registro y foto

**Parámetros Permitidos:**

```ruby
params.require(:curriculum).permit(
  :first_name, :last_name, :birth_date, :identification,
  :phone_number, :address, :city, :department, :country,
  :profile_description, :available_to_travel, :available_to_relocate,
  :photo, languages: []
)
```

---

## Interfaces de Usuario

### Vista: Registrar/Editar Currículum

**URL:** `/curriculums/new` o `/curriculums/:id/edit`

**Sección: Datos Personales**

Formulario con campos:

#### Información Básica
- **Nombres** - Texto, placeholder "Ej: Juan"
- **Apellidos** - Texto, placeholder "Ej: Pérez García"
- **Fecha de Nacimiento** - Date picker
  - ⚠️ **RESTRICCIÓN:** No se permite menores de 18 años
  - Sistema valida fecha en servidor y muestra errores

#### Información de Identificación
- **Número de Identificación** - Texto (debe ser único)
- **Teléfono** - Formato +57 XXX XXXXXXX

#### Ubicación
- **Dirección de Residencia** - Texto
- **Ciudad** - Texto
- **Departamento/Región** - Texto
- **País** - Texto (default: Colombia)

#### Multimedia y Descripción
- **Foto de Perfil** - File upload (JPEG/PNG, máx 2 MB)
  - Previsualiza foto actual si existe
- **Perfil o Descripción Personal** - Textarea 5 filas
  - Máximo 2000 caracteres

#### Disponibilidad
- **¿Disponibilidad para Viajar?** - Radio (Sí/No)
- **¿Disponibilidad para Cambio de Residencia?** - Radio (Sí/No)

#### Idiomas
- **Idiomas Predefinidos:**
  - ☑ Español
  - ☑ Inglés
- **Otros Idiomas:**
  - Campo de texto para agregar idioma
  - Botón "Agregar" para añadirlo como etiqueta
  - Las etiquetas pueden eliminarse con botón (×)

**Botones:**
- "Registrar Currículum" / "Actualizar Currículum" (verde)
- "Cancelar" (gris)

**Validaciones en Tiempo Real:**
- Errores mostrados al inicio del formulario
- Mensajes específicos por campo

### Vista: Ver Currículum

**URL:** `/curriculums/:id`

**Secciones:**

#### Encabezado
- Título: "Mi Currículum"
- Botones: "Editar" (amarillo), "Volver" (gris)

#### Datos Personales
- Foto circular 150x150px
- Nombre completo, identificación, teléfono
- Fecha de nacimiento con cálculo automático de edad
- Dirección, ciudad, departamento, país
- Insignias para disponibilidades (verde=Sí, rojo=No)

#### Perfil Profesional
- Descripción con saltos de línea preservados

#### Idiomas
- Etiquetas azules con idiomas registrados

#### Información Meta
- Fecha de creación y última actualización

---

## Rutas Implementadas

```ruby
resources :curriculums, only: [:new, :create, :show, :edit, :update, :destroy]
```

**Rutas generadas:**

| Verbo | Ruta | Acción | Nombre de ruta |
|-------|------|--------|----------------|
| GET | `/curriculums/new` | new | `new_curriculum_path` |
| POST | `/curriculums` | create | `curriculums_path` |
| GET | `/curriculums/:id` | show | `curriculum_path(id)` |
| GET | `/curriculums/:id/edit` | edit | `edit_curriculum_path(id)` |
| PATCH | `/curriculums/:id` | update | `curriculum_path(id)` |
| PUT | `/curriculums/:id` | update | `curriculum_path(id)` |
| DELETE | `/curriculums/:id` | destroy | `curriculum_path(id)` |

---

## Base de Datos

### Migración: `CreateCurriculums`

```ruby
create_table :curriculums do |t|
  t.references :user, foreign_key: true, index: { unique: true }
  t.string :first_name, null: false
  t.string :last_name, null: false
  t.date :birth_date, null: false
  t.string :identification, null: false
  t.string :phone_number, null: false
  t.string :address, null: false
  t.string :city, null: false
  t.string :department, null: false
  t.string :country, null: false, default: "Colombia"
  t.text :profile_description
  t.boolean :available_to_travel, default: false
  t.boolean :available_to_relocate, default: false
  t.text :languages, default: "[]"
  t.timestamps
end

add_index :curriculums, :identification, unique: true
add_index :curriculums, :birth_date
```

**Almacenamiento de Foto:**
- Usa Active Storage
- Se almacena en `storage/` (desarrollo) o cloud (producción)
- Archivo vinculado a través de `has_one_attached :photo`

---

## Funcionalidad de Idiomas

### Idiomas Predefinidos

```html
<!-- Checkboxes con valores fijos -->
<input type="checkbox" name="curriculum[languages][]" value="Español">
<input type="checkbox" name="curriculum[languages][]" value="Inglés">
```

### Agregar Idiomas Personalizados

**Implementación JavaScript:**

```javascript
// Campo de texto + botón "Agregar"
document.getElementById('add-language-btn').addEventListener('click', (e) => {
  const language = document.getElementById('new-language').value.trim();
  // Crear etiqueta con botón × para eliminar
  // Actualizar hidden input con valores
});

// Permitir Enter para agregar
document.getElementById('new-language').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    document.getElementById('add-language-btn').click();
  }
});
```

**Almacenamiento:**

Los idiomas se almacenan como JSON array en la base de datos:

```json
["Español", "Inglés", "Portugués", "Francés"]
```

---

## Validación de Edad (18+ años)

### Restricción Implementada

**Validación en Modelo:**

```ruby
validate :must_be_at_least_18_years_old

def must_be_at_least_18_years_old
  return unless birth_date.present?
  age = calculate_age
  if age < 18
    errors.add(:birth_date, "debes ser mayor de 18 años para registrar tu currículum")
  end
end
```

**Comportamiento:**

1. Usuario ingresa fecha de nacimiento
2. Sistema calcula edad al momento del registro
3. Si edad < 18: ERROR mostrado en formulario
4. Si edad ≥ 18: Permite guardar

**Cálculo de Edad:**

Considera años bisiestos y fecha exacta del nacimiento:

```ruby
def calculate_age
  today = Date.today
  age = today.year - birth_date.year
  # Restar 1 si aún no ha cumplido años este año
  age -= 1 if today.month < birth_date.month || 
             (today.month == birth_date.month && today.day < birth_date.day)
  age
end
```

---

## Flujos de Operación

### Registrar Currículum Inicial

```
Aspirante
    ↓
Navega a /
    ↓
Click "Registrar currículum"
    ↓
Completa formulario con Datos Personales
    ↓
- Ingresa fecha de nacimiento
- Sistema valida edad ≥ 18
    ↓
    Si edad < 18:
      └─ Muestra error: "Debes ser mayor de 18 años..."
      └─ Permanece en formulario
    
    Si edad ≥ 18:
      ├─ Carga foto (opcional)
      ├─ Ingresa idiomas
      └─ Click "Registrar Currículum"
         └─ Guarda en BD
         └─ Redirige a /curriculums/:id
         └─ Muestra: "Currículum registrado correctamente."
```

### Editar Currículum

```
Aspirante
    ↓
En /curriculums/:id
    ↓
Click "Editar"
    ↓
Formulario precargado con datos actuales
    ↓
Modifica campos
    ↓
Sube nueva foto (opcional)
    ↓
Click "Actualizar Currículum"
    ↓
Si válido:
  └─ Guarda cambios
  └─ Redirige a /curriculums/:id
  └─ Muestra: "Currículum actualizado correctamente."

Si inválido:
  └─ Muestra errores
  └─ Mantiene datos ingresados
```

---

## Integración con Página de Inicio

### Para Aspirantes

**Sin Currículum:**
```
Home muestra:
┌─────────────────────────┐
│ Registrar Currículum    │
│ Crea tu currículum para │
│ participar en procesos. │
│ [Registrar currículum]  │
└─────────────────────────┘
```

**Con Currículum:**
```
Home muestra:
┌─────────────────────────┐
│ Mi Currículum           │
│ Visualiza y edita tu    │
│ currículum registrado.  │
│ [Ver mi currículum]     │
└─────────────────────────┘
```

---

## Seguridad Implementada

### Autenticación
- ✅ `authenticate_user!` - Requiere login
- ✅ Devise maneja sesiones

### Autorización
- ✅ `authorize_aspirant!` - Solo aspirantes
- ✅ Validación de propiedad: Solo dueño del currículum
- ✅ Previene acceso a currículums de otros

### Validaciones
- ✅ Edad mínima 18 años (lado servidor)
- ✅ Campos requeridos
- ✅ Formatos válidos (email, teléfono)
- ✅ Identificación única
- ✅ Tamaño de archivo máximo 2 MB
- ✅ Tipos MIME: JPEG/PNG

### Datos Sensibles
- ✅ Identificación, teléfono, dirección - visibles solo para dueño
- ✅ Foto optimizada y validada
- ✅ Descripción limitada a 2000 caracteres

---

## Archivos Creados/Modificados

**Creados:**
- ✅ `app/models/curriculum.rb`
- ✅ `app/controllers/curriculums_controller.rb`
- ✅ `app/views/curriculums/new.html.erb`
- ✅ `app/views/curriculums/edit.html.erb`
- ✅ `app/views/curriculums/show.html.erb`
- ✅ `app/views/curriculums/_form.html.erb`
- ✅ `db/migrate/20251203160011_create_curriculums.rb`

**Modificados:**
- ✅ `app/models/user.rb` - Agregada relación has_one :curriculum
- ✅ `config/routes.rb` - Agregadas rutas de curriculum
- ✅ `app/views/pages/home.html.erb` - Agregados enlaces para aspirantes

---

## Testing Manual

### Como Aspirante Menor de 18 años:

1. Crea cuenta con email: `joven@example.com`
2. Navega a `/curriculums/new`
3. Completa todos los campos
4. Ingresa fecha de nacimiento: 2010-01-01 (14 años)
5. Click "Registrar Currículum"
6. ✅ **Resultado esperado:** Error mostrado: "Fecha de nacimiento debes ser mayor de 18 años para registrar tu currículum"

### Como Aspirante Mayor de 18 años:

1. Crea cuenta con email: `adulto@example.com`
2. Navega a `/curriculums/new`
3. Ingresa todos los datos
4. Fecha de nacimiento: 1995-06-15 (29 años)
5. Click "Registrar Currículum"
6. ✅ **Resultado esperado:**
   - Currículum guardado
   - Redirige a vista show
   - Mensaje: "Currículum registrado correctamente."

### Editar Foto:

1. Currículum registrado
2. Click "Editar"
3. Selecciona archivo > archivo mayor a 2 MB
4. Click "Actualizar"
5. ✅ **Error:** "Foto debe ser menor a 2 MB"

### Idiomas Personalizados:

1. En formulario
2. Check: Español, Inglés
3. Campo "Otros idiomas": escribir "Portugués"
4. Click "Agregar"
5. ✅ **Resultado:** Etiqueta azul "Portugués" aparece
6. Repetir con: "Francés", "Alemán"
7. Click "Registrar"
8. En vista show, aparecen todos los idiomas

