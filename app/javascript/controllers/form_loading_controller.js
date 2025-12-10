import { Controller } from "@hotwired/stimulus"

// Controller para manejar estados de carga en formularios
export default class extends Controller {
  static targets = ["submit", "spinner"]
  static values = {
    loadingText: { type: String, default: "Procesando..." }
  }

  connect() {
    // Asegurar que el formulario tenga turbo habilitado
    this.element.addEventListener('turbo:submit-start', () => this.showLoading())
    this.element.addEventListener('turbo:submit-end', () => this.hideLoading())
    
    // Fallback para formularios sin Turbo
    this.element.addEventListener('submit', (event) => {
      if (!this.element.hasAttribute('data-turbo')) {
        this.showLoading()
      }
    })
  }

  showLoading() {
    if (this.hasSubmitTarget) {
      this.originalText = this.submitTarget.textContent
      this.submitTarget.disabled = true
      this.submitTarget.classList.add('opacity-75', 'cursor-not-allowed')
      
      // Agregar spinner
      const spinner = document.createElement('span')
      spinner.className = 'inline-block animate-spin mr-2'
      spinner.innerHTML = '⏳'
      spinner.setAttribute('data-form-loading-target', 'spinner')
      
      this.submitTarget.textContent = this.loadingTextValue
      this.submitTarget.prepend(spinner)
    }
  }

  hideLoading() {
    if (this.hasSubmitTarget && this.originalText) {
      this.submitTarget.disabled = false
      this.submitTarget.classList.remove('opacity-75', 'cursor-not-allowed')
      this.submitTarget.textContent = this.originalText
      
      // Remover spinner si existe
      if (this.hasSpinnerTarget) {
        this.spinnerTarget.remove()
      }
    }
  }
  
  disconnect() {
    // Limpiar event listeners
    this.element.removeEventListener('turbo:submit-start', () => this.showLoading())
    this.element.removeEventListener('turbo:submit-end', () => this.hideLoading())
  }
}
