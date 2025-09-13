'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addColumn('users', "first_name", { type: Sequelize.STRING, allowNull: false, defaultValue: 'N/A' }, { transaction });
      await queryInterface.addColumn('users', "last_name", { type: Sequelize.STRING, allowNull: false, defaultValue: 'N/A' }, { transaction });
      await queryInterface.addColumn('users', "phone_number", { type: Sequelize.STRING, allowNull: true }, { transaction });
      await queryInterface.addColumn('users', "bio", { type: Sequelize.STRING, allowNull: true }, { transaction });
      await queryInterface.addColumn('users', "avatar_url", { type: Sequelize.STRING, allowNull: false, defaultValue: "/assets/img/profile.png" }, { transaction });
    })


  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('users', 'first_name', { transaction });
      await queryInterface.removeColumn('users', 'last_name', { transaction });
      await queryInterface.removeColumn('users', 'phone_number', { transaction });
      await queryInterface.removeColumn('users', 'bio', { transaction });
      await queryInterface.removeColumn('users', 'avatar_url', { transaction });
    })



  }
};
