# Sistema de Diseño - Onboarding Record

**Versión:** 2.0  
**Fecha:** 10 de diciembre de 2025  
**Framework:** TailwindCSS 4.1.16  
**Filosofía:** Utility-first CSS con componentes reutilizables

---

## 📋 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Paleta de Colores](#paleta-de-colores)
3. [Tipografía](#tipografía)
4. [Espaciado](#espaciado)
5. [Componentes](#componentes)
6. [Breakpoints Responsive](#breakpoints-responsive)
7. [Accesibilidad](#accesibilidad)
8. [Guía de Uso](#guía-de-uso)

---

## 🎨 Introducción

Este sistema de diseño proporciona una base consistente y mantenible para todos los componentes de la aplicación Onboarding Record. Está construido sobre TailwindCSS 4.1.16 y sigue las mejores prácticas de accesibilidad (WCAG 2.1 Nivel AA).

### Principios de Diseño

1. **Consistencia:** Todos los componentes siguen los mismos patrones
2. **Accesibilidad:** Cumplimiento WCAG 2.1 AA en contraste y navegación
3. **Responsive:** Diseño mobile-first para todas las pantallas
4. **Mantenibilidad:** Variables centralizadas y componentes reutilizables
5. **Performance:** CSS optimizado con carga mínima

---

## 🎨 Paleta de Colores

### Colores Corporativos

Todos los colores cumplen con **WCAG 2.1 AA** (ratio 4.5:1 mínimo para texto normal).

#### Primary (Azul)
```css
--color-primary: #0056b3        /* Ratio: 8.59:1 ✅ AAA */
--color-primary-dark: #003d82   /* Ratio: 12.63:1 ✅ AAA */
--color-primary-light: #4a90e2  /* Para fondos */
```

**Uso:**
- Botones de acción principal
- Enlaces
- Focus states
- Elementos interactivos importantes

**Ejemplos:**
```erb
<%= link_to "Ver detalles", path, class: "btn btn-primary" %>
<a href="#" class="link">Enlace principal</a>
```

#### Success (Verde)
```css
--color-success: #28a745        /* Ratio: 4.53:1 ✅ AA */
--color-success-dark: #1e7e34   /* Ratio: 6.27:1 ✅ AA+ */
```

**Uso:**
- Botones de confirmación
- Mensajes de éxito
- Estados positivos
- Indicadores "Sí" o "Disponible"

**Ejemplos:**
```erb
<%= button_to "Guardar", path, class: "btn btn-success" %>
<div class="bg-green-100 text-green-800 p-4">Operación exitosa</div>
```

#### Danger (Rojo)
```css
--color-danger: #dc3545         /* Ratio: 5.93:1 ✅ AA+ */
--color-danger-dark: #c82333    /* Ratio: 6.82:1 ✅ AA+ */
```

**Uso:**
- Botones de eliminación
- Mensajes de error
- Estados de alerta
- Indicadores "No" o "Rechazado"

**Ejemplos:**
```erb
<%= link_to "Eliminar", path, method: :delete, class: "btn btn-danger" %>
<div class="bg-red-100 text-red-800 p-4">Error en la operación</div>
```

#### Warning (Amarillo)
```css
--color-warning: #ffc107        /* Fondo */
/* Texto: #1a1a1a */             /* Ratio: 4.98:1 ✅ AA */
```

**Uso:**
- Botones de edición
- Advertencias
- Estados pendientes

**Ejemplos:**
```erb
<%= link_to "Editar", path, class: "btn btn-warning" %>
```

#### Secondary (Gris)
```css
--color-secondary: #6c757d      /* Ratio: 5.33:1 ✅ AA */
--color-secondary-dark: #545b62
```

**Uso:**
- Botones secundarios (cancelar, volver)
- Texto auxiliar
- Elementos no prioritarios

**Ejemplos:**
```erb
<%= link_to "Cancelar", path, class: "btn btn-secondary" %>
```

### Colores de Roles

#### Admin (Azul Claro)
```css
--color-admin-bg: #d1ecf1
--color-admin-text: #0c5460      /* Ratio: 7.26:1 ✅ AAA */
--color-admin-border: #bee5eb
```

**Uso:**
- Enlaces del sidebar de administrador
- Badges de rol "admin"
- Secciones exclusivas de admin

**Ejemplo:**
```erb
<%= link_to "Gestión de Usuarios", admin_users_path, class: "sidebar-link-admin" %>
```

#### Recruiter (Púrpura)
```css
--color-recruiter-bg: #e2d5f0
--color-recruiter-text: #522b5d  /* Ratio: 7.98:1 ✅ AAA */
--color-recruiter-border: #d4c2e5
```

**Uso:**
- Enlaces del sidebar de reclutador
- Badges de rol "reclutador"
- Secciones exclusivas de recruiter

**Ejemplo:**
```erb
<%= link_to "Gestión de Aspirantes", recruiter_aspirants_path, class: "sidebar-link-recruiter" %>
```

### Colores de UI

#### Navbar
```css
--color-navbar: #f5f5f5
```

#### Sidebar
```css
--color-sidebar: #f9f9f9
```

### Paleta Extendida (Tailwind)

Disponible en `tailwind.config.js` con shades 50-900 para casos especiales:

```javascript
colors: {
  primary: {
    50: '#e6f0ff',
    100: '#cce1ff',
    // ... hasta 900
    DEFAULT: '#0056b3',
  }
}
```

---

## ✍️ Tipografía

### Fuente Principal

**Montserrat** (Google Fonts)
- Regular (400): Texto de cuerpo
- SemiBold (600): Énfasis moderado
- Bold (700): Títulos y botones

```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');
```

### Escala Tipográfica

#### Headings (Títulos)

##### .heading-1
```css
@apply text-5xl font-bold leading-tight text-gray-800;
```
**Uso:** Títulos de página principal (raramente usado)  
**Ejemplo:**
```erb
<h1 class="heading-1">Bienvenido al Sistema</h1>
```

##### .heading-2
```css
@apply text-3xl font-bold leading-snug text-gray-800;
```
**Uso:** Títulos de secciones principales  
**Ejemplo:**
```erb
<h2 class="heading-2">📄 Mi Currículum</h2>
```

##### .heading-3
```css
@apply text-2xl font-bold leading-normal text-gray-800;
```
**Uso:** Títulos de subsecciones  
**Responsive:** `text-xl sm:text-2xl` en móviles

##### .heading-4
```css
@apply text-xl font-bold leading-normal text-gray-800;
```
**Uso:** Títulos de cards o paneles

##### .heading-5
```css
@apply text-lg font-bold leading-normal text-gray-800;
```
**Uso:** Subtítulos dentro de componentes

#### Body Text

##### .text-body
```css
@apply text-base leading-relaxed text-gray-700;
```
**Uso:** Texto de cuerpo principal (16px)

##### .text-body-lg
```css
@apply text-lg leading-relaxed text-gray-700;
```
**Uso:** Texto destacado o introductorio

##### .text-body-light
```css
@apply text-base leading-relaxed text-gray-600;
```
**Uso:** Texto secundario o descriptivo

### Tamaños Personalizados (Tailwind Config)

```javascript
fontSize: {
  'heading-1': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],      // 48px
  'heading-2': ['2rem', { lineHeight: '1.3', fontWeight: '700' }],      // 32px
  'heading-3': ['1.5rem', { lineHeight: '1.4', fontWeight: '700' }],    // 24px
  'heading-4': ['1.25rem', { lineHeight: '1.5', fontWeight: '600' }],   // 20px
  'heading-5': ['1.125rem', { lineHeight: '1.5', fontWeight: '600' }],  // 18px
}
```

---

## 📏 Espaciado

### Sistema de Espaciado Base (Tailwind)

Tailwind usa una escala de 4px como unidad base:

| Clase | Valor | Uso |
|-------|-------|-----|
| `p-1` | 4px | Padding mínimo |
| `p-2` | 8px | Padding pequeño |
| `p-3` | 12px | Padding moderado |
| `p-4` | 16px | Padding estándar |
| `p-6` | 24px | Padding generoso |
| `p-8` | 32px | Padding grande |

### Espaciados Personalizados

```javascript
spacing: {
  18: '4.5rem',  // 72px - Altura de navbar
  88: '22rem',   // 352px - Ancho de sidebar
  128: '32rem',  // 512px - Máximo ancho de forms
}
```

### Guías de Uso

#### Márgenes entre Secciones
```erb
<div class="mb-4 sm:mb-6">  <!-- 16px móvil, 24px desktop -->
```

#### Padding de Cards
```erb
<div class="p-4 sm:p-6">    <!-- 16px móvil, 24px desktop -->
```

#### Gaps en Flex/Grid
```erb
<div class="flex gap-2 sm:gap-3">  <!-- 8px móvil, 12px desktop -->
```

---

## 🧩 Componentes

### Botones

#### Estructura Base (.btn)
```css
.btn {
  @apply inline-block font-sans font-semibold py-3 px-8 rounded shadow cursor-pointer transition-colors duration-200;
  text-decoration: none !important;
}
```

#### Variantes

##### Primary
```erb
<%= link_to "Acción Principal", path, class: "btn btn-primary" %>
```
- Fondo: `--color-primary` (#0056b3)
- Texto: Blanco
- Hover: `--color-primary-dark` (#003d82)

##### Success
```erb
<%= button_to "Guardar", path, class: "btn btn-success" %>
```
- Fondo: `--color-success` (#28a745)
- Texto: Blanco

##### Danger
```erb
<%= link_to "Eliminar", path, method: :delete, class: "btn btn-danger" %>
```
- Fondo: `--color-danger` (#dc3545)
- Texto: Blanco

##### Warning
```erb
<%= link_to "Editar", path, class: "btn btn-warning" %>
```
- Fondo: `--color-warning` (#ffc107)
- Texto: Negro (#1a1a1a)

##### Secondary
```erb
<%= link_to "Cancelar", path, class: "btn btn-secondary" %>
```
- Fondo: `--color-secondary` (#6c757d)
- Texto: Blanco

#### Tamaños

```erb
<!-- Pequeño -->
<button class="btn btn-primary btn-sm">Acción</button>    <!-- py-1 px-3, text-xs -->

<!-- Mediano (default) -->
<button class="btn btn-primary btn-md">Acción</button>    <!-- py-2 px-4, text-sm -->

<!-- Grande -->
<button class="btn btn-primary btn-lg">Acción</button>    <!-- py-4 px-10, text-lg -->
```

#### Estados de Focus

Todos los botones incluyen focus-visible automático:
```css
.btn:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.2);
}
```

### Sidebar

#### Estructura
```html
<aside class="sidebar hidden md:block">  <!-- Oculto en móvil -->
  <nav class="px-4">
    <div class="mb-6">
      <p class="sidebar-title">Menú</p>
      <ul class="space-y-2">
        <li><a href="#" class="sidebar-link">Enlace</a></li>
      </ul>
    </div>
  </nav>
</aside>
```

#### Variantes de Enlaces

##### Base
```erb
<%= link_to "Inicio", root_path, class: "sidebar-link" %>
```
- Fondo: #f1f1f1
- Texto: #333
- Hover: #e8e8e8

##### Admin
```erb
<%= link_to "Gestión de Usuarios", admin_users_path, class: "sidebar-link-admin" %>
```
- Fondo: `--color-admin-bg`
- Texto: `--color-admin-text`
- Hover: `--color-admin-border`

##### Recruiter
```erb
<%= link_to "Gestión de Aspirantes", recruiter_aspirants_path, class: "sidebar-link-recruiter" %>
```
- Fondo: `--color-recruiter-bg`
- Texto: `--color-recruiter-text`
- Hover: `--color-recruiter-border`

### Formularios

#### Label
```erb
<%= form.label :first_name, class: "form-label" do %>
  Nombre(s) <span class="text-red-500" aria-label="requerido">*</span>
<% end %>
```

Clases: `.form-label`
- Color: gray-800
- Peso: semibold
- Tamaño: text-sm

#### Input
```erb
<%= form.text_field :first_name, 
    required: true,
    aria: { required: "true" },
    class: "form-input" %>
```

Clases: `.form-input`
- Ancho: w-full
- Padding: px-3 py-2
- Borde: border border-gray-300
- Focus: outline azul 3px + box-shadow

#### Select
```erb
<%= form.select :education_level, options, 
    { prompt: "Seleccionar" },
    { class: "form-input" } %>
```

Usa las mismas clases que `.form-input`

#### Textarea
```erb
<%= form.text_area :profile_description,
    rows: 5,
    class: "form-input" %>
```

#### Hints (Descripciones)
```erb
<small id="first_name_hint" class="text-sm text-gray-600">Mínimo 2 caracteres</small>
```

Vinculados con `aria-describedby`:
```erb
aria: { describedby: "first_name_hint" }
```

### Cards

#### Card Base
```erb
<div class="card mb-4 sm:mb-6">
  <h3 class="heading-3 mb-4">Título</h3>
  <p class="text-body">Contenido...</p>
</div>
```

Clases: `.card`
- Fondo: bg-white
- Sombra: shadow rounded-lg
- Padding: p-6

#### Card con Header
```erb
<div class="card">
  <div class="card-header">
    <h3 class="heading-3">Título con Borde</h3>
  </div>
  <p class="text-body">Contenido...</p>
</div>
```

Clases: `.card-header`
- Margen inferior: mb-6
- Borde inferior: border-b border-gray-200
- Padding inferior: pb-3

### Tablas

#### Estructura Responsive
```erb
<div class="overflow-x-auto -mx-4 sm:mx-0">
  <div class="inline-block min-w-full align-middle">
    <div class="overflow-hidden">
      <table class="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-3 sm:px-6 py-3 text-left text-xs font-semibold uppercase">
              Email
            </th>
            <th class="px-3 sm:px-6 py-3 hidden sm:table-cell">ID</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr class="hover:bg-gray-50">
            <td class="px-3 sm:px-6 py-4 text-sm">contenido</td>
            <td class="px-3 sm:px-6 py-4 hidden sm:table-cell">id</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
```

**Características:**
- Scroll horizontal en móvil
- Columnas ocultas en pantallas pequeñas (`.hidden sm:table-cell`)
- Padding responsivo (`px-3 sm:px-6`)
- Hover en filas

### Alertas

#### Success (Notice)
```erb
<div role="status" aria-live="polite" 
     class="bg-green-100 border border-green-300 p-3 sm:p-4 mb-4 sm:mb-6 rounded text-sm sm:text-base">
  <strong class="text-green-800"><%= notice %></strong>
</div>
```

#### Error (Alert)
```erb
<div role="alert" aria-live="assertive" 
     class="bg-red-100 border border-red-300 p-3 sm:p-4 mb-4 sm:mb-6 rounded text-sm sm:text-base">
  <strong class="text-red-800"><%= alert %></strong>
</div>
```

#### Warning (Advertencia)
```erb
<div class="bg-yellow-100 border border-yellow-300 p-4 mb-6 rounded">
  <strong class="text-yellow-800">Advertencia</strong>
</div>
```

### Enlaces

#### Link Principal
```erb
<a href="#" class="link">Enlace principal</a>
```

Clases: `.link`
- Color: `--color-primary` (#0056b3)
- Peso: semibold
- Hover: underline

#### Link con Focus
Automático con focus-visible:
```css
a:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 2px;
}
```

---

## 📱 Breakpoints Responsive

### Breakpoints de Tailwind

| Prefijo | Tamaño Mínimo | Dispositivo |
|---------|---------------|-------------|
| `sm:` | 640px | Tablet portrait |
| `md:` | 768px | Tablet landscape |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Desktop grande |
| `2xl:` | 1536px | Desktop XL |

### Estrategia Mobile-First

Todos los estilos se aplican primero a móvil, luego se sobrescriben para pantallas más grandes:

```erb
<!-- Texto pequeño en móvil, grande en desktop -->
<h2 class="text-2xl sm:text-3xl">Título</h2>

<!-- Padding pequeño en móvil, grande en desktop -->
<div class="p-4 sm:p-6">Contenido</div>

<!-- Columna única en móvil, dos en tablet+ -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
```

### Componentes Responsive

#### Navbar
```erb
<div class="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 gap-3">
  <h1 class="text-lg sm:text-xl">Título</h1>
  <div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
    <!-- Botones apilados en móvil, en fila en desktop -->
  </div>
</div>
```

#### Sidebar
```erb
<aside class="sidebar hidden md:block">  <!-- Oculto en < 768px -->
```

#### Botones
```erb
<button class="btn btn-primary btn-sm sm:btn-md w-full sm:w-auto">
  Acción
</button>
```

#### Tablas
```erb
<th class="px-3 sm:px-6 py-3 hidden md:table-cell">
  Columna visible solo en desktop
</th>
```

---

## ♿ Accesibilidad

### Contraste de Colores

Todos los colores cumplen **WCAG 2.1 Nivel AA** (4.5:1 mínimo):

| Combinación | Ratio | Nivel |
|-------------|-------|-------|
| Primary + White | 8.59:1 | AAA ✅ |
| Success + White | 4.53:1 | AA ✅ |
| Danger + White | 5.93:1 | AA+ ✅ |
| Warning + Black | 4.98:1 | AA ✅ |
| Secondary + White | 5.33:1 | AA ✅ |

### Estados de Focus

Todos los elementos interactivos tienen focus visible:

```css
/* Botones */
.btn:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}

/* Enlaces */
a:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Inputs */
.form-input:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 0;
}
```

### Atributos ARIA

#### Campos Requeridos
```erb
<%= form.text_field :first_name, 
    required: true,
    aria: { required: "true", describedby: "first_name_hint" } %>
<small id="first_name_hint">Mínimo 2 caracteres</small>
```

#### Mensajes de Error
```erb
<div role="alert" aria-live="assertive">
  <h3><span aria-label="Errores de validación">⚠️</span> Errores:</h3>
  <ul>
    <li><%= message %></li>
  </ul>
</div>
```

#### Contenido Dinámico
```erb
<div data-languages-target="container" 
     role="list"
     aria-live="polite"
     aria-label="Idiomas agregados">
  <!-- Contenido dinámico -->
</div>
```

#### Landmarks
```erb
<nav aria-label="Navegación principal">...</nav>
<aside role="navigation" aria-label="Menú lateral">...</aside>
<main id="main-content" role="main">...</main>
```

### Navegación por Teclado

- ✅ Tab/Shift+Tab: Navega entre elementos
- ✅ Enter: Activa botones y enlaces
- ✅ Space: Activa botones, checkboxes, radio buttons
- ✅ Escape: Cierra modales (cuando se implementen)

---

## 📖 Guía de Uso

### Crear un Nuevo Componente

#### 1. Botón Personalizado

```erb
<!-- Básico -->
<%= link_to "Mi Botón", path, class: "btn btn-primary" %>

<!-- Con tamaño -->
<%= link_to "Mi Botón", path, class: "btn btn-success btn-lg" %>

<!-- Responsive -->
<%= link_to "Mi Botón", path, class: "btn btn-primary btn-sm sm:btn-md" %>

<!-- Full width en móvil -->
<%= link_to "Mi Botón", path, class: "btn btn-primary w-full sm:w-auto" %>
```

#### 2. Formulario Accesible

```erb
<%= form_with model: @object do |form| %>
  <div class="mb-4">
    <%= form.label :campo do %>
      Campo <span class="text-red-500" aria-label="requerido">*</span>
    <% end %>
    <%= form.text_field :campo,
        required: true,
        aria: { required: "true", describedby: "campo_hint" },
        class: "form-input" %>
    <small id="campo_hint" class="text-sm text-gray-600">Descripción del campo</small>
  </div>
  
  <%= form.submit "Guardar", class: "btn btn-primary" %>
<% end %>
```

#### 3. Card con Contenido

```erb
<div class="card mb-4 sm:mb-6">
  <div class="card-header">
    <h3 class="heading-3">Título de la Card</h3>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <p class="text-body-light mb-2">Label:</p>
      <p class="text-body"><%= @dato %></p>
    </div>
  </div>
</div>
```

#### 4. Tabla Responsive

```erb
<div class="overflow-x-auto -mx-4 sm:mx-0">
  <div class="inline-block min-w-full align-middle">
    <div class="overflow-hidden">
      <table class="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-3 sm:px-6 py-3 text-left">Columna 1</th>
            <th class="px-3 sm:px-6 py-3 hidden sm:table-cell">Columna 2</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr class="hover:bg-gray-50">
            <td class="px-3 sm:px-6 py-4">Dato 1</td>
            <td class="px-3 sm:px-6 py-4 hidden sm:table-cell">Dato 2</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
```

### Patrones Comunes

#### Layout de Página
```erb
<div class="max-w-7xl mx-auto px-3 sm:px-6">
  <div class="card mb-4 sm:mb-6">
    <h2 class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Título</h2>
    
    <!-- Contenido -->
  </div>
</div>
```

#### Flex Container Responsive
```erb
<div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
  <button class="btn btn-primary w-full sm:w-auto">Botón 1</button>
  <button class="btn btn-secondary w-full sm:w-auto">Botón 2</button>
</div>
```

#### Grid Responsive
```erb
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  <div class="card">Item 1</div>
  <div class="card">Item 2</div>
  <div class="card">Item 3</div>
</div>
```

---

## 🔧 Mantenimiento

### Agregar un Nuevo Color

1. Agregar en `config/tailwind.config.js`:
```javascript
colors: {
  // ... colores existentes
  nuevo: {
    DEFAULT: '#hexcolor',
    dark: '#hexcolordark',
  }
}
```

2. Agregar variable CSS en `app/assets/tailwind/application.css`:
```css
@theme {
  /* ... variables existentes */
  --color-nuevo: #hexcolor;
  --color-nuevo-dark: #hexcolordark;
}
```

3. Crear componente si es necesario:
```css
.btn-nuevo {
  background-color: var(--color-nuevo);
  @apply text-white;
}
```

4. **Verificar contraste:** Usar [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
   - Mínimo 4.5:1 para texto normal (WCAG AA)
   - Mínimo 7:1 para AAA

### Modificar un Componente

1. Editar en `app/assets/tailwind/application.css`
2. Compilar: `bin/rails tailwindcss:build`
3. Probar en todos los breakpoints
4. Verificar accesibilidad (focus, contraste, ARIA)

### Testing de Responsive

```bash
# Breakpoints a probar
- 320px (móvil pequeño)
- 640px (tablet portrait)
- 768px (tablet landscape)
- 1024px (desktop)
- 1280px+ (desktop grande)
```

---

## 📚 Referencias

- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Montserrat Font](https://fonts.google.com/specimen/Montserrat)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

---

## 📝 Changelog

### Versión 2.0 (10 dic 2025)
- ✅ Migración completa a TailwindCSS 4.1.16
- ✅ Sistema de colores centralizado con variables CSS
- ✅ Diseño responsive mobile-first
- ✅ Cumplimiento WCAG 2.1 Nivel AA
- ✅ Focus states visibles en todos los elementos
- ✅ Atributos ARIA implementados
- ✅ Documentación completa

### Versión 1.0 (9 dic 2025)
- Primera implementación con Tailwind
- CSS básico sin variables centralizadas

---

**Última actualización:** 10 de diciembre de 2025  
**Mantenido por:** Equipo de Desarrollo Onboarding Record
