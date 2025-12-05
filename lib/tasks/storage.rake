namespace :storage do
  desc "Reorganizar archivos de Active Storage por carpetas de identificación"
  task reorganize_by_identification: :environment do
    puts "Iniciando reorganización de archivos..."
    
    Curriculum.includes(photo_attachment: :blob).find_each do |curriculum|
      next unless curriculum.photo.attached?
      
      blob = curriculum.photo.blob
      old_key = blob.key
      extension = File.extname(blob.filename.to_s)
      new_filename = "Foto_personal_#{curriculum.identification}#{extension}"
      new_key = "#{curriculum.identification}/#{new_filename}"
      
      # Solo reorganizar si el key no está en el formato correcto
      unless old_key.start_with?("#{curriculum.identification}/")
        puts "\nReorganizando archivo para curriculum ID: #{curriculum.id}"
        puts "  Identificación: #{curriculum.identification}"
        puts "  Key antiguo: #{old_key}"
        puts "  Key nuevo: #{new_key}"
        
        begin
          # Obtener rutas
          old_path = ActiveStorage::Blob.service.path_for(old_key)
          new_path = ActiveStorage::Blob.service.path_for(new_key)
          
          if File.exist?(old_path)
            # Crear directorio si no existe
            FileUtils.mkdir_p(File.dirname(new_path))
            
            # Mover archivo
            FileUtils.mv(old_path, new_path)
            
            # Actualizar base de datos
            blob.update_columns(key: new_key, filename: new_filename)
            
            puts "  ✅ Archivo reorganizado exitosamente"
            
            # Limpiar carpeta antigua si está vacía
            old_dir = File.dirname(old_path)
            if Dir.exist?(old_dir) && Dir.empty?(old_dir)
              FileUtils.rmdir(old_dir)
              puts "  🗑️  Carpeta antigua eliminada: #{old_dir}"
            end
          else
            puts "  ⚠️  Advertencia: Archivo no encontrado en #{old_path}"
          end
        rescue => e
          puts "  ❌ Error: #{e.message}"
        end
      else
        puts "✓ Curriculum ID: #{curriculum.id} ya está organizado correctamente"
      end
    end
    
    puts "\n✅ Reorganización completada"
  end
end
