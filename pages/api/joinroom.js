// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise, { ObjectId } from "../../lib/mongodb"

export default async function handler(req, res) {
	console.log("hiiiiiiiiiiiiiiiiiii")
	if (req.method == 'POST') {
		const room_user_obj = {
			room_id: new ObjectId(req.body.room_id),
			user_id: new ObjectId(req.body.user_id)
		}
		const result =  await insertJoinDetails(room_user_obj)
		console.log(result)
		res.status(200).json({ message: 'success' })

	}
	
}


const insertJoinDetails = async (room_user_obj) => {
	const client = await clientPromise
	const result = await client.db().collection("room_users").insertOne(room_user_obj)
	return result
}