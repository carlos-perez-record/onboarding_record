class CurriculumsController < ApplicationController
  include Authorization

  before_action :authenticate_user!
  before_action :authorize_aspirant!
  before_action :set_curriculum, only: [:show, :edit, :update, :destroy]
  before_action :load_studies, only: [:show, :edit]

  def new
    @curriculum = current_user.build_curriculum
  end

  def create
    service = Curriculums::CreateService.new(current_user, curriculum_params)

    if service.call
      redirect_to curriculum_path(service.curriculum), notice: "Currículum registrado correctamente."
    else
      @curriculum = service.curriculum
      render :new, status: :unprocessable_entity
    end
  end

  def show
  end

  def edit
  end

  def update
    service = Curriculums::UpdateService.new(@curriculum, curriculum_params)

    if service.call
      redirect_to curriculum_path(@curriculum), notice: "Currículum actualizado correctamente."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @curriculum.destroy
    redirect_to root_path, notice: "Currículum eliminado correctamente."
  end

  private

  def set_curriculum
    @curriculum = Curriculum.find(params[:id])
    authorize_curriculum_ownership!
  end

  def load_studies
    # Preload studies and work_experiences only for actions that display them (show, edit)
    @curriculum.studies.load
    @curriculum.work_experiences.load
  end

  def authorize_curriculum_ownership!
    authorize_ownership!(@curriculum, 'currículum')
  end

  def curriculum_params
    params.require(:curriculum).permit(
      :first_name, :last_name, :birth_date, :identification,
      :phone_number, :address, :city, :department, :country,
      :profile_description, :job_title, :available_to_travel, :available_to_relocate,
      :photo, :other_languages, :education_level, :has_work_experience, languages: [],
      studies_attributes: [:id, :institution, :status, :start_date, :end_date, :title, :_destroy],
      work_experiences_attributes: [:id, :position, :company, :responsibilities, :achievements, :status, :start_date, :end_date, :_destroy]
    )
  end
end
