'use strict'

import Promise from 'bluebird'
import { Models } from '../models'

const Questionnaire = Models.Questionnaire
// const Question = Models.Question
// const Option = Models.Option

export function submit(req, res) {
  return res.status(201).json({message: `Questionnaire recorded`})
}

export function getQuestionnaireQuestions(req, res) {
  const { questionnaireId } = req.params

  return Questionnaire.find({
    where: {
      id: questionnaireId
    }
  }, {
    include: [{
      models: 'Options',
      as: 'options'
    }]
  })
  .then(questionnaire => {
    return questionnaire.getQuestions()
  })
  .then(questions => {
    return Promise.map(questions, q => {
      return Promise.all([
        q, 
        q.getOptions()
      ]).then(results => {
        let question = results[0]
        let answers = results[1]
        return {
          question: question,
          answers: answers
        }
      })
    })
  })
  .then(questions => {
    return res.status(200).json({data: questions})
  })

}




export default {
  submit,
  getQuestionnaireQuestions
}
