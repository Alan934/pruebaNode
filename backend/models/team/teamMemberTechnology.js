const { sequelize } = require("../../config/config");
const { DataTypes } = require("sequelize");
const TeamMember = require("./teamMember");

const TeamMemberTechnology = sequelize.define("teammembertechnologies", {
        URLIconTechnology: {
        type: DataTypes.STRING
    },
    technologyName:{
        type: DataTypes.STRING
    },
    team_member_id: {
        type: DataTypes.INTEGER,
        references: {
            model: TeamMember,
            key: 'id',
        },
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

TeamMember.hasMany(TeamMemberTechnology, { foreignKey: "team_member_id", onDelete:'CASCADE' }); //TeamMember puede tener muchos TeamMemberTechnology, si TeamMember se elimina TeamMemberTechnology tambien
TeamMemberTechnology.belongsTo(TeamMember, { foreignKey: "team_member_id" }); //Cada TeamMemberTechnology pertenece a un TeamMember

module.exports = TeamMemberTechnology