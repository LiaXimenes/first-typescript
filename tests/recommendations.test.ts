import supertest from "supertest";
import app from "../src/app";

describe("POST /recommendations", () =>{
    it("should return 200 after insert recommendation into bank", async () =>{
        const body = {
            name: "Taylor Swift - Ivy",
            youtubeLink : "https://www.youtube.com/watch?v=9nIOx-ezlzA"
        }

        const response = await supertest(app).post("/recommendations").send(body);
        expect(response.status).toBe(200)
    });

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
});

describe("POST /recommendations/:id/upvote", () =>{
    it("should return 200 for successful up voting", async () =>{
        const response = await supertest(app).post("/recommendations/1/upvote").send();
        expect(response.status).toBe(200);
    });

    it("should return 404 for not corresponding id", async () => {
        const response = await supertest(app).post("/recommendations/1000/upvote").send();
        expect(response.status).toBe(404);
    });
});

describe("POST /recommendations/:id/downvote", () =>{
    it("should return 200 for successful down voting", async () =>{
        const response = await supertest(app).post("/recommendations/1/downvote").send();
        expect(response.status).toBe(200);
    });

    it("should return 404 for not corresponding id", async () => {
        const response = await supertest(app).post("/recommendations/1000/downvote").send();
        expect(response.status).toBe(404);
    });
});

describe("GET /recommendations/random", () =>{
    it("should return status 200 for random song" ,async () =>{
        const response = await supertest(app).get("/recommendations/random");
        expect(response.status).toBe(200);
    });
});

describe("GET /recommendations/top/:amount", () =>{
    it("should return status 200 for top songs", async () =>{
        const response = await supertest(app).get("/recommendations/top/2");
        expect(response.status).toBe(200)
    });

    it("should return array of top songs", async () =>{
        const response = await supertest(app).get("/recommendations/top/2");
        expect(response.body.length).toBe(2);
    });
});
