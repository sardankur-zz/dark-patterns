'use strict'

// import Promise from 'bluebird'
// import { Models } from '../models'

// const Role = Models.Role

export function submit(req, res) {
  return res.status(201).json({success: true, message: `Questionnaire recorded`})
}


export default {
  submit
}
