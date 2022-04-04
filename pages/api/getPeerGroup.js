import clientPromise, { ObjectId } from '../../lib/mongodb'
import { getSession } from 'next-auth/react'


export default async function handler(req, res) {
	if (req.method == 'GET') {
		const session = await getSession({ req })
		const user_id = session ? session.id : req.query.id
		
		const result = await getJoinedRooms(user_id)
		console.log("logging result", result)
                // console.log("🚀 ~ file: getUsersRooms.js ~ line 11 ~ handler ~ result", result)
		res.status(200).json(result)


	}else{
		res.status(400).json({ method: 'GET ONLY' })
	}

	
}


const getJoinedRooms = async (user_id) => {
		const client = await clientPromise
		const cursor = await client.db().collection("room_users").aggregate(
			[
				{
				  '$match': {
				    'user_id': new ObjectId(user_id)
				  }
				}, {
				  '$lookup': {
				    'from': 'rooms', 
				    'localField': 'room_id', 
				    'foreignField': '_id', 
				    'as': 'room_info'
				  }
				}, {
				  '$unwind': {
				    'path': '$room_info', 
				    'includeArrayIndex': '0', 
				    'preserveNullAndEmptyArrays': false
				  }
				}, {
				  '$lookup': {
				    'from': 'users', 
				    'localField': 'room_info.room_owner_id', 
				    'foreignField': '_id', 
				    'as': 'room_owner_info'
				  }
				}, {
				  '$unwind': {
				    'path': '$room_owner_info', 
				    'includeArrayIndex': '0', 
				    'preserveNullAndEmptyArrays': false
				  }
				}
			      ]
		)
		const result = await cursor.toArray();
		return result
}