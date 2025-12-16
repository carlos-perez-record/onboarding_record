class Recruiter::JobPostingsController < ApplicationController
  include Authorization

  before_action :authenticate_user!
  before_action :authorize_recruiter!
  before_action :set_job_posting, only: [:show, :edit, :update, :destroy, :publish, :close, :applicants]

  def index
    @job_postings = current_user.job_postings.by_recent
  end

  def show
  end

  def applicants
    @applicants = @job_posting.job_applications.includes(:user).by_recent
  end

  def new
    @job_posting = current_user.job_postings.build
  end

  def create
    @job_posting = current_user.job_postings.build(job_posting_params)

    if @job_posting.save
      redirect_to recruiter_job_postings_path, notice: "Convocatoria creada exitosamente."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @job_posting.update(job_posting_params)
      redirect_to recruiter_job_postings_path, notice: "Convocatoria actualizada exitosamente."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @job_posting.destroy
    redirect_to recruiter_job_postings_path, notice: "Convocatoria eliminada exitosamente."
  end

  def publish
    # Al publicar, cambiar la fecha de inicio a hoy y el estado a vigente
    if @job_posting.update(status: :vigente, start_date: Date.current)
      redirect_to recruiter_job_postings_path, notice: "Convocatoria publicada exitosamente."
    else
      redirect_to recruiter_job_postings_path, alert: "No se pudo publicar la convocatoria."
    end
  end

  def close
    if @job_posting.update(status: :cerrado)
      redirect_to recruiter_job_postings_path, notice: "Convocatoria cerrada exitosamente."
    else
      redirect_to recruiter_job_postings_path, alert: "No se pudo cerrar la convocatoria."
    end
  end

  private

  def set_job_posting
    @job_posting = current_user.job_postings.find(params[:id])
  end

  def job_posting_params
    params.require(:job_posting).permit(:title, :start_date, :end_date, :status, :image)
  end
end
