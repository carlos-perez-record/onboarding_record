import { Controller } from "@hotwired/stimulus"

// Sistema de modales de confirmación personalizados
// Reemplaza window.confirm() con una interfaz más elegante y accesible
export default class extends Controller {
  static targets = ["backdrop", "dialog", "title", "message", "confirmButton", "cancelButton"]
  
  connect() {
    // Marcar esta instancia como la activa
    if (window.activeModalController) {
      // Si ya existe otra instancia, desconectarla
      window.activeModalController.forceDisconnect()
    }
    window.activeModalController = this
    
    // Guardar referencia al handler para poder removerlo
    this.boundShow = this.show.bind(this)
    window.addEventListener('modal:confirm', this.boundShow)
  }

  disconnect() {
    this.forceDisconnect()
  }

  forceDisconnect() {
    if (this.boundShow) {
      window.removeEventListener('modal:confirm', this.boundShow)
    }
    if (window.activeModalController === this) {
      window.activeModalController = null
    }
  }

  // Mostrar modal de confirmación
  show(event) {
    // Ocultar cualquier modal visible previo
    this.hideAllModals()
    
    const { 
      title = '¿Estás seguro?',
      message = 'Esta acción no se puede deshacer',
      confirmText = 'Confirmar',
      cancelText = 'Cancelar',
      confirmClass = 'btn-danger',
      onConfirm = () => {},
      onCancel = () => {}
    } = event.detail || event

    // Guardar callbacks
    this.onConfirmCallback = onConfirm
    this.onCancelCallback = onCancel

    // Actualizar contenido
    this.titleTarget.textContent = title
    this.messageTarget.textContent = message
    this.confirmButtonTarget.textContent = confirmText
    this.cancelButtonTarget.textContent = cancelText
    
    // Actualizar clase del botón de confirmar
    this.confirmButtonTarget.className = `btn ${confirmClass} px-6 py-2`
    
    // Mostrar modal
    this.backdropTarget.classList.remove('hidden')
    this.backdropTarget.classList.add('modal-backdrop-show')
    this.dialogTarget.classList.add('modal-dialog-show')
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden'
    
    // Focus en el botón de cancelar por defecto (más seguro)
    setTimeout(() => this.cancelButtonTarget.focus(), 100)
  }

  hide() {
    this.backdropTarget.classList.remove('modal-backdrop-show')
    this.dialogTarget.classList.remove('modal-dialog-show')
    
    setTimeout(() => {
      this.backdropTarget.classList.add('hidden')
      document.body.style.overflow = ''
    }, 300)
  }

  // Ocultar todos los modales visibles en la página
  hideAllModals() {
    // Buscar todos los backdrops y ocultarlos
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.classList.remove('modal-backdrop-show')
      backdrop.classList.add('hidden')
    })
    document.querySelectorAll('.modal-dialog').forEach(dialog => {
      dialog.classList.remove('modal-dialog-show')
    })
    document.body.style.overflow = ''
  }

  confirm() {
    this.hide()
    if (this.onConfirmCallback) {
      this.onConfirmCallback()
    }
  }

  cancel() {
    this.hide()
    if (this.onCancelCallback) {
      this.onCancelCallback()
    }
  }

  // Cerrar al hacer clic en el backdrop
  closeOnBackdrop(event) {
    if (event.target === this.backdropTarget) {
      this.cancel()
    }
  }

  // Cerrar con tecla Escape
  handleKeydown(event) {
    if (event.key === 'Escape') {
      this.cancel()
    }
  }

  // Método helper estático para uso fácil
  static confirm({ title, message, confirmText, cancelText, confirmClass = 'btn-danger' }) {
    return new Promise((resolve) => {
      window.dispatchEvent(new CustomEvent('modal:confirm', {
        detail: {
          title,
          message,
          confirmText,
          cancelText,
          confirmClass,
          onConfirm: () => resolve(true),
          onCancel: () => resolve(false)
        }
      }))
    })
  }
}
