'use strict'

import { Router } from 'express'
import { controllers } from '../db'

const questionnaireController = controllers && controllers.questionnaire

const router = Router()

export default (app) => {
  router.post('/questionnaire/submit', questionnaireController.submit)

  router.get(`/questionnaire/:questionnaireId/all`, questionnaireController.getQuestionnaireQuestions)

  app.use('/api/v1', router)
}
