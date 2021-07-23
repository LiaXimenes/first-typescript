import * as recommendationsRepository from "../repositories/recommendationsRepository";

async function postingSong(name: string, youtubeLink: string){
    const songWasPosted = await recommendationsRepository.postingTheSong(name, youtubeLink);

    if(!songWasPosted){
        return null;
    }

    return songWasPosted;
}

async function upVoting(id: number){
    const songIdIsValid = await recommendationsRepository.songExists(id);

    if(songIdIsValid.length === 0){
        return null;
    }

    let newScore = songIdIsValid[0].score +1

    const songWasUpVoted = await recommendationsRepository.upVoting(id, newScore);

    return songWasUpVoted;
}

async function downVoting(id: number){
    const songIdIsValid = await recommendationsRepository.songExists(id);

    if(songIdIsValid.length === 0){
        return null;
    }

    let newScore = songIdIsValid[0].score -1

    const songWasDownVoted = await recommendationsRepository.downVoting(id, newScore);

    if(songWasDownVoted[0].score === -6){
        const deletingSong = await recommendationsRepository.deletingSong(id);

        return deletingSong;
    } 
    
    return songWasDownVoted;
}

async function selectedSongs(){
    const selectedSongs = await recommendationsRepository.selectingSongs();

    let arrayOfTenPlusSong = [];
    let arrayOfNotThatGoodSongs = [];

    for(let i = 0; i < selectedSongs.length; i++){
        if(selectedSongs[i].score > 10){
            arrayOfTenPlusSong.push(selectedSongs[i]) 
        } else{
            arrayOfNotThatGoodSongs.push(selectedSongs[i])
        }
    }

    let randomChoice = Math.random();

    if(randomChoice > 0.3){
        arrayOfTenPlusSong = arrayOfTenPlusSong.sort(() => Math.random() - 0.5);
        return arrayOfTenPlusSong[0];
    } else{
        arrayOfNotThatGoodSongs = arrayOfNotThatGoodSongs.sort(() => Math.random() - 0.5);
        return arrayOfNotThatGoodSongs[0];
    }

    
}

async function selectedTopSongs(amount: number){
    let rightAmount: string[] = [];

    const selectedTopSongs: string[] = await recommendationsRepository.selectingTopSongs();

    if(!selectedTopSongs){
        return null;
    }

    for(let i = 0; i < amount; i++){
        rightAmount.push(selectedTopSongs[i]);
    }

    return rightAmount;
}

export {postingSong, upVoting, downVoting, selectedSongs, selectedTopSongs}