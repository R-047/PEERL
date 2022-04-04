import clientPromise, { ObjectId } from '../../lib/mongodb'
import { getSession } from 'next-auth/react'


export default async function handler(req, res) {
	if (req.method == 'GET') {
		const user_id = req.query.room_id
		const result = await getRoomsInfo(user_id)
		res.status(200).json(result)


	}else{
		res.status(400).json({ method: 'GET ONLY' })
	}

	
}


const getRoomsInfo = async (room_id) => {
		const client = await clientPromise
		const result = await client.db().collection("rooms").findOne({
			_id: {
				$eq: new ObjectId(room_id)
			}
		})
		return result
}