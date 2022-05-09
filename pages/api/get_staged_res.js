import clientPromise, { ObjectId } from '../../lib/mongodb'
import { getSession } from 'next-auth/react'


export default async function handler(req, res) {
	if (req.method == 'GET') {
		console.log("logging from server ...................", req.body, req.query)
		const room_id = req.query.room_id
		const result = await getRoomsStagedResources(room_id)
                console.log("🚀 ~ file: getRoomsStagedResources.js ~ line 10 ~ handler ~ result", result)
		
		res.status(200).json(result)


	}else{
		res.status(400).json({ method: 'GET ONLY' })
	}
	
}


const getRoomsStagedResources = async (room_id) => {
		const client = await clientPromise
		const cursor = await client.db().collection("resources").find({
			room_id: {
				$eq: new ObjectId(room_id)
			},
            staging: {
                $eq: true,
            }
            
		})
		const result = await cursor.toArray();
		return result
}