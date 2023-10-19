const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortId = process.argv[2];
const limit = process.argv[3];
const queryString = `
SELECT students.id, students.name, cohorts.name AS cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`
const value = [`%${cohortId}%`, limit]

pool.query(queryString, value)
  .then((results) => {
    results.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`)
    });
  })
  .catch(err => console.error('query error', err.stack));