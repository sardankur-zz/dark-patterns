'use strict'

export default (sequelize, DataTypes) => {
  const Response = sequelize.define('Response', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    questionId: {
      type: DataTypes.INTEGER,
      references: 'Questions',
      referencesKey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    optionId: {
      type: DataTypes.INTEGER,
      references: 'Questions',
      referencesKey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    userId: {
      type: DataTypes.STRING, // Radio / text etc.
      default: 'radio',
      allowNull: false
    }
  }, {
    classMethods: {
      associate(models) {
        Response.hasOne(models.Option, {
          foreignKey: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          constraints: false
        })

        Response.hasOne(models.Question, {
          foreignKey: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          constraints: false
        })


        // Option.belongsTo(models.Question, {
        //   foreignKey: 'id',
        //   as: 'correctOption',
        //   onUpdate: 'CASCADE',
        //   onDelete: 'CASCADE',
        //   constraints: false
        // })
      }
    },
    instanceMethods: {}
  })


  return Response
}
