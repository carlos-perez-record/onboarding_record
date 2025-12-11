# 📋 Plan de Acción - Buenas Prácticas | Onboarding Record

**Fecha de creación:** 10 de diciembre de 2025  
**Última actualización:** 10 de diciembre de 2025  
**Estado:** Activo - Inicio 11 de diciembre 2025

---

## 🎯 Objetivo

Consolidar todas las buenas prácticas de desarrollo para:
- **Frontend:** Tailwind CSS, Stimulus JS, Accesibilidad
- **Backend:** Ruby on Rails, ActiveRecord, Seguridad
- **Calidad:** Testing, Performance, Mantenibilidad

---

## 🚫 PROHIBICIONES ABSOLUTAS

### ❌ NUNCA en el código:
1. **CSS Inline** - `<div style="color: red">`
2. **JavaScript Inline** - `<button onclick="alert()">`
3. **Event handlers inline** - `<a href="#" onclick="...">`
4. **Strong Parameters abiertos** - `params.permit!`
5. **Secrets hardcodeados** - Contraseñas, API keys en código

### ✅ SIEMPRE en el código:
1. **Tailwind utilities** para estilos
2. **Stimulus controllers** para JavaScript
3. **Data attributes** para configuración
4. **Strong parameters** explícitos
5. **Rails.credentials** para secrets

---

## 📊 ESTADO ACTUAL DEL PROYECTO

### ✅ Ya Implementado (62%)
- Seguridad: Devise + CanCanCan
- Diseño: Tailwind CSS v4 con variables CSS
- Responsive: Mobile/Tablet/Desktop
- JavaScript: 10 controladores Stimulus
- UX: Toasts, modales, validación en tiempo real
- Validaciones: Modelo + Base de datos

### ⚠️ Parcialmente Implementado (23%)
- Accesibilidad: 15% (faltan ARIA, focus, contraste)
- Performance: N+1 queries documentadas pero no resueltas
- DRY: Algunos concerns, falta refactorización
- MVC: Controladores con algo de lógica extraíble

### ❌ No Implementado (15%)
- Testing: 0% de cobertura
- Service Objects: Sin implementar
- Scopes: Sin definir en modelos
- Caching: Sin implementar
- Background Jobs: Sin configurar

---

## 🔴 SPRINT 1: CRÍTICO (Día 1-2 | ~3.5 horas)

**Objetivo:** Resolver issues críticos que afectan accesibilidad y performance

### 1. Accesibilidad WCAG 2.1 AA - 90 min
**Score actual:** 88/100 → **Objetivo:** 96/100

#### Contraste de Colores (10 min)
- [ ] Corregir `btn-warning` en `custom.css`:
  ```css
  .btn-warning {
    color: #1a1a1a !important; /* Cambiar de #333 */
  }
  ```
- [ ] Mejorar `form-input:focus` shadow:
  ```css
  .form-input:focus {
    box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.3); /* Aumentar opacidad */
  }
  ```

#### Estados de Focus (20 min)
- [ ] Eliminar en `custom.css`:
  ```css
  /* ❌ ELIMINAR ESTOS */
  .btn:focus { outline: none; }
  a:focus { outline: none; }
  ```
- [ ] Agregar focus visible:
  ```css
  .btn:focus-visible {
    outline: 3px solid var(--color-primary);
    outline-offset: 2px;
  }
  
  a:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
    border-radius: 2px;
  }
  
  .form-input:focus-visible {
    outline: 3px solid var(--color-primary);
    outline-offset: 0;
  }
  ```

#### Atributos ARIA (45 min)
**Archivos a modificar:** `app/views/curriculums/_form.html.erb`

- [ ] Campos obligatorios (15 campos):
  ```erb
  <%= form.text_field :first_name, 
      required: true,
      aria: { required: "true" },
      class: "form-input" %>
  ```

- [ ] Campos con hints (10 campos):
  ```erb
  <%= form.text_field :phone_number,
      aria: { describedby: "phone_hint" } %>
  <small id="phone_hint">Formato: 3001234567</small>
  ```

- [ ] Mensajes de error:
  ```erb
  <div role="alert" 
       aria-live="assertive" 
       class="bg-red-50 border-l-4 border-red-500 p-4">
    <!-- errores -->
  </div>
  ```

- [ ] Contenido dinámico:
  ```erb
  <div data-languages-target="container"
       role="list"
       aria-live="polite"
       aria-label="Idiomas agregados">
  ```

