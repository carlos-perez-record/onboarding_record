# Buenas Prácticas con TailwindCSS - Onboarding Record

**Fecha de actualización:** 9 de diciembre de 2025  
**Versión:** 2.0 (Post-migración a TailwindCSS)  
**Stack:** Rails 8.1.1 + Ruby 3.2.2 + TailwindCSS 4.4.0 + Stimulus JS

---

## 📋 Índice

1. [Filosofía Utility-First](#filosofía-utility-first)
2. [Prácticas que Cambiaron](#prácticas-que-cambiaron)
3. [Prácticas que Siguen Vigentes](#prácticas-que-siguen-vigentes)
4. [Nuevas Prácticas con Tailwind](#nuevas-prácticas-con-tailwind)
5. [Plan de Acción](#plan-de-acción)
6. [Checklist de Validación](#checklist-de-validación)

---

## 🎯 Filosofía Utility-First

### Cambio de Paradigma

**Antes (CSS Tradicional):**
```erb
<!-- ❌ Evitar estilos inline -->
<div style="padding: 20px; background: white;">

<!-- ✅ Usar clases en CSS separado -->
<div class="card">
```

**Ahora (TailwindCSS):**
```erb
<!-- ✅ Clases utilitarias en HTML son RECOMENDADAS -->
<div class="p-5 bg-white rounded shadow">

<!-- ✅ O componentes custom para patrones repetidos -->
<div class="card">
```

### Principio Fundamental
> **Las clases utilitarias de Tailwind NO son estilos inline**. Son clases reutilizables que generan CSS optimizado y consistente.

---

## ⚠️ Prácticas que Cambiaron

### 1. Estilos "Inline-like" (ADAPTADO)

| Concepto | Antes | Ahora |
|----------|-------|-------|
| **Estilos inline** | ❌ Prohibido | ❌ Sigue prohibido |
| **Clases utilitarias** | ⚠️ Mala práctica | ✅ **RECOMENDADO** |
| **Múltiples clases** | ⚠️ Evitar | ✅ **Parte del diseño** |

**Regla actualizada:**
```erb
<!-- ❌ NUNCA usar style="" -->
<div style="padding: 20px; margin: 10px;">

<!-- ✅ SÍ usar clases Tailwind -->
<div class="p-5 m-2.5">

<!-- ⚠️ EXCEPCIÓN: Valores dinámicos de BD -->
<div style="background-color: <%= @user.theme_color %>">
```

### 2. Organización de CSS (CAMBIO COMPLETO)

**Antes:**
```
app/assets/stylesheets/
├── application.css
├── base/reset.css
├── components/buttons.css
├── layouts/header.css
└── pages/curriculums.css
```

**Ahora:**
```
app/assets/
├── tailwind/
│   └── application.css  # Un solo archivo organizado por capas
└── builds/
    └── tailwind.css     # Generado automáticamente
```

**Estructura del archivo único:**
```css
/* app/assets/tailwind/application.css */

/* 1. Importar Tailwind */
@import "tailwindcss";

/* 2. Variables globales */
@layer base {
  :root {
    --color-primary: #0056b3;
    --color-success: #28a745;
    --font-family-base: 'Montserrat', sans-serif;
  }
  
  body {
    font-family: var(--font-family-base);
  }
}

/* 3. Componentes reutilizables (3+ usos) */
@layer components {
  .btn {
    @apply inline-block font-semibold py-3 px-8 rounded shadow cursor-pointer;
    font-family: var(--font-family-base);
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
}

/* 4. Utilidades custom (si Tailwind no las tiene) */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

### 3. Componentización (CRITERIO ACTUALIZADO)

**Antes:** Crear componente CSS para cada patrón visual

**Ahora:** Crear componente solo si se repite **3 o más veces**

```css
/* ❌ NO crear para uso único */
.profile-header {
  @apply bg-blue-500 text-white p-4 rounded;
}

/* ✅ SÍ crear para patrones repetidos */
.btn {
  @apply inline-block font-semibold py-3 px-8 rounded shadow;
}

.btn-primary {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}
```

**Regla de oro:** Si lo usas 1-2 veces → clases Tailwind directas. Si lo usas 3+ veces → componente custom.

### 4. Configuración Centralizada (NUEVA UBICACIÓN)

**Antes:** Variables en `_variables.scss`

**Ahora:** Configuración en `config/tailwind.config.js`

```javascript
// config/tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#0056b3',
        secondary: '#6c757d',
        success: '#28a745',
        danger: '#dc3545',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    }
  }
}
```

---

## ✅ Prácticas que Siguen Vigentes

### 1. Consistencia Visual (CRÍTICO)

**Implementación:**
- ✅ Definir paleta de colores en `tailwind.config.js`
- ✅ Usar variables CSS para valores custom
- ✅ Mantener jerarquía tipográfica coherente

```erb
<!-- ✅ Consistencia en títulos -->
<h1 class="text-4xl font-bold text-gray-800">Título Principal</h1>
<h2 class="text-2xl font-semibold text-gray-700">Subtítulo</h2>
<h3 class="text-xl font-medium text-gray-600">Sección</h3>

<!-- ✅ Consistencia en espaciado -->
<section class="mb-8">  <!-- Siempre mb-8 entre secciones -->
<div class="mb-4">      <!-- Siempre mb-4 entre elementos -->
```

### 2. Accesibilidad (ESENCIAL)

**Tailwind NO resuelve accesibilidad automáticamente**

```erb
<!-- ✅ Contraste adecuado -->
<div class="bg-gray-100 text-gray-900">  <!-- Contraste suficiente -->

<!-- ❌ Contraste insuficiente -->
<div class="bg-gray-100 text-gray-300">  <!-- Difícil de leer -->

<!-- ✅ Atributos ARIA -->
<button aria-label="Cerrar modal" 
        class="btn btn-danger">
  ×
</button>

<!-- ✅ Estados de foco visibles -->
<input class="border border-gray-300 
              focus:ring-2 focus:ring-blue-500 
              focus:border-blue-500">
```

**Checklist de accesibilidad:**
- [ ] Contraste mínimo 4.5:1 para texto normal
- [ ] Contraste mínimo 3:1 para texto grande (18px+)
- [ ] Estados `:focus` visibles en todos los elementos interactivos
- [ ] Atributos `aria-*` en elementos custom
- [ ] Navegación completa por teclado

### 3. Responsividad (FACILITADO)

**Tailwind hace esto más fácil, pero requiere planificación**

```erb
<!-- ✅ Mobile-first approach -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

<!-- ✅ Tipografía responsiva -->
<h1 class="text-2xl md:text-3xl lg:text-4xl">

<!-- ✅ Espaciado responsivo -->
<section class="p-4 md:p-6 lg:p-8">

<!-- ❌ Desktop-first (evitar) -->
<div class="grid-cols-3 md:grid-cols-1">  <!-- Al revés -->
```

**Breakpoints de Tailwind:**
- `sm:` - 640px (móviles grandes)
- `md:` - 768px (tablets)
- `lg:` - 1024px (laptops)
- `xl:` - 1280px (desktops)
- `2xl:` - 1536px (pantallas grandes)

### 4. Jerarquía Visual (CRÍTICO)

```erb
<!-- ✅ Jerarquía clara con tamaños -->
<h1 class="text-4xl font-bold mb-4">Principal</h1>
<h2 class="text-2xl font-semibold mb-3">Secundario</h2>
<p class="text-base mb-2">Contenido normal</p>
<small class="text-sm text-gray-600">Nota</small>

<!-- ✅ Jerarquía con colores -->
<div class="text-gray-900">Principal</div>
<div class="text-gray-700">Secundario</div>
<div class="text-gray-500">Terciario</div>
```

### 5. Feedback Visual e Interactividad (ESENCIAL)

```erb
<!-- ✅ Estados hover/focus/active -->
<button class="btn btn-primary 
               hover:bg-blue-700 
               active:bg-blue-800
               focus:ring-2 focus:ring-blue-500
               transition-colors duration-200">
  Enviar
</button>

<!-- ✅ Estados disabled -->
<button class="btn opacity-50 cursor-not-allowed" disabled>
  No disponible
</button>

<!-- ✅ Loading states -->
<button class="btn btn-primary" 
        data-turbo-submits-with="Guardando...">
  Guardar
</button>
```

### 6. Separación de Responsabilidades (INTOCABLE)

**JavaScript/Stimulus** (Sin cambios)
- ✅ Controladores modulares
- ✅ Sintaxis declarativa con `data-*`
- ✅ Evitar JavaScript inline
- ✅ Un controlador = Una responsabilidad

**MVC** (Sin cambios)
- ✅ Modelos: lógica de negocio y validaciones
- ✅ Controladores: orquestación delgada
- ✅ Vistas: solo presentación

### 7. Seguridad y Rendimiento (CRÍTICO)

**Estas prácticas son INDEPENDIENTES de Tailwind y ESENCIALES para toda aplicación Rails**

#### 7.1 Escapado de Variables (SEGURIDAD)

**Rails escapa automáticamente con `<%=`, pero debes validar:**

```erb
<!-- ✅ SEGURO: Rails escapa automáticamente -->
<p><%= @user.name %></p>
<!-- Output: <p>John &lt;script&gt;alert('XSS')&lt;/script&gt;</p> -->

<!-- ⚠️ PELIGRO: html_safe desactiva el escapado -->
<div><%= @content.html_safe %></div>
<!-- Solo usar si el contenido viene de fuente confiable -->

<!-- ✅ MEJOR: Usar sanitize para HTML de usuario -->
<div><%= sanitize @content %></div>

<!-- ❌ NUNCA: Interpolación directa en JavaScript -->
<script>
  var user = <%= @user.to_json %>;  // ❌ Vulnerable a XSS
</script>

<!-- ✅ CORRECTO: Usar data attributes -->
<div data-user-name="<%= @user.name %>"></div>
<script>
  const userName = document.querySelector('[data-user-name]').dataset.userName;
</script>
```

**Reglas de oro:**
- ✅ Confía en el escapado automático de Rails (`<%=`)
- ❌ Nunca uses `html_safe` con contenido de usuario
- ✅ Usa `sanitize` si necesitas permitir HTML limitado
- ❌ Nunca interpoles variables directamente en `<script>`
- ✅ Usa `data-*` attributes para pasar datos a JavaScript

#### 7.2 Turbo Rails (RENDIMIENTO)

**Turbo está incluido en Rails 7+ por defecto y mejora drásticamente el rendimiento**

```erb
<!-- ✅ Turbo Drive: Navegación sin full page reload (AUTOMÁTICO) -->
<%= link_to "Ver curriculum", curriculum_path(@curriculum) %>
<!-- Carga solo <body>, mantiene <head> y assets en cache -->

<!-- ✅ Turbo Frames: Actualizar solo una sección -->
<%= turbo_frame_tag "curriculum_#{@curriculum.id}" do %>
  <%= render @curriculum %>
<% end %>

<!-- ✅ Turbo Streams: Actualizar múltiples secciones -->
<!-- app/views/curriculums/create.turbo_stream.erb -->
<%= turbo_stream.prepend "curriculums", @curriculum %>
<%= turbo_stream.update "flash", partial: "shared/flash" %>

<!-- ✅ Botones con feedback de carga -->
<%= form_with model: @curriculum do |f| %>
  <%= f.submit "Guardar", 
      data: { turbo_submits_with: "Guardando..." },
      class: "btn btn-primary" %>
<% end %>
```

**Beneficios de Turbo:**
- ⚡ Navegación 3-5x más rápida (sin full reload)
- 📦 Reduce transferencia de datos (solo body, no head/assets)
- 🎯 Actualizaciones quirúrgicas con Frames/Streams
- 🔄 Mantiene estado de JavaScript entre navegaciones
- 📱 Experiencia tipo SPA con menos JavaScript

**Cuándo usar cada pieza:**
- **Turbo Drive:** (Automático) Para navegación normal
- **Turbo Frames:** Para actualizar UNA sección específica
- **Turbo Streams:** Para actualizar MÚLTIPLES secciones a la vez

#### 7.3 Optimización de JavaScript (RENDIMIENTO)

```javascript
// ✅ CORRECTO: Cargar solo controladores necesarios
// Stimulus carga bajo demanda automáticamente
import { application } from "controllers/application"
import StudiesController from "./studies_controller"
application.register("studies", StudiesController)

// ❌ EVITAR: Importar librerías pesadas innecesarias
import _ from "lodash"  // 71KB minified
import moment from "moment"  // 289KB minified

// ✅ MEJOR: Usar alternativas ligeras
import { debounce } from "lodash-es"  // Solo lo que necesitas
import dayjs from "dayjs"  // 7KB minified

// ✅ MEJOR AÚN: Usar APIs nativas del navegador
// Debounce nativo (sin librería)
let timeout;
function debounce(func, delay) {
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

// Date formatting nativo
const date = new Date('2025-12-09');
date.toLocaleDateString('es-ES');  // "9/12/2025"
```

**Checklist de optimización:**
- [ ] ¿Realmente necesito esta librería? ¿Hay alternativa nativa?
- [ ] ¿Puedo usar una versión más ligera? (lodash-es vs lodash)
- [ ] ¿Puedo lazy-load esta funcionalidad?
- [ ] ¿Stimulus puede manejar esto sin librerías extra?

#### 7.4 Lazy Loading de Recursos

```erb
<!-- ✅ Imágenes lazy load -->
<%= image_tag @user.avatar, 
    loading: "lazy",
    class: "rounded-full w-20 h-20" %>

<!-- ✅ Scripts diferidos -->
<%= javascript_include_tag "analytics", defer: true %>

<!-- ✅ Turbo prefetch en hover -->
<%= link_to "Ver más", post_path(@post), 
    data: { turbo_prefetch: true } %>
```

#### 7.5 Queries N+1 (RENDIMIENTO EN BACKEND)

```ruby
# ❌ PROBLEMA N+1: 1 query + N queries por cada registro
@curriculums = Curriculum.all
@curriculums.each do |curriculum|
  curriculum.user.email  # Query adicional por cada curriculum
end

# ✅ SOLUCIÓN: Eager loading
@curriculums = Curriculum.includes(:user)
@curriculums.each do |curriculum|
  curriculum.user.email  # Sin query adicional
end

# ✅ Usar bullet gem para detectar N+1
# Gemfile
gem 'bullet', group: :development
```

---

## 🆕 Nuevas Prácticas con Tailwind

### 1. Usar `@layer` Correctamente

```css
/* ✅ CORRECTO: Organizado por capas */
@layer base {
  :root {
    /* Variables CSS globales */
  }
  body {
    /* Estilos base del body */
  }
}

@layer components {
  .btn { /* Componentes reutilizables */ }
  .card { /* ... */ }
}

@layer utilities {
  .text-balance { /* Utilidades custom */ }
}

/* ❌ INCORRECTO: Estilos fuera de capas */
.my-class {
  /* Esto puede causar problemas de especificidad */
}
```

### 2. Preferir Composición sobre Customización

```erb
<!-- ✅ Componer con clases Tailwind -->
<button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">

<!-- ⚠️ Solo crear componente si se repite 3+ veces -->
<button class="btn btn-primary">
```

### 3. Usar `!important` Solo para Override de Navegador

```css
/* ✅ VÁLIDO: Override de estilos del navegador */
.btn {
  text-decoration: none !important;  /* Navegador pone underline en <a> */
  color: white !important;           /* Navegador pone azul en <a> */
}

/* ❌ EVITAR: Usar !important para todo */
.btn {
  padding: 1rem !important;  /* ❌ Innecesario, crea problemas */
}
```

### 4. Configurar `tailwind.config.js` Como Sistema de Diseño

```javascript
// config/tailwind.config.js
module.exports = {
  theme: {
    extend: {
      // ✅ Colores corporativos
      colors: {
        primary: {
          DEFAULT: '#0056b3',
          dark: '#003d82',
          light: '#4a90e2'
        },
        success: '#28a745',
        danger: '#dc3545',
        warning: '#ffc107',
      },
      
      // ✅ Tipografía consistente
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      
      // ✅ Espaciado custom si necesario
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      
      // ✅ Sombras corporativas
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
      }
    }
  }
}
```

### 5. Compilar Assets Después de Cambios

```bash
# Después de modificar tailwind/application.css
bin/rails assets:precompile

# O usar watch mode en desarrollo
bin/rails tailwindcss:watch

# Verificar cambios
ls -lh app/assets/builds/tailwind.css
```

### 6. Eliminar Console.logs Antes de Producción

```javascript
// studies_controller.js
// ✅ En desarrollo: útiles para debug
console.log('Studies controller connected')

// ⚠️ Antes de producción: eliminar o usar condicional
if (process.env.NODE_ENV === 'development') {
  console.log('Studies controller connected')
}
```

---

## 📋 Plan de Acción

### Fase 1: Consolidación Actual ✅ (COMPLETADO)

**Estado:** ✅ Completado en commit anterior

- [x] Migrar a TailwindCSS 4.4.0
- [x] Crear sistema de componentes en `@layer components`
- [x] Eliminar todos los estilos inline (46+ instancias)
- [x] Eliminar JavaScript inline (10+ handlers)
- [x] Configurar variables CSS en `@layer base`
- [x] Implementar componentes: `.btn`, `.card`, `.heading-*`, etc.

**Resultado:** Código 100% limpio siguiendo separación de responsabilidades.

---

### Fase 2: Configuración de Sistema de Diseño 🟡 (SIGUIENTE)

**Prioridad:** ALTA  
**Esfuerzo:** 2-3 horas  
**Riesgo:** BAJO

#### Tareas:

**2.1 Crear `tailwind.config.js` completo**
```javascript
// config/tailwind.config.js
module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0056b3',
          dark: '#003d82',
          light: '#4a90e2'
        },
        success: '#28a745',
        danger: '#dc3545',
        warning: '#ffc107',
        secondary: '#6c757d',
        'admin-bg': '#d1ecf1',
        'admin-text': '#0c5460',
        'recruiter-bg': '#e2d5f0',
        'recruiter-text': '#522b5d',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    }
  }
}
```

**2.2 Migrar colores hardcodeados a config**
- [ ] Buscar todos los `#0056b3` y reemplazar con `bg-primary`
- [ ] Buscar todos los `#28a745` y reemplazar con `bg-success`
- [ ] Buscar todos los `#dc3545` y reemplazar con `bg-danger`

