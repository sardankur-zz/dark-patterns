/*eslint-env node*/
'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Questions',
      'dp',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
      
    )
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn(
      'Questions',
      'dp'
    )
  }
}
