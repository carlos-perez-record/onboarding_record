import { Controller } from "@hotwired/stimulus"
import ToastController from "controllers/toast_controller"

// Conecta este controlador a un elemento usando data-controller="work-experiences"
export default class extends Controller {
  static targets = ["container", "button", "selector", "template"]
  static values = {
    maxExperiences: { type: Number, default: 10 }
  }

  connect() {
    // Contar experiencias existentes después de que el DOM esté listo
    this.experienceCount = this.containerTarget.querySelectorAll('.experience-item').length

    // Actualizar estado del botón después de contar
    this.updateAddButton()
  }

  selectorChanged() {
    console.log('Selector changed, value:', this.selectorTarget.value)
    this.updateAddButton()
  }

  updateAddButton() {
    const hasExperience = this.selectorTarget.value
    console.log('updateAddButton - hasExperience:', hasExperience)
    if (!this.hasButtonTarget) return

    // Recalcular el conteo de experiencias actuales
    this.experienceCount = this.containerTarget.querySelectorAll('.experience-item').length
    console.log('Experience count:', this.experienceCount)

    const shouldEnable = hasExperience === 'true' && this.experienceCount < this.maxExperiencesValue
    console.log('Should enable button:', shouldEnable)

    this.buttonTarget.disabled = !shouldEnable
    this.buttonTarget.classList.toggle('opacity-50', !shouldEnable)
    this.buttonTarget.classList.toggle('cursor-not-allowed', !shouldEnable)
    this.buttonTarget.classList.toggle('opacity-100', shouldEnable)
    this.buttonTarget.classList.toggle('cursor-pointer', shouldEnable)

    if (this.experienceCount >= this.maxExperiencesValue) {
      this.buttonTarget.title = `Máximo ${this.maxExperiencesValue} experiencias permitidas`
    }
  }

  addExperience(event) {
    event.preventDefault()

    // Validar límite máximo
    if (this.experienceCount >= this.maxExperiencesValue) {
      ToastController.showWarning(`Has alcanzado el límite máximo de ${this.maxExperiencesValue} experiencias`)
      return
    }

    const timestamp = new Date().getTime()
    const content = this.templateTarget.innerHTML.replace(/NEW_RECORD/g, timestamp)

    this.containerTarget.insertAdjacentHTML('beforeend', content)

    this.experienceCount++
    this.updateAddButton()

    ToastController.showSuccess('Experiencia laboral agregada. Completa los campos requeridos.')

    // Scroll al nuevo elemento
    const newExperience = this.containerTarget.lastElementChild
    if (newExperience) {
      newExperience.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }

  removeExperience(event) {
    event.preventDefault()

    const experienceDiv = event.target.closest('.work-experience-fields')
    if (!experienceDiv) return

    const isNewRecord = experienceDiv.dataset.newRecord === 'true'

    if (isNewRecord) {
      experienceDiv.remove()
      this.experienceCount--
      this.updateAddButton()
      ToastController.showInfo('Experiencia eliminada')
    } else {
      const destroyInput = experienceDiv.querySelector("input[name*='_destroy']")
      if (destroyInput) {
        destroyInput.value = '1'
        experienceDiv.style.display = 'none'
        this.experienceCount--
        this.updateAddButton()
        ToastController.showInfo('Experiencia marcada para eliminación')
      }
    }
  }
}