- [ ] Landmarks:
  ```erb
  <nav aria-label="Navegación principal">
  <aside role="navigation" aria-label="Menú lateral">
  <main id="main-content">
  ```

#### Pruebas (15 min)
- [ ] Navegar toda la aplicación con `Tab`
- [ ] Verificar focus visible en todos los elementos
- [ ] Probar con lector de pantalla (opcional)
- [ ] Ejecutar Lighthouse audit

---

### 2. Optimización N+1 Queries - 60 min

#### Agregar Eager Loading (30 min)
**Archivo:** `app/controllers/curriculums_controller.rb`

```ruby
# index action
def index
  @curriculums = Curriculum.includes(:user, :studies, photo_attachment: :blob)
                           .accessible_by(current_ability)
end

# show action
def show
  @curriculum = Curriculum.includes(:studies, photo_attachment: :blob)
                          .find(params[:id])
end
```

**Archivo:** `app/controllers/admin/users_controller.rb`
```ruby
def index
  @users = User.includes(:curriculum).all
end
```

#### Agregar Índices en BD (30 min)
**Crear migración:** `rails g migration AddMissingIndexes`

```ruby
class AddMissingIndexes < ActiveRecord::Migration[8.1]
  def change
    add_index :curriculums, :user_id unless index_exists?(:curriculums, :user_id)
    add_index :studies, :curriculum_id unless index_exists?(:studies, :curriculum_id)
    add_index :users, :email unless index_exists?(:users, :email)
    
    # Índices compuestos para búsquedas frecuentes
    add_index :curriculums, [:user_id, :created_at]
    add_index :studies, [:curriculum_id, :status]
  end
end
```

**Ejecutar:**
```bash
rails db:migrate
```

**Verificar:**
- [ ] Instalar `gem 'bullet'` en development
- [ ] Revisar logs: no debe haber warnings de N+1

---

### 3. Posición del Modal - 30 min

**Archivo:** `app/assets/stylesheets/custom.css`

**Opción A: CSS (intentar primero)**
```css
.modal-backdrop {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 24px;
}

.modal-dialog {
  max-width: 400px;
  width: auto;
  min-width: 320px;
  margin: 0; /* Importante */
}
```

**Opción B: JavaScript si CSS no funciona**
```javascript
// En modal_controller.js
show(event) {
  // ... código existente ...
  
  // Posicionar manualmente
  const dialog = this.dialogTarget;
  dialog.style.position = 'fixed';
  dialog.style.bottom = '24px';
  dialog.style.right = '24px';
  dialog.style.margin = '0';
}
```

**Probar:**
- [ ] Recompilar CSS: `bin/rails tailwindcss:build`
- [ ] Reiniciar servidor
- [ ] Hard refresh (Ctrl+Shift+R)
- [ ] Verificar modal en esquina inferior derecha

---

### 4. Deprecation Warnings - 15 min

**Archivo:** `config/routes.rb`

**Cambiar:**
```ruby
# ❌ ANTES (sintaxis deprecada)
resource :curriculum, only: [:show, :edit, :update, :destroy],
                     path: 'curriculum',
                     path_names: { edit: 'editar' },
                     controller: 'curriculums'

# ✅ DESPUÉS (sintaxis Rails 8.2)
resource :curriculum, 
  only: :show, 
  show: true, 
  edit: 'editar', 
  update: true, 
  destroy: true,
  path: 'curriculum',
  controller: 'curriculums'
```

**Verificar:**
- [ ] Servidor sin warnings de deprecation
- [ ] Rutas funcionan correctamente: `rails routes | grep curriculum`

---

## 🟡 SPRINT 2: ALTA PRIORIDAD (Día 3-4 | ~4 horas)

**Objetivo:** Mejorar calidad de código y agregar testing básico

### 5. Refactorización de Controladores - 45 min

**Archivo:** `app/controllers/curriculums_controller.rb`

#### Extraer lógica a métodos privados
```ruby
class CurriculumsController < ApplicationController
  # ANTES: método create con 30 líneas
  def create
    @curriculum = current_user.build_curriculum(curriculum_params)
    if @curriculum.save
      redirect_to @curriculum, notice: 'Creado'
    else
      render :new, status: :unprocessable_entity
    end
  end
  
  # DESPUÉS: método corto, lógica delegada
  def create
    @curriculum = build_curriculum
    if @curriculum.save
      handle_successful_creation
    else
      handle_failed_creation
    end
  end
  
  private
  
  def build_curriculum
    current_user.build_curriculum(curriculum_params)
  end
  
  def handle_successful_creation
    redirect_to @curriculum, notice: t('.success')
  end
  
  def handle_failed_creation
    render :new, status: :unprocessable_entity
  end
end
```

