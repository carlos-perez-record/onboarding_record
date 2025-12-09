# Buenas Prácticas del Proyecto Onboarding Record

**Fecha de creación:** 9 de diciembre de 2025  
**Proyecto:** Sistema de Gestión de Currículums con Rails 8.1.1  
**Stack:** Ruby 3.2.2, PostgreSQL, Hotwire (Turbo + Stimulus)

---

## 📋 Índice

1. [Buenas Prácticas de CSS](#buenas-prácticas-de-css)
2. [Buenas Prácticas de JavaScript](#buenas-prácticas-de-javascript)
3. [Buenas Prácticas de MVC](#buenas-prácticas-de-mvc)
4. [Buenas Prácticas de UX](#buenas-prácticas-de-ux)
5. [Convenciones de Rails](#convenciones-de-rails)
6. [Gemas Instaladas](#gemas-instaladas)
7. [Arquitectura del Proyecto](#arquitectura-del-proyecto)

---

## 🎨 Buenas Prácticas de CSS

### Principios
- ✅ **Evitar estilos inline** en las vistas
- ✅ **Crear archivos CSS organizados y modulares**
- ✅ **Usar clases reutilizables**
- ✅ **Separar estilos por componentes/secciones**

### Estructura Recomendada
```
app/assets/stylesheets/
├── application.css        # Punto de entrada
├── base/
│   ├── reset.css         # Normalización
│   └── typography.css    # Tipografía base
├── components/
│   ├── buttons.css
│   ├── forms.css
│   └── cards.css
├── layouts/
│   ├── header.css
│   └── footer.css
└── pages/
    ├── curriculums.css
    └── home.css
```

### Estado Actual
- ⚠️ **Pendiente de refactorización:** Actualmente hay estilos inline en `_form.html.erb`
- 📝 **Próxima tarea:** Extraer estilos a `app/assets/stylesheets/curriculums.css`

---

## ⚡ Buenas Prácticas de JavaScript

### Principios
- ✅ **Usar StimulusJS** (incluido en Rails) para manejar interactividad de forma declarativa
- ✅ **Dividir el código en controladores modulares** (no archivos monolíticos)
- ✅ **Evitar duplicación de lógica**
- ✅ **Sintaxis declarativa** con `data-controller`, `data-target`, `data-action`

### Estructura de Controladores Stimulus

#### 1. Controlador de Ubicación (`location_controller.js`)
**Responsabilidad:** Manejo de cascading dropdowns (País → Departamento → Ciudad)

```javascript
// Uso en la vista:
<div data-controller="location">
  <select data-location-target="country" 
          data-action="change->location#countryChanged">
    <!-- opciones -->
  </select>
  <div data-location-target="departmentContainer"></div>
  <div data-location-target="cityContainer"></div>
</div>
```

**Características:**
- Contiene datos de 195 países
- 10 países con departamentos/regiones
- 27 departamentos colombianos con ~500 ciudades
- Genera dinámicamente selects o inputs según disponibilidad de datos

#### 2. Controlador de Idiomas (`languages_controller.js`)
**Responsabilidad:** Agregar/eliminar idiomas dinámicamente

```javascript
// Uso en la vista:
<div data-controller="languages">
  <input data-languages-target="input" type="text">
  <button data-action="click->languages#addLanguage">Agregar</button>
  <div data-languages-target="container">
    <!-- idiomas agregados -->
  </div>
</div>
```

**Características:**
- Crea inputs hidden con `curriculum[languages][]`
- Agrega botones de eliminación a cada idioma
- Limpia el input después de agregar

#### 3. Controlador de Estudios (`studies_controller.js`)
**Responsabilidad:** Gestión de estudios académicos

```javascript
// Uso en la vista:
<div data-controller="studies">
  <select data-studies-target="educationLevel"
          data-action="change->studies#educationLevelChanged">
  </select>
  <button data-studies-target="button"
          data-action="click->studies#addStudy">
    + Agregar Estudio
  </button>
  <div data-studies-target="container">
    <!-- estudios agregados -->
  </div>
</div>
```

**Características:**
- Habilita botón solo si nivel ≠ 'ninguno'
- Crea campos con estructura `curriculum[studies_attributes][timestamp][field]`
- Incluye campos: institution, status, start_date, end_date, title
- Botón de eliminar por cada estudio

### Migración Realizada
**Antes (Vanilla JS):**
- ❌ Un archivo monolítico `curriculum_form.js` de 309 líneas
- ❌ Uso de IDs personalizados no estándar
- ❌ Código acoplado a una sola vista

**Después (Stimulus):**
- ✅ 3 controladores independientes (~250 líneas total)
- ✅ Uso de IDs generados por Rails
- ✅ Código reutilizable en múltiples vistas
- ✅ Sintaxis declarativa visible en HTML

---

## 🏗️ Buenas Prácticas de MVC

### Principios
- ✅ **Separar lógica de presentación**
- ✅ **No JS/CSS embebido en vistas**
- ✅ **Usar helpers para lógica de vista**
- ✅ **Modelos para validaciones y lógica de negocio**

### Patrón MVC Aplicado

#### Modelos
```ruby
# app/models/curriculum.rb
class Curriculum < ApplicationRecord
  # Relaciones
  belongs_to :user
  has_many :studies, dependent: :destroy
  has_one_attached :photo
  
  # Nested attributes
  accepts_nested_attributes_for :studies, allow_destroy: true, reject_if: :all_blank
  
  # Validaciones
  validates :first_name, :last_name, presence: true, length: { minimum: 2, maximum: 50 }
  validates :identification, presence: true, uniqueness: true
  validates :education_level, inclusion: { in: %w[ninguno primaria secundaria tecnico tecnologico profesional posgrado] }
  
  # Validaciones personalizadas
  validate :must_be_at_least_18_years_old
  validate :validate_photo
end
```

#### Controladores
- Delgados, solo orquestación
- Lógica compleja en modelos o servicios

#### Vistas
- Solo presentación
- Helpers para lógica de presentación
- Sin lógica de negocio

---

## 🎯 Buenas Prácticas de UX

### 1. Feedback Inmediato
**Objetivos:**
- ✅ Usar Turbo Frames y Turbo Streams para actualizaciones sin recargar página
- ✅ Añadir indicadores de carga en acciones críticas

**Estado:** ⏳ Pendiente de implementación

**Propuesta:**
```erb
<!-- Indicador de carga en botón submit -->
<%= form.submit "Registrar Currículum", 
    data: { turbo_submits_with: "Guardando..." },
    class: "btn btn-primary" %>

<!-- Turbo Frame para actualización parcial -->
<%= turbo_frame_tag "languages" do %>
  <!-- contenido dinámico de idiomas -->
<% end %>
```

### 2. Validaciones en Tiempo Real
**Objetivos:**
- ✅ Combinar validaciones del modelo con JS
- ✅ Mostrar errores antes de enviar formulario

**Estado:** ⏳ Pendiente de implementación

**Propuesta:**
- Crear `validation_controller.js` en Stimulus
- Validar en evento `blur` o `input`
- Replicar exactamente las validaciones del modelo

**Riesgo:** MEDIO - Las validaciones JS deben coincidir 100% con las del modelo

### 3. Accesibilidad
**Objetivos:**
- ✅ Usar etiquetas semánticas (`<label>`, `aria-*`)
- ✅ Formularios navegables con teclado
- ✅ Indicadores visuales de campos requeridos

**Estado:** ⏳ Pendiente de implementación

**Propuesta:**
```erb
<!-- Campos con accesibilidad -->
<%= form.label :first_name, "Nombre(s)" %>
<%= form.text_field :first_name, 
    required: true,
    aria: { required: "true", describedby: "first_name_hint" } %>
<small id="first_name_hint">Mínimo 2 caracteres</small>

<!-- Mensajes de error accesibles -->
<div role="alert" aria-live="polite" class="error-message">
  <%= message %>
</div>
```

---

## 🛤️ Convenciones de Rails

### IDs Generados Automáticamente
Rails genera IDs con el patrón `model_attribute`:

```erb
<%= form.select :country %>
<!-- Genera: id="curriculum_country" -->

<%= form.text_field :first_name %>
<!-- Genera: id="curriculum_first_name" -->
```

**Lección aprendida:**
- ❌ No usar `id:` personalizado en form helpers
- ✅ Dejar que Rails genere IDs estándar
- ✅ JavaScript debe usar estos IDs: `getElementById('curriculum_country')`

### Nested Attributes
Para modelos anidados (has_many), usar `_attributes`:

```ruby
# Modelo
accepts_nested_attributes_for :studies, allow_destroy: true

# Parámetros permitidos en controlador
params.require(:curriculum).permit(
  studies_attributes: [:id, :institution, :title, :_destroy]
)

# HTML generado
name="curriculum[studies_attributes][0][institution]"
```

### Internacionalización (i18n)
Traducir nombres de campos en `config/locales/es.yml`:

```yaml
es:
  activerecord:
    models:
      curriculum: "Currículum"
      study: "Estudio"
    attributes:
      curriculum:
        first_name: "Nombre(s)"
        last_name: "Apellidos"
        education_level: "Nivel de estudios"
      study:
        institution: "Institución"
        title: "Título"
```

**Beneficio:** Mensajes de error automáticamente en español:
- "Nombre(s) no puede estar en blanco" ✅
- En lugar de: "First name can't be blank" ❌

---

## 📦 Gemas Instaladas

### Autenticación y Seguridad
- **devise** - Sistema de autenticación completo
- **bcrypt** - Encriptación de passwords
- **email_validator** - Validación de formatos de email
- **brakeman** - Análisis de seguridad estática
- **bundler-audit** - Detectar gemas con vulnerabilidades

### Frontend (Hotwire Stack)
- **turbo-rails** - Navegación SPA sin JavaScript
- **stimulus-rails** - Framework JS modular y declarativo
- **importmap-rails** - Gestión de módulos JS sin bundler
- **propshaft** - Asset pipeline moderno

### Procesamiento de Archivos
- **image_processing** - Redimensionar y optimizar imágenes con Active Storage

### Infraestructura
- **puma** - Servidor web de alto rendimiento
- **solid_cache** - Cache respaldado por base de datos
- **solid_queue** - Background jobs sin Redis
- **solid_cable** - WebSockets sin Redis
- **kamal** - Deployment con Docker
- **thruster** - Compresión HTTP y caching

### Desarrollo
- **letter_opener** - Previsualizar emails en desarrollo
- **letter_opener_web** - UI web para emails
- **web-console** - Consola en páginas de error
- **debug** - Debugging avanzado

### Testing
- **capybara** - Testing de sistema
- **selenium-webdriver** - Testing de browser

### Código Limpio
- **rubocop-rails-omakase** - Estilo de código Ruby recomendado

---

## 🏛️ Arquitectura del Proyecto

### Estructura de Archivos JavaScript

```
app/javascript/
├── application.js              # Punto de entrada
└── controllers/
    ├── location_controller.js  # Cascading dropdowns
    ├── languages_controller.js # Gestión de idiomas
    └── studies_controller.js   # Gestión de estudios
```

### Configuración de Importmap

```ruby
# config/importmap.rb
pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
```

### Estructura del Formulario de Currículum

```
_form.html.erb (295 líneas)
├── Datos Personales (fieldset)
│   ├── Foto de perfil
│   ├── Nombre y apellido
│   ├── Fecha de nacimiento
│   ├── Identificación
│   ├── Teléfono
│   ├── Dirección
│   ├── Ubicación (data-controller="location")
│   │   ├── País (select con 195 opciones)
│   │   ├── Departamento (dinámico)
│   │   └── Ciudad (dinámico)
│   ├── Perfil/Descripción
│   ├── Disponibilidad viajes (radio)
│   ├── Disponibilidad cambio residencia (radio)
│   └── Idiomas (data-controller="languages")
│       ├── Español (checkbox)
│       ├── Inglés (checkbox)
│       └── Otros idiomas (dinámico)
└── Información Académica (data-controller="studies")
    ├── Nivel de estudios (select)
    ├── Botón Agregar Estudio
    └── Contenedor de estudios (dinámico)
```

---

## 📝 Commits Importantes

### Refactorización a Stimulus JS
```
Commit: 57a61c4
Título: refactor: migrar JavaScript vanilla a Stimulus JS

Cambios:
- Crear 3 controladores Stimulus independientes
- Actualizar vista con sintaxis declarativa
- Eliminar curriculum_form.js (309 líneas)
- Actualizar importmap.rb
```

### Corrección de Validaciones
```
Commit: bc4ab20
Título: fix: corregir valores del select de nivel de estudios

Problema: Education level no está incluido en la lista
Solución: Alinear valores del select con validación del modelo
- ['Técnico', 'tecnico'] en lugar de ['Técnico', 'Técnico']
```

### Internacionalización
```
Commit: 0e7eb65
Título: feat: agregar traducciones al español para campos

Cambios:
- Agregar traducciones en config/locales/es.yml
- 15 campos de Curriculum traducidos
- 5 campos de Study traducidos
```

---

## 🚀 Próximos Pasos Propuestos

### Fase 1: UX Inmediato (Riesgo Bajo) 🟢
- [ ] Agregar indicadores de carga en botón submit
- [ ] Agregar `data-turbo-submits-with` en formularios
- [ ] Agregar tooltips a campos complejos
- [ ] Mejorar mensajes de error inline

### Fase 2: Accesibilidad (Riesgo Bajo) 🟢
- [ ] Agregar atributos `aria-*` a campos obligatorios
- [ ] Marcar campos requeridos con `*` visual
- [ ] Agregar `role="alert"` a mensajes de error
- [ ] Mejorar navegación por teclado en elementos dinámicos

### Fase 3: Validaciones en Tiempo Real (Riesgo Medio) 🟡
- [ ] Crear `validation_controller.js`
- [ ] Validar formato de teléfono en blur
- [ ] Validar edad mínima (18 años) en birth_date
- [ ] Validar longitud de identificación
- [ ] Mostrar feedback visual (✓ / ✗)

### Fase 4: Turbo Frames (Riesgo Alto) 🔴
- [ ] Refactorizar sección de idiomas con Turbo Frames
- [ ] Refactorizar sección de estudios con Turbo Frames
- [ ] Actualizar controladores Stimulus para compatibilidad Turbo
- [ ] Testing exhaustivo de interacciones

### Fase 5: Extraer Estilos (Riesgo Bajo) 🟢
- [ ] Crear `app/assets/stylesheets/curriculums.css`
- [ ] Extraer estilos inline a clases CSS
- [ ] Organizar estilos por componentes
- [ ] Usar variables CSS para colores/espaciados

---

## 📚 Referencias

### Documentación Oficial
- [Stimulus Handbook](https://stimulus.hotwired.dev/handbook/introduction)
- [Turbo Handbook](https://turbo.hotwired.dev/handbook/introduction)
- [Rails Guides - Active Record Validations](https://guides.rubyonrails.org/active_record_validations.html)
- [Rails Guides - Nested Attributes](https://guides.rubyonrails.org/form_helpers.html#nested-forms)
- [Rails Guides - i18n](https://guides.rubyonrails.org/i18n.html)

### Convenciones Rails
- IDs generados: `model_attribute`
- Nested attributes: `model[association_attributes][index][field]`
- Traducciones: `activerecord.attributes.model.field`

---

## 🔍 Lecciones Aprendidas

### 1. IDs de Rails
**Problema:** Custom IDs (`id: "country-select"`) no funcionaban correctamente.

**Solución:** Dejar que Rails genere IDs automáticamente (`curriculum_country`).

**Razón:** Rails helpers generan IDs consistentes que JavaScript puede usar de forma predecible.

### 2. Nested Attributes
**Problema:** Estudios dinámicos no se guardaban.

**Solución:** Usar `studies_attributes` en lugar de `studies` en nombres de campos.

**Razón:** `accepts_nested_attributes_for` espera este formato específico.

### 3. Valores de Select vs Validaciones
**Problema:** "Education level no está incluido en la lista"

**Solución:** Los valores del select (`value`) deben coincidir exactamente con la validación del modelo.

```ruby
# Vista
['Técnico', 'tecnico']  # Label, Value

# Modelo
validates :education_level, inclusion: { in: %w[tecnico ...] }
```

### 4. Stimulus vs Vanilla JS
**Ventajas de Stimulus:**
- ✅ Código más modular y reutilizable
- ✅ Sintaxis declarativa (HTML muestra comportamiento)
- ✅ Mejor testeable
- ✅ Convención sobre configuración
- ✅ Integración perfecta con Turbo

**Cuándo usar cada uno:**
- **Stimulus:** Interacciones complejas, formularios, componentes reutilizables
- **Vanilla JS:** Scripts de una sola vez, muy simples

---

## 👥 Equipo y Contacto

**Desarrollador Principal:** Carlos Pérez  
**Proyecto:** Onboarding Record  
**Repositorio:** carlos-perez-record/onboarding_record  
**Versión Rails:** 8.1.1  
**Versión Ruby:** 3.2.2  

---

**Última actualización:** 9 de diciembre de 2025
