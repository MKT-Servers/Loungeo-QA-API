import mongoose from 'mongoose';
const { Schema } = mongoose;

const QA = new Schema({
  product_id: Number,
  results: [
    {
    question_id: Number,
    product_id: Number,
    body: String,
    date_written: Date,
    asker_name: String,
    asker_email: String,
    reported: Boolean,
    question_helpfulness: Number,
    answers: {
      {
        answer_id: Number,
        body: String,
        date_written: Date,
        answerer_name: String,
        answerer_email: String,
        reported: Boolean,
        helpfulness: Number,
        photos: [
          {
            photo_id: Number,
            url: String,
          },
        ],
      }
    }
  }
]
})