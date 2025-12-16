import { Controller } from "@hotwired/stimulus"

// Controlador para validaciones en tiempo real
// Proporciona feedback inmediato mientras el usuario escribe
export default class extends Controller {
  static targets = ["field", "error", "identificationField", "startDate", "endDate", "dateError"]
  static values = {
    type: String,
    minLength: Number,
    maxLength: Number,
    pattern: String,
    required: Boolean
  }

  connect() {
    // Agregar eventos de validación solo si existe el target field
    if (this.hasFieldTarget) {
      this.fieldTarget.addEventListener('blur', this.validate.bind(this))
      this.fieldTarget.addEventListener('input', this.clearErrorOnInput.bind(this))
    }
  }

  disconnect() {
    // Remover eventos solo si existe el target field
    if (this.hasFieldTarget) {
      this.fieldTarget.removeEventListener('blur', this.validate.bind(this))
      this.fieldTarget.removeEventListener('input', this.clearErrorOnInput.bind(this))
    }
  }

  validate() {
    const value = this.fieldTarget.value.trim()
    let errorMessage = ''

    // Validación: campo requerido
    if (this.requiredValue && !value) {
      errorMessage = 'Este campo es obligatorio'
    }
    // Validación: longitud mínima
    else if (this.hasMinLengthValue && value.length < this.minLengthValue && value.length > 0) {
      errorMessage = `Debe tener al menos ${this.minLengthValue} caracteres`
    }
    // Validación: longitud máxima
    else if (this.hasMaxLengthValue && value.length > this.maxLengthValue) {
      errorMessage = `No puede exceder ${this.maxLengthValue} caracteres`
    }
    // Validación: email
    else if (this.typeValue === 'email' && value && !this.isValidEmail(value)) {
      errorMessage = 'Ingresa un correo electrónico válido'
    }
    // Validación: teléfono
    else if (this.typeValue === 'phone' && value && !this.isValidPhone(value)) {
      errorMessage = 'Ingresa un número de teléfono válido (10 dígitos)'
    }
    // Validación: patrón personalizado
    else if (this.hasPatternValue && value && !this.matchesPattern(value)) {
      errorMessage = 'El formato ingresado no es válido'
    }

    if (errorMessage) {
      this.showError(errorMessage)
      this.fieldTarget.classList.add('border-red-500')
      this.fieldTarget.classList.remove('border-gray-300')
      return false
    } else {
      this.clearError()
      this.fieldTarget.classList.remove('border-red-500')
      this.fieldTarget.classList.add('border-green-500')
      setTimeout(() => {
        this.fieldTarget.classList.remove('border-green-500')
        this.fieldTarget.classList.add('border-gray-300')
      }, 2000)
      return true
    }
  }

  clearErrorOnInput() {
    // Limpiar error mientras el usuario escribe
    if (this.hasErrorTarget) {
      const currentLength = this.fieldTarget.value.length

      // Si había un error de longitud mínima y ahora cumple, limpiar
      if (this.hasMinLengthValue && currentLength >= this.minLengthValue) {
        this.clearError()
      }
    }
  }

  showError(message) {
    if (this.hasErrorTarget) {
      this.errorTarget.textContent = message
      this.errorTarget.classList.remove('hidden')
      this.errorTarget.classList.add('text-red-600', 'text-sm', 'mt-1')
    } else {
      // Crear elemento de error si no existe
      const errorDiv = document.createElement('div')
      errorDiv.className = 'text-red-600 text-sm mt-1'
      errorDiv.textContent = message
      errorDiv.setAttribute('role', 'alert')
      this.fieldTarget.parentElement.appendChild(errorDiv)
    }
  }

  clearError() {
    if (this.hasErrorTarget) {
      this.errorTarget.textContent = ''
      this.errorTarget.classList.add('hidden')
    }
  }

  // Validadores helper
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  isValidPhone(phone) {
    const phoneRegex = /^\d{10}$/
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))
  }

  matchesPattern(value) {
    if (!this.hasPatternValue) return true
    const regex = new RegExp(this.patternValue)
    return regex.test(value)
  }

  // Validación de tipo de documento (para curriculums)
  validateDocumentType(event) {
    const documentType = event.target.value
    const identField = this.hasIdentificationFieldTarget ? this.identificationFieldTarget : null

    if (identField) {
      if (documentType === 'CC') {
        identField.pattern = '[0-9]+'
        identField.placeholder = 'Solo números (Ej: 1234567890)'
      } else {
        identField.pattern = '[A-Za-z0-9]+'
        identField.placeholder = 'Alfanumérico (Ej: ABC123456)'
      }
    }
  }

  // Validación de fechas (para convocatorias)
  validateDates() {
    if (!this.hasStartDateTarget || !this.hasEndDateTarget) return

    const startDate = new Date(this.startDateTarget.value)
    const endDate = new Date(this.endDateTarget.value)

    if (this.startDateTarget.value && this.endDateTarget.value) {
      if (endDate <= startDate) {
        this.showDateError()
        this.endDateTarget.setCustomValidity('La fecha de fin debe ser posterior a la fecha de inicio')
      } else {
        this.hideDateError()
        this.endDateTarget.setCustomValidity('')
      }
    }
  }

  showDateError() {
    if (this.hasDateErrorTarget) {
      this.dateErrorTarget.classList.remove('hidden')
    }
  }

  hideDateError() {
    if (this.hasDateErrorTarget) {
      this.dateErrorTarget.classList.add('hidden')
    }
  }
}
