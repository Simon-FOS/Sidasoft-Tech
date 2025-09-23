'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Role, {
        through: 'user_roles',  // Junction table
        foreignKey: 'user_id',
        otherKey: 'role_id',
        as: 'roles'
      });
    }
  }
  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'N/A', // fallback for existing records
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'N/A',
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      defaultValue: 'user' + Math.floor(Math.random() * 10000), //fall back username but ideal for production because of potential collisions
    },

    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    avatar_url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '/assets/img/profile.png', // fallback profile pic
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
  });
  return User;
};