class CurriculumsController < ApplicationController
  before_action :authenticate_user!
  before_action :authorize_aspirant!
  before_action :set_curriculum, only: [:show, :edit, :update, :destroy]

  def new
    @curriculum = current_user.build_curriculum
  end

  def create
    @curriculum = current_user.build_curriculum(curriculum_params)
    merge_other_languages(@curriculum)
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
    if @curriculum.update(curriculum_params)
      merge_other_languages(@curriculum)
      @curriculum.save
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

  def authorize_aspirant!
    redirect_to root_path, alert: "Debes ser aspirante para acceder a esta sección." unless current_user.aspirante?
  end

  def authorize_curriculum_ownership!
    redirect_to root_path, alert: "No tienes permiso para acceder a este currículum." unless @curriculum.user == current_user
  end

  def curriculum_params
    params.require(:curriculum).permit(
      :first_name, :last_name, :birth_date, :identification,
      :phone_number, :address, :city, :department, :country,
      :profile_description, :available_to_travel, :available_to_relocate,
      :photo, :other_languages, languages: []
    )
  end

  def merge_other_languages(curriculum)
    other_langs = params[:curriculum][:other_languages].to_s.split(',').map(&:strip).reject(&:blank?)
    if other_langs.any?
      curriculum.languages = (curriculum.languages || []) + other_langs
      curriculum.languages = curriculum.languages.uniq
    end
  end
end
