class AddEducationLevelToStudies < ActiveRecord::Migration[8.1]
  def change
    add_column :studies, :education_level, :string
  end
end
