import { Response, Request, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
export const getTodoList = asyncHandler(async(req, res, next) => {
    const db = req.app.locals.mongodb.db('app');
    let isCollectionExist = await checkIFCollectionExists('todo', db);
    let data = [];
    if(isCollectionExist) {
        const collection = db.collection('todo');
        data = await collection.find().toArray();
    }
    res.status(200);
    res.json({status: true, message:'Todo List obtained successfully', data});
});

export const addTodoItem = asyncHandler(async(req, res, next) => {
    const db = req.app.locals.mongodb.db('app');
    const collection = db.collection('todo');
    let data = await collection.insertOne(req.body);
    res.status(200);
    res.json({status: true, message:'Todo Item added', data:req.body});
});

export const updateTodoItem = asyncHandler(async(req, res, next) => {
    const db = req.app.locals.mongodb.db('app');
    const collection = db.collection('todo');
    let data = await collection.updateOne({id: parseInt(req.params.id)}, {$set: req.body});
    res.status(200);
    res.json({status: true, message: 'TodoItem Updated', data});
});


export const deleteTodoItem = asyncHandler(async(req, res, next) => {
    const db = req.app.locals.mongodb.db('app');
    const collection = db.collection('todo');
    let data = await collection.deleteOne({id: parseInt(req.params.id)});
    res.status(200);
    res.send({status: true, message: 'Deleted Successfully', data: null});
});

const checkIFCollectionExists = async (collection: string, db: any) => {
    let coll = await db.listCollections({ name: collection }).toArray();
    return coll.length > 0;
}
