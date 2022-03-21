import clientPromise, { ObjectId } from "../../lib/mongodb"

export default async function handler(req, res) {
	console.log("hiiiiiiiiiiiiiiiiiii")
	if (req.method == 'GET') {

		const room_id = new ObjectId(req.query.room_id)
		const user_id = new ObjectId(req.query.user_id)

		const room_admin = await RoomAdminCheck(room_id, user_id)
		const room_member = await RoomMemCheck(room_id, user_id)
		if(room_admin){
			res.status(200).json({ user_type: 'RA' })
		
		}else if(room_member){
			res.status(200).json({ user_type: 'RM' })
		}else{
			res.status(200).json({ user_type: 'NM' })
		}

	}

}


const RoomAdminCheck = async (room_id, user_id) => {
	const client = await clientPromise
	const result = await client.db().collection("rooms").findOne({
		_id: {
			$eq: new ObjectId(room_id)
		}
	})
	const json_result = JSON.parse(JSON.stringify(result))

	return json_result.room_owner_id == user_id
}


const RoomMemCheck = async (room_id, user_id) => {
	const client = await clientPromise
	const result = await client.db().collection("room_users").findOne({
		$and: [
			{
				room_id: {
					$eq: new ObjectId(room_id)
				}
			},
			{
				user_id: {
					$eq: new ObjectId(user_id)
				}
			}

		]
		
		
	})
	return result ? true : false
}
