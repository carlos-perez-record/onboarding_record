# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"

# Pin all controllers from app/javascript/controllers
pin "controllers/application", to: "controllers/application.js"
pin "controllers/index", to: "controllers/index.js"
pin "controllers/hello_controller", to: "controllers/hello_controller.js"
pin "controllers/location_controller", to: "controllers/location_controller.js"
pin "controllers/studies_controller", to: "controllers/studies_controller.js"
pin "controllers/languages_controller", to: "controllers/languages_controller.js"
pin "controllers/confirm_controller", to: "controllers/confirm_controller.js"
pin "controllers/feedback_controller", to: "controllers/feedback_controller.js"
pin "controllers/form_loading_controller", to: "controllers/form_loading_controller.js"
pin "controllers/modal_controller", to: "controllers/modal_controller.js"
pin "controllers/toast_controller", to: "controllers/toast_controller.js"
pin "controllers/validation_controller", to: "controllers/validation_controller.js"

