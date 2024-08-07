const Formulario = require("../models/FormularioModel");
const { Sequelize } = require('sequelize');
const User = require('../models/User')

const getItem = async (req, res) => {
    const id = req.params.id
    try {
        const formulario = await Formulario.findByPk(id); // Buscar la categoría por ID
        if (formulario) {
            res.status(200).json(formulario); // Enviar la categoría encontrada como respuesta
        } else {
            res.status(404).json({ error: 'Categoría no encontrada' }); // Manejar el caso de categoría no encontrada
        }
    } catch (error) {
        console.error('Error al buscar la categoría:', error);
        res.status(500).json({ error: 'Error interno del servidor' }); // Manejar errores del servidor
    }
}
const getItems = async (req, res) => {
    try {
        const formularios = await Formulario.findAll({ paranoid: false }); // Obtener todas las categorías
        res.status(200).json(formularios); // Enviar todas las categorías como respuesta
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        res.status(500).json({ error: 'Error interno del servidor' }); // Manejar errores del servidor
    }
}

const createItem = async (req, res) => {
  try {
    const { nombreUsuario, eMail, empresa, rubroEmpresa, mensaje } = req.body;

    // Verificar si el usuario ya existe
    let user = await User.findOne({ where: { email: eMail } });

    if (!user) {
      // Crear un nuevo usuario si no existe
      user = await User.create({ name: nombreUsuario, email: eMail });
    }

    // Crear el formulario asociado al usuario
    const formulario = await Formulario.create({
      empresa,
      rubroEmpresa,
      mensaje,
      userId: user.id,
    });

    res.status(201).json({ formulario });
  } catch (e) {
    console.error('Error al crear el formulario:', e);
    if (e.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'El correo electrónico ya está en uso' });
    } else {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

const updateItem = async (req, res) => {
    const id = req.params.id; // Obtener el id de los parámetros de la ruta
    const { nombreUsuario, eMail, empresa, rubroEmpresa, mensaje, categoriaId } = req.body; // Obtener los datos a actualizar

    try {
        const formulario = await Formulario.findByPk(id); // Buscar la formulario por id
        if (formulario) {
            // Actualizar los campos de la formulario
            formulario.nombreUsuario = nombreUsuario || formulario.nombreUsuario;
            formulario.eMail = eMail || formulario.eMail;
            formulario.empresa = empresa || formulario.empresa;
            formulario.rubroEmpresa = rubroEmpresa || formulario.rubroEmpresa;
            formulario.mensaje = mensaje || formulario.mensaje;
            formulario.categoriaId = categoriaId || formulario.categoriaId
            
            await formulario.save(); // Guardar los cambios
            res.status(200).json({ message: 'formulario actualizada correctamente', data: formulario });
        } else {
            res.status(404).json({ error: 'formulario no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar la formulario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const deleteItem = async (req, res) => {
  try {
      const { id } = req.params;
  
      // Buscar el formulario por su clave primaria
      const formulario = await Formulario.findByPk(id);
      if (formulario) {
        // Realiza la eliminación suave
        await formulario.destroy();
        res.status(200).json({ message: "Formulario deleted successfully", formulario });
      } else {
        res.status(404).json({ message: "Formulario not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
    

const recoverFormularioById = async (req, res) => {
  try {
    const { id } = req.params;

    // Encuentra el formulario eliminado utilizando la opción 'paranoid'
    const formulario = await Formulario.findOne({ where: { id, deletedAt: { [Sequelize.Op.ne]: null } }, paranoid: false });

    if (!formulario) {
      return res.status(404).json({ message: "Formulario not found or already active" });
    }

    // Restaura el banner eliminado
    await formulario.restore();

    res.status(200).json({ message: "Formulario recovered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    getItem,
    getItems,
    createItem,
    updateItem,
    deleteItem,
    recoverFormularioById
}