/*eslint-env node*/
'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Responses',
      'dp',
      Sequelize.BOOLEAN
      
    )
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn(
      'Responses',
      'dp'
    )
  }
}
