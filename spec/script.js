import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 30,
  duration: '15s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<50'],
  },
};

const port = 'localhost:3000';

const questionPayload = {
  product_id: '61635',
  count: 50,
  page: 1,
}

const answerPayload = {
  question_id: '61635',
  count: 50,
  page: 1,
}

const qPayload = JSON.stringify(questionPayload);
const aPayload = JSON.stringify(answerPayload)

const params = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function script() {
  //get question
  http.get(`http://${port}/qa/questions/?product_id=${questionPayload.product_id}&count=${questionPayload.count}`);
  sleep(1);

  //get answer
  http.get(`http://${port}/qa/questions/${answerPayload.question_id}/answers?count=${answerPayload.count}`);
  sleep(1);

  //post question
  http.post(`http://${port}/qa/questions/`, qPayload, params);
  sleep(1);

  //post answer
  http.post(`http://${port}/qa/questions/${answerPayload.question_id}/answers`, aPayload, params);
  sleep(1);

  //mark question as helpful
  http.put(`http://${port}/qa/questions/${questionPayload.product_id}/helpful`);
  sleep(1);
  //report question
  http.put(`http://${port}/qa/questions/${answerPayload.question_id}/report}`)
  sleep(1);

  //mark answer as helpful
  http.put(`http://${port}/qa/answers/${questionPayload.product_id}/helpful`);
  sleep(1);

  //report answer
  http.put(`http://${port}/qa/answers/${answerPayload.question_id}/report`)
  sleep(1);

}