**2.3 Documentar sistema de colores**
- [ ] Crear guía visual de colores en `docs/DESIGN_SYSTEM.md`
- [ ] Incluir ejemplos de uso de cada color

**Criterios de aceptación:**
- [ ] Todos los colores vienen de `tailwind.config.js`
- [ ] No hay colores hardcodeados en componentes
- [ ] Sistema documentado y fácil de mantener

---

### Fase 3: Accesibilidad 🟢 (PRÓXIMA)

**Prioridad:** MEDIA  
**Esfuerzo:** 3-4 horas  
**Riesgo:** BAJO

#### Tareas:

**3.1 Auditoría de contraste**
- [ ] Instalar herramienta de contraste (ej. axe DevTools)
- [ ] Revisar todos los pares texto/fondo
- [ ] Ajustar colores que no cumplan WCAG AA (4.5:1)

**3.2 Estados de foco visibles**
```erb
<!-- ✅ Aplicar a todos los elementos interactivos -->
<button class="focus:ring-2 focus:ring-blue-500 focus:outline-none">
<input class="focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
<a class="focus:ring-2 focus:ring-blue-500 focus:rounded">
```

**3.3 Atributos ARIA**
```erb
<!-- Formularios -->
<label for="curriculum_first_name">Nombre(s) *</label>
<input id="curriculum_first_name" 
       aria-required="true"
       aria-describedby="first_name_hint">
<small id="first_name_hint">Mínimo 2 caracteres</small>

<!-- Botones -->
<button aria-label="Cerrar modal">×</button>

<!-- Mensajes dinámicos -->
<div role="alert" aria-live="polite">
  <%= flash[:notice] %>
</div>
```

