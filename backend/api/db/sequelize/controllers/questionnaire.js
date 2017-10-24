'use strict'

import Promise from 'bluebird'
import { Models } from '../models'

const Response = Models.Response

const Questionnaire = Models.Questionnaire
// const Question = Models.Question
// const Option = Models.Option

export function submit(req, res) {
  const { uid, qid, ansId, dp} = req.body

  return Response.create({
    questionId: qid,
    optionId: ansId,
    userId: uid
  })
  .then(() => {
    return res.status(201).json({message: `Response recorded`})
  })
  .catch((err) => {
    return res.status(500).json({message: `Something went wrong ${err.message}`})
  })
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
