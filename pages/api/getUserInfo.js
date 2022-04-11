import clientPromise, { ObjectId } from '../../lib/mongodb'
import { CalcUsersAvgResourceRatings,  TotalUsersResourceCount, UsersTotalRoomsCount } from '../../lib/stats'

export default async function handler(req, res) {
	console.log(req.query)
	const user_id = req.query.user_id || ''
	const logged_in_user_id = req.query.logged_in_user_id || ''
	const result = await GetUserData(user_id, logged_in_user_id)
	res.status(200).json({ result })
      }


const GetUserData = async (user_id, logged_in_user_id) => {
	const client = await clientPromise
	const cursor = await client.db().collection("users").aggregate(
		[
			{
			  '$match': {
			    '_id': new ObjectId(user_id)
			  }
			}, {
			  '$lookup': {
			    'from': 'rooms', 
			    'localField': '_id', 
			    'foreignField': 'room_owner_id', 
			    'as': 'user_created_rooms'
			  }
			}, {
			  '$lookup': {
			    'from': 'resources', 
			    'localField': '_id', 
			    'foreignField': 'user_id', 
			    'as': 'resources_shared'
			  }
			}
		      ]
	)
	const result = await cursor.toArray();
	const cursor2 = await client.db().collection("subscriptions").aggregate(
		[
			{
			  '$match': {
				'user_id': new ObjectId(user_id)
			  }
			}, {
			  '$match': {
				'subscriber_id': new ObjectId(logged_in_user_id)
			  }
			}
		  ]
	)
	const result2 = await cursor2.toArray();

	const room_joined_count = await UsersTotalRoomsCount(user_id)
	const resources_shared_count = await TotalUsersResourceCount(user_id)
	const average_appreciation_count = await CalcUsersAvgResourceRatings(user_id)
	if(result){
		result[0].room_joined_count = room_joined_count
		result[0].resources_shared_count = resources_shared_count
		result[0].average_appreciation_count = average_appreciation_count
		result[0].subscribed = result2[0] || undefined
		return result[0]
	}
	
	
}
      