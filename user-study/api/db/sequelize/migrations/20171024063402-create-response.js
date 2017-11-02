/*eslint-env node*/
'use strict'

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Responses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      questionId: {
        references: {
          model: 'Questions',
          key: 'id'
        },
        type: Sequelize.INTEGER,
        allowNull: false
      },
      optionId: {
        references: {
          model: 'Options',
          key: 'id'
        },
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: function(queryInterface) {
    return queryInterface.dropTable('Responses')
  }
}