import supertest from "supertest";
import app from "../src/app";

import connection from "../src/database";

describe("POST /recommendations", () =>{
    // it("should return 200 after insert recommendation into bank", async () =>{
    //     const body = {
    //         name: "Hayley Kiyoko - Curious",
    //         youtubeLink : "https://www.youtube.com/watch?v=YXTzMOmmEfE"
    //     }

    //     const response = await supertest(app).post("/recommendations").send(body);
    //     expect(response.status).toBe(200)
    // });

    it("should return status 400 to empty name", async () =>{
        const body = {
            name: "",
            youtubeLink : "https://www.youtube.com/watch?v=YXTzMOmmEfE"
        }

        const response = await supertest(app).post("/recommendations").send(body);
        expect(response.status).toBe(400);
    });

    it("should return status 400 to empty link", async () =>{
        const body = {
            name: "Hayley Kiyoko - Curious",
            youtubeLink : ""
        }

        const response = await supertest(app).post("/recommendations").send(body);
        expect(response.status).toBe(400);
    });

    // se a resposta do servidor for null eu envio 404, tem que testar isso? como faz?
});

// describe("POST /recommendations/:id/upvote", () =>{
//     it("should return 200 for successful voting", async () =>{
//         const response = await supertest(app).post("/recommendations/:id/upvote").send();
//         expect(response.status).toBe(200);

//     });
// });

describe("GET /recommendations/top/:amount", () =>{
    it("should return array of top songs", async () =>{
        let amount = 2;
        let selectedAmount: string[] = [];

        let arrayOfSongs = await connection.query(`
            SELECT * FROM recommendations
            ORDER BY score DESC
        `);

        for(let i = 0; i < amount; i++){
            selectedAmount.push(arrayOfSongs.rows[i]);
        }

        const response = await supertest(app).get("/recommendations/top/:amount");
        expect(selectedAmount.length).toBe(amount)
    });
});