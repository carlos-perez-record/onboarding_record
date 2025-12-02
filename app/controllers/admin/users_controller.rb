class Admin::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :authorize_admin!
  before_action :set_user, only: [:edit, :update, :destroy]

  def index
    @users = User.all
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
    if @user.update(user_params)
      redirect_to admin_users_path, notice: "Usuario actualizado correctamente."
    else
      render :edit
    end
  end

  def destroy
    email = @user.email
    @user.destroy
    redirect_to admin_users_path, notice: "Usuario #{email} eliminado correctamente."
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