**Reglas:**
- [ ] Máximo 10 líneas por método
- [ ] Un método = una responsabilidad
- [ ] Nombres descriptivos

---

### 6. Scopes en Modelos - 30 min

**Archivo:** `app/models/curriculum.rb`
```ruby
class Curriculum < ApplicationRecord
  # Scopes para búsquedas comunes
  scope :by_user, ->(user) { where(user: user) }
  scope :with_photo, -> { joins(:photo_attachment) }
  scope :complete, -> { where.not(education_level: nil) }
  scope :recent, -> { order(created_at: :desc) }
  scope :search_by_name, ->(query) { 
    where("first_name ILIKE ? OR last_name ILIKE ?", "%#{query}%", "%#{query}%") 
  }
end
```

**Archivo:** `app/models/study.rb`
```ruby
class Study < ApplicationRecord
  scope :finalized, -> { where(status: 'finalizado') }
  scope :in_progress, -> { where(status: 'en_curso') }
  scope :paused, -> { where(status: 'pausado') }
  scope :by_date, -> { order(start_date: :desc) }
end
```

**Usar en controladores:**
```ruby
# Antes
@curriculums = Curriculum.where(user: current_user).order(created_at: :desc)

# Después
@curriculums = Curriculum.by_user(current_user).recent
```

---

### 7. DRY - Concerns - 30 min

**Crear:** `app/models/concerns/photoable.rb`
```ruby
module Photoable
  extend ActiveSupport::Concern
  
  included do
    has_one_attached :photo
    
    validate :validate_photo, if: -> { photo.attached? }
  end
  
  private
  
  def validate_photo
    return unless photo.attached?
    
    validate_photo_presence
    validate_photo_size
    validate_photo_format
  end
  
  def validate_photo_presence
    errors.add(:photo, "debe estar presente") unless photo.attached?
  end
  
  def validate_photo_size
    if photo.blob.byte_size > 5.megabytes
      errors.add(:photo, "no debe pesar más de 5 MB")
    end
  end
  
  def validate_photo_format
    acceptable_types = ["image/jpeg", "image/png", "image/gif"]
    unless acceptable_types.include?(photo.blob.content_type)
      errors.add(:photo, "debe ser JPG, PNG o GIF")
    end
  end
end
```

**Usar en modelo:**
```ruby
class Curriculum < ApplicationRecord
  include Photoable
  # ... resto del código
end
```

**Crear otros concerns si hay duplicación:**
- [ ] `Timestampable` (si hay lógica de fechas duplicada)
- [ ] `Searchable` (si hay búsquedas en múltiples modelos)

---

### 8. Testing Básico con RSpec - 2 horas

#### Instalación (15 min)
```bash
# Agregar a Gemfile
group :development, :test do
  gem 'rspec-rails'
  gem 'factory_bot_rails'
  gem 'faker'
end

group :test do
  gem 'shoulda-matchers'
  gem 'simplecov', require: false
end

bundle install
rails generate rspec:install
```

**Configurar:** `spec/rails_helper.rb`
```ruby
require 'simplecov'
SimpleCov.start 'rails'

RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
  
  Shoulda::Matchers.configure do |config|
    config.integrate do |with|
      with.test_framework :rspec
      with.library :rails
    end
  end
end
```

#### Factories (15 min)
**Crear:** `spec/factories/users.rb`
```ruby
FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { 'password123' }
    role { :aspirant }
    
    trait :admin do
      role { :admin }
    end
    
    trait :recruiter do
      role { :recruiter }
    end
  end
end
```

**Crear:** `spec/factories/curriculums.rb`
```ruby
FactoryBot.define do
  factory :curriculum do
    association :user
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    birth_date { 25.years.ago }
    identification { Faker::IDNumber.valid }
    phone_number { '3001234567' }
    education_level { 'profesional' }
  end
end
```

