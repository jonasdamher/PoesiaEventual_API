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

describe("POST /api/v2/auth/", () => {
    it("Crear usuario", async () => {

        const response = await request(app)
            .post('/api/v2/auth/')
            .send({
                "name": "Jonás",
                "lastname": "Damián Hernández",
                "email": "pepeluis@gmail.com",
                "password": "XXXXXeeeeeee12Q*",
                "role": 1
            });

        expect(response.status).toBe(201);
        expect(response.body.result).toHaveProperty('_id');
    });
});