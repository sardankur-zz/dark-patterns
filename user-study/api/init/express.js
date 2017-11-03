/*eslint-env node*/
import express from 'express'
import passport from 'passport'
import bodyParser from 'body-parser'
import path from 'path'
import flash from 'express-flash'
import frameguard from 'frameguard'
import gzip from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import { ENV, PORT } from '../../config/env'
import logger from './../../utils/logger'

/*eslint no-process-env: "error"*/

export default (app) => {
  app.set('port', (PORT || 3001))
  app.use(cors())

  app.use((req, res, next) => {
    res.header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0")
    res.header("Cache-Control: post-check=0, pre-check=0")
    res.header("Pragma: no-cache")
    next()
  })

  if (ENV === 'production') {
    app.use(gzip())
    app.use(helmet())
  }

  app.use(frameguard({
    action: 'allow-from',
    domain: 'http://hi.cs.stonybrook.edu'
  }))

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(express.static(path.join(process.cwd(), 'ui/build')))
  

  logger.info('--------------------------')
  logger.info('===> 😊  Starting Server . . .')
  logger.info(`===>  Environment: ${ENV}`)
  logger.info(`===>  Listening on port: ${app.get('port')}`)
  logger.info('--------------------------')

  app.use(passport.initialize())
  app.use(passport.session())
  app.use(flash())
}
