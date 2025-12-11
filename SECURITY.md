# Guía de Seguridad y Credenciales

## 🔐 Configuración de Credenciales

Este proyecto utiliza **Rails Encrypted Credentials** para gestionar información sensible de forma segura.

### Sistema de Credenciales de Rails

Rails 5.2+ incluye un sistema de credenciales encriptadas que almacena secretos de forma segura:

- **`config/credentials.yml.enc`**: Archivo encriptado con las credenciales (✅ commiteado)
- **`config/master.key`**: Clave de desencriptación (⛔ NO commiteado, .gitignore)

### Editar Credenciales

Para agregar o modificar credenciales sensibles:

```bash
# Abrir el editor de credenciales (usa EDITOR env var o nano por defecto)
rails credentials:edit

# O especificar el editor:
EDITOR="code --wait" rails credentials:edit
EDITOR="nano" rails credentials:edit
```

### Estructura de Credenciales

Ejemplo de estructura en `config/credentials.yml.enc`:

```yaml
# AWS S3 para almacenamiento de archivos en producción
aws:
  access_key_id: YOUR_AWS_ACCESS_KEY_ID
  secret_access_key: YOUR_AWS_SECRET_ACCESS_KEY
  region: us-east-1
  bucket: your-bucket-name

# SMTP para envío de correos
smtp:
  address: smtp.gmail.com
  port: 587
  domain: your-domain.com
  username: your-email@gmail.com
  password: your-app-password

# API Keys externas
external_api:
  api_key: your_api_key_here
  api_secret: your_api_secret_here
```

### Acceder a Credenciales en el Código

```ruby
# Obtener una credencial
Rails.application.credentials.dig(:aws, :access_key_id)
Rails.application.credentials.smtp[:username]

# Con valor por defecto
Rails.application.credentials.dig(:external_api, :api_key) || 'default_value'
```

## 🔒 Variables de Entorno (.env)

Para configuración no sensible o desarrollo local, se pueden usar variables de entorno:

### Configuración Inicial

1. **Copiar el ejemplo**:
   ```bash
   cp .env.example .env
   ```

2. **Llenar valores reales en `.env`** (nunca commitear este archivo)

3. **Usar en la aplicación**:
   ```ruby
   ENV.fetch("RAILS_MAX_THREADS") { 5 }
   ENV['DATABASE_HOST']
   ```

### ⚠️ IMPORTANTE: Archivos en .gitignore

Estos archivos **NUNCA** deben commitearse:

```ignore
# .gitignore
/.env*                    # Todos los archivos .env
/config/*.key             # master.key y otros *.key
/storage/*                # Archivos subidos en desarrollo
```

## 🛡️ Buenas Prácticas de Seguridad

### ✅ DO (Hacer)

1. **Usar Rails Credentials** para secretos:
   - API keys
   - AWS credentials
   - SMTP passwords
   - Secret keys

2. **Usar ENV vars** para configuración:
   - Database hosts
   - Número de threads
   - Feature flags

3. **Commitear** archivos seguros:
   - `config/credentials.yml.enc` (encriptado)
   - `.env.example` (sin valores reales)
   - Configuraciones públicas

4. **Rotar credenciales** periódicamente

5. **Usar diferentes credenciales** para cada entorno (dev, staging, prod)

### ⛔ DON'T (No Hacer)

1. **Nunca commitear**:
   - `config/master.key`
   - `.env` files con valores reales
   - Passwords o API keys en código

2. **No hardcodear** secretos en:
   - Controllers
   - Models
   - Config files
   - Migrations

3. **No compartir** `master.key` por:
   - Email
   - Slack/Chat
   - Sistemas de control de versiones

4. **No usar** la misma credencial en múltiples entornos

## 🚀 Configuración de Entornos

### Desarrollo (Development)

- **Master Key**: Cada desarrollador tiene su propio `config/master.key`
- **Compartir**: El líder de equipo comparte la key de forma segura (1Password, LastPass)
- **Database**: PostgreSQL local sin password (peer authentication)

### Staging/Producción

```bash
# Configurar master.key en el servidor
echo "your_master_key_content" > config/master.key
chmod 600 config/master.key

# O usar variable de entorno (Heroku, AWS)
export RAILS_MASTER_KEY=your_master_key_content
```

### Heroku

```bash
# Configurar master key en Heroku
heroku config:set RAILS_MASTER_KEY=$(cat config/master.key)
```

### Docker

```yaml
# docker-compose.yml
services:
  web:
    environment:
      - RAILS_MASTER_KEY=${RAILS_MASTER_KEY}
    # O montar el archivo:
    volumes:
      - ./config/master.key:/app/config/master.key:ro
```

## 📋 Checklist de Seguridad

Antes de hacer deploy:

- [ ] `config/master.key` está en `.gitignore` ✅
- [ ] `.env*` archivos están en `.gitignore` ✅
- [ ] No hay secretos hardcodeados en el código ✅
- [ ] `.env.example` está actualizado con variables necesarias ✅
- [ ] Credenciales de producción están configuradas en el servidor
- [ ] AWS/SMTP credentials están en Rails credentials ✅
- [ ] Database usa ENV vars o credentials ✅
- [ ] `config/credentials.yml.enc` está commiteado ✅

## 🔧 Troubleshooting

### Error: "Missing encryption key"

```bash
# Significa que falta config/master.key
# Solución: Obtener la key del equipo o regenerar:
rails credentials:edit  # Generará nueva key si no existe
```

### Error: "Couldn't decrypt credentials"

```bash
# master.key no coincide con credentials.yml.enc
# Solución: Obtener la master.key correcta del equipo
```

### Regenerar Credenciales (⚠️ Pérdida de datos)

```bash
# CUIDADO: Esto borra las credenciales existentes
rm config/credentials.yml.enc config/master.key
rails credentials:edit  # Crea nuevos archivos
```

## 📚 Referencias

- [Rails Credentials Guide](https://guides.rubyonrails.org/security.html#custom-credentials)
- [Dotenv Gem](https://github.com/bkeepers/dotenv)
- [Rails Security Guide](https://guides.rubyonrails.org/security.html)
