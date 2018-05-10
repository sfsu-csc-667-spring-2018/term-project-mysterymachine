async function selectFromCards(){
const pg = require('pg');
const connectionString = process.env.DATABASE_URL;

const client = new pg.Client(connectionString);
await client.connect();


 const res = client.query("SELECT * FROM cards");

res.rows.forEach(row=>{
    console.log(row);
});
     client.end();
}