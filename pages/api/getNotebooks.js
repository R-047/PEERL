import clientPromise, { ObjectId } from '../../lib/mongodb'
import { getSession } from 'next-auth/react'


export default async function handler(req, res) {
	if (req.method == 'GET') {
		const user_id = req.query.user_id
		const result = await getNotebooks(user_id)
		res.status(200).json(result)


	}else{
		res.status(400).json({ method: 'GET ONLY' })
	}
	
}


const getNotebooks = async (user_id) => {
	
		const client = await clientPromise
		const cursor = await client.db().collection("notebooks").find({
            user_id: {
                $eq: new ObjectId(user_id)
            }
        })
		const result = await cursor.toArray();
		return result


}