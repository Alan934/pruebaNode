const User = require('../models/User');
const Formulario = require('../models/FormularioModel')
const { Sequelize } = require('sequelize');

const getItem = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const user = await User.findByPk(id, {
            attributes: { exclude: ['age', 'password'] }
        });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al buscar el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const getItems = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['age', 'password'] }
        });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const deleteItem = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (user) {
        await user.destroy();
        res.status(200).json({ message: "user deleted successfully", user });
      } else {
        res.status(404).json({ message: "user not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const recover = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Encuentra el user eliminado utilizando la opción 'paranoid'
      const card = await User.findOne({ where: { id, deletedAt: { [Sequelize.Op.ne]: null } }, paranoid: false });
  
      if (!card) {
        return res.status(404).json({ message: "user not found or already active" });
      }
  
      // Restaura el user eliminado
      await card.restore();
  
      res.status(200).json({ message: "user recovered successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const getFormularioUser = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const user = await User.findByPk(id, {
            attributes: { exclude: ['age', 'password'] },
            include: [{
                model: Formulario,
                attributes: { exclude: ['deletedAt'] }
            }]
        });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al buscar el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = { getItem, getItems, getFormularioUser, deleteItem, recover };

