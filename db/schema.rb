# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2025_12_12_154445) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.string "name", null: false
    t.bigint "record_id", null: false
    t.string "record_type", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.string "content_type"
    t.datetime "created_at", null: false
    t.string "filename", null: false
    t.string "key", null: false
    t.text "metadata"
    t.string "service_name", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "curriculums", force: :cascade do |t|
    t.text "academic_records"
    t.string "address", null: false
    t.boolean "available_to_relocate", default: false
    t.boolean "available_to_travel", default: false
    t.date "birth_date", null: false
    t.string "city", null: false
    t.string "country", default: "Colombia", null: false
    t.datetime "created_at", null: false
    t.string "department", null: false
    t.string "education_level"
    t.string "first_name", null: false
    t.boolean "has_work_experience", default: false, null: false
    t.string "identification", null: false
    t.string "job_title"
    t.text "languages", default: "[]"
    t.string "last_name", null: false
    t.string "phone_number", null: false
    t.text "profile_description"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["birth_date"], name: "index_curriculums_on_birth_date"
    t.index ["identification"], name: "index_curriculums_on_identification", unique: true
    t.index ["user_id"], name: "index_curriculums_on_user_id", unique: true
  end

  create_table "studies", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "curriculum_id", null: false
    t.date "end_date"
    t.string "institution"
    t.date "start_date"
    t.string "status"
    t.string "title"
    t.datetime "updated_at", null: false
    t.index ["curriculum_id"], name: "index_studies_on_curriculum_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.datetime "remember_created_at"
    t.datetime "reset_password_sent_at"
    t.string "reset_password_token"
    t.integer "role", default: 1, null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["role"], name: "index_users_on_role"
  end

  create_table "work_experiences", force: :cascade do |t|
    t.text "achievements"
    t.string "company"
    t.datetime "created_at", null: false
    t.bigint "curriculum_id", null: false
    t.date "end_date"
    t.string "position"
    t.text "responsibilities"
    t.date "start_date"
    t.string "status"
    t.datetime "updated_at", null: false
    t.index ["curriculum_id"], name: "index_work_experiences_on_curriculum_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "curriculums", "users"
  add_foreign_key "studies", "curriculums"
  add_foreign_key "work_experiences", "curriculums"
end
