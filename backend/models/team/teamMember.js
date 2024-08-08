const { sequelize } = require("../../config/config");
const { DataTypes } = require("sequelize");

const TeamMember = sequelize.define("teamMembers", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    memberSpecialization: {
        type: DataTypes.STRING
    },
    memberName:{
        type: DataTypes.STRING
    },
    memberURLImg:{
        type: DataTypes.STRING
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      }
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

module.exports = TeamMember;