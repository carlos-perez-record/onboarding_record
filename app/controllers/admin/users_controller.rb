class Admin::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :authorize_admin!
  before_action :set_user, only: [:edit, :update, :destroy]

  def index
    @users = User.includes(:curriculum).all
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to admin_users_path, notice: "Usuario creado correctamente."
    else
      render :new
    end
  end

  def edit
  end

  def update
    # Permitir actualización sin cambiar contraseña
    if user_params[:password].blank?
      user_params_without_password = user_params.except(:password, :password_confirmation)
      if @user.update(user_params_without_password)
        redirect_to admin_users_path, notice: "Usuario actualizado correctamente."
      else
        render :edit, status: :unprocessable_entity
      end
    else
      if @user.update(user_params)
        redirect_to admin_users_path, notice: "Usuario actualizado correctamente."
      else
        render :edit, status: :unprocessable_entity
      end
    end
  end

  def destroy
    email = @user.email
    @user.destroy

    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: turbo_stream.remove("user_#{@user.id}")
      end
      format.html { redirect_to admin_users_path, notice: "Usuario #{email} eliminado correctamente." }
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :role)
  end

  def authorize_admin!
    redirect_to root_path, alert: "No tienes permiso para acceder a esta sección." unless current_user.admin?
  end
end
