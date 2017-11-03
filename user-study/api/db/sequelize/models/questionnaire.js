'use strict'

export default (sequelize, DataTypes) => {
  const Questionnaire = sequelize.define('Questionnaire', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    classMethods: {
      associate(models) {
        /**
         * User --> HABTM --> Role
         */
        Questionnaire.hasMany(models.Question, {
          foreignKey: 'questionnaireId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          constraints: false
        })

      }
    }
  })


  return Questionnaire
}
