const Instructor = require('./Instructor');
const School = require('./School');
const Placement = require('./Placement');

// Define relationships
School.hasMany(Placement, { foreignKey: 'schoolId' });
Placement.belongsTo(School, { foreignKey: 'schoolId' });

Instructor.hasMany(Placement, { foreignKey: 'instructorId' });
Placement.belongsTo(Instructor, { foreignKey: 'instructorId' });

module.exports = {
  Instructor,
  School,
  Placement,
};