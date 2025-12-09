import { Controller } from "@hotwired/stimulus"

// Conecta este controlador a un elemento usando data-controller="studies"
export default class extends Controller {
  static targets = ["container", "button", "educationLevel"]

  connect() {
    this.updateAddButton()
  }

  educationLevelChanged() {
    this.updateAddButton()
  }

  updateAddButton() {
    const level = this.educationLevelTarget.value
    if (!this.hasButtonTarget) return
    
    // Deshabilitar solo si es 'ninguno' o no hay selección
    if (level && level !== 'ninguno') {
      this.buttonTarget.disabled = false
      this.buttonTarget.style.opacity = '1'
      this.buttonTarget.style.cursor = 'pointer'
    } else {
      this.buttonTarget.disabled = true
      this.buttonTarget.style.opacity = '0.5'
      this.buttonTarget.style.cursor = 'not-allowed'
    }
  }

  addStudy(event) {
    event.preventDefault()
    
    const studyIndex = Date.now()
    const studyHTML = `
      <div class="study-item study-panel study-fields border border-gray-300 rounded-lg p-4 bg-gray-50 mb-4">
        <div class="study-header flex justify-between items-center mb-4">
          <h4 class="text-lg font-semibold text-gray-800 m-0">Estudio</h4>
          <button type="button" 
                  data-action="click->studies#removeStudy" 
                  class="btn btn-danger btn-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
            Eliminar
          </button>
        </div>
        
        <div class="form-group mb-3">
          <label class="block text-sm font-medium text-gray-700 mb-2">Institución *</label>
          <input type="text" name="curriculum[studies_attributes][${studyIndex}][institution]" placeholder="Ej: Universidad Nacional" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        
        <div class="form-group mb-3">
          <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
          <select name="curriculum[studies_attributes][${studyIndex}][status]" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Seleccionar</option>
            <option value="cursando">Cursando</option>
            <option value="pausado">Pausado</option>
            <option value="finalizado">Finalizado</option>
          </select>
        </div>
        
        <div class="form-grid-2 grid grid-cols-2 gap-4 mb-3">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Fecha Inicio</label>
            <input type="date" name="curriculum[studies_attributes][${studyIndex}][start_date]" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Fecha Fin</label>
            <input type="date" name="curriculum[studies_attributes][${studyIndex}][end_date]" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>
        </div>
        
        <div class="form-group form-group-no-margin m-0">
          <label class="block text-sm font-medium text-gray-700 mb-2">Título</label>
          <input type="text" name="curriculum[studies_attributes][${studyIndex}][title]" class="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
      </div>
    `
    
    this.containerTarget.insertAdjacentHTML('beforeend', studyHTML)
  }

  removeStudy(event) {
    event.preventDefault()
    event.target.closest('.study-item').remove()
  }
}
