'use strict'

import { Router } from 'express'
import { controllers } from '../db'

const questionnaireController = controllers && controllers.questionnaire
// const resourceController = controllers && controllers.resource
// const policyController = controllers && controllers.policy
// const rolesController = controllers && controllers.role
// const conferenceController = controllers && controllers.conference
// const trackController = controllers && controllers.track
// const eventController = controllers && controllers.event
// import Multer from 'multer'

const router = Router()

export default (app) => {
  router.post('/questionnaire/submit', questionnaireController.submit)

  app.use('/api/v1', router)
}