#### Tests de Modelo (45 min)
**Crear:** `spec/models/curriculum_spec.rb`
```ruby
require 'rails_helper'

RSpec.describe Curriculum, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
    it { should have_many(:studies).dependent(:destroy) }
  end
  
  describe 'validations' do
    it { should validate_presence_of(:first_name) }
    it { should validate_presence_of(:last_name) }
    it { should validate_presence_of(:birth_date) }
    it { should validate_length_of(:first_name).is_at_least(2) }
    
    it 'validates phone number format' do
      curriculum = build(:curriculum, phone_number: '123')
      expect(curriculum).not_to be_valid
      expect(curriculum.errors[:phone_number]).to be_present
    end
  end
  
  describe 'scopes' do
    let!(:user1) { create(:user) }
    let!(:user2) { create(:user) }
    let!(:curriculum1) { create(:curriculum, user: user1) }
    let!(:curriculum2) { create(:curriculum, user: user2) }
    
    it 'filters by user' do
      expect(Curriculum.by_user(user1)).to eq([curriculum1])
    end
  end
end
```

#### Tests de Autorización (30 min)
**Crear:** `spec/models/ability_spec.rb`
```ruby
require 'rails_helper'
require 'cancan/matchers'

RSpec.describe Ability, type: :model do
  describe 'Admin' do
    let(:admin) { create(:user, :admin) }
    let(:ability) { Ability.new(admin) }
    
    it 'can manage all' do
      expect(ability).to be_able_to(:manage, :all)
    end
  end
  
  describe 'Aspirant' do
    let(:aspirant) { create(:user, :aspirant) }
    let(:ability) { Ability.new(aspirant) }
    let(:own_curriculum) { create(:curriculum, user: aspirant) }
    let(:other_curriculum) { create(:curriculum) }
    
    it 'can manage own curriculum' do
      expect(ability).to be_able_to(:manage, own_curriculum)
    end
    
    it 'cannot manage other curriculum' do
      expect(ability).not_to be_able_to(:manage, other_curriculum)
    end
  end
end
```

#### Ejecutar tests (15 min)
```bash
bundle exec rspec
bundle exec rspec --format documentation
open coverage/index.html  # Ver cobertura
```

**Objetivo:** Cobertura mínima 80%

---

### 9. Credenciales Seguras - 15 min

#### Auditar código
```bash
# Buscar posibles secrets hardcodeados
grep -r "password\s*=\s*['\"]" app/
grep -r "api_key\s*=\s*['\"]" app/
grep -r "secret\s*=\s*['\"]" app/
```

#### Verificar database.yml
```yaml
# ❌ EVITAR
production:
  password: "mi_password_123"

# ✅ CORRECTO
production:
  password: <%= ENV['DATABASE_PASSWORD'] %>
```

#### Usar Rails.credentials
```bash
EDITOR="code --wait" rails credentials:edit

# Agregar:
database:
  password: mi_password_seguro
  
api_keys:
  aws: AKIAIOSFODNN7EXAMPLE
```

**Usar en código:**
```ruby
Rails.credentials.database[:password]
Rails.credentials.dig(:api_keys, :aws)
```

#### Verificar .gitignore
```
# .gitignore debe incluir:
/config/master.key
/config/credentials/*.key
.env
.env.*
```

---

## 🟢 SPRINT 3: MEJORAS (Día 5+ | Backlog)

**Objetivo:** Optimizaciones y features opcionales según necesidad del proyecto

### 10. Service Objects (Cuando sea necesario)

**Cuándo crear Service Objects:**
- Lógica que involucra múltiples modelos
- Procesos complejos de negocio (>15 líneas)
- Interacción con APIs externas
- Procesamiento de archivos complejos

**Ejemplo:** `app/services/curriculum_creation_service.rb`
```ruby
class CurriculumCreationService
  def initialize(user, params)
    @user = user
    @params = params
  end
  
  def call
    ActiveRecord::Base.transaction do
      create_curriculum
      process_photo if photo_present?
      send_notification
      curriculum
    end
  rescue => e
    Rails.logger.error("Error creating curriculum: #{e.message}")
    false
  end
  
  private
  
  attr_reader :user, :params, :curriculum
  
  def create_curriculum
    @curriculum = user.create_curriculum!(curriculum_params)
  end
  
  def process_photo
    # Lógica de procesamiento de imagen
  end
  
  def send_notification
    # Enviar email o notificación
  end
  
  def photo_present?
    params[:photo].present?
  end
  
  def curriculum_params
    params.permit(:first_name, :last_name, ...)
  end
end
```

**Usar en controlador:**
```ruby
def create
  service = CurriculumCreationService.new(current_user, params[:curriculum])
  if service.call
    redirect_to service.curriculum
  else
    render :new
  end
end
```

---

### 11. Fragment Caching (Si hay problemas de performance)

**Cuándo implementar:**
- Vistas que tardan >200ms en renderizar
- Contenido que cambia poco
- Listados grandes

