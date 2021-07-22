import {Request, Response} from "express";

import * as recommendationsService from "../services/recommendationsService";

async function postSong(req: Request, res: Response){
    try{
        const name: string = req.body.name;
        const youtubeLink: string = req.body.youtubeLink

        if(name === "" || youtubeLink === ""){
            return res.sendStatus(400)
        }

        const songWasPosted = await recommendationsService.postingSong(name, youtubeLink);
        console.log(songWasPosted)

        res.sendStatus(200)
    } catch(err){
        console.error(err);
        res.sendStatus(500);
    }
}

export {postSong}