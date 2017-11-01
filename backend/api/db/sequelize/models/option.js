'use strict'

export default (sequelize, DataTypes) => {
  const Option = sequelize.define('Option', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    questionId: {
      type: DataTypes.INTEGER,
      references: 'Questions',
      referencesKey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    type: {
      type: DataTypes.STRING, // Radio / text etc.
      default: 'radio',
      allowNull: false
    },
    dp: {
      type: DataTypes.BOOLEAN
    }
  }, {
    classMethods: {
      associate(models) {
        Option.belongsTo(models.Question, {
          foreignKey: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          constraints: false
        })


        Option.belongsTo(models.Question, {
          foreignKey: 'id',
          as: 'correct',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          constraints: false
        })
      }
    },
    instanceMethods: {}
  })


  return Option
}
