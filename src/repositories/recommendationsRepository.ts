import connection from "../database";
import { selectedSongs } from "../services/recommendationsService";

async function postingTheSong(name: string, youtubeLink: string){
    const songWasPosted = await connection.query(`
        INSERT INTO recommendations (name, "youtubeLink", score)
        VALUES ($1,$2, $3)
        RETURNING *
    `, [name, youtubeLink, 0]);

    return songWasPosted.rows;
}

async function  songExists(id: number){
    const gettingSong = await connection.query(`
        SELECT * FROM recommendations
        WHERE id = $1
    `, [id]);

    return gettingSong.rows

}

async function upVoting(id: number, newScore: number){
    const songWasVoted= await connection.query(`
        UPDATE recommendations 
        SET score = $1 
        WHERE id = $2
        RETURNING *
    `, [newScore, id]);

    return songWasVoted.rows;
}

async function downVoting(id: number, newScore: number){
    const songWasVoted = await connection.query(`
        UPDATE recommendations
        SET score = $1
        WHERE Id = $2
        RETURNING *    
    `, [newScore, id]);

    return songWasVoted.rows;
}

async function deletingSong(id: number){
    const deletingSong = await connection.query(`
        DELETE FROM recommendations 
        WHERE id = $1
    `,[id]);

    return deletingSong.rows;
}

async function selectingSongs(){
    const selectedSongs = await connection.query(`
        SELECT * FROM recommendations
    `);

    return selectedSongs.rows;
}

async function selectingTopSongs(){
    const selectedTopSongs = await connection.query(`
        SELECT * FROM recommendations
        ORDER BY score DESC
    `);

    return selectedTopSongs.rows;
}

export {postingTheSong, songExists, upVoting, downVoting, deletingSong, selectingSongs, selectingTopSongs}