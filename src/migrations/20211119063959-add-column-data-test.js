'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tests', 'data', Sequelize.JSON)
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tests', 'data');
  }
};