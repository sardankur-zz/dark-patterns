/*eslint-env node*/
import Sequelize from 'sequelize'
import sequelizeConfig from '../sequelize_config'
import { ENV } from '../../../../config/env'
import questionnaireModel from './questionnaire'
import questionModel from './question'
import optionModel from './option'
import responseModel from './response'

const config = sequelizeConfig[ENV]

const db = {}
const dbUrl = process.env[config.use_env_variable]

const sequelize = dbUrl ? new Sequelize(dbUrl) : new Sequelize(config.database, config.username, config.password, config)

db.Question = sequelize.import('Question', questionModel)
db.Questionnaire = sequelize.import('Questionnaire', questionnaireModel)
db.Option = sequelize.import('Option', optionModel)
db.Response = sequelize.import('Response', responseModel)

Object.keys(db).forEach((key) => {
  const model = db[key]
  if (model.associate) {
    model.associate(db)
  }
})

const resources = Object.keys(db)

export {
  db as Models,
  resources as Resources,
  sequelize
}
