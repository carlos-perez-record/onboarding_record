class CreateCurriculums < ActiveRecord::Migration[8.1]
  def change
    create_table :curriculums do |t|
      # Association
      t.references :user, null: false, foreign_key: true, index: { unique: true }

      # Datos Personales
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.date :birth_date, null: false
      t.string :identification, null: false
      t.string :phone_number, null: false
      t.string :address, null: false
      t.string :city, null: false
      t.string :department, null: false
      t.string :country, null: false, default: "Colombia"
      
      # Foto (usando active_storage)
      # (Se vincula a través de has_one_attached :photo en el modelo)

      # Perfil y descripción
      t.text :profile_description

      # Disponibilidad
      t.boolean :available_to_travel, default: false
      t.boolean :available_to_relocate, default: false

      # Idiomas (almacenado como JSON array)
      t.text :languages, default: "[]"

      t.timestamps
    end

    # Índices para búsqueda
    add_index :curriculums, :identification, unique: true
    add_index :curriculums, :birth_date
  end
end

