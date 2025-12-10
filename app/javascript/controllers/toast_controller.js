import { Controller } from "@hotwired/stimulus"

// Sistema de notificaciones toast elegantes y accesibles
// Uso: this.dispatch('toast:show', { detail: { message: 'Mensaje', type: 'success' }})
export default class extends Controller {
  static targets = ["container"]
  
  connect() {
    // Marcar esta instancia como la activa
    if (window.activeToastController) {
      window.activeToastController.forceDisconnect()
    }
    window.activeToastController = this
    
    // Guardar referencia bound del handler
    this.boundShow = this.show.bind(this)
    window.addEventListener('toast:show', this.boundShow)
  }

  disconnect() {
    this.forceDisconnect()
  }

  forceDisconnect() {
    if (this.boundShow) {
      window.removeEventListener('toast:show', this.boundShow)
    }
    if (window.activeToastController === this) {
      window.activeToastController = null
    }
  }

  // Mostrar toast notification
  // Tipos: success, error, warning, info
  show(event) {
    const { message, type = 'info', duration = 4000 } = event.detail || event
    
    const toast = this.createToast(message, type)
    this.containerTarget.appendChild(toast)
    
    // Animación de entrada
    requestAnimationFrame(() => {
      toast.classList.add('toast-show')
    })
    
    // Auto-remove después de duración
    setTimeout(() => {
      this.hide(toast)
    }, duration)
  }

  createToast(message, type) {
    const toast = document.createElement('div')
    toast.className = `toast toast-${type}`
    toast.setAttribute('role', 'alert')
    toast.setAttribute('aria-live', 'polite')
    
    // Icono según tipo
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    }
    
    // Estructura del toast
    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-icon" aria-hidden="true">${icons[type] || icons.info}</span>
        <span class="toast-message">${this.escapeHtml(message)}</span>
        <button class="toast-close" aria-label="Cerrar notificación" data-action="click->toast#closeToast">
          ×
        </button>
      </div>
    `
    
    return toast
  }

  hide(toast) {
    toast.classList.remove('toast-show')
    toast.classList.add('toast-hide')
    
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove()
      }
    }, 300)
  }

  closeToast(event) {
    const toast = event.target.closest('.toast')
    if (toast) {
      this.hide(toast)
    }
  }

  // Prevenir XSS
  escapeHtml(text) {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }

  // Métodos helper para uso directo
  static showSuccess(message, duration = 4000) {
    window.dispatchEvent(new CustomEvent('toast:show', { 
      detail: { message, type: 'success', duration }
    }))
  }

  static showError(message, duration = 5000) {
    window.dispatchEvent(new CustomEvent('toast:show', { 
      detail: { message, type: 'error', duration }
    }))
  }

  static showWarning(message, duration = 4500) {
    window.dispatchEvent(new CustomEvent('toast:show', { 
      detail: { message, type: 'warning', duration }
    }))
  }

  static showInfo(message, duration = 4000) {
    window.dispatchEvent(new CustomEvent('toast:show', { 
      detail: { message, type: 'info', duration }
    }))
  }
}
