class AddHasWorkExperienceToCurriculums < ActiveRecord::Migration[8.1]
  def change
    add_column :curriculums, :has_work_experience, :boolean, default: false, null: false
  end
end
