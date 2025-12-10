// Import and register all your controllers from the importmap via controllers/**/*_controller
import { application } from "controllers/application"

// Import controllers
import HelloController from "./hello_controller"
import LocationController from "./location_controller"
import StudiesController from "./studies_controller"
import LanguagesController from "./languages_controller"
import ConfirmController from "./confirm_controller"
import FeedbackController from "./feedback_controller"
import FormLoadingController from "./form_loading_controller"
import ModalController from "./modal_controller"
import ToastController from "./toast_controller"
import ValidationController from "./validation_controller"

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
