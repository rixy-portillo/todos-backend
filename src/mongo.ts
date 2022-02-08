import { MongoClient, ObjectId } from "mongodb";


const uri = process.env.NODE_ENV === "production" ?
    "mongodb://host.docker.internal:27017/db" :
    "mongodb://127.0.0.1:27017/db";


const client = new MongoClient(uri);

const getCollection = async () => {
    try {
        await client.connect();
        const database = client.db('db');
        const collection = database.collection('todos');
        return collection
    } catch (error) {
        throw error
    }
}

export const addTodo = async (todo: any) => {
    try {
        const collection = await getCollection()
        const doc = await collection.insertOne(todo)
        return { _id: doc.insertedId }
    } catch (error) {
        return { error }
    } finally {
        await client.close();
    }
}

export const getTodos = async () => {
    try {
        const collection = await getCollection()
        const todos = await collection.find().toArray()
        return { todos }
    } catch (error) {
        return { error }
    } finally {
        await client.close();
    }
}

export const deleteTodo = async (todo: any) => {
    try {
        const collection = await getCollection()
        await collection.deleteOne({ _id: new ObjectId(todo._id) })
        return { _id: todo._id }
    } catch (error) {
        return { error }
    } finally {
        await client.close();
    }
}