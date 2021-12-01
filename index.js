const express = require('express');
const db = require('./db');
const app = express();
const path = require('path');

const port = 3000;
app.use(express.json())

//loaderio
app.get('/loaderio-fd95acf24ba42f3a47504a5ab656e5a7.txt', (req, res) => {
  res.sendFile('./loaderio.txt', { root: path.join(__dirname) });
})

// Get Questions
app.get('/qa/questions/:id', (req, res) => {
  const { id } = req.params;
  const {
    page = 1,
    count = 5,
  } = req.query;

  if (req.params.question_id) {
    console.log('invalid product id');
    res.sendStatus(400);
  } else if (page < 1 || count < 1) {
    console.log('invalid number of responses');
    res.sendStatus(400);
  }

  const query3 = 'select answer_id, question_body, to_timestamp(date/1000)::timestamp, asker_name, question_helpfulness, json_agg(answers) as answers from questions left join answers using (question_id) where product_id = $1 and questions.reported = false group by answer_id, question_body, asker_name, question_helpfulness;'

  const query4 = 'select question_id, question_body, to_timestamp(question_date/1000)::timestamp, asker_name, question_helpfulness, json_agg(answers) as answers, json_agg(photos) as photos from questions left join answers using (question_id) left join photos using(answer_id) where product_id = $1 and questions.reported = false group by question_id, question_body, asker_name, question_helpfulness;'

  const query7 = 'select answer_id, question_body, to_timestamp(question_date/1000)::timestamp, asker_name, question_helpfulness, json_agg(answers.answer_id, body, to_timestamp(date/1000)::timestamp, answerer_name, helpfulness, (json_agg(photos) from answers left join (select * from photos) as photos on photos.answer_id = answers.answer_id where questions.question_id = answers.question_id and reported = false group by answers.answer_id)) as answers, where product_id = $1 and questions.reported = false group by answer_id, question_body, asker_name, question_helpfulness;'

  db.query(query4, [ id ])
  .then(data => {
    const result = {
      product_id: id,
      results: data.rows,
    }
    res.send(result);
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(400);
  })

})

// Get Answers -- avg response time 45ms
app.get('/qa/questions/:question_id/answers', (req, res) => {
  const { question_id } = req.params;
  const {
    page = 1,
    count = 5,
  } = req.query;
  if (!req.params.question_id) {
    console.log('invalid product id');
    res.sendStatus(400);
  } else if (page < 1 || count < 1) {
    console.log('invalid number of responses');
    res.sendStatus(400);
  }

  const query1 = 'select answers.answer_id, body, to_timestamp(date/1000)::timestamp, answerer_name, helpfulness, json_agg(photos) as photos from answers left join (select * from photos) as photos on photos.answer_id = answers.answer_id where question_id = $1 and reported = false group by answers.answer_id;'

  db.query(query1, [ question_id])
   .then(data => {
     const response = {
       question: question_id,
       page: page,
       count: count,
       results : data.rows,
     };
     res.send(response)
   })
   .catch(err => {
    console.log(err);
    res.send(err);

   });
})

// Post Question
app.post('/qa/questions', (req, res) => {
  const { body, name, email, product_id } = req.body;
  db.query('insert into questions(product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) values ($1, $2, $3, $4, $5, false, 0)', [product_id, body, Date.now(),name, email])
    .then(data => {
      console.log(data.rows);
      res.sendStatus(200)
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });

})

// Post answer
app.post('/qa/questions/:question_id/answers', (req, res) => {
  const { body, name, email, photos } = req.body;
  const { question_id } = req.params;

  const query1 = 'insert into answers(question_id, body, date, answerer_name, answerer_email, reported, helpfulness) values(3519046, \'timmy da best\', select extract(epoch from now()), $3, $4, false, 0)';

  db.query('insert into answers(question_id, body, date, answerer_name, answerer_email, reported, helpfulness) values($1, $2, $3, $4, $5, false, 0)', [question_id, body, Date.now(), name, email])
  .then(data => {
    console.log((data));
    res.sendStatus(200)
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(400)
  })
})

// Mark Question as helpful
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  const { question_id } = req.params;
  db.query('update questions set question_helpfulness = question_helpfulness + 1 where question_id = $1', [ question_id ])
    .then(data => {
      console.log(data);
      res.sendStatus(200)
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400)
    })
})

// Report Question
app.put('/qa/questions/:question_id/report', (req, res) => {
  const { question_id } = req.params;

  db.query('update questions set reported = true where question_id = $1', [ question_id ])
  .then(data => {
    console.log(data);
    res.sendStatus(200)
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(400)
  })
})

//Mark Answer as helpful
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  const { answer_id } = req.params;
  console.log(answer_id);
  db.query('update answers set helpfulness = helpfulness + 1 where answer_id = $1', [ answer_id ])
  .then(data => {
    console.log(data);
    res.sendStatus(200)
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(400)
  })
})


// Report Answer
app.put('/qa/answers/:answer_id/report', (req, res) => {
  const { answer_id } = req.params;

  db.query('update answers set reported = true where answer_id = $1', [ answer_id ])
  .then(data => {
    console.log(data);
    res.sendStatus(200)
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(400)
  })
})

app.listen(port, () => {
  console.log('listening at port', port);
});