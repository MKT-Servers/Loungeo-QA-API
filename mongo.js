import mongoose from 'mongoose';
const { Schema } = mongoose;

const QA = new Schema({
  product_id: Number,
  results: [
    {
    question_id: Number,
    question_body: String,
    question_date: Date,
    asker_name: String,
    question_helpfulness: Number,
    reported: Boolean,
    answers: {
      {
        answer_id: Number,
        body: String,
        date: Date,
        answerer_name: String,
        helpfulness: Number,
        photos: {
          {
            id: Number, //tinyint/smallint?
            url: String,
          },
        },
      }
    }
  }
]
})