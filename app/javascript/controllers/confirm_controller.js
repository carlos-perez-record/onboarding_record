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

    const confirmed = await ModalController.confirm({
      title: this.titleValue,
      message: this.messageValue,
      confirmText: this.confirmTextValue,
      cancelText: "Cancelar",
      confirmClass: "btn-danger"
    })

    if (confirmed) {
      // Si se confirma, proceder con la acción
      const link = event.currentTarget
      
      // Crear y enviar formulario de eliminación
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = link.href
      
      const csrfToken = document.querySelector('meta[name="csrf-token"]').content
      const csrfInput = document.createElement('input')
      csrfInput.type = 'hidden'
      csrfInput.name = 'authenticity_token'
      csrfInput.value = csrfToken
      
      const methodInput = document.createElement('input')
      methodInput.type = 'hidden'
      methodInput.name = '_method'
      methodInput.value = 'delete'
      
      form.appendChild(csrfInput)
      form.appendChild(methodInput)
      document.body.appendChild(form)
      form.submit()
    }
  }
}
