import { Controller } from "@hotwired/stimulus"

// Conecta este controlador a un elemento usando data-controller="studies"
export default class extends Controller {
  static targets = ["container", "button", "educationLevel"]

  connect() {
    console.log('Studies controller connected')
    console.log('Education level:', this.educationLevelTarget.value)
    console.log('Button target:', this.buttonTarget)
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
      this.buttonTarget.classList.remove('opacity-50', 'cursor-not-allowed')
      this.buttonTarget.classList.add('opacity-100', 'cursor-pointer')
    } else {
      this.buttonTarget.disabled = true
      this.buttonTarget.classList.remove('opacity-100', 'cursor-pointer')
      this.buttonTarget.classList.add('opacity-50', 'cursor-not-allowed')
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
    
    // Insertar al inicio del contenedor (afterbegin) en lugar de al final (beforeend)
    this.containerTarget.insertAdjacentHTML('afterbegin', studyHTML)
    
    // Hacer scroll suave hacia el nuevo panel
    this.containerTarget.firstElementChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  removeStudy(event) {
    event.preventDefault()
    const studyItem = event.target.closest('.study-item, .border')
    
    console.log('=== INICIO removeStudy ===')
    console.log('Study item encontrado:', studyItem)
    
    // Buscar TODOS los inputs relacionados con _destroy
    const allInputs = studyItem.querySelectorAll('input[name*="[_destroy]"]')
    console.log('Total inputs _destroy encontrados:', allInputs.length)
    allInputs.forEach((input, index) => {
      console.log(`Input ${index}:`, {
        type: input.type,
        name: input.name,
        value: input.value,
        checked: input.checked,
        element: input
      })
    })
    
    // El checkbox real es el segundo (índice 1), el primero es el hidden con valor "0"
    const destroyCheckbox = allInputs.length > 1 ? allInputs[1] : allInputs[0]
    
    console.log('Checkbox seleccionado para marcar:', destroyCheckbox)
    
    if (destroyCheckbox) {
      // Si existe el checkbox, es un estudio existente en la BD
      console.log('Antes - checked:', destroyCheckbox.checked, 'value:', destroyCheckbox.value, 'name:', destroyCheckbox.name)
      
      // Marcar para destruir
      destroyCheckbox.checked = true
      // No cambiar el valor, Rails maneja esto automáticamente
      
      console.log('Después - checked:', destroyCheckbox.checked, 'value:', destroyCheckbox.value)
      
      // Ocultar visualmente usando clases de Tailwind (mantener en el DOM)
      studyItem.classList.add('hidden')
      
      // También podemos agregar un atributo para saber que está marcado para eliminar
      studyItem.setAttribute('data-marked-for-deletion', 'true')
      
      console.log('=== FIN removeStudy - Estudio marcado para eliminar ===')
    } else {
      // Si no existe, es un estudio nuevo agregado dinámicamente
      console.log('Eliminando estudio nuevo del DOM')
      studyItem.remove()
      console.log('=== FIN removeStudy - Estudio nuevo eliminado ===')
    }
  }
}
