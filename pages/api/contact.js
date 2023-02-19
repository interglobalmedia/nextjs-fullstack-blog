import { MongoClient } from 'mongodb'

async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, name, message } = req.body

        if (!email || !email.includes('@') || !name || name.trim() === '' || !message || message.trim() === '') {
            res.status(422).json({ message: 'Invalid input.' })
            return
        }

        /* store it in a database */
        const newMessage = {
            email,
            name,
            message
        }

        let client

        const mongodb_username = process.env.MONGODB_USERNAME
        const mongodb_password = process.env.MONGODB_PASSWORD
        const mongodb_clustername = process.env.MONGODB_CLUSTERNAME
        const mongodb_database = process.env.MONGODB_DATABASE

        try {
            const mongodb_url = `mongodb+srv://${mongodb_username}:${mongodb_password}@${mongodb_clustername}.qbavi.mongodb.net/${mongodb_database}`
            client = await MongoClient.connect(`${mongodb_url}`)

        } catch (error) {
            res.status(500).json({
                message: `Could not connect to database.`
            })
            return
        }

        const db = client.db()

        try {
            const result = await db.collection(`messages`).insertOne(newMessage)
            newMessage.id = result.insertedId
        } catch (error) {
            client.close()
            res.status(500).json({
                message: `Storing message failed.`
            })
            return
        }

        client.close()

        res.status(201).json({ message: 'Successfully stored message!', message: newMessage})
    }
}

export default handler