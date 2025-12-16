class CreateJobApplications < ActiveRecord::Migration[8.1]
  def change
    create_table :job_applications do |t|
      t.references :user, null: false, foreign_key: true
      t.references :job_posting, null: false, foreign_key: true
      t.integer :status, default: 0, null: false
      t.datetime :applied_at, null: false

      t.timestamps
    end

    add_index :job_applications, [:user_id, :job_posting_id], unique: true, name: 'index_job_applications_on_user_and_posting'
  end
end