**Ejemplo en vistas:**
```erb
<!-- app/views/curriculums/index.html.erb -->
<% @curriculums.each do |curriculum| %>
  <% cache curriculum do %>
    <%= render curriculum %>
  <% end %>
<% end %>
```

**Russian Doll Caching:**
```erb
<!-- app/views/curriculums/show.html.erb -->
<% cache @curriculum do %>
  <h1><%= @curriculum.full_name %></h1>
  
  <% cache [@curriculum, 'studies'] do %>
    <%= render @curriculum.studies %>
  <% end %>
<% end %>
```

**Configurar Redis:**
```ruby
# config/environments/production.rb
config.cache_store = :redis_cache_store, { url: ENV['REDIS_URL'] }
```

---

### 12. Background Jobs (Si hay tareas pesadas)

**Cuándo implementar:**
- Procesamiento que tarda >500ms
- Envío de emails
- Procesamiento de imágenes
- Generación de reportes

**Instalar Sidekiq:**
```ruby
# Gemfile
gem 'sidekiq'

# config/application.rb
config.active_job.queue_adapter = :sidekiq
```

**Crear Job:**
```ruby
# app/jobs/photo_processing_job.rb
class PhotoProcessingJob < ApplicationJob
  queue_as :default
  
  def perform(curriculum_id)
    curriculum = Curriculum.find(curriculum_id)
    # Procesar imagen
  end
end
```

**Usar:**
```ruby
PhotoProcessingJob.perform_later(curriculum.id)
```

---

### 13. Internacionalización i18n (Si requieren multi-idioma)

**Configurar locales:**
```ruby
# config/application.rb
config.i18n.default_locale = :es
config.i18n.available_locales = [:es, :en]
```

**Crear archivos de traducción:**
```yaml
# config/locales/es.yml
es:
  curriculums:
    new:
      title: "Crear Currículum"
      success: "Currículum creado exitosamente"
```

**Usar en vistas:**
```erb
<h1><%= t('.title') %></h1>
<%= form.submit t('.submit') %>
```

---

### 14. Panel Admin con ActiveAdmin (Opcional)

**Evaluar si vale la pena:**
- ✅ Si: Requieren admin complejo con filtros, exports, etc.
- ❌ No: Si panel actual es suficiente

**Instalar:**
```bash
gem 'activeadmin'
rails generate active_admin:install
```

**Crear recursos:**
```ruby
# app/admin/curriculums.rb
ActiveAdmin.register Curriculum do
  permit_params :first_name, :last_name, :email
  
  index do
    selectable_column
    id_column
    column :full_name
    column :user
    column :created_at
    actions
  end
  
  filter :first_name
  filter :last_name
  filter :created_at
end
```

---

## 📚 CHECKLIST DE BUENAS PRÁCTICAS

### ✅ Para CADA funcionalidad nueva:

#### Frontend
- [ ] Usar Tailwind utilities (NO CSS custom)
- [ ] Responsive desde el inicio (mobile-first)
- [ ] Stimulus controller si requiere JS
- [ ] ARIA attributes (labels, roles, live regions)
- [ ] Focus visible en elementos interactivos
- [ ] Contraste WCAG AA (4.5:1 mínimo)
- [ ] 🚫 CERO CSS inline
- [ ] 🚫 CERO JavaScript inline

#### Backend
- [ ] Validaciones en modelo
- [ ] Restricciones en BD (null: false, unique)
- [ ] Strong parameters explícitos
- [ ] Autorización con CanCanCan
- [ ] Eager loading (includes) si hay asociaciones
- [ ] Índices en columnas de búsqueda
- [ ] Scopes para consultas comunes
- [ ] Métodos cortos (<10 líneas)

#### Testing (cuando esté configurado)
- [ ] Tests de modelo (validaciones, asociaciones)
- [ ] Tests de autorización
- [ ] Tests de integración si es feature compleja

#### Seguridad
- [ ] Escapar HTML user-generated
- [ ] Validar archivos subidos
- [ ] Rate limiting en acciones sensibles
- [ ] Logs de acciones críticas

---

## 🎯 MÉTRICAS DE ÉXITO

### Después del Sprint 1 (Día 2):
- ✅ Accesibilidad: 88/100 → **96/100**
- ✅ N+1 queries: **0 warnings**
- ✅ Modal: **Posicionado correctamente**
- ✅ Server logs: **Sin deprecation warnings**

