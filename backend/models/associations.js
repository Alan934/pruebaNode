const Team = require("./team/team");
const TeamMember = require("./team/teamMember");

const Vista = require("./VistaModel");
const Footer = require("./footer");

Team.belongsToMany(TeamMember, { through: 'TeamMembersTeams', as: 'members', foreignKey: 'teamId', otherKey: 'teamMemberId' });
TeamMember.belongsToMany(Team, { through: 'TeamMembersTeams', as: 'teams', foreignKey: 'teamMemberId', otherKey: 'teamId' });

Vista.belongsToMany(Footer, { through: 'VistaFooter', foreignKey: 'vistaId', otherKey: 'footerId' });
Footer.belongsToMany(Vista, { through: 'VistaFooter', foreignKey: 'footerId', otherKey: 'vistaId' });

module.exports = { Team, TeamMember, Vista, Footer};