**3.4 Navegación por teclado**
- [ ] Probar todos los formularios con solo teclado (Tab, Enter, Escape)
- [ ] Verificar que modales/dropdowns se puedan cerrar con Escape
- [ ] Confirmar que el orden de tabulación es lógico

**Criterios de aceptación:**
- [ ] Contraste mínimo 4.5:1 en todo el texto
- [ ] Todos los elementos interactivos tienen estado `:focus` visible
- [ ] Navegación completa por teclado funcional
- [ ] Atributos `aria-*` en elementos custom

---

### Fase 4: Responsividad 🟢 (PRÓXIMA)

**Prioridad:** MEDIA  
**Esfuerzo:** 4-5 horas  
**Riesgo:** MEDIO

#### Tareas:

**4.1 Auditoría mobile**
- [ ] Probar todas las vistas en móvil (375px width)
- [ ] Identificar elementos que rompen el layout
- [ ] Listar tablas que necesitan scroll horizontal

**4.2 Implementar breakpoints**
```erb
<!-- Grids responsivos -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

<!-- Tipografía responsiva -->
<h1 class="text-2xl md:text-3xl lg:text-4xl">

<!-- Espaciado responsivo -->
<section class="p-4 md:p-6 lg:p-8">

<!-- Ocultar/mostrar elementos -->
<div class="hidden md:block">Desktop only</div>
<div class="block md:hidden">Mobile only</div>
```

