import app from '../src/api/app';

import { MongoMemoryServer } from 'mongodb-memory-server';

import mongoose from 'mongoose';
import request from 'supertest';

let mongod: MongoMemoryServer;

/* Connecting to the database before each test. */
beforeAll(async () => {

    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    // The Server can be stopped again with
    await mongoose.connect(uri);
});

/* Closing database connection after each test. */
afterAll(async () => {
    await mongoose.connection.close();
    await mongod.stop();
});

describe("POST /auth/", () => {

    it("Crear usuario correctamente", async () => {

        const response = await request(app)
            .post('/api/v2/auth/')
            .send({
                "name": "John",
                "lastname": "Doe",
                "email": "johndoe@example.com",
                "password": "XXXXXeeeeeee12Q*",
                "role": 1
            });

        expect(response.status).toBe(201);
        expect(response.header['content-type']).toContain('application/json');
        expect(response.body.result).toBeInstanceOf(Object);

        expect(response.body.result).toHaveProperty('_id');
    });

    it("Intentar crear usuario con campo obligatorio vacío", async () => {

        const response = await request(app)
            .post('/api/v2/auth/')
            .send({
                "name": "John",
                "lastname": "Doe",
                "email": "johndoe@example.com",
                "password": "",
                "role": 1
            });

        expect(response.status).toBe(400);
        expect(response.header['content-type']).toContain('application/json');
        expect(response.body.details).toBeInstanceOf(Object);

        expect(response.body.details[0]).toHaveProperty('message');
        expect(response.body.details[0].message).toBe("\"password\" is not allowed to be empty");
    });

});