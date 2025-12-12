import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["container", "template", "section"]

  connect() {
    console.log("WorkExperiences controller connected")
  }

  toggleSection(event) {
    const hasExperience = event.target.value === "true"
    if (this.hasSectionTarget) {
      this.sectionTarget.style.display = hasExperience ? "block" : "none"
    }
  }

  addExperience(event) {
    event.preventDefault()
    const content = this.templateTarget.innerHTML.replace(/NEW_RECORD/g, new Date().getTime())
    this.containerTarget.insertAdjacentHTML("beforeend", content)
  }

  removeExperience(event) {
    event.preventDefault()
    const wrapper = event.target.closest('.work-experience-fields')

    if (wrapper.dataset.newRecord === "true") {
      wrapper.remove()
    } else {
      wrapper.style.display = 'none'
      const destroyInput = wrapper.querySelector("input[name*='_destroy']")
      if (destroyInput) {
        destroyInput.value = "1"
      }
    }
  }
}
