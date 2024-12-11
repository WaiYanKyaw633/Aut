'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    hooks: {
      beforeCreate: async (student) => {
        student.password = await bcrypt.hash(student.password, 10);
      }
    }
  });

  Student.prototype.checkPassword = async function (password) {
    return bcrypt.compare(password, student.password);
  };

  return Student;
};
