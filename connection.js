const pg = require('pg')
const connection = "postgres://testuser:password1@localhost:5432/testdb"

const client = new pg.Client(connection)
client.connect();
const query = `SELECT * FROM users`;
client.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    for (let row of res.rows) {
        console.log(row);
    }
    client.end();
});