**4.3 Tablas responsivas**
```erb
<!-- Opción 1: Scroll horizontal -->
<div class="overflow-x-auto">
  <table class="min-w-full">

<!-- Opción 2: Stack en mobile -->
<div class="block md:hidden">
  <!-- Vista tipo tarjetas -->
</div>
<div class="hidden md:block">
  <table><!-- Vista tabla --></table>
</div>
```

**Criterios de aceptación:**
- [ ] Todas las vistas funcionan en móvil (375px)
- [ ] Todas las vistas funcionan en tablet (768px)
- [ ] Todas las vistas funcionan en desktop (1024px+)
- [ ] No hay scroll horizontal no intencional
- [ ] Texto legible sin zoom en todos los tamaños

---

### Fase 5: Optimización y Performance 🟡 (FUTURA)

**Prioridad:** BAJA  
**Esfuerzo:** 2-3 horas  
**Riesgo:** BAJO

#### Tareas:

**5.1 Purge de CSS no usado**
```javascript
// config/tailwind.config.js
module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js'
  ],
  // Tailwind solo incluirá clases usadas en estos archivos
}
```

**5.2 Eliminar console.logs de producción**
```javascript
// app/javascript/controllers/studies_controller.js
connect() {
  if (Rails.env !== 'production') {
    console.log('Studies controller connected')
  }
  this.updateAddButton()
}
```

