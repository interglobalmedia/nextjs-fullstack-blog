import { MongoClient } from 'mongodb'

export async function connectToDB() {
    let client

    const mongodb_username = process.env.MONGODB_USERNAME
    const mongodb_password = process.env.MONGODB_PASSWORD
    const mongodb_clustername = process.env.MONGODB_CLUSTERNAME
    const mongodb_database_dev = process.env.MONGODB_DATABASE_DEV

    try {
        const mongodb_url = `mongodb+srv://${mongodb_username}:${mongodb_password}@${mongodb_clustername}.qbavi.mongodb.net/${mongodb_database_dev}`
        client = await MongoClient.connect(`${mongodb_url}`)

        return client

    } catch (error) {
        res.status(500).json({
            message: `Could not connect to database.`
        })
        return
    }
}