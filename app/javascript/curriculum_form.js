// curriculum_form.js - Manejo del formulario de currículum

// Datos de ciudades por departamento de Colombia
const citiesByDepartment = {
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
};

// Datos de departamentos/regiones por país
const regionsByCountry = {
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
};

// Función para actualizar el campo de ciudad
function updateCityField(department, currentValue) {
  const container = document.getElementById('city-container');
  if (!container) return;

  if (citiesByDepartment[department]) {
    const cities = citiesByDepartment[department];
    let selectHTML = '<select name="curriculum[city]" id="city-field" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">';
    selectHTML += '<option value="">Seleccionar ciudad</option>';
    cities.forEach(city => {
      const selected = currentValue === city ? 'selected' : '';
      selectHTML += `<option value="${city}" ${selected}>${city}</option>`;
    });
    selectHTML += '</select>';
    container.innerHTML = selectHTML;
  } else {
    const value = currentValue || '';
    container.innerHTML = `<input type="text" name="curriculum[city]" id="city-field" value="${value}" placeholder="Ej: Bogotá" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">`;
  }
}

// Función para actualizar el campo de departamento
function updateDepartmentField(country, currentValue, currentCity) {
  const container = document.getElementById('department-container');
  if (!container) return;

  if (regionsByCountry[country]) {
    const regions = regionsByCountry[country];
    const defaultValue = (country === 'Colombia' && !currentValue) ? 'Córdoba' : currentValue;
    let selectHTML = '<select name="curriculum[department]" id="department-field" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">';
    selectHTML += '<option value="">Seleccionar departamento/región</option>';
    regions.forEach(region => {
      const selected = defaultValue === region ? 'selected' : '';
      selectHTML += `<option value="${region}" ${selected}>${region}</option>`;
    });
    selectHTML += '</select>';
    container.innerHTML = selectHTML;
    
    const departmentField = document.getElementById('department-field');
    if (departmentField) {
      departmentField.addEventListener('change', function() {
        updateCityField(this.value, '');
      });
      
      // Si hay un valor seleccionado (default o guardado), actualizar ciudad
      if (defaultValue) {
        updateCityField(defaultValue, currentCity);
      }
    }
  } else {
    const value = currentValue || '';
    container.innerHTML = `<input type="text" name="curriculum[department]" id="department-field" value="${value}" placeholder="Ej: Región, Estado, Provincia" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">`;
    const cityContainer = document.getElementById('city-container');
    if (cityContainer) {
      const cityValue = document.getElementById('city-field') ? document.getElementById('city-field').value : '';
      cityContainer.innerHTML = `<input type="text" name="curriculum[city]" id="city-field" value="${cityValue}" placeholder="Ej: Ciudad" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">`;
    }
  }
}

// Inicializar funcionalidad de país/departamento/ciudad
function initializeLocationFields() {
  // Obtener valores iniciales antes de que JavaScript modifique el DOM
  const departmentField = document.getElementById('department-field');
  const cityField = document.getElementById('city-field');
  const initialDepartment = departmentField?.value || '';
  const initialCity = cityField?.value || '';
  
  const countrySelect = document.getElementById('country-select');
  if (countrySelect) {
    const initialCountry = countrySelect.value || 'Colombia';
    
    // Si hay un departamento guardado, usarlo; si no y es Colombia, usar Córdoba
    const departmentValue = initialDepartment || (initialCountry === 'Colombia' ? 'Córdoba' : '');
    
    // Actualizar el campo de departamento según el país
    updateDepartmentField(initialCountry, departmentValue, initialCity);

    // Escuchar cambios en el país
    countrySelect.addEventListener('change', function() {
      updateDepartmentField(this.value, '', '');
    });
  }
}

// Inicializar idiomas
function initializeLanguages() {
  const addLanguageBtn = document.getElementById('add-other-language-btn');
  if (addLanguageBtn) {
    addLanguageBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const input = document.getElementById('new-other-language');
      const language = input.value.trim();
      
      if (!language) {
        alert('Por favor ingresa un idioma');
        return;
      }
      
      const container = document.getElementById('other-languages-container');
      const div = document.createElement('div');
      div.className = 'language-item';
      
      const span = document.createElement('span');
      span.textContent = language;
      
      // Crear input oculto para enviar el valor al servidor
      const hiddenInput = document.createElement('input');
      hiddenInput.type = 'hidden';
      hiddenInput.name = 'curriculum[languages][]';
      hiddenInput.value = language;
      
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'remove-other-language btn-remove';
      btn.dataset.language = language;
      btn.textContent = '×';
      
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        div.remove();
      });
      
      div.appendChild(span);
      div.appendChild(btn);
      div.appendChild(hiddenInput);
      container.appendChild(div);
      
      input.value = '';
    });
  }

  const newLanguageInput = document.getElementById('new-other-language');
  if (newLanguageInput) {
    newLanguageInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('add-other-language-btn')?.click();
      }
    });
  }

  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-other-language') && e.target.tagName === 'BUTTON') {
      e.preventDefault();
      e.target.parentElement.remove();
    }
  });
}