### Después del Sprint 2 (Día 4):
- ✅ Controladores: **Max 10 líneas/método**
- ✅ Tests: **80%+ cobertura**
- ✅ Secrets: **Ninguno hardcodeado**
- ✅ DRY: **Código no duplicado**

### Después del Sprint 3 (Backlog):
- ✅ Performance: **<200ms tiempo de respuesta**
- ✅ Features opcionales: **Según roadmap del producto**

---

## 📅 CRONOGRAMA DETALLADO

### **Miércoles 11 dic - Sprint 1 Parte 1** (2 horas)
- 09:00 - 10:30 | Accesibilidad (contraste + focus + ARIA)
- 10:30 - 11:00 | Break
- 11:00 - 12:00 | N+1 Queries (eager loading)

### **Miércoles 11 dic - Sprint 1 Parte 2** (1.5 horas)
- 14:00 - 14:30 | N+1 Queries (índices)
- 14:30 - 15:00 | Posición del Modal
- 15:00 - 15:15 | Deprecation Warnings

### **Jueves 12 dic - Sprint 2 Parte 1** (2.5 horas)
- 09:00 - 09:45 | Refactorización controladores
- 09:45 - 10:15 | Scopes en modelos
- 10:15 - 10:30 | Break
- 10:30 - 11:00 | DRY - Concerns
- 11:00 - 11:15 | Credenciales seguras

### **Viernes 13 dic - Sprint 2 Parte 2** (2 horas)
- 09:00 - 11:00 | Testing básico RSpec

### **Lunes 16 dic+ - Sprint 3** (Según necesidad)
- Implementar features de backlog según prioridad del proyecto

---

## 🔧 COMANDOS ÚTILES

### Testing
```bash
# Ejecutar todos los tests
bundle exec rspec

# Ejecutar tests de un archivo
bundle exec rspec spec/models/curriculum_spec.rb

# Ver cobertura
open coverage/index.html

# Tests con detalles
bundle exec rspec --format documentation
```

### Base de Datos
```bash
# Crear migración
rails g migration AddIndexToUsers email:index

# Ejecutar migraciones
rails db:migrate

# Rollback
rails db:rollback

# Ver estado
rails db:migrate:status
```

### Assets
```bash
# Compilar Tailwind
bin/rails tailwindcss:build

# Precompilar assets
rails assets:precompile

# Limpiar assets
rails assets:clobber
```

### Performance
```bash
# Instalar bullet (detecta N+1)
gem 'bullet', group: :development

# Ver logs de queries
tail -f log/development.log | grep "SELECT"
```

---

## 📖 REFERENCIAS

### Documentación Oficial
- **Rails Guides:** https://guides.rubyonrails.org/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Stimulus:** https://stimulus.hotwired.dev/
- **RSpec:** https://rspec.info/
- **WCAG 2.1:** https://www.w3.org/WAI/WCAG21/quickref/

### Gemas Útiles
- **Devise:** https://github.com/heartcombo/devise
- **CanCanCan:** https://github.com/CanCanCommunity/cancancan
- **Bullet:** https://github.com/flyerhzm/bullet
- **RuboCop:** https://github.com/rubocop/rubocop
- **SimpleCov:** https://github.com/simplecov-ruby/simplecov

### Herramientas de Accesibilidad
- **WAVE:** https://wave.webaim.org/
- **axe DevTools:** Chrome Extension
- **Lighthouse:** Chrome DevTools
- **Contrast Checker:** https://webaim.org/resources/contrastchecker/

---

## 📝 NOTAS FINALES

### Principios a seguir:
1. **Convención sobre Configuración** - Aprovechar Rails
2. **DRY** - No repetir código
3. **KISS** - Keep It Simple, Stupid
4. **YAGNI** - You Ain't Gonna Need It
5. **Testing** - Código testeado es código confiable

### Cuando algo no funciona:
1. Revisar logs: `tail -f log/development.log`
2. Consola Rails: `rails console`
3. Debugger: `binding.pry` (con gem pry)
4. Tests: `bundle exec rspec`
5. Preguntar al equipo

### Antes de hacer commit:
- [ ] Tests pasan
- [ ] Sin warnings en logs
- [ ] Código formateado
- [ ] Sin CSS/JS inline
- [ ] Accesibilidad verificada
- [ ] Mensaje de commit descriptivo

---

**¡Éxito en la implementación! 🚀**

*Última actualización: 10 de diciembre de 2025*  
*Próxima revisión: Después de completar Sprint 1*