**5.3 Minificar assets**
```ruby
# config/environments/production.rb
config.assets.css_compressor = :sass
config.assets.js_compressor = :terser
```

**Criterios de aceptación:**
- [ ] CSS compilado < 50KB en producción
- [ ] No hay console.logs en producción
- [ ] Assets minificados y comprimidos

---

### Fase 6: Documentación 🟢 (CONTINUA)

**Prioridad:** ALTA  
**Esfuerzo:** Continuo  
**Riesgo:** BAJO

#### Tareas:

**6.1 Actualizar BUENAS_PRACTICAS.md**
- [x] Documentar enfoque utility-first
- [x] Actualizar estructura de CSS
- [x] Incluir ejemplos de Tailwind
- [ ] Agregar troubleshooting común

**6.2 Crear DESIGN_SYSTEM.md**
- [ ] Paleta de colores con ejemplos visuales
- [ ] Tipografía y jerarquías
- [ ] Componentes disponibles (`.btn`, `.card`, etc.)
- [ ] Guía de espaciado
- [ ] Ejemplos de código para cada componente

**6.3 Crear CONTRIBUTING.md**
- [ ] Cómo agregar nuevos componentes
- [ ] Cuándo crear componente vs usar utilidades
- [ ] Proceso de PR y revisión
- [ ] Estándares de código

