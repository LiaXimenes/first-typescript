import {Request, Response} from "express";

import * as recommendationsService from "../services/recommendationsService";

async function postSong(req: Request, res: Response){
    try{
        const name: string = req.body.name;
        const youtubeLink: string = req.body.youtubeLink

        if(name === "" || youtubeLink === ""){
            return res.sendStatus(400);
        }

        const songWasPosted = await recommendationsService.postingSong(name, youtubeLink);

        if(songWasPosted === null){
            return res.sendStatus(404);
        }

        res.sendStatus(200);
    } catch(err){
        console.error(err);
        res.sendStatus(500);
    }
}

async function addVote(req: Request, res: Response){
    try{
        const id = Number(req.params.id);

        const songWasVoted  = await recommendationsService.upVoting(id);

        if(songWasVoted === null){
            return res.sendStatus(404);
        }

        res.sendStatus(200);
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }

}

async function removeVote(req: Request, res: Response){
    try{
        const id = Number(req.params.id);

        const songWasVoted  = await recommendationsService.downVoting(id);

        if(songWasVoted === null){
            return res.sendStatus(404);
        }

        res.sendStatus(200);
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }

}

async function randomSong(req: Request, res: Response){
    try{
        const selectedSong = await recommendationsService.selectedSongs();

        if(selectedSong === null){
            return res.sendStatus(404);
        }

        console.log(selectedSong);

        res.send(selectedSong);
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }
}

async function topSongs(req: Request, res: Response){
    try{
        const amount = Number(req.params.amount);

        const selectedRightAmount = await recommendationsService.selectedTopSongs(amount);

        if(selectedRightAmount === null){
            return res.sendStatus(404);
        }

        res.send(selectedRightAmount);
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }
}

export {postSong, addVote, removeVote, randomSong, topSongs}