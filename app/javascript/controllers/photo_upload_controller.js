import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "filename"]

  connect() {
    console.log("PhotoUpload controller connected")
  }

  updateFilename(event) {
    const files = event.target.files
    if (files.length > 0) {
      this.filenameTarget.textContent = files[0].name
    } else {
      this.filenameTarget.textContent = 'Ningún archivo seleccionado'
    }
  }
}
