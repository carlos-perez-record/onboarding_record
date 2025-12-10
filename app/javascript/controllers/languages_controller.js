import { Controller } from "@hotwired/stimulus"

// Conecta este controlador a un elemento usando data-controller="languages"
export default class extends Controller {
  static targets = ["input", "container", "button"]

  addLanguage(event) {
    event.preventDefault()
    
    const newLanguage = this.inputTarget.value.trim()
    
    // Validaciones mejoradas
    if (!newLanguage) {
      this.showFeedback('Por favor ingresa un idioma', 'error')
      return
    }
    
    if (newLanguage.length < 2) {
      this.showFeedback('El idioma debe tener al menos 2 caracteres', 'error')
      return
    }
    
    // Verificar duplicados
    if (this.isDuplicate(newLanguage)) {
      this.showFeedback('Este idioma ya fue agregado', 'error')
      return
    }

    // Crear el div del idioma con su botón de eliminar (prevención XSS)
    const languageDiv = document.createElement('div')
    languageDiv.className = 'flex items-center mb-2 transition-opacity duration-300'
    languageDiv.setAttribute('role', 'listitem')
    
    const hiddenInput = document.createElement('input')
    hiddenInput.type = 'hidden'
    hiddenInput.name = 'curriculum[languages][]'
    hiddenInput.value = newLanguage
    
    const languageSpan = document.createElement('span')
    languageSpan.className = 'mr-3 text-gray-700'
    languageSpan.textContent = newLanguage
    
    const removeButton = document.createElement('button')
    removeButton.type = 'button'
    removeButton.className = 'btn btn-danger py-1 px-3 text-sm'
    removeButton.textContent = 'Eliminar'
    removeButton.setAttribute('data-action', 'click->languages#removeLanguage')
    removeButton.setAttribute('aria-label', `Eliminar idioma ${newLanguage}`)
    
    languageDiv.appendChild(hiddenInput)
    languageDiv.appendChild(languageSpan)
    languageDiv.appendChild(removeButton)
    
    this.containerTarget.appendChild(languageDiv)
    this.inputTarget.value = ''
    this.inputTarget.focus()
    
    this.showFeedback(`Idioma "${newLanguage}" agregado`, 'success')
  }

  removeLanguage(event) {
    event.preventDefault()
    const languageDiv = event.target.closest('[role="listitem"]')
    
    // Animación suave antes de eliminar
    languageDiv.style.opacity = '0'
    setTimeout(() => languageDiv.remove(), 300)
  }
  
  isDuplicate(language) {
    const existingLanguages = Array.from(
      this.containerTarget.querySelectorAll('input[type="hidden"]')
    ).map(input => input.value.toLowerCase())
    
    return existingLanguages.includes(language.toLowerCase())
  }
  
  showFeedback(message, type) {
    // Remover feedback anterior si existe
    const existingFeedback = this.inputTarget.parentElement.querySelector('.feedback-message')
    if (existingFeedback) existingFeedback.remove()
    
    const feedbackDiv = document.createElement('div')
    feedbackDiv.className = `feedback-message text-sm mt-1 ${type === 'error' ? 'text-red-600' : 'text-green-600'}`
    feedbackDiv.textContent = message
    feedbackDiv.setAttribute('role', 'alert')
    
    this.inputTarget.parentElement.appendChild(feedbackDiv)
    
    // Auto-remover después de 3 segundos
    setTimeout(() => feedbackDiv.remove(), 3000)
  }
}
