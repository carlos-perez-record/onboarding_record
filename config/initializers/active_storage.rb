# Personalización de Active Storage para organizar archivos por carpetas de identificación
Rails.application.config.after_initialize do
  require 'active_storage/service/disk_service'
  
  # Personalizar el servicio Disk para evitar subdirectorios automáticos
  ActiveStorage::Service::DiskService.class_eval do
    # Sobrescribir path_for para usar rutas directas sin subdirectorios automáticos
    def path_for(key)
      # Si la clave contiene "/" (estructura personalizada), usar directamente
      if key.include?('/')
        File.join(root, key)
      else
        # Mantener comportamiento original para keys antiguos
        File.join(root, folder_for(key), key)
      end
    end

    private

    def folder_for(key)
      [key[0..1], key[2..3]].join("/")
    end
  end
end
