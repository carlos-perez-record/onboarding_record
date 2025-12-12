class CreateWorkExperiences < ActiveRecord::Migration[8.1]
  def change
    create_table :work_experiences do |t|
      t.references :curriculum, null: false, foreign_key: true
      t.string :position
      t.string :company
      t.text :responsibilities
      t.text :achievements
      t.string :status
      t.date :start_date
      t.date :end_date

      t.timestamps
    end
  end
end
