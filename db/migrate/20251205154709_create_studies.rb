class CreateStudies < ActiveRecord::Migration[8.1]
  def change
    create_table :studies do |t|
      t.references :curriculum, null: false, foreign_key: true
      t.string :institution
      t.string :status
      t.date :start_date
      t.date :end_date
      t.string :title

      t.timestamps
    end
  end
end
