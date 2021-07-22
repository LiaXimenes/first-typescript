import * as recommendationsRepository from "../repositories/recommendationsRepository";

async function postingSong(name: string, youtubeLink: string){
    const songWasPosted = await recommendationsRepository.postingTheSong(name, youtubeLink);

    return songWasPosted;
}

export {postingSong}