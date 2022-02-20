import clientPromise, { ObjectId } from '../../lib/mongodb'
import { getSession } from 'next-auth/react'


export default async function handler(req, res) {
	if (req.method == 'GET') {
		const session = await getSession({ req })
		const user_id = session ? session.id : req.query.id
		
		const result = await getPersonalRooms(user_id)
                // console.log("🚀 ~ file: getUsersRooms.js ~ line 11 ~ handler ~ result", result)
		res.status(200).json(result)


	}else{
		res.status(400).json({ method: 'GET ONLY' })
	}




	
}


const getPersonalRooms = async (user_id) => {
	return new Promise(async (resolve, reject) => {
		const client = await clientPromise
		const cursor = await client.db().collection("rooms").find({
			room_owner_id: {
				$eq: new ObjectId(user_id)
			}
		})
		const result = await cursor.toArray();
		resolve({
			result
		})

	})


}