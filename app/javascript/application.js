// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers/index"

console.log("✅ Application.js loaded")
console.log("✅ Turbo:", window.Turbo)
console.log("✅ Stimulus:", window.Stimulus)

