import { Controller } from "@hotwired/stimulus"

// Conecta este controlador a un elemento usando data-controller="studies"
export default class extends Controller {
  static targets = ["container", "button", "educationLevel"]
  static values = {
    maxStudies: { type: Number, default: 10 }
  }

  connect() {
    this.updateAddButton()
    this.studyCount = this.containerTarget.querySelectorAll('.study-item').length
  }

  educationLevelChanged() {
    this.updateAddButton()
  }

  updateAddButton() {
    const level = this.educationLevelTarget.value
    if (!this.hasButtonTarget) return
    
    const shouldEnable = level && level !== 'ninguno' && this.studyCount < this.maxStudiesValue
    
    this.buttonTarget.disabled = !shouldEnable
    this.buttonTarget.classList.toggle('opacity-50', !shouldEnable)
    this.buttonTarget.classList.toggle('cursor-not-allowed', !shouldEnable)
    this.buttonTarget.classList.toggle('opacity-100', shouldEnable)
    this.buttonTarget.classList.toggle('cursor-pointer', shouldEnable)
    
    if (this.studyCount >= this.maxStudiesValue) {
      this.buttonTarget.title = `Máximo ${this.maxStudiesValue} estudios permitidos`
    }
  }

  addStudy(event) {
    event.preventDefault()
    
    // Validar límite máximo
    if (this.studyCount >= this.maxStudiesValue) {
      alert(`Has alcanzado el límite máximo de ${this.maxStudiesValue} estudios`)
      return
    }
    
    const studyIndex = Date.now()
    const studyNumber = this.studyCount + 1
    
    // Crear elementos de forma segura (prevención XSS)
    const studyItem = document.createElement('div')
    studyItem.className = 'study-item study-panel study-fields border border-gray-300 rounded-lg p-4 bg-gray-50 mb-4 transition-all duration-300'
    studyItem.setAttribute('role', 'region')
    studyItem.setAttribute('aria-label', `Estudio académico ${studyNumber}`)
    studyItem.style.opacity = '0'
    
    studyItem.innerHTML = this.getStudyHTML(studyIndex)
    
    this.containerTarget.insertAdjacentElement('afterbegin', studyItem)
    
    // Animación de entrada
    requestAnimationFrame(() => {
      studyItem.style.opacity = '1'
    })
    
    this.studyCount++
    this.updateAddButton()
    
    // Hacer scroll suave y enfocar primer campo
    studyItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    setTimeout(() => {
      const firstInput = studyItem.querySelector('input[type="text"]')
      firstInput?.focus()
    }, 300)
  }
  
  getStudyHTML(studyIndex) {
    return `
      <div class="study-header flex justify-between items-center mb-4">
        <h4 class="text-lg font-semibold text-gray-800 m-0">Estudio Académico</h4>
        <button type="button" 
                data-action="click->studies#removeStudy" 
                class="btn btn-danger py-1 px-3 text-sm"
                aria-label="Eliminar este estudio">
          Eliminar
        </button>
      </div>
      
      <div class="form-group mb-3">
        <label class="form-label">Institución *</label>
        <input type="text" 
               name="curriculum[studies_attributes][${studyIndex}][institution]" 
               placeholder="Ej: Universidad Nacional" 
               required
               aria-required="true"
               class="form-input">
      </div>
      
      <div class="form-group mb-3">
        <label class="form-label">Estado</label>
        <select name="curriculum[studies_attributes][${studyIndex}][status]" class="form-input">
          <option value="">Seleccionar</option>
          <option value="cursando">Cursando</option>
          <option value="pausado">Pausado</option>
          <option value="finalizado">Finalizado</option>
        </select>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
        <div>
          <label class="form-label">Fecha Inicio</label>
          <input type="date" 
                 name="curriculum[studies_attributes][${studyIndex}][start_date]" 
                 class="form-input">
        </div>
        <div>
          <label class="form-label">Fecha Fin</label>
          <input type="date" 
                 name="curriculum[studies_attributes][${studyIndex}][end_date]" 
                 class="form-input">
        </div>
      </div>
      
      <div class="form-group m-0">
        <label class="form-label">Título</label>
        <input type="text" 
               name="curriculum[studies_attributes][${studyIndex}][title]" 
               placeholder="Ej: Ingeniería de Sistemas"
               class="form-input">
      </div>
    `
  }

  removeStudy(event) {
    event.preventDefault()
    const studyItem = event.target.closest('.study-item, .border')
    
    if (!studyItem) return
    
    // Buscar inputs _destroy (para estudios existentes en BD)
    const allInputs = studyItem.querySelectorAll('input[name*="[_destroy]"]')
    // El checkbox real es el segundo (índice 1), el primero es el hidden con valor "0"
    const destroyCheckbox = allInputs.length > 1 ? allInputs[1] : allInputs[0]
    
    if (destroyCheckbox) {
      // Estudio existente en BD: marcar para destruir
      destroyCheckbox.checked = true
      studyItem.setAttribute('data-marked-for-deletion', 'true')
      
      // Animación de salida
      studyItem.style.opacity = '0'
      studyItem.style.maxHeight = '0'
      studyItem.style.overflow = 'hidden'
      studyItem.style.margin = '0'
      studyItem.style.padding = '0'
      
      setTimeout(() => studyItem.classList.add('hidden'), 300)
    } else {
      // Estudio nuevo: eliminar del DOM
      studyItem.style.opacity = '0'
      studyItem.style.transform = 'translateX(-20px)'
      
      setTimeout(() => {
        studyItem.remove()
        this.studyCount--
        this.updateAddButton()
      }, 300)
    }
  }
}
