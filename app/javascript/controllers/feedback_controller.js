import { Controller } from "@hotwired/stimulus"
import ToastController from "./toast_controller"

// Controlador para mostrar feedback visual después de acciones exitosas
// Se activa automáticamente con eventos de Turbo
export default class extends Controller {
  connect() {
    // Escuchar eventos de Turbo para mostrar feedback
    document.addEventListener('turbo:submit-end', this.handleSubmitEnd.bind(this))
    document.addEventListener('turbo:frame-load', this.handleFrameLoad.bind(this))
  }

  disconnect() {
    document.removeEventListener('turbo:submit-end', this.handleSubmitEnd.bind(this))
    document.removeEventListener('turbo:frame-load', this.handleFrameLoad.bind(this))
  }

  handleSubmitEnd(event) {
    // Solo mostrar toast si fue exitoso (no hay errores)
    if (event.detail.success && event.detail.fetchResponse?.succeeded) {
      const formElement = event.target
      
      // Determinar el tipo de acción por el método o la URL
      const action = formElement.getAttribute('action') || ''
      const method = formElement.querySelector('input[name="_method"]')?.value || formElement.method
      
      let message = ''
      
      if (method === 'delete') {
        message = 'Elemento eliminado correctamente'
      } else if (method === 'patch' || method === 'put') {
        message = 'Cambios guardados correctamente'
      } else if (action.includes('sign_in')) {
        message = 'Sesión iniciada correctamente'
      } else if (action.includes('sign_up')) {
        message = 'Cuenta creada exitosamente'
      } else if (method === 'post') {
        message = 'Creado correctamente'
      }
      
      if (message) {
        // Delay para que el usuario vea el resultado
        setTimeout(() => {
          ToastController.showSuccess(message)
        }, 200)
      }
    } else if (event.detail.success === false) {
      // Si hay error en el submit
      setTimeout(() => {
        ToastController.showError('Hubo un error al procesar tu solicitud')
      }, 200)
    }
  }

  handleFrameLoad(event) {
    // Mostrar feedback cuando un frame se carga exitosamente
    const frame = event.target
    
    // Solo mostrar si es una navegación dentro del frame (no carga inicial)
    if (frame.src && !frame.hasAttribute('data-initial-load')) {
      // Pequeño delay para que sea perceptible
      setTimeout(() => {
        ToastController.showInfo('Contenido actualizado', 2000)
      }, 100)
    }
    
    frame.setAttribute('data-initial-load', 'false')
  }
}
