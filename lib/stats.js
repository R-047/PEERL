import clientPromise,{ObjectId} from './mongodb'


//get the average of appreciations recieved for posts inside a specific room
const CalcRoomsAvgResourceRatings = async (room_id) => {
	const client = await clientPromise
	const cursor = await client.db().collection("resources").aggregate(
		[
			{
			  '$match': {
			    'room_id': {
			      '$eq': new ObjectId(room_id)
			    }
			  }
			}, {
			  '$group': {
			    '_id': '$room_id', 
			    'avg_resource_rating': {
			      '$avg': '$appreciation_count'
			    }
			  }
			}
		      ]
	)
	const result = await cursor.toArray()
	const avg = result[0] && result[0].avg_resource_rating || 0
	return avg

}




//get the average of appreciations recieved to the resources shared by a specific user
const CalcUsersAvgResourceRatings = async (user_id) => {
	const client = await clientPromise
	const cursor = await client.db().collection("resources").aggregate(
		[
			{
			  '$match': {
			    'user_id': {
			      '$eq': new ObjectId(user_id)
			    }
			  }
			}, {
			  '$group': {
			    '_id': '$user_id', 
			    'avg_users_resource_rating': {
			      '$avg': '$appreciation_count'
			    }
			  }
			}
		      ]
	)
	const result = await cursor.toArray()
	const avg = result[0] && result[0].avg_users_resource_rating || 0
	return avg
}





//get the average user ratings of a room
const CalcRoomsAvgUserRatings = async (room_id, room_owner_id) => {
	const client = await clientPromise
	const cursor = await client.db().collection("room_users").find({
		room_id: {$eq: new ObjectId(room_id)}
	})
	const result = await cursor.toArray();
        
	let user_ratings = 0;
	for(const ele of result){
		user_ratings += await CalcUsersAvgResourceRatings(JSON.parse(JSON.stringify(ele._id)))
	}
	const avg_owner_ratings = await CalcUsersAvgResourceRatings(JSON.parse(JSON.stringify(room_owner_id)))
	user_ratings += avg_owner_ratings
	const avg = user_ratings/(result.length+1) || 0
	return avg
}





//get total resources of a room
const TotalResourcesCount = async (room_id) => {
	const client = await clientPromise;
	const cursor = await client.db().collection("resources").aggregate(
		[
			{
			  '$match': {
			    'room_id': {
			      '$eq': new ObjectId(room_id)
			    }
			  }
			}, {
			  '$count': 'room_id'
			}
		      ]
	)
	const result = await cursor.toArray()
	const count = result[0] && result[0].room_id || 0
	return count
}

//total resource shared by a user
const TotalUsersResourceCount = async (user_id) => {
	const client = await clientPromise;
	const cursor = await client.db().collection("resources").aggregate(
		[
			{
			  '$match': {
			    'user_id': {
			      '$eq': new ObjectId(user_id)
			    }
			  }
			}, {
			  '$count': 'user_id'
			}
		      ]
	)
	const result = await cursor.toArray()
	const count = result[0] && result[0].user_id || 0
	return count
}

//total members in a room
const TotalRoomMembers = async (room_id) => {
	const client = await clientPromise;
	const cursor = await client.db().collection("room_users").aggregate(
		[
			{
			  '$match': {
			    'room_id': {
			      '$eq': new ObjectId(room_id)
			    }
			  }
			}, {
			  '$count': 'room_id'
			}
		      ]
	)
	const result = await cursor.toArray()
	const count = (result[0] && result[0].room_id || 0) + 1
	return count
}

export {CalcRoomsAvgResourceRatings, CalcRoomsAvgUserRatings, CalcUsersAvgResourceRatings, TotalResourcesCount, TotalRoomMembers, TotalUsersResourceCount}