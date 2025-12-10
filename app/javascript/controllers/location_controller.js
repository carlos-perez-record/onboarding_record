import { Controller } from "@hotwired/stimulus"

// Conecta este controlador a un elemento usando data-controller="location"
export default class extends Controller {
  static targets = ["country", "departmentContainer", "cityContainer"]
  static values = {
    initialDepartment: String,
    initialCity: String
  }

  // Datos de ciudades por departamento de Colombia
  citiesByDepartment = {
    'Córdoba': ['Montería', 'Cereté', 'Lorica', 'Sahagún', 'Montelíbano', 'Planeta Rica', 'Ayapel', 'Chinú', 'Ciénaga de Oro', 'Cotorra', 'La Apartada', 'Moñitos', 'Puerto Escondido', 'Pueblo Nuevo', 'San Andrés de Sotavento', 'San Antero', 'San Bernardo del Viento', 'San Carlos', 'San José de Uré', 'San Pelayo', 'Tierralta', 'Tuchín', 'Valencia', 'Buenavista', 'Canalete', 'Los Córdobas', 'Momil', 'Purísima', 'San Pelayo'],
    'Antioquia': ['Medellín', 'Bello', 'Itagüí', 'Envigado', 'Apartadó', 'Turbo', 'Rionegro', 'Caucasia', 'Sabaneta', 'La Ceja', 'Caldas', 'El Carmen de Viboral', 'Marinilla', 'La Estrella', 'Copacabana', 'Puerto Berrío', 'Necoclí', 'Carepa', 'Yarumal', 'Santa Rosa de Osos', 'Chigorodó', 'El Bagre', 'Guarne', 'Segovia', 'San Pedro de los Milagros', 'Urrao', 'Puerto Nare', 'Andes', 'Barbosa', 'Girardota'],
    'Atlántico': ['Barranquilla', 'Soledad', 'Malambo', 'Sabanalarga', 'Puerto Colombia', 'Galapa', 'Baranoa', 'Sabanagrande', 'Santo Tomás', 'Polonuevo', 'Palmar de Varela', 'Juan de Acosta', 'Usiacurí', 'Luruaco', 'Repelón', 'Manatí', 'Candelaria', 'Santa Lucía', 'Suan', 'Campo de la Cruz', 'Piojó', 'Tubará', 'Ponedera'],
    'Bolívar': ['Cartagena', 'Magangué', 'Turbaco', 'Arjona', 'El Carmen de Bolívar', 'Mompós', 'Sincelejo', 'San Juan Nepomuceno', 'María La Baja', 'Santa Rosa del Sur', 'Simití', 'San Pablo', 'Cantagallo', 'Cicuco', 'Santa Rosa', 'San Jacinto', 'San Estanislao', 'Clemencia', 'Mahates', 'Soplaviento', 'Marialabaja', 'Calamar', 'Arroyohondo'],
    'Boyacá': ['Tunja', 'Duitama', 'Sogamoso', 'Chiquinquirá', 'Paipa', 'Villa de Leyva', 'Moniquirá', 'Puerto Boyacá', 'Garagoa', 'Samacá', 'Ventaquemada', 'Ramiriquí', 'Nobsa', 'Tibasosa', 'Guateque', 'Soatá', 'Paz de Río', 'Sáchica', 'Togüí', 'Tópaga', 'Socha', 'Corrales', 'Tasco', 'Betéitiva', 'Socotá'],
    'Caldas': ['Manizales', 'La Dorada', 'Chinchiná', 'Villamaría', 'Riosucio', 'Aguadas', 'Anserma', 'Salamina', 'Supía', 'Pácora', 'Neira', 'Manzanares', 'Palestina', 'Aranzazu', 'Pensilvania', 'Marquetalia', 'Viterbo', 'Filadelfia', 'Victoria', 'Marulanda'],
    'Caquetá': ['Florencia', 'San Vicente del Caguán', 'Puerto Rico', 'El Doncello', 'El Paujil', 'La Montañita', 'Belén de los Andaquíes', 'Curillo', 'Albania', 'Cartagena del Chairá', 'Morelia', 'Milán', 'San José del Fragua', 'Solano', 'Valparaíso', 'Solita'],
    'Casanare': ['Yopal', 'Aguazul', 'Villanueva', 'Tauramena', 'Monterrey', 'Paz de Ariporo', 'Hato Corozal', 'Maní', 'Trinidad', 'Sabanalarga', 'Recetor', 'Nunchía', 'San Luis de Palenque', 'Orocué', 'Támara', 'Pore', 'La Salina', 'Sácama', 'Chameza'],
    'Cauca': ['Popayán', 'Santander de Quilichao', 'Puerto Tejada', 'Patía', 'Corinto', 'Miranda', 'Guapi', 'Piendamó', 'Timbío', 'Caloto', 'Villa Rica', 'Cajibío', 'El Tambo', 'Silvia', 'Bolívar', 'Mercaderes', 'Rosas', 'Buenos Aires', 'Suárez', 'López de Micay'],
    'Cesar': ['Valledupar', 'Aguachica', 'Bosconia', 'Codazzi', 'Chimichagua', 'La Jagua de Ibirico', 'Curumaní', 'Pelaya', 'Chiriguaná', 'El Copey', 'San Diego', 'La Paz', 'Pailitas', 'San Martín', 'Astrea', 'Tamalameque', 'Gamarra', 'La Gloria', 'Río de Oro', 'Manaure', 'González', 'Pueblo Bello', 'Becerril', 'San Alberto', 'Agustín Codazzi'],
    'Chocó': ['Quibdó', 'Istmina', 'Condoto', 'Tadó', 'Acandí', 'Bahía Solano', 'Bajo Baudó', 'Bojayá', 'Cértegui', 'El Carmen de Atrato', 'Litoral del San Juan', 'Lloró', 'Medio Atrato', 'Medio Baudó', 'Medio San Juan', 'Nóvita', 'Nuquí', 'Río Iro', 'Río Quito', 'Riosucio', 'San José del Palmar', 'Sipí', 'Unguía'],
    'Cundinamarca': ['Bogotá', 'Soacha', 'Facatativá', 'Zipaquirá', 'Chía', 'Fusagasugá', 'Girardot', 'Mosquera', 'Madrid', 'Funza', 'Cajicá', 'Sibaté', 'Tocancipá', 'La Calera', 'Sopó', 'Cota', 'Villeta', 'Tabio', 'Tenjo', 'Gachancipá', 'Guaduas', 'Ubaté', 'El Colegio', 'La Mesa', 'Anapoima', 'San Antonio del Tequendama', 'Arbeláez', 'Pacho', 'Chocontá', 'Agua de Dios'],
    'Huila': ['Neiva', 'Pitalito', 'Garzón', 'La Plata', 'Campoalegre', 'Algeciras', 'Gigante', 'Aipe', 'Hobo', 'Rivera', 'Palermo', 'Tello', 'San Agustín', 'Isnos', 'Saladoblanco', 'Timaná', 'Tarqui', 'Tesalia', 'Suaza', 'Acevedo', 'Guadalupe', 'Pitalito', 'Elías', 'Nátaga', 'Yaguará'],
    'La Guajira': ['Riohacha', 'Maicao', 'Uribia', 'Manaure', 'San Juan del Cesar', 'Villanueva', 'Fonseca', 'Dibulla', 'Distracción', 'Albania', 'Hatonuevo', 'Barrancas', 'El Molino', 'Urumita', 'La Jagua del Pilar'],
    'Magdalena': ['Santa Marta', 'Ciénaga', 'Fundación', 'Plato', 'Zona Bananera', 'El Banco', 'Aracataca', 'Pivijay', 'Santa Ana', 'Sabanas de San Ángel', 'San Zenón', 'Sitionuevo', 'Cerro de San Antonio', 'Concordia', 'El Piñón', 'El Retén', 'Guamal', 'Nueva Granada', 'Pedraza', 'Pijiño del Carmen', 'Puebloviejo', 'Remolino', 'Salamina', 'San Sebastián de Buenavista', 'Santa Bárbara de Pinto', 'Tenerife', 'Zapayán', 'Algarrobo', 'Ariguaní', 'Chivolo'],
    'Meta': ['Villavicencio', 'Acacías', 'Granada', 'Puerto López', 'Restrepo', 'San Martín', 'Cumaral', 'Guamal', 'San Carlos de Guaroa', 'Cabuyaro', 'Puerto Gaitán', 'Barranca de Upía', 'Castilla la Nueva', 'El Calvario', 'El Castillo', 'El Dorado', 'Fuente de Oro', 'La Macarena', 'Lejanías', 'Mapiripán', 'Mesetas', 'Puerto Concordia', 'Puerto Lleras', 'Puerto Rico', 'Uribe', 'Vista Hermosa'],
    'Nariño': ['Pasto', 'Tumaco', 'Ipiales', 'Túquerres', 'Samaniego', 'Barbacoas', 'La Unión', 'Sandona', 'Cumbal', 'El Charco', 'La Cruz', 'Policarpa', 'Pupiales', 'Francisco Pizarro', 'Santa Bárbara', 'Guachucal', 'Ricaurte', 'Sapuyes', 'Chachagüí', 'Tangua', 'Olaya Herrera', 'Magüi Payán', 'Mosquera', 'Linares', 'Yacuanquer'],
    'Norte de Santander': ['Cúcuta', 'Ocaña', 'Pamplona', 'Villa del Rosario', 'Los Patios', 'Tibú', 'El Zulia', 'Chinácota', 'Sardinata', 'Salazar', 'Puerto Santander', 'Convención', 'Teorama', 'Hacarí', 'Durania', 'Abrego', 'San Cayetano', 'El Tarra', 'Bucarasica', 'Cachirá', 'Toledo', 'Villa Caro', 'Gramalote', 'Lourdes', 'Ragonvalia'],
    'Putumayo': ['Mocoa', 'Puerto Asís', 'Valle del Guamuéz', 'Orito', 'Puerto Caicedo', 'Puerto Guzmán', 'Villagarzón', 'San Miguel', 'Puerto Leguízamo', 'Sibundoy', 'Colón', 'Santiago', 'San Francisco'],
    'Quindío': ['Armenia', 'Calarcá', 'Montenegro', 'La Tebaida', 'Quimbaya', 'Circasia', 'Filandia', 'Salento', 'Génova', 'Pijao', 'Córdoba', 'Buenavista'],
    'Risaralda': ['Pereira', 'Dosquebradas', 'La Virginia', 'Santa Rosa de Cabal', 'Marsella', 'Belén de Umbría', 'Quinchía', 'Apía', 'Santuario', 'Guática', 'Pueblo Rico', 'Mistrató', 'La Celia', 'Balboa'],
    'Santander': ['Bucaramanga', 'Floridablanca', 'Girón', 'Piedecuesta', 'Barrancabermeja', 'San Gil', 'Socorro', 'Málaga', 'Barbosa', 'Vélez', 'Sabana de Torres', 'Puerto Wilches', 'Lebrija', 'El Carmen de Chucurí', 'Simacota', 'Zapatoca', 'Betulia', 'Cimitarra', 'Capitanejo', 'Charalá', 'Landázuri', 'Mogotes', 'Onzaga', 'San Vicente de Chucurí', 'Rionegro', 'Suaita', 'Coromoro', 'Enciso', 'Guaca', 'Guapotá'],
    'Sucre': ['Sincelejo', 'Corozal', 'Sampués', 'Tolú', 'San Marcos', 'Majagual', 'San Onofre', 'Sincé', 'Morroa', 'Los Palmitos', 'Ovejas', 'San Pedro', 'Galeras', 'San Luis de Sincé', 'Tolú Viejo', 'La Unión', 'Caimito', 'Chalán', 'Guaranda', 'San Benito Abad', 'Buenavista', 'San Juan de Betulia', 'Santiago de Tolú', 'Palmito', 'Coloso'],
    'Tolima': ['Ibagué', 'Espinal', 'Melgar', 'Honda', 'Líbano', 'Chaparral', 'Mariquita', 'Purificación', 'Fresno', 'Guamo', 'Armero', 'Flandes', 'Ambalema', 'Cajamarca', 'Saldaña', 'Rovira', 'Venadillo', 'Planadas', 'Natagaima', 'Icononzo', 'Ortega', 'Dolores', 'Alvarado', 'Ataco', 'Rioblanco'],
    'Valle del Cauca': ['Cali', 'Palmira', 'Buenaventura', 'Tuluá', 'Cartago', 'Buga', 'Jamundí', 'Yumbo', 'Candelaria', 'Florida', 'Pradera', 'Roldanillo', 'Sevilla', 'Zarzal', 'El Cerrito', 'Dagua', 'Andalucía', 'Bugalagrande', 'La Unión', 'Vijes', 'Calima', 'Toro', 'La Cumbre', 'Restrepo', 'Trujillo', 'Bolívar', 'Versalles', 'Obando', 'El Águila', 'Ansermanuevo']
  }

