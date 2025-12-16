class JobApplicationsController < ApplicationController
  before_action :authenticate_user!
  before_action :authorize_aspirante!

  def create
    @job_posting = JobPosting.find(params[:job_posting_id])
    @job_application = current_user.job_applications.build(job_posting: @job_posting)

    if @job_application.save
      redirect_to root_path, notice: "¡Te has inscrito exitosamente a la convocatoria '#{@job_posting.title}'!"
    else
      redirect_to root_path, alert: "No pudiste inscribirte: #{@job_application.errors.full_messages.join(', ')}"
    end
  end

  private

  def authorize_aspirante!
    unless current_user.aspirante?
      redirect_to root_path, alert: "Solo los aspirantes pueden participar en convocatorias."
    end
  end
end
