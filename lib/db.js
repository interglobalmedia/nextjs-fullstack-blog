import { MongoClient } from 'mongodb'

export async function connectToDB() {
    let client

    const mongodb_username = process.env.MONGODB_USERNAME
    const mongodb_password = process.env.MONGODB_PASSWORD
    const mongodb_clustername = process.env.MONGODB_CLUSTERNAME
    const mongodb_database = process.env.MONGODB_DATABASE

    try {
        const mongodb_url = `mongodb+srv://${mongodb_username}:${mongodb_password}@${mongodb_clustername}.qbavi.mongodb.net/${mongodb_database}`
        client = await MongoClient.connect(`${mongodb_url}`)

        return client

    } catch (error) {
        res.status(500).json({
            message: `Could not connect to database.`
        })
        return
    }
}