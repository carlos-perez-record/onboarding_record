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
    
    if (level === 'Técnico' || level === 'Tecnólogo' || level === 'Profesional' || level === 'Especialización' || level === 'Maestría' || level === 'Doctorado') {
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
      <div class="study-item" style="border: 1px solid #ddd; padding: 15px; border-radius: 4px; margin-bottom: 15px;">
        <h4 style="margin-top: 0;">Estudio Académico</h4>
        
        <div style="margin-bottom: 10px;">
          <label>Nombre de la institución:</label>
          <input type="text" name="curriculum[studies][${studyIndex}][institution]" placeholder="Ej: Universidad Nacional" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
        </div>
        
        <div style="margin-bottom: 10px;">
          <label>Título obtenido:</label>
          <input type="text" name="curriculum[studies][${studyIndex}][title]" placeholder="Ej: Ingeniero de Sistemas" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
        </div>
        
        <div style="display: flex; gap: 10px; margin-bottom: 10px;">
          <div style="flex: 1;">
            <label>Fecha de inicio:</label>
            <input type="date" name="curriculum[studies][${studyIndex}][start_date]" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
          </div>
          <div style="flex: 1;">
            <label>Fecha de finalización:</label>
            <input type="date" name="curriculum[studies][${studyIndex}][end_date]" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
          </div>
        </div>
        
        <div style="margin-bottom: 10px;">
          <label>
            <input type="checkbox" name="curriculum[studies][${studyIndex}][in_progress]" value="true" onchange="this.nextElementSibling.nextElementSibling.disabled = this.checked; if(this.checked) this.nextElementSibling.nextElementSibling.value = '';">
            Actualmente estudiando
          </label>
        </div>
        
        <button type="button" 
                data-action="click->studies#removeStudy" 
                style="background-color: #f44336; color: white; border: none; padding: 8px 15px; cursor: pointer; border-radius: 4px;">
          Eliminar Estudio
        </button>
      </div>
    `
    
    this.containerTarget.insertAdjacentHTML('beforeend', studyHTML)
  }

  removeStudy(event) {
    event.preventDefault()
    event.target.closest('.study-item').remove()
  }
}