**Criterios de aceptación:**
- [ ] Documentación actualizada y completa
- [ ] Ejemplos claros y funcionales
- [ ] Guías fáciles de seguir para nuevos desarrolladores

---

## ✅ Checklist de Validación

### CSS/Tailwind
- [x] Un solo archivo `tailwind/application.css` organizado por capas
- [x] Cero estilos inline (`style=""`)
- [x] Componentes custom solo para patrones 3+ usos
- [x] Variables CSS para valores reutilizables
- [ ] `tailwind.config.js` con sistema de diseño completo
- [ ] Colores desde config, no hardcodeados

### JavaScript/Stimulus
- [x] Controladores modulares y especializados
- [x] Sintaxis declarativa con `data-*`
- [x] Cero JavaScript inline
- [ ] Console.logs solo en desarrollo
- [ ] Sin librerías pesadas innecesarias
- [ ] Lazy loading donde sea posible

### Accesibilidad
- [ ] Contraste mínimo 4.5:1 en todo el texto
- [ ] Estados `:focus` visibles en elementos interactivos
- [ ] Atributos `aria-*` en elementos custom
- [ ] Navegación completa por teclado
- [ ] Etiquetas semánticas correctas

### Responsividad
- [ ] Mobile-first approach
- [ ] Breakpoints coherentes (sm, md, lg, xl)
- [ ] Tablas adaptables
- [ ] Imágenes responsive
- [ ] Texto legible sin zoom

### Performance
- [ ] CSS compilado optimizado
- [ ] Assets minificados en producción
- [ ] Sin console.logs en producción
- [ ] Purge de clases no usadas
- [ ] Turbo habilitado y funcionando
- [ ] Imágenes con lazy loading
- [ ] Sin queries N+1 (verificar con Bullet)

### Seguridad
- [ ] Variables escapadas correctamente
- [ ] Sin uso de `html_safe` con contenido de usuario
- [ ] Sin interpolación directa en `<script>`
- [ ] Datos a JavaScript vía `data-*` attributes

### Documentación
- [x] BUENAS_PRACTICAS_TAILWIND.md actualizado
- [ ] DESIGN_SYSTEM.md creado
- [ ] Ejemplos de código actualizados
- [ ] Troubleshooting documentado

---

## 🎯 Priorización de Tareas (Por Impacto y Riesgo)

### 🔴 Prioridad CRÍTICA - Sprint 1 (Esta semana)
**Criterio:** Seguridad, funcionalidad base, bloqueos

1. ✅ **Completar migración a Tailwind** (HECHO)
   - Status: ✅ COMPLETADO
   - Impacto: ALTO - Base para todo lo demás
   - Riesgo: N/A - Ya resuelto

2. 🔴 **Auditoría de seguridad** (2-3 horas)
   - Status: ⏳ PENDIENTE
   - Impacto: CRÍTICO - Prevenir XSS y vulnerabilidades
   - Riesgo: ALTO - Puede haber código inseguro en vistas
   - Tareas:
     - [ ] Revisar todas las vistas con `grep` buscando `html_safe`
     - [ ] Verificar que no haya interpolación en `<script>`
     - [ ] Confirmar que datos a JS usan `data-*` attributes
     - [ ] Documentar casos seguros de `html_safe` si existen

