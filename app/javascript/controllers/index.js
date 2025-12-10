// Import and register all your controllers from the importmap via controllers/**/*_controller
import { application } from "controllers/application"

// Import controllers with full importmap paths
import HelloController from "controllers/hello_controller"
import LocationController from "controllers/location_controller"
import StudiesController from "controllers/studies_controller"
import LanguagesController from "controllers/languages_controller"
import ConfirmController from "controllers/confirm_controller"
import FeedbackController from "controllers/feedback_controller"
import FormLoadingController from "controllers/form_loading_controller"
import ModalController from "controllers/modal_controller"
import ToastController from "controllers/toast_controller"
import ValidationController from "controllers/validation_controller"

// Register controllers
application.register("hello", HelloController)
application.register("location", LocationController)
application.register("studies", StudiesController)
application.register("languages", LanguagesController)
application.register("confirm", ConfirmController)
application.register("feedback", FeedbackController)
application.register("form-loading", FormLoadingController)
application.register("modal", ModalController)
application.register("toast", ToastController)
application.register("validation", ValidationController)

console.log("✅ Stimulus controllers registered:", application.router.modulesByIdentifier)
