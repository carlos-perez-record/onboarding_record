class MoveEducationLevelToCurriculums < ActiveRecord::Migration[8.1]
  def change
    remove_column :studies, :education_level, :string
  end
end
