class AddJobTitleToCurriculums < ActiveRecord::Migration[8.1]
  def change
    add_column :curriculums, :job_title, :string
  end
end
