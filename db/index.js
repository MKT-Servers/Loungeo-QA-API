const { Pool } = require('pg');
const config = require('../config.js')

const pool = new Pool(config);

module.exports = {
  async query(text, params) {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('query time', duration);
    return res;
  },

  async getClient() {
    const client = await pool.connect()
    try {
      var result = await client.query('select to_timestamp(date_written/1000)::timestamp from answers where answer_id = 1;');
      console.log(result);
    } finally {
      client.release();
    }
  }
}
// use json_agg

//select answer_id, body, to_timestamp(date_written/1000)::timestamp, answerer_name, helpfulness from answers where question_id = 1;
