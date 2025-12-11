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
    params_with_languages = process_languages(curriculum_params)
    @curriculum = current_user.build_curriculum(params_with_languages)
    if @curriculum.save
      redirect_to curriculum_path(@curriculum), notice: "Currículum registrado correctamente."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show
  end

  def edit
  end

  def update
    params_with_languages = process_languages(curriculum_params)
    if @curriculum.update(params_with_languages)
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
    permitted = params.require(:curriculum).permit(
      :first_name, :last_name, :birth_date, :identification,
      :phone_number, :address, :city, :department, :country,
      :profile_description, :available_to_travel, :available_to_relocate,
      :photo, :other_languages, :education_level, languages: [],
      studies_attributes: [:id, :institution, :status, :start_date, :end_date, :title, :_destroy]
    )
    # Remover other_languages del hash permitido
    permitted.except(:other_languages)
  end

  def process_languages(params_hash)
    # Extraer idiomas personalizados desde params (string), limpiar y combinar
    other_langs = params.dig(:curriculum, :other_languages).to_s.split(',').map(&:strip).reject(&:blank?)
    languages = Array(params_hash[:languages]).reject(&:blank?)

    combined = (languages + other_langs).uniq

    # Construir un Hash limpio que no incluya keys no permitidas (como other_languages)
    safe_hash = params_hash.to_h.reject { |k, _| k.to_s == 'other_languages' }
    safe_hash['languages'] = combined

    safe_hash
  end
end
