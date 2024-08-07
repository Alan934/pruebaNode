const filterNullFields = (data) => {
  if (Array.isArray(data)) {
    return data.map(item => filterNullFields(item));
  } else if (data && typeof data === 'object') {
    if (data.toJSON) data = data.toJSON(); // Convertir instancia de Sequelize a objeto plano
    const filteredItem = {};
    // Iterar sobre cada par clave-valor del objeto
    for (const [key, value] of Object.entries(data)) {
      if (value !== null) {
        filteredItem[key] = value;
      }
    }
    return filteredItem;
  }
  return data; // Para cualquier otro tipo de datos, devolver tal cual
};

module.exports = filterNullFields;