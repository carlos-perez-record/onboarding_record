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
      <div class="study-item study-panel study-fields" style="border: 1px solid #ddd; padding: 15px; border-radius: 4px; margin-bottom: 15px;">
        <div class="study-header">
          <h4 style="margin-top: 0;">Estudio</h4>
          <button type="button" 
                  data-action="click->studies#removeStudy" 
                  class="btn btn-danger btn-sm"
                  style="background-color: #f44336; color: white; border: none; padding: 8px 15px; cursor: pointer; border-radius: 4px;">
            Eliminar
          </button>
        </div>
        
        <div class="form-group" style="margin-bottom: 10px;">
          <label style="display: block; margin-bottom: 5px; font-size: 14px; font-weight: 500;">Institución *</label>
          <input type="text" name="curriculum[studies_attributes][${studyIndex}][institution]" placeholder="Ej: Universidad Nacional" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px; box-sizing: border-box;">
        </div>
        
        <div class="form-group" style="margin-bottom: 10px;">
          <label style="display: block; margin-bottom: 5px; font-size: 14px; font-weight: 500;">Estado</label>
          <select name="curriculum[studies_attributes][${studyIndex}][status]" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px; box-sizing: border-box;">
            <option value="">Seleccionar</option>
            <option value="cursando">Cursando</option>
            <option value="pausado">Pausado</option>
            <option value="finalizado">Finalizado</option>
          </select>
        </div>
        
        <div class="form-grid-2" style="display: flex; gap: 10px; margin-bottom: 10px;">
          <div style="flex: 1;">
            <label style="display: block; margin-bottom: 5px; font-size: 14px; font-weight: 500;">Fecha Inicio</label>
            <input type="date" name="curriculum[studies_attributes][${studyIndex}][start_date]" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px; box-sizing: border-box;">
          </div>
          <div style="flex: 1;">
            <label style="display: block; margin-bottom: 5px; font-size: 14px; font-weight: 500;">Fecha Fin</label>
            <input type="date" name="curriculum[studies_attributes][${studyIndex}][end_date]" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px; box-sizing: border-box;">
          </div>
        </div>
        
        <div class="form-group form-group-no-margin" style="margin-bottom: 0;">
          <label style="display: block; margin-bottom: 5px; font-size: 14px; font-weight: 500;">Título</label>
          <input type="text" name="curriculum[studies_attributes][${studyIndex}][title]" class="form-control" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px; box-sizing: border-box;">
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
