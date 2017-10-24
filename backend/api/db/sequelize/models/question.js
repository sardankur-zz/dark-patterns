'use strict'

export default (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correctOption: {
      type: DataTypes.INTEGER,
      references: 'Options',
      referencesKey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    questionnaireId: {
      type: DataTypes.INTEGER,
      references: 'Questionnaire',
      referencesKey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    classMethods: {
      associate(models) {
        /**
         * Question --> hasMany --> Options
         */
        Question.hasMany(models.Option, {
          foreignKey: 'questionId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          constraints: false
        })

        /**
         * Question --> hasOne --> correctAnswer
         */

        Question.hasOne(models.Option, {
          foreignKey: 'questionId',
          as: 'correct',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          constraints: false
        })

        Question.belongsTo(models.Questionnaire, {
          as: 'questionnaire',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          constraints: false
        })
      }
    },
    instanceMethods: {}
  })


  return Question
}
