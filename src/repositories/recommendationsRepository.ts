import connection from "../database";

async function postingTheSong(name: string, youtubeLink: string){
    const songWasPosted = await connection.query(`
    INSERT INTO songs (name, "youtubeLink")
    VALUES ($1,$2)
    RETURNING *`, [name, youtubeLink])

    return songWasPosted;
}

export {postingTheSong}