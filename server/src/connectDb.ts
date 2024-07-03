import { Application } from "express";
import { CONFIG } from "./config";

const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

export const connectDatabase = async (app: Application) => {
    // Connection URL
    const client = new MongoClient(CONFIG.MONGODB_URL);
    // Use connect method to connect to the server
    try {
        await client.connect();
        app.locals.mongodb = client;
        console.log("Mongodb connection successfull");
    } catch(error: any) {
        console.log("Mongodb Connection failed");
        console.error(error);
    }
}