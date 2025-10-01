'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Course.init({
    title: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.DECIMAL
    },
    description: {
      type: DataTypes.TEXT
    },
    image_url: {
      type: DataTypes.STRING
    },
    duration: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: 'Duration in weeks'

    },
  }, {
    sequelize,
    modelName: 'Course',
    tableName: 'courses',
  });
  return Course;
};