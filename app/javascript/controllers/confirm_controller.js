import { Controller } from "@hotwired/stimulus"
import ModalController from "controllers/modal_controller"

// Controlador para manejar confirmaciones de eliminación con modal personalizado
export default class extends Controller {
  static values = {
    message: { type: String, default: "¿Estás seguro de eliminar este elemento?" },
    title: { type: String, default: "Confirmar eliminación" },
    confirmText: { type: String, default: "Eliminar" }
  }

  async confirm(event) {
    // Prevenir acción por defecto
    event.preventDefault()
    event.stopPropagation()

    // Guardar referencia al enlace ANTES de abrir el modal
    const link = event.currentTarget
    const url = link.href

    const confirmed = await ModalController.confirm({
      title: this.titleValue,
      message: this.messageValue,
      confirmText: this.confirmTextValue,
      cancelText: "Cancelar",
      confirmClass: "btn-danger"
    })

    if (confirmed) {
      // Usar fetch con Turbo Stream para DELETE
      const csrfToken = document.querySelector('meta[name="csrf-token"]').content

      try {
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'X-CSRF-Token': csrfToken,
            'Accept': 'text/vnd.turbo-stream.html'
          },
          credentials: 'same-origin'
        })

        if (response.ok) {
          const turboStream = await response.text()
          Turbo.renderStreamMessage(turboStream)
        } else {
          console.error('Error al eliminar:', response.statusText)
        }
      } catch (error) {
        console.error('Error en la petición de eliminación:', error)
      }
    }
  }
}
