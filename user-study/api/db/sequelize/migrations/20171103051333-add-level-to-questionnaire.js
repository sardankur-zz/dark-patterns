/*eslint-env node*/
'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Questionnaires',
      'level',
      {
        type: Sequelize.INTEGER
      }
      
    )
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn(
      'Questionnaire',
      'level'
    )
  }
}
