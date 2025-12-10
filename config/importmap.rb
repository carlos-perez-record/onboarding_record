# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"

# Pin individual controllers
pin "controllers/confirm_controller", to: "confirm_controller.js"
pin "controllers/feedback_controller", to: "feedback_controller.js"
pin "controllers/form_loading_controller", to: "form_loading_controller.js"
pin "controllers/modal_controller", to: "modal_controller.js"
pin "controllers/toast_controller", to: "toast_controller.js"
pin "controllers/validation_controller", to: "validation_controller.js"

