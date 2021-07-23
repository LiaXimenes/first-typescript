import connection from "../database";

async function postingTheSong(name: string, youtubeLink: string){
    const songWasPosted = await connection.query(`
    INSERT INTO recommendations (name, "youtubeLink", score)
    VALUES ($1,$2, $3)
    RETURNING *
    `, [name, youtubeLink, 0]);

    return songWasPosted.rows;
}

async function upVoting(id: number){
    const gettingSong = await connection.query(`
        SELECT * FROM recommendations
        WHERE id = $1
    `, [id]);

    if(gettingSong.rows === []){
        return null;
    }

    let newScore = gettingSong.rows[0].score +1

    const songWasVoted= await connection.query(`
        UPDATE recommendations 
        SET score = $1 
        WHERE id = $2
        RETURNING *
    `, [newScore, id]);

    return songWasVoted.rows;
}

async function downVoting(id: number){
    const gettingSong = await connection.query(`
        SELECT * FROM recommendations
        WHERE id = $1
    `, [id])

    if(gettingSong.rows === []){
        return null
    }

    let newScore = gettingSong.rows[0].score -1

    const songWasVoted = await connection.query(`
        UPDATE recommendations
        SET score = $1
        WHERE Id = $2
        RETURNING *    
    `, [newScore, id]);

    if(songWasVoted.rows[0].score === -6){
        const deletingSong = await connection.query(`
            DELETE FROM recommendations 
            WHERE id = $1
        `,[id]);

        return deletingSong.rows;
    } else{
        return songWasVoted.rows;
    }
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

export {postingTheSong, upVoting, downVoting, selectingSongs, selectingTopSongs}