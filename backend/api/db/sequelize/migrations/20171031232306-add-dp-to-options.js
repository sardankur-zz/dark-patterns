/*eslint-env node*/
'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Options',
      'dp',
      Sequelize.BOOLEAN
      
    )
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn(
      'Options',
      'dp'
    )
  }
}
