/*eslint-env node*/
'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Questions',
      'correctOption', {
        references: {
          model: 'Options',
          key: 'id'
        },
        type: Sequelize.INTEGER
      }
      
    )
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn(
      'Questions',
      'correctOption'
    )
  }
}
