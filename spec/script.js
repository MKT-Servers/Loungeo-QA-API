import http from 'j6/http';
import { sleep } from k6;

export const options = {
  vus: 10,
  duration: '15s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<50'],
  },
};

const port = 'localhost:3000';

const prodPayload = {
  product_id: '61635',
  count: 50,
  page: 1,
}

const questionPayload = {
  question_id: '61635',
  count: 50,
  page: 1,
}

const answerPayload = {
  answer_id: '61635',
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
  http.get(`http://${port}/qa/questions/?product_id=${testObj.product_id }&count=${testObj.count}`);
  sleep(1);
  http.get(`http://${port}/qa/questions/${testObj.product_id }/answers?count=${testObj.count}`);
  sleep(1);

  http.post(`http://${port}/qa/questions/`, qPayload, params);
  sleep(1);
  http.post(`http://${port}/qa/questions/${testObj.product_id}/answers`, aPayload, params);
  sleep(1);

  http.put(`http://${port}/qa/questions/${testObj.product_id}/helpful`);
  sleep(1);
  http.put(`http://${port}/qa/questions/${testObj.product_id}/report}`)
  sleep(1);


  http.put(`http://${port}/qa/answers/${testObj.answer_id}/helpful`);
  sleep(1);
  http.put(`http://${port}/qa/answers/${testObj.answer_id}/report`)
  sleep(1);

}