3. 🔴 **Auditoría de queries N+1** (1-2 horas)
   - Status: ⏳ PENDIENTE
   - Impacto: CRÍTICO - Rendimiento en producción
   - Riesgo: MEDIO - Puede haber N+1 ocultos
   - Tareas:
     - [ ] Instalar y configurar `bullet` gem
     - [ ] Probar todas las vistas principales
     - [ ] Agregar `includes`/`joins` donde sea necesario
     - [ ] Verificar logs de Bullet en desarrollo

---

### 🟡 Prioridad ALTA - Sprint 2 (Próxima semana)
**Criterio:** Mantenibilidad, consistencia, UX básico

4. 🟡 **Crear `tailwind.config.js` con sistema de diseño** (2-3 horas)
   - Status: ⏳ PENDIENTE
   - Impacto: ALTO - Centraliza configuración
   - Riesgo: BAJO - No afecta funcionalidad actual
   - Tareas:
     - [ ] Crear config con colores corporativos
     - [ ] Definir tipografía base (Montserrat)
     - [ ] Configurar espaciados custom si necesario
     - [ ] Documentar sistema de colores

5. 🟡 **Migrar colores hardcodeados a configuración** (1-2 horas)
   - Status: ⏳ PENDIENTE
   - Impacto: MEDIO - Mejora mantenibilidad
   - Riesgo: BAJO - Refactor sin cambios visuales
   - Tareas:
     - [ ] Buscar todos los `#0056b3` → `bg-primary`
     - [ ] Buscar todos los `#28a745` → `bg-success`
     - [ ] Buscar todos los `#dc3545` → `bg-danger`
     - [ ] Verificar que todo se vea igual

6. 🟢 **Implementar accesibilidad básica** (3-4 horas)
   - Status: ⏳ PENDIENTE
   - Impacto: ALTO - Cumplimiento legal + UX
   - Riesgo: BAJO - Solo mejoras incrementales
   - Tareas:
     - [ ] Auditoría de contraste (mínimo 4.5:1)
     - [ ] Agregar estados `:focus` visibles
     - [ ] Implementar atributos ARIA
     - [ ] Probar navegación por teclado

---

### 🟢 Prioridad MEDIA - Sprint 3 (Semana 3)
**Criterio:** UX avanzada, optimizaciones

7. 🟢 **Hacer auditoría de responsividad** (4-5 horas)
   - Status: ⏳ PENDIENTE
   - Impacto: MEDIO - Mejora UX móvil
   - Riesgo: MEDIO - Puede requerir cambios de layout
   - Tareas:
     - [ ] Probar todas las vistas en móvil (375px)
     - [ ] Implementar breakpoints necesarios
     - [ ] Hacer tablas responsivas
     - [ ] Verificar tipografía legible sin zoom

8. 🟢 **Crear DESIGN_SYSTEM.md** (2-3 horas)
   - Status: ⏳ PENDIENTE
   - Impacto: MEDIO - Facilita onboarding y mantenimiento
   - Riesgo: BAJO - Solo documentación
   - Tareas:
     - [ ] Documentar paleta de colores
     - [ ] Documentar componentes (`.btn`, `.card`, etc.)
     - [ ] Incluir ejemplos de código
     - [ ] Agregar guía de espaciado

9. 🟡 **Optimizar JavaScript** (2-3 horas)
   - Status: ⏳ PENDIENTE
   - Impacto: MEDIO - Mejora performance
   - Riesgo: BAJO - Optimización sin cambios funcionales
   - Tareas:
     - [ ] Auditar librerías instaladas
     - [ ] Eliminar console.logs de producción
     - [ ] Implementar lazy loading donde sea posible
     - [ ] Verificar bundle size

---

### 🔵 Prioridad BAJA - Backlog (Futuro)
**Criterio:** Nice to have, mejoras avanzadas

10. 🔵 **Implementar Turbo Frames** (3-4 horas)
    - Status: ⏳ PENDIENTE
    - Impacto: BAJO - Turbo Drive ya funciona
    - Riesgo: BAJO - Mejora incremental
    - Tareas:
      - [ ] Identificar vistas candidatas (formularios complejos)
      - [ ] Implementar Frames en formulario de curriculum
      - [ ] Probar actualización sin full reload

11. 🔵 **Optimización avanzada de CSS** (2-3 horas)
    - Status: ⏳ PENDIENTE
    - Impacto: BAJO - Optimización marginal
    - Riesgo: BAJO - Solo configuración
    - Tareas:
      - [ ] Verificar purge de CSS no usado
      - [ ] Minificar assets en producción
      - [ ] Medir performance con Lighthouse

