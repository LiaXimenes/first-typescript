import pg from "pg";

const {Pool} = pg;

let config = {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "1995",
    database: "sing_a_song",
}

const connection = new Pool (config);

export default connection;