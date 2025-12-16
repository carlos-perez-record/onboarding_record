class JobPostingsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index]

  def index
    @job_postings = JobPosting.active.by_recent
  end
end
