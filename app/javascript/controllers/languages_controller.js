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
    languageDiv.className = 'flex items-center'
    languageDiv.innerHTML = `
      <input type="hidden" name="curriculum[languages][]" value="${newLanguage}">
      <span class="mr-3 text-gray-700">${newLanguage}</span>
      <button type="button" 
              data-action="click->languages#removeLanguage" 
              class="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded">
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
