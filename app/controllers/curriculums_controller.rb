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
    result = Curriculums::CreateService.call(current_user, curriculum_params)

    if result.success?
      redirect_to curriculum_path(result.curriculum), notice: "Currículum registrado correctamente."
    else
      @curriculum = result.curriculum
      render :new, status: :unprocessable_entity
    end
  end

  def show
  end

  def edit
  end

  def update
    result = Curriculums::UpdateService.call(@curriculum, curriculum_params)

    if result.success?
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
    # Preload studies only for actions that display them (show, edit)
    @curriculum.studies.load
  end

  def authorize_curriculum_ownership!
    authorize_ownership!(@curriculum, 'currículum')
  end

  def curriculum_params
    params.require(:curriculum).permit(
      :first_name, :last_name, :birth_date, :identification,
      :phone_number, :address, :city, :department, :country,
      :profile_description, :available_to_travel, :available_to_relocate,
      :photo, :other_languages, :education_level, languages: [],
      studies_attributes: [:id, :institution, :status, :start_date, :end_date, :title, :_destroy]
    )
  end
end