  // Datos de departamentos/regiones por país
  regionsByCountry = {
    'Colombia': ['Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda', 'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada'],
    'México': ['Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Estado de México', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'],
    'Argentina': ['Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Ciudad Autónoma de Buenos Aires', 'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán'],
    'España': ['Andalucía', 'Aragón', 'Asturias', 'Islas Baleares', 'Canarias', 'Cantabria', 'Castilla-La Mancha', 'Castilla y León', 'Cataluña', 'Comunidad Valenciana', 'Extremadura', 'Galicia', 'La Rioja', 'Comunidad de Madrid', 'Región de Murcia', 'Navarra', 'País Vasco'],
    'Estados Unidos': ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
    'Brasil': ['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'],
    'Perú': ['Amazonas', 'Áncash', 'Apurímac', 'Arequipa', 'Ayacucho', 'Cajamarca', 'Callao', 'Cusco', 'Huancavelica', 'Huánuco', 'Ica', 'Junín', 'La Libertad', 'Lambayeque', 'Lima', 'Loreto', 'Madre de Dios', 'Moquegua', 'Pasco', 'Piura', 'Puno', 'San Martín', 'Tacna', 'Tumbes', 'Ucayali'],
    'Chile': ['Arica y Parinacota', 'Tarapacá', 'Antofagasta', 'Atacama', 'Coquimbo', 'Valparaíso', 'Metropolitana de Santiago', 'O\'Higgins', 'Maule', 'Ñuble', 'Biobío', 'La Araucanía', 'Los Ríos', 'Los Lagos', 'Aysén', 'Magallanes'],
    'Venezuela': ['Amazonas', 'Anzoátegui', 'Apure', 'Aragua', 'Barinas', 'Bolívar', 'Carabobo', 'Cojedes', 'Delta Amacuro', 'Distrito Capital', 'Falcón', 'Guárico', 'Lara', 'Mérida', 'Miranda', 'Monagas', 'Nueva Esparta', 'Portuguesa', 'Sucre', 'Táchira', 'Trujillo', 'Vargas', 'Yaracuy', 'Zulia'],
    'Ecuador': ['Azuay', 'Bolívar', 'Cañar', 'Carchi', 'Chimborazo', 'Cotopaxi', 'El Oro', 'Esmeraldas', 'Galápagos', 'Guayas', 'Imbabura', 'Loja', 'Los Ríos', 'Manabí', 'Morona Santiago', 'Napo', 'Orellana', 'Pastaza', 'Pichincha', 'Santa Elena', 'Santo Domingo de los Tsáchilas', 'Sucumbíos', 'Tungurahua', 'Zamora Chinchipe']
  }

  connect() {
    // Inicializar cuando el controlador se conecta al DOM
    const country = this.countryTarget.value || 'Colombia'
    const department = this.initialDepartmentValue || (country === 'Colombia' ? 'Córdoba' : '')
    const city = this.initialCityValue || ''
    
    this.updateDepartmentField(country, department, city)
  }

  countryChanged(event) {
    const country = event.target.value
    this.updateDepartmentField(country, '', '')
  }

  departmentChanged(event) {
    const department = event.target.value
    this.updateCityField(department, '')
  }

  updateDepartmentField(country, currentValue, currentCity) {
    if (this.regionsByCountry[country]) {
      const regions = this.regionsByCountry[country]
      const defaultValue = (country === 'Colombia' && !currentValue) ? 'Córdoba' : currentValue
      
      // Crear select de forma segura (prevención XSS)
      const select = document.createElement('select')
      select.name = 'curriculum[department]'
      select.id = 'curriculum_department'
      select.className = 'form-input'
      select.setAttribute('data-location-target', 'department')
      select.setAttribute('data-action', 'change->location#departmentChanged')
      
      const emptyOption = document.createElement('option')
      emptyOption.value = ''
      emptyOption.textContent = 'Seleccionar departamento/región'
      select.appendChild(emptyOption)
      
      regions.forEach(region => {
        const option = document.createElement('option')
        option.value = region
        option.textContent = region
        if (defaultValue === region) option.selected = true
        select.appendChild(option)
      })
      
      this.departmentContainerTarget.innerHTML = ''
      this.departmentContainerTarget.appendChild(select)
      
      if (defaultValue) {
        this.updateCityField(defaultValue, currentCity)
      }
    } else {
      const input = document.createElement('input')
      input.type = 'text'
      input.name = 'curriculum[department]'
      input.id = 'curriculum_department'
      input.value = currentValue || ''
      input.placeholder = 'Ej: Región, Estado, Provincia'
      input.className = 'form-input'
      
      this.departmentContainerTarget.innerHTML = ''
      this.departmentContainerTarget.appendChild(input)
      
      const cityValue = this.cityContainerTarget.querySelector('input, select')?.value || ''
      const cityInput = document.createElement('input')
      cityInput.type = 'text'
      cityInput.name = 'curriculum[city]'
      cityInput.id = 'curriculum_city'
      cityInput.value = cityValue
      cityInput.placeholder = 'Ej: Ciudad'
      cityInput.className = 'form-input'
      
      this.cityContainerTarget.innerHTML = ''
      this.cityContainerTarget.appendChild(cityInput)
    }
  }

  updateCityField(department, currentValue) {
    if (this.citiesByDepartment[department]) {
      const cities = this.citiesByDepartment[department]
      
      // Crear select de forma segura (prevención XSS)
      const select = document.createElement('select')
      select.name = 'curriculum[city]'
      select.id = 'curriculum_city'
      select.className = 'form-input'
      
      const emptyOption = document.createElement('option')
      emptyOption.value = ''
      emptyOption.textContent = 'Seleccionar ciudad'
      select.appendChild(emptyOption)
      
      cities.forEach(city => {
        const option = document.createElement('option')
        option.value = city
        option.textContent = city
        if (currentValue === city) option.selected = true
        select.appendChild(option)
      })
      
      this.cityContainerTarget.innerHTML = ''
      this.cityContainerTarget.appendChild(select)
    } else {
      const input = document.createElement('input')
      input.type = 'text'
      input.name = 'curriculum[city]'
      input.id = 'curriculum_city'
      input.value = currentValue || ''
      input.placeholder = 'Ej: Bogotá'
      input.className = 'form-input'
      
      this.cityContainerTarget.innerHTML = ''
      this.cityContainerTarget.appendChild(input)
    }
  }
}
