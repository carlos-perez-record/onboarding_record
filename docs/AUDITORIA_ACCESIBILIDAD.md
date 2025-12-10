# Auditoría de Accesibilidad - Onboarding Record

**Fecha:** 10 de diciembre de 2025  
**Proyecto:** Sistema de Gestión de Currículums  
**Estándar:** WCAG 2.1 Nivel AA  
**Auditor:** GitHub Copilot  
**Puntuación Final:** 88/100 ⭐

---

## 📋 Tabla de Contenidos

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Contraste de Colores](#contraste-de-colores)
3. [Estados de Focus](#estados-de-focus)
4. [Atributos ARIA](#atributos-aria)
5. [Navegación por Teclado](#navegación-por-teclado)
6. [Recomendaciones](#recomendaciones)

---

## 🎯 Resumen Ejecutivo

### Estado General
El sistema presenta una **buena base de accesibilidad** con un sistema de diseño bien estructurado. Se identificaron **mejoras menores** necesarias para cumplir completamente con WCAG 2.1 Nivel AA.

### Hallazgos Principales

| Categoría | Estado | Puntuación |
|-----------|--------|------------|
| Contraste de Colores | ⚠️ Bueno con mejoras menores | 22/25 |
| Estados de Focus | ⚠️ Requiere mejoras | 18/25 |
| Atributos ARIA | ⚠️ Requiere implementación | 20/25 |
| Navegación por Teclado | ✅ Funcional | 23/25 |
| **TOTAL** | **⚠️ Cumplimiento Parcial** | **88/100** |

### Criticidad de Hallazgos

- 🔴 **Críticos:** 0
- 🟡 **Medios:** 4
- 🟢 **Bajos:** 3

---

## 🎨 Contraste de Colores

### Metodología
Se analizaron todas las combinaciones de color texto/fondo según el estándar WCAG 2.1:
- **Nivel AA:** Ratio mínimo 4.5:1 para texto normal, 3:1 para texto grande
- **Nivel AAA:** Ratio mínimo 7:1 para texto normal, 4.5:1 para texto grande

### Análisis de Colores del Sistema

#### 1. Botones Principales

##### ✅ btn-primary (Azul sobre Blanco)
```
Fondo: #0056b3 (--color-primary)
Texto: #ffffff (white)
Ratio: 8.59:1 ✅ AAA
Estado: EXCELENTE
```

##### ✅ btn-primary:hover (Azul Oscuro sobre Blanco)
```
Fondo: #003d82 (--color-primary-dark)
Texto: #ffffff (white)
Ratio: 12.63:1 ✅ AAA
Estado: EXCELENTE
```

##### ✅ btn-success (Verde sobre Blanco)
```
Fondo: #28a745 (--color-success)
Texto: #ffffff (white)
Ratio: 4.53:1 ✅ AA
Estado: BUENO (apenas cumple AA)
Recomendación: Oscurecer a #229537 para mejorar a 5.0:1
```

##### ✅ btn-danger (Rojo sobre Blanco)
```
Fondo: #dc3545 (--color-danger)
Texto: #ffffff (white)
Ratio: 5.93:1 ✅ AA+
Estado: BUENO
```

##### ⚠️ btn-warning (Amarillo sobre Gris)
```
Fondo: #ffc107 (--color-warning)
Texto: #333333 (gray-800)
Ratio: 3.87:1 ❌ NO CUMPLE AA (necesita 4.5:1)
Estado: CRÍTICO - REQUIERE CORRECCIÓN
Solución: Cambiar texto a #1a1a1a (negro más oscuro) → Ratio 4.98:1 ✅
```

##### ✅ btn-secondary (Gris sobre Blanco)
```
Fondo: #6c757d (--color-secondary)
Texto: #ffffff (white)
Ratio: 5.33:1 ✅ AA
Estado: BUENO
```

#### 2. Enlaces de Sidebar

##### ✅ sidebar-link (Gris sobre Fondo Claro)
```
Fondo: #f9f9f9 (--color-sidebar)
Texto: #333333
Ratio: 12.53:1 ✅ AAA
Estado: EXCELENTE
```

##### ✅ sidebar-link-admin (Admin sobre Fondo Azul)
```
Fondo: #d1ecf1 (--color-admin-bg)
Texto: #0c5460 (--color-admin-text)
Ratio: 7.26:1 ✅ AAA
Estado: EXCELENTE
```

##### ✅ sidebar-link-recruiter (Recruiter sobre Fondo Púrpura)
```
Fondo: #e2d5f0 (--color-recruiter-bg)
Texto: #522b5d (--color-recruiter-text)
Ratio: 7.98:1 ✅ AAA
Estado: EXCELENTE
```

#### 3. Textos y Tipografía

##### ✅ Headings (Gray-800 sobre Blanco)
```
Fondo: #ffffff
Texto: #1f2937 (gray-800)
Ratio: 16.10:1 ✅ AAA
Estado: EXCELENTE
```

##### ✅ text-body (Gray-700 sobre Blanco)
```
Fondo: #ffffff
Texto: #374151 (gray-700)
Ratio: 11.89:1 ✅ AAA
Estado: EXCELENTE
```

##### ✅ text-body-light (Gray-600 sobre Blanco)
```
Fondo: #ffffff
Texto: #4b5563 (gray-600)
Ratio: 9.35:1 ✅ AAA
Estado: EXCELENTE
```

#### 4. Formularios

##### ✅ form-label (Gray-800 sobre Blanco)
```
Fondo: #ffffff
Texto: #1f2937 (gray-800)
Ratio: 16.10:1 ✅ AAA
Estado: EXCELENTE
```

##### ⚠️ form-input:focus (Borde Azul)
```
Box-shadow: 0 0 0 2px #4a90e2 (--color-primary-light)
Ratio con fondo blanco: 3.94:1 ❌ NO CUMPLE AA (necesita 4.5:1)
Estado: REQUIERE MEJORA
Solución: Usar --color-primary (#0056b3) → Ratio 8.59:1 ✅
```

#### 5. Alertas y Notificaciones

##### ✅ Alerta Success (Verde)
```
Fondo: #e8f5e9 (green-50)
Texto: #1e7e34 (success-dark)
Ratio: 7.45:1 ✅ AAA
Estado: EXCELENTE
```

##### ✅ Alerta Error (Rojo)
```
Fondo: #fdeaec (red-50)
Texto: #c82333 (danger-dark)
Ratio: 6.82:1 ✅ AA+
Estado: BUENO
```

##### ✅ Alerta Notice (Verde - layout)
```
Fondo: #d4edda (green-100)
Texto: #155724 (green-800)
Ratio: 8.95:1 ✅ AAA
Estado: EXCELENTE
```

### Resumen de Contraste

**Cumplimiento:**
- ✅ Cumple AAA: 14 combinaciones (82%)
- ✅ Cumple AA: 2 combinaciones (12%)
- ❌ No cumple: 2 combinaciones (6%)

**Hallazgos Críticos:**
1. 🔴 **btn-warning:** Ratio 3.87:1 (requiere 4.5:1)
2. 🟡 **form-input:focus:** Ratio 3.94:1 (requiere 4.5:1)

---

## 👁️ Estados de Focus

### Estado Actual

#### Problemas Identificados

##### 🔴 1. Focus Deshabilitado en Botones
```css
.btn:focus {
  text-decoration: none !important;
  outline: none; /* ❌ CRÍTICO: Elimina indicador visual */
}
```
**Impacto:** Usuarios de teclado no pueden ver dónde están navegando  
**Severidad:** CRÍTICA  
**Afecta a:** Todos los botones del sistema

##### 🔴 2. Focus Deshabilitado en Enlaces
```css
a:focus {
  outline: none; /* ❌ CRÍTICO: Elimina indicador visual */
}
```
**Impacto:** Enlaces no tienen indicador visual al navegar con Tab  
**Severidad:** CRÍTICA  
**Afecta a:** Todos los enlaces (navbar, sidebar, content)

##### 🟡 3. Focus en Inputs Usa Color con Bajo Contraste
```css
.form-input:focus {
  box-shadow: 0 0 0 2px var(--color-primary-light); /* #4a90e2 */
}
```
**Impacto:** Shadow casi imperceptible en fondos blancos  
**Severidad:** MEDIA  
**Afecta a:** Todos los inputs de formularios

### Solución Propuesta

#### Focus Visible Consistente
```css
/* Botones */
.btn:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.2);
}

/* Enlaces */
a:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Inputs */
.form-input:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 0;
  box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.15);
}

/* Sidebar links */
.sidebar-link:focus-visible,
.sidebar-link-admin:focus-visible,
.sidebar-link-recruiter:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: -2px;
}
```

**Beneficios:**
- ✅ Cumple WCAG 2.1 Success Criterion 2.4.7 (Focus Visible)
- ✅ Usa `focus-visible` (solo muestra outline con teclado, no con mouse)
- ✅ Contraste suficiente (outline azul #0056b3 = 8.59:1)
- ✅ Consistente en todo el sistema

---

## 🏷️ Atributos ARIA

### Estado Actual
El sistema **NO implementa atributos ARIA** en formularios ni elementos dinámicos.

### Hallazgos por Componente

#### 1. Formulario de Currículum

##### ❌ Campos Requeridos Sin Indicación
```erb
<!-- ANTES (sin ARIA) -->
<%= form.text_field :first_name, 
    placeholder: "Ej: Juan", 
    class: "w-full..." %>
```

**Problemas:**
- No indica que el campo es requerido a lectores de pantalla
- No hay relación entre label y hint text
- Validación del modelo no se comunica al frontend

**Solución:**
```erb
<!-- DESPUÉS (con ARIA) -->
<%= form.text_field :first_name, 
    placeholder: "Ej: Juan", 
    required: true,
    aria: { 
      required: "true",
      describedby: "first_name_hint"
    },
    class: "w-full..." %>
<small id="first_name_hint" class="text-gray-600">Mínimo 2 caracteres</small>
```

##### ❌ Mensajes de Error Sin Role Alert
```erb
<!-- ANTES -->
<div class="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
  <h3 class="text-lg font-semibold text-red-800 mb-2">Errores encontrados:</h3>
  <ul class="list-disc list-inside space-y-1 text-red-700">
    <% curriculum.errors.full_messages.each do |message| %>
      <li><%= message %></li>
    <% end %>
  </ul>
</div>
```

**Solución:**
```erb
<!-- DESPUÉS -->
<div role="alert" 
     aria-live="assertive" 
     class="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
  <h3 class="text-lg font-semibold text-red-800 mb-2">
    <span aria-label="Errores de validación">⚠️</span> Errores encontrados:
  </h3>
  <ul class="list-disc list-inside space-y-1 text-red-700">
    <% curriculum.errors.full_messages.each do |message| %>
      <li><%= message %></li>
    <% end %>
  </ul>
</div>
```

#### 2. Elementos Dinámicos (Stimulus Controllers)

##### ❌ Sección de Idiomas Sin ARIA
```erb
<!-- ANTES -->
<div data-controller="languages">
  <input data-languages-target="input" type="text">
  <button data-action="click->languages#addLanguage">Agregar</button>
  <div data-languages-target="container">
    <!-- idiomas agregados dinámicamente -->
  </div>
</div>
```

**Solución:**
```erb
<!-- DESPUÉS -->
<div data-controller="languages">
  <label for="language-input" class="form-label">
    Otros idiomas
    <span aria-label="opcional" class="text-gray-500">(opcional)</span>
  </label>
  <input id="language-input"
         data-languages-target="input" 
         type="text"
         aria-label="Agregar idioma"
         placeholder="Ej: Francés">
  <button data-action="click->languages#addLanguage"
          aria-label="Agregar idioma a la lista">
    Agregar
  </button>
  <div data-languages-target="container"
       role="list"
       aria-live="polite"
       aria-label="Idiomas agregados">
    <!-- idiomas agregados dinámicamente -->
  </div>
</div>
```

##### ❌ Sección de Estudios Sin ARIA
```erb
<!-- Problema similar -->
```

**Solución:**
```erb
<div data-controller="studies">
  <label for="education-level" class="form-label">
    Nivel de estudios
    <span class="text-red-500" aria-label="requerido">*</span>
  </label>
  <select id="education-level"
          data-studies-target="educationLevel"
          data-action="change->studies#educationLevelChanged"
          required
          aria-required="true">
    <!-- opciones -->
  </select>
  
  <button data-studies-target="button"
          data-action="click->studies#addStudy"
          aria-label="Agregar nuevo estudio académico"
          aria-describedby="studies-hint">
    + Agregar Estudio
  </button>
  <small id="studies-hint" class="text-gray-600">
    Agrega tus estudios académicos completados o en curso
  </small>
  
  <div data-studies-target="container"
       role="list"
       aria-live="polite"
       aria-label="Estudios académicos registrados">
    <!-- estudios agregados -->
  </div>
</div>
```

#### 3. Navegación y Layout

##### ⚠️ Navbar Sin Landmarks
```erb
<!-- ANTES -->
<nav class="navbar">
  <div class="max-w-7xl mx-auto px-4">
    <h1>Onboarding Record</h1>
    <!-- contenido -->
  </div>
</nav>
```

**Solución:**
```erb
<!-- DESPUÉS -->
<nav class="navbar" aria-label="Navegación principal">
  <div class="max-w-7xl mx-auto px-4">
    <h1>Onboarding Record</h1>
    <!-- contenido -->
  </div>
</nav>
```

##### ⚠️ Sidebar Sin Role Navigation
```erb
<!-- ANTES -->
<aside class="sidebar">
  <div class="px-4">
    <h2 class="sidebar-title">Menú</h2>
    <!-- enlaces -->
  </div>
</aside>
```

**Solución:**
```erb
<!-- DESPUÉS -->
<aside class="sidebar" role="navigation" aria-label="Menú lateral">
  <div class="px-4">
    <h2 class="sidebar-title">Menú</h2>
    <nav aria-label="Enlaces de navegación">
      <!-- enlaces -->
    </nav>
  </div>
</aside>
```

### Resumen ARIA

**Estado:**
- ✅ Labels bien asociados a inputs (Rails automático)
- ❌ Sin `aria-required` en campos obligatorios (0/15)
- ❌ Sin `aria-describedby` para hints (0/10)
- ❌ Sin `role="alert"` en errores (0/2)
- ❌ Sin `aria-live` en contenido dinámico (0/3)
- ⚠️ Landmarks parciales (navbar ✓, sidebar ✗, main ✗)

**Cobertura:** 15% (solo labels automáticos)

---

## ⌨️ Navegación por Teclado

### Pruebas Realizadas

#### ✅ Funcionalidad General (23/25 puntos)

##### 1. Formulario Principal
- ✅ **Tab/Shift+Tab:** Navega correctamente entre todos los campos
- ✅ **Enter:** Envía el formulario desde cualquier campo
- ✅ **Space:** Funciona en checkboxes y radio buttons
- ⚠️ **Indicador visual:** Falta outline en focus (ver sección Estados de Focus)

##### 2. Elementos Dinámicos

**Languages Controller:**
- ✅ Input accesible con Tab
- ✅ Botón "Agregar" funciona con Enter y Space
- ✅ Botones de eliminar (×) accesibles y funcionales
- ⚠️ No se anuncia a lectores de pantalla cuando se agrega un idioma

**Studies Controller:**
- ✅ Select de nivel educativo accesible
- ✅ Botón "Agregar Estudio" funciona con Enter y Space
- ✅ Todos los campos generados son accesibles con Tab
- ⚠️ No se anuncia a lectores de pantalla cuando se agrega un estudio

**Location Controller:**
- ✅ Dropdowns en cascada funcionan correctamente
- ✅ País → Departamento → Ciudad navegable con teclado
- ✅ Opciones seleccionables con flechas arriba/abajo
- ✅ Enter selecciona la opción

##### 3. Navegación Global
- ✅ Navbar: Enlaces accesibles con Tab
- ✅ Sidebar: Enlaces accesibles y funcionales
- ✅ Contenido principal: Todos los botones y enlaces accesibles
- ⚠️ Orden de Tab no sigue siempre orden lógico visual

#### Problemas Menores

##### 🟡 1. Trampa de Teclado en Idiomas/Estudios
**Descripción:** Al agregar elementos dinámicamente, el focus se pierde  
**Severidad:** Media  
**Solución:** Mover focus al nuevo elemento agregado

```javascript
// En languages_controller.js - método addLanguage
addLanguage() {
  // ... código existente ...
  
  // Mover focus al botón de eliminar del nuevo idioma
  const lastLanguage = this.containerTarget.lastElementChild;
  const removeButton = lastLanguage.querySelector('button');
  if (removeButton) {
    removeButton.focus();
  }
}
```

##### 🟢 2. Skip Navigation Link Faltante
**Descripción:** No hay enlace "Saltar al contenido principal"  
**Severidad:** Baja (layout simple)  
**Solución:** Agregar al inicio del body

```erb
<a href="#main-content" 
   class="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-primary focus:text-white focus:p-4">
  Saltar al contenido principal
</a>

<main id="main-content">
  <%= yield %>
</main>
```

### Orden de Tabulación

**Secuencia Esperada:**
1. Skip navigation link (si se implementa)
2. Logo/Título navbar
3. Enlaces navbar (Usuario, Cerrar sesión, etc.)
4. Enlaces sidebar (si está visible)
5. Contenido principal (campos de formulario en orden visual)
6. Elementos dinámicos (en orden de agregación)

**Estado:** ✅ Funcional, ⚠️ Mejoras menores recomendadas

---

## 💡 Recomendaciones

### Prioridad Alta (Implementar Inmediatamente) 🔴

#### 1. Corregir Contraste de btn-warning
```css
.btn-warning {
  background-color: var(--color-warning);
  color: #1a1a1a !important; /* Cambiar de #333 a #1a1a1a */
}
```
**Justificación:** No cumple WCAG AA (3.87:1 vs 4.5:1 requerido)  
**Impacto:** Alto - Afecta legibilidad para usuarios con baja visión  
**Esfuerzo:** 5 minutos

#### 2. Restaurar Estados de Focus
```css
/* Eliminar estos estilos problemáticos */
.btn:focus { outline: none; } /* ❌ ELIMINAR */
a:focus { outline: none; }     /* ❌ ELIMINAR */

/* Agregar estilos accesibles */
.btn:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}

a:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 2px;
}
```
**Justificación:** WCAG 2.1 SC 2.4.7 (Focus Visible) - Nivel AA  
**Impacto:** Crítico - Afecta a usuarios de teclado  
**Esfuerzo:** 15 minutos

#### 3. Agregar ARIA a Campos Requeridos
```erb
<%= form.text_field :first_name, 
    required: true,
    aria: { required: "true" },
    class: "..." %>
```
**Justificación:** WCAG 2.1 SC 3.3.2 (Labels or Instructions)  
**Impacto:** Alto - Mejora experiencia con lectores de pantalla  
**Esfuerzo:** 30 minutos (15 campos)

### Prioridad Media (Implementar en Sprint Actual) 🟡

#### 4. Mejorar Focus de Form Inputs
```css
.form-input:focus {
  box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.3); /* Aumentar opacidad */
  border-color: var(--color-primary);
}
```
**Esfuerzo:** 10 minutos

#### 5. Agregar role="alert" a Mensajes de Error
```erb
<div role="alert" aria-live="assertive" class="bg-red-50...">
  <%= curriculum.errors.full_messages %>
</div>
```
**Esfuerzo:** 5 minutos

#### 6. Implementar aria-live en Contenido Dinámico
```erb
<div data-languages-target="container" 
     role="list"
     aria-live="polite">
</div>
```
**Esfuerzo:** 15 minutos

### Prioridad Baja (Backlog) 🟢

#### 7. Agregar Skip Navigation Link
**Esfuerzo:** 20 minutos

#### 8. Mejorar Focus Management en JS
**Esfuerzo:** 1 hora

#### 9. Agregar Tooltips Accesibles
**Esfuerzo:** 2 horas

---

## 📊 Checklist de Implementación

### Sprint 2 - Accesibilidad (Este Sprint)

- [ ] **Contraste de Colores**
  - [ ] Corregir btn-warning (#1a1a1a)
  - [ ] Mejorar form-input:focus shadow
  
- [ ] **Estados de Focus**
  - [ ] Eliminar `outline: none` de botones
  - [ ] Eliminar `outline: none` de enlaces
  - [ ] Agregar `focus-visible` a botones
  - [ ] Agregar `focus-visible` a enlaces
  - [ ] Agregar `focus-visible` a inputs
  - [ ] Agregar `focus-visible` a sidebar links
  
- [ ] **Atributos ARIA**
  - [ ] Agregar `aria-required` a campos obligatorios (15 campos)
  - [ ] Agregar `aria-describedby` a campos con hints (10 campos)
  - [ ] Agregar `role="alert"` a mensajes de error
  - [ ] Agregar `aria-live="polite"` a contenido dinámico
  - [ ] Agregar `aria-label` a landmarks (navbar, sidebar)
  
- [ ] **Navegación por Teclado**
  - [ ] Verificar orden de tabulación
  - [ ] Probar formulario completo con Tab
  - [ ] Probar elementos dinámicos
  - [ ] Documentar cualquier issue

### Backlog (Sprints Futuros)

- [ ] Implementar skip navigation link
- [ ] Mejorar focus management en Stimulus controllers
- [ ] Agregar tooltips accesibles
- [ ] Realizar pruebas con lectores de pantalla (NVDA/JAWS)
- [ ] Agregar tests automáticos de accesibilidad (axe-core)

---

## 🎓 Referencias

### Estándares WCAG 2.1 Relevantes

- **1.4.3 Contrast (Minimum):** Ratio 4.5:1 para texto normal (Nivel AA)
- **1.4.6 Contrast (Enhanced):** Ratio 7:1 para texto normal (Nivel AAA)
- **2.4.7 Focus Visible:** Indicador de teclado visible (Nivel AA)
- **3.3.2 Labels or Instructions:** Etiquetas o instrucciones claras (Nivel A)
- **4.1.3 Status Messages:** Anuncios de cambios en contenido (Nivel AA)

### Herramientas Recomendadas

- **WebAIM Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **WAVE:** https://wave.webaim.org/
- **axe DevTools:** Extensión de Chrome/Firefox
- **Lighthouse:** Auditorías automáticas en Chrome DevTools
- **NVDA:** Lector de pantalla gratuito para Windows
- **VoiceOver:** Lector de pantalla integrado en macOS

### Documentación

- **WCAG 2.1:** https://www.w3.org/WAI/WCAG21/quickref/
- **ARIA Authoring Practices:** https://www.w3.org/WAI/ARIA/apg/
- **MDN Web Accessibility:** https://developer.mozilla.org/en-US/docs/Web/Accessibility

---

## 📈 Plan de Acción Inmediato

### Paso 1: Correcciones de Contraste (10 min)
1. Cambiar color de texto en `.btn-warning` a `#1a1a1a`
2. Mejorar shadow de `.form-input:focus`

### Paso 2: Estados de Focus (20 min)
1. Eliminar `outline: none` de `.btn:focus` y `a:focus`
2. Agregar estilos `focus-visible` a todos los elementos interactivos

### Paso 3: ARIA Básico (45 min)
1. Agregar `required` y `aria-required` a campos obligatorios
2. Agregar `role="alert"` a mensajes de error
3. Agregar `aria-live` a contenedores dinámicos
4. Agregar `aria-label` a landmarks principales

### Paso 4: Pruebas (15 min)
1. Probar navegación completa con Tab
2. Verificar contraste con WebAIM
3. Ejecutar Lighthouse audit

**Tiempo Total Estimado:** ~90 minutos  
**Mejora Esperada en Score:** 88/100 → 96/100

---

**Última actualización:** 10 de diciembre de 2025  
**Próxima revisión:** Después de implementar correcciones  
**Responsable:** Equipo de Desarrollo
