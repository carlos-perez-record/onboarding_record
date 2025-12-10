import { Controller } from "@hotwired/stimulus"
import ToastController from "./toast_controller"

// Conecta este controlador a un elemento usando data-controller="languages"
export default class extends Controller {
  static targets = ["input", "container", "button"]

  addLanguage(event) {
    event.preventDefault()
    
    const newLanguage = this.inputTarget.value.trim()
    
    // Validaciones mejoradas
    if (!newLanguage) {
      ToastController.showError('Por favor ingresa un idioma')
      this.inputTarget.focus()
      return
    }
    
    if (newLanguage.length < 2) {
      ToastController.showError('El idioma debe tener al menos 2 caracteres')
      this.inputTarget.focus()
      return
    }
    
    // Verificar duplicados
    if (this.isDuplicate(newLanguage)) {
      ToastController.showWarning('Este idioma ya fue agregado')
      this.inputTarget.value = ''
      this.inputTarget.focus()
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
    
    ToastController.showSuccess(`Idioma "${newLanguage}" agregado correctamente`)
  }

  removeLanguage(event) {
    event.preventDefault()
    const languageDiv = event.target.closest('[role="listitem"]')
    const languageName = languageDiv.querySelector('span').textContent
    
    // Animación suave antes de eliminar
    languageDiv.style.opacity = '0'
    setTimeout(() => {
      languageDiv.remove()
      ToastController.showInfo(`Idioma "${languageName}" eliminado`)
    }, 300)
  }
  
  isDuplicate(language) {
    const existingLanguages = Array.from(
      this.containerTarget.querySelectorAll('input[type="hidden"]')
    ).map(input => input.value.toLowerCase())
    
    return existingLanguages.includes(language.toLowerCase())
  }
}
