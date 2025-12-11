class Recruiter::AspirantsController < ApplicationController
  before_action :authenticate_user!
  before_action :authorize_recruiter!
  before_action :set_aspirant, only: [:edit, :update, :destroy]

  def index
    @aspirants = User.includes(:curriculum).where(role: :aspirante)
  end

  def new
    @aspirant = User.new
  end

  def create
    @aspirant = User.new(aspirant_params)
    @aspirant.role = :aspirante
    if @aspirant.save
      redirect_to recruiter_aspirants_path, notice: "Aspirante creado correctamente."
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @aspirant.update(aspirant_params)
      redirect_to recruiter_aspirants_path, notice: "Aspirante actualizado correctamente."
    else
      render :edit
    end
  end

  def destroy
    email = @aspirant.email
    @aspirant.destroy

    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: turbo_stream.remove("user_#{@aspirant.id}")
      end
      format.html { redirect_to recruiter_aspirants_path, notice: "Aspirante #{email} eliminado correctamente." }
    end
  end

  private

  def set_aspirant
    @aspirant = User.find(params[:id])
    redirect_to recruiter_aspirants_path, alert: "No tienes permiso para acceder a este aspirante." unless @aspirant.aspirante?
  end

  def aspirant_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

  def authorize_recruiter!
    redirect_to root_path, alert: "No tienes permiso para acceder a esta sección." unless current_user.reclutador?
  end
end
