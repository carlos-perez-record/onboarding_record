# Modelo Relacional - Onboarding Record

## Diagrama Esquemático (ER Diagram)

```
╔════════════════════════════════════════════════════════════════════════╗
║                            TABLA: USERS                               ║
╠════════════════════════════════════════════════════════════════════════╣
║                                                                        ║
║  PK │ id                          INTEGER (Auto-increment)            ║
║     │ email                       VARCHAR(255) [UNIQUE, NOT NULL]     ║
║     │ encrypted_password          VARCHAR(255) [NOT NULL]             ║
║     │ reset_password_token        VARCHAR(255) [UNIQUE, NULL]         ║
║     │ reset_password_sent_at      TIMESTAMP [NULL]                    ║
║     │ remember_created_at         TIMESTAMP [NULL]                    ║
║     │ role                        INTEGER [DEFAULT: 1, NOT NULL]      ║
║     │ created_at                  TIMESTAMP [NOT NULL]                ║
║     │ updated_at                  TIMESTAMP [NOT NULL]                ║
║                                                                        ║
║  ÍNDICES:                                                             ║
║  ├─ index_users_on_email (UNIQUE)                                    ║
║  ├─ index_users_on_reset_password_token (UNIQUE)                     ║
║  └─ index_users_on_role                                              ║
║                                                                        ║
╚════════════════════════════════════════════════════════════════════════╝
```

---

## Descripción Detallada de Columnas

### Tabla: `users`

| Columna | Tipo | Restricciones | Descripción |
|---------|------|---------------|-------------|
| **id** | INTEGER | PK, AUTO_INCREMENT | Identificador único del usuario |
| **email** | VARCHAR(255) | UNIQUE, NOT NULL | Correo electrónico del usuario (único en el sistema) |
| **encrypted_password** | VARCHAR(255) | NOT NULL | Contraseña hasheada con bcrypt |
| **reset_password_token** | VARCHAR(255) | UNIQUE, NULL | Token temporal para recuperación de contraseña |
| **reset_password_sent_at** | TIMESTAMP | NULL | Momento en que se envió el email de reset |
| **remember_created_at** | TIMESTAMP | NULL | Momento de creación del token de "recuérdame" |
| **role** | INTEGER | DEFAULT: 1, NOT NULL | Rol del usuario (0=admin, 1=usuario, 2=reclutador) |
| **created_at** | TIMESTAMP | NOT NULL | Momento de creación del registro |
| **updated_at** | TIMESTAMP | NOT NULL | Momento de última actualización |

---

## Índices

```sql
CREATE UNIQUE INDEX index_users_on_email 
  ON users(email);

CREATE UNIQUE INDEX index_users_on_reset_password_token 
  ON users(reset_password_token);

CREATE INDEX index_users_on_role 
  ON users(role);
```

### Propósito de índices:

| Índice | Tipo | Propósito |
|--------|------|----------|
| `email` | UNIQUE | Garantiza unicidad de emails y acelera búsquedas por email en login |
| `reset_password_token` | UNIQUE | Asegura que cada token es único y permite búsquedas rápidas en recuperación de contraseña |
| `role` | REGULAR | Optimiza queries que filtran por rol (ej: `User.where(role: :admin)`) |

---

## Enumeración de Roles

```ruby
# En app/models/user.rb
enum :role, { admin: 0, usuario: 1, recruiter: 2 }
```

| Valor | Nombre | Descripción | Permisos |
|-------|--------|-------------|----------|
| **0** | `admin` | Administrador | Acceso completo a gestión de usuarios |
| **1** | `usuario` | Usuario estándar | Acceso básico a la plataforma |
| **2** | `recruiter` | Reclutador | Reservado para futuras funcionalidades |

---

## Relaciones

### Estado Actual
Actualmente, la aplicación tiene **una única tabla** (`users`). No hay relaciones con otras entidades.

### Relaciones Potenciales Futuras

Si la aplicación evoluciona, se podrían agregar:

```
users (1) ──────────── (N) job_postings
                          ├─ id (PK)
                          ├─ recruiter_id (FK → users.id)
                          ├─ title
                          ├─ description
                          └─ created_at

users (1) ──────────── (N) applications
                          ├─ id (PK)
                          ├─ user_id (FK → users.id)
                          ├─ job_posting_id (FK → job_postings.id)
                          ├─ status
                          └─ created_at

users (1) ──────────── (N) audit_logs
                          ├─ id (PK)
                          ├─ user_id (FK → users.id)
                          ├─ action
                          ├─ resource_type
                          ├─ resource_id
                          └─ created_at
```

---

## Migración Actual

```ruby
# db/migrate/20251202212855_add_role_to_users.rb
class AddRoleToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :role, :integer, default: 1, null: false
    add_index :users, :role
  end
end
```

---

## Estadísticas Actuales

- **Tabla:** 1 (users)
- **Columnas:** 9
- **Índices:** 3
- **Relaciones:** 0 (sin FK externas)
- **Enumeraciones:** 1 (roles)
- **Base de datos:** PostgreSQL
- **Usuarios registrados:** 3 (incluye 1 admin)

---

## Notas Técnicas

### Seguridad
- ✅ Contraseñas hasheadas con bcrypt (nunca se almacenan en texto plano)
- ✅ Email único previene duplicados
- ✅ Reset token único y temporal para recuperación segura
- ✅ Índices para prevenir ataques de fuerza bruta (búsquedas rápidas)

### Rendimiento
- ✅ Índices en columnas frecuentemente consultadas (email, role)
- ✅ Índice único en reset_password_token para búsquedas rápidas
- ✅ Estructura simple y desnormalizada (apropiada para esta fase)

### Escalabilidad Futura
La estructura actual es flexible para agregar:
- Más roles o permisos granulares
- Auditoría y logs de actividad
- Relaciones con procesos de selección
- Perfiles extendidos de usuarios