---

## 📊 Resumen de Priorización

| Prioridad | Tareas | Tiempo Total | Justificación |
|-----------|--------|--------------|---------------|
| 🔴 CRÍTICA | 3 tareas | 4-7 horas | Seguridad y performance críticos |
| 🟡 ALTA | 4 tareas | 8-12 horas | Mantenibilidad y UX base |
| 🟢 MEDIA | 2 tareas | 5-7 horas | UX avanzada y documentación |
| 🔵 BAJA | 2 tareas | 5-7 horas | Optimizaciones marginales |
| **TOTAL** | **11 tareas** | **22-33 horas** | ~3-4 semanas de trabajo |

---

## 🎯 Orden Recomendado de Ejecución

### Esta semana (Sprint 1):
```
DÍA 1: Auditoría de seguridad (escapado de variables)
DÍA 2: Auditoría N+1 con Bullet gem
DÍA 3: Buffer para fixes encontrados
```

### Próxima semana (Sprint 2):
```
DÍA 1: Crear tailwind.config.js completo
DÍA 2: Migrar colores hardcodeados
DÍA 3-4: Implementar accesibilidad básica
```

### Semana 3 (Sprint 3):
```
DÍA 1-2: Auditoría de responsividad
DÍA 3: Crear DESIGN_SYSTEM.md
DÍA 4: Optimizar JavaScript
```

### Backlog (cuando haya tiempo):
```
- Implementar Turbo Frames
- Optimización avanzada de CSS
```

---

## 🚨 Por qué este orden?

### 1. Seguridad primero (🔴 CRÍTICO)
**Razón:** Una vulnerabilidad XSS puede comprometer toda la aplicación. Debe resolverse ANTES de cualquier mejora visual o de UX.

**Impacto de NO hacerlo:**
- ❌ Riesgo de inyección de scripts maliciosos
- ❌ Robo de sesiones de usuario
- ❌ Datos sensibles expuestos
- ❌ Incumplimiento de normativas (GDPR, etc.)

### 2. Performance de base de datos (🔴 CRÍTICO)
**Razón:** Queries N+1 pueden hacer que la app sea inutilizable con datos reales. Mejor detectarlos temprano.

**Impacto de NO hacerlo:**
- ❌ App lenta en producción (10 registros → 10x más lento)
- ❌ Costos de servidor más altos
- ❌ Experiencia de usuario frustrante
- ❌ Puede causar timeouts en producción

### 3. Sistema de diseño (🟡 ALTA)
**Razón:** Establece base para consistencia. Todo lo demás (accesibilidad, responsividad) se construye sobre esto.

**Impacto de hacerlo bien:**
- ✅ Cambios futuros más rápidos
- ✅ Consistencia automática
- ✅ Onboarding de nuevos devs más fácil

### 4. Accesibilidad (🟡 ALTA)
**Razón:** Requisito legal en muchos países. Mejor implementar desde el inicio que refactorizar después.

**Impacto de NO hacerlo:**
- ⚠️ Problemas legales potenciales
- ⚠️ Usuarios con discapacidad no pueden usar la app
- ⚠️ SEO afectado (Google prioriza sitios accesibles)

### 5. Responsividad (🟢 MEDIA)
**Razón:** El diseño actual ya funciona básicamente. Esto es mejora incremental.

**Impacto de hacerlo:**
- ✅ Mejor UX en móvil
- ✅ Más usuarios pueden usar la app cómodamente
- ⚠️ Pero no es bloqueante

### 6. Optimizaciones (🔵 BAJA)
**Razón:** La app ya funciona. Esto es polish final.

**Impacto de hacerlo:**
- ✅ App un poco más rápida
- ✅ Bundle size menor
- ℹ️ Mejoras marginales, no transformacionales

---

## 📚 Referencias

### Documentación Oficial
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [TailwindCSS Best Practices](https://tailwindcss.com/docs/reusing-styles)
- [Rails + Tailwind Guide](https://tailwindcss.com/docs/guides/ruby-on-rails)
- [Stimulus Handbook](https://stimulus.hotwired.dev/handbook/introduction)

### Herramientas Recomendadas
- **Contraste:** [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- **Accesibilidad:** [axe DevTools](https://www.deque.com/axe/devtools/)
- **Responsividad:** Chrome DevTools Device Toolbar
- **Performance:** Lighthouse (Chrome DevTools)

---

**Última actualización:** 9 de diciembre de 2025  
**Próxima revisión:** Después de completar Sprint 1
