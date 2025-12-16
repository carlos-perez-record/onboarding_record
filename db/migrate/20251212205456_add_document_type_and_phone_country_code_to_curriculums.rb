class AddDocumentTypeAndPhoneCountryCodeToCurriculums < ActiveRecord::Migration[8.1]
  def change
    add_column :curriculums, :document_type, :string
    add_column :curriculums, :phone_country_code, :string
  end
end
