/*eslint-env node*/
'use strict'

module.exports = {
  up: function (queryInterface) {
    return queryInterface.removeColumn(
      'Options',
      'type'
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Options',
      'type',
      {
        type: Sequelize.STRING
      }
    )
  }
}