// Inicializar estudios
function initializeStudies(studyIndex) {
  const addStudyBtn = document.getElementById('add-study-btn');
  const educationLevelSelect = document.getElementById('education-level-select');
  
  function updateAddStudyButton() {
    if (educationLevelSelect && addStudyBtn) {
      const selectedLevel = educationLevelSelect.value;
      if (selectedLevel === 'ninguno' || selectedLevel === '') {
        addStudyBtn.disabled = true;
        addStudyBtn.style.opacity = '0.5';
        addStudyBtn.style.cursor = 'not-allowed';
      } else {
        addStudyBtn.disabled = false;
        addStudyBtn.style.opacity = '1';
        addStudyBtn.style.cursor = 'pointer';
      }
    }
  }
  
  updateAddStudyButton();
  
  if (educationLevelSelect) {
    educationLevelSelect.addEventListener('change', updateAddStudyButton);
  }
  
  if (addStudyBtn) {
    addStudyBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      if (addStudyBtn.disabled) {
        return;
      }
      
      const container = document.getElementById('studies-container');
      const newStudy = document.createElement('div');
      newStudy.className = 'study-panel study-fields';

      newStudy.innerHTML = `
        <div class="study-header">
          <h4>Estudio</h4>
          <button type="button" class="remove-study-btn btn btn-danger btn-sm">Eliminar</button>
        </div>

        <div class="form-group">
          <label for="curriculum_studies_attributes_${studyIndex}_institution">Institución *</label>
          <input type="text" name="curriculum[studies_attributes][${studyIndex}][institution]" id="curriculum_studies_attributes_${studyIndex}_institution" class="form-control">
        </div>

        <div class="form-group">
          <label for="curriculum_studies_attributes_${studyIndex}_status">Estado</label>
          <select name="curriculum[studies_attributes][${studyIndex}][status]" id="curriculum_studies_attributes_${studyIndex}_status" class="form-control">
            <option value="">Seleccionar</option>
            <option value="cursando">Cursando</option>
            <option value="pausado">Pausado</option>
            <option value="finalizado">Finalizado</option>
          </select>
        </div>

        <div class="form-grid-2">
          <div>
            <label for="curriculum_studies_attributes_${studyIndex}_start_date">Fecha Inicio</label>
            <input type="date" name="curriculum[studies_attributes][${studyIndex}][start_date]" id="curriculum_studies_attributes_${studyIndex}_start_date" class="form-control">
          </div>
          <div>
            <label for="curriculum_studies_attributes_${studyIndex}_end_date">Fecha Fin</label>
            <input type="date" name="curriculum[studies_attributes][${studyIndex}][end_date]" id="curriculum_studies_attributes_${studyIndex}_end_date" class="form-control">
          </div>
        </div>

        <div class="form-group form-group-no-margin">
          <label for="curriculum_studies_attributes_${studyIndex}_title">Título</label>
          <input type="text" name="curriculum[studies_attributes][${studyIndex}][title]" id="curriculum_studies_attributes_${studyIndex}_title" class="form-control">
        </div>
      `;
      
      container.appendChild(newStudy);
      studyIndex++;
    });
  }

  // Delegación de eventos para eliminar estudios
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-study-btn')) {
      e.preventDefault();
      const studyField = e.target.closest('.study-fields');
      
      const destroyCheckbox = studyField.querySelector('input[type="checkbox"][name*="_destroy"]');
      if (destroyCheckbox) {
        destroyCheckbox.checked = true;
        studyField.style.display = 'none';
      } else {
        studyField.remove();
      }
    }
  });
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Verificar si estamos en la página del formulario de currículum
  const curriculumForm = document.querySelector('form[action*="curriculums"]');
  if (!curriculumForm) return;

  // Obtener el índice inicial de estudios del DOM
  const studiesContainer = document.getElementById('studies-container');
  const initialStudyIndex = studiesContainer ? studiesContainer.querySelectorAll('.study-fields').length : 0;

  // Inicializar todas las funcionalidades
  initializeLocationFields();
  initializeLanguages();
  initializeStudies(initialStudyIndex);
});
