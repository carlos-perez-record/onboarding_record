class Admin::UsersController < ApplicationController
  include Authorization
  include TurboStreamable

  before_action :authenticate_user!
  before_action :authorize_admin!
  before_action :set_user, only: [:edit, :update, :destroy]

  def index
    @users = User.newest_first
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
    respond_with_deletion(@user, admin_users_path, "Usuario #{email}")
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :role)
  end
end
