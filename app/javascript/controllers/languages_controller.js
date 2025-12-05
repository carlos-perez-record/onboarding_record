import { Controller } from "@hotwired/stimulus"

// Conecta este controlador a un elemento usando data-controller="languages"
export default class extends Controller {
  static targets = ["input", "container", "button"]

  addLanguage(event) {
    event.preventDefault()
    
    const newLanguage = this.inputTarget.value.trim()
    if (!newLanguage) return

    // Crear el div del idioma con su botón de eliminar
    const languageDiv = document.createElement('div')
    languageDiv.style.cssText = 'display: flex; align-items: center; margin-bottom: 5px;'
    languageDiv.innerHTML = `
      <input type="hidden" name="curriculum[languages][]" value="${newLanguage}">
      <span style="margin-right: 10px;">${newLanguage}</span>
      <button type="button" 
              data-action="click->languages#removeLanguage" 
              style="background-color: #f44336; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px;">
        Eliminar
      </button>
    `
    
    this.containerTarget.appendChild(languageDiv)
    this.inputTarget.value = ''
  }

  removeLanguage(event) {
    event.preventDefault()
    event.target.closest('div').remove()
  }
}
