# Onboarding Record

Sistema de gestión de currículums y aspirantes para procesos de onboarding empresarial.

## 📋 Descripción

Plataforma web que permite a aspirantes crear y gestionar sus currículums, mientras que reclutadores y administradores pueden revisar, filtrar y gestionar candidatos de forma eficiente.

## 🛠️ Stack Tecnológico

- **Ruby**: 3.2.2
- **Rails**: 8.1.1
- **Base de Datos**: PostgreSQL 16
- **Frontend**: 
  - Hotwire (Turbo + Stimulus)
  - Tailwind CSS v4.1.16
- **Autenticación**: Devise 4.9.4
- **Autorización**: CanCanCan + Custom Concerns
- **Asset Pipeline**: Propshaft + Importmap
- **Performance**: Bullet gem (N+1 query detection)

## 🚀 Instalación

### Prerrequisitos

- Ruby 3.2.2 (recomendado usar RVM o rbenv)
- PostgreSQL 16
- Node.js (para asset compilation)
- Git

### Configuración Inicial

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd onboarding_record
   ```

2. **Instalar dependencias**
   ```bash
   bundle install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   # Editar .env con tus valores locales (opcional para desarrollo)
   ```

4. **Configurar credenciales** (ver [SECURITY.md](SECURITY.md))
   ```bash
   # Obtener config/master.key del equipo
   # O generar nuevas credenciales (solo para desarrollo nuevo)
   EDITOR="code --wait" rails credentials:edit
   ```

5. **Configurar base de datos**
   ```bash
   # Crear base de datos
   rails db:create
   
   # Ejecutar migraciones
   rails db:migrate
   
   # Cargar datos de prueba (opcional)
   rails db:seed
   ```

6. **Iniciar servidor de desarrollo**
   ```bash
   ./bin/dev
   # O manualmente:
   rails server
   ```

7. **Acceder a la aplicación**
   ```
   http://localhost:3000
   ```

## 👥 Roles de Usuario

El sistema maneja tres roles principales:

### 1. **Aspirante** (Candidato)
- Crear y editar su currículum personal
- Subir foto de perfil
- Agregar estudios académicos (con nested forms dinámicos)
- Indicar disponibilidad para viajar/reubicación
- Especificar idiomas

### 2. **Reclutador**
- Ver lista de todos los aspirantes
- Revisar currículums de candidatos
- Filtrar y ordenar aspirantes
- Eliminar aspirantes (con confirmación)

### 3. **Administrador**
- Todas las funciones de reclutador
- Gestión completa de usuarios (CRUD)
- Cambiar roles de usuarios
- Editar información de cualquier usuario
- Acceso a panel de administración

## 🗂️ Estructura del Proyecto

### Concerns Implementados

El proyecto sigue principios **DRY** (Don't Repeat Yourself) con concerns reutilizables:

#### 1. **RoleScopes** (`app/models/concerns/role_scopes.rb`)
Scopes semánticos para el modelo User:
```ruby
User.aspirants           # Filtrar por role: aspirante
User.recruiters          # Filtrar por role: reclutador
User.admins              # Filtrar por role: admin
User.non_admins          # Todos excepto admin
User.recent(30)          # Usuarios de últimos 30 días
User.newest_first        # Ordenar por created_at DESC
User.by_email            # Ordenar por email ASC
```

#### 2. **Authorization** (`app/controllers/concerns/authorization.rb`)
Métodos de autorización centralizados:
```ruby
authorize_admin!                              # Requiere role: admin
authorize_recruiter!                          # Requiere role: reclutador
authorize_aspirant!                           # Requiere role: aspirante
authorize_ownership!(resource, 'recurso')     # Verificar propiedad
```

#### 3. **TurboStreamable** (`app/controllers/concerns/turbo_streamable.rb`)
Helper para respuestas Turbo Stream:
```ruby
respond_with_deletion(@user, admin_users_path, "Usuario #{email}")
```

### Scopes del Modelo Curriculum

```ruby
Curriculum.with_photo              # Con foto de perfil
Curriculum.without_photo           # Sin foto de perfil
Curriculum.available_to_travel     # Disponibles para viajar
Curriculum.available_to_relocate   # Disponibles para reubicación
Curriculum.by_education_level(level)  # Por nivel educativo
Curriculum.recent(30)              # Últimos 30 días
Curriculum.newest_first            # Más recientes primero
```

## 🔐 Seguridad

El proyecto implementa múltiples capas de seguridad:

- **Rails Encrypted Credentials**: Secretos encriptados en `config/credentials.yml.enc`
- **.gitignore**: Archivos sensibles excluidos (`.env*`, `config/*.key`, `/storage/*`)
- **ENV.fetch Pattern**: Variables de entorno con valores por defecto
- **CanCanCan**: Autorización basada en roles
- **Devise**: Autenticación segura con bcrypt
- **Strong Parameters**: Protección contra mass assignment
- **CSRF Protection**: Tokens anti-CSRF en formularios

📖 **Ver documentación completa**: [SECURITY.md](SECURITY.md)

## 🎨 Características de UI/UX

### Accesibilidad (WCAG 2.1 AA)
- ✅ Contraste de colores 4.5:1 mínimo
- ✅ Focus states visibles (3px outlines)
- ✅ ARIA attributes (roles, labels, descriptions)
- ✅ Navegación por teclado
- ✅ Semantic HTML5 (nav, main, section, article)

### Componentes Interactivos
- **Modales centrados**: Confirmaciones de eliminación
- **Toasts**: Notificaciones bottom-right
- **Turbo Frames**: Edición inline sin recargar página
- **Nested Forms**: Agregar/eliminar estudios dinámicamente (Stimulus)
- **Active Storage**: Subida y preview de fotos

## ⚡ Optimizaciones de Rendimiento

### N+1 Query Detection (Bullet Gem)
```ruby
# config/environments/development.rb
config.after_initialize do
  Bullet.enable = true
  Bullet.alert = false
  Bullet.bullet_logger = true
  Bullet.console = true
  Bullet.rails_logger = true
end
```

### Eager Loading Selectivo
```ruby
# Solo en acciones que necesitan la asociación
before_action :load_studies, only: [:show, :edit]

def load_studies
  @curriculum.studies.load
end
```

## 📝 Deprecation Warnings

El proyecto documenta y gestiona deprecations en [DEPRECATIONS.md](DEPRECATIONS.md):
- ✅ Auditoría completa de código propio: 0 deprecations
- ⚠️ Devise warnings externos (no accionables)
- 📅 Plan de migración para Rails 8.2

## 🧪 Testing

```bash
# Ejecutar test suite (cuando esté implementada)
rails test

# Test específico
rails test test/models/user_test.rb
```

## 📦 Comandos Útiles

```bash
# Consola de Rails
rails console

# Ver rutas
rails routes

# Ver tasks disponibles
rails -T

# Generar nuevo modelo
rails generate model ModelName field:type

# Generar nuevo controller
rails generate controller ControllerName action1 action2

# Crear migración
rails generate migration MigrationName

# Rollback última migración
rails db:rollback

# Ver estado de migraciones
rails db:migrate:status

# Limpiar base de datos (cuidado en producción)
rails db:reset
```

## 🐛 Troubleshooting

### Base de datos no se conecta
```bash
# Verificar que PostgreSQL está corriendo
sudo systemctl status postgresql

# Iniciar PostgreSQL
sudo systemctl start postgresql

# Recrear base de datos
rails db:drop db:create db:migrate db:seed
```

### Asset pipeline no compila
```bash
# Limpiar assets
rails assets:clobber

# Precompilar assets
rails assets:precompile
```

### Bullet warnings molestos
```bash
# Desactivar temporalmente en config/environments/development.rb
config.after_initialize do
  Bullet.enable = false
end
```

## 📚 Recursos

- [Ruby on Rails Guides](https://guides.rubyonrails.org/)
- [Devise Documentation](https://github.com/heartcombo/devise)
- [Hotwire Turbo](https://turbo.hotwired.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 🤝 Contribución

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

### Estándares de Código
- Seguir [Ruby Style Guide](https://rubystyle.guide/)
- Usar concerns para código reutilizable
- Escribir scopes semánticos en modelos
- Documentar métodos complejos
- Agregar tests para nuevas features

## 📄 Licencia

Este proyecto es privado y confidencial.

## 👨‍💻 Autor

Carlos Andrés Pérez Ochoa
- Email: capaisa12@hotmail.com

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2025
