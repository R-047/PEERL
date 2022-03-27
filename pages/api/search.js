// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise,{ObjectId} from '../../lib/mongodb'
import {CalcRoomsAvgResourceRatings, CalcRoomsAvgUserRatings, CalcUsersAvgResourceRatings, TotalResourcesCount, TotalRoomMembers, TotalUsersResourceCount} from '../../lib/stats'



export default async function handler(req, res) {
	console.log(req.query)
	const q = req.query.q
	const type = req.query.type
	const room_id = req.query.room_id
	switch(type){
		case 'users':
			const users_result = await fetchUsers(q);
			res.status(200).json({ search_results: users_result || [] })
			break;
		case 'rooms':
			const rooms_result = await fetchRooms(q);
			res.status(200).json({ search_results: rooms_result || []})
			break;
		case 'resources':
			const resources_result = await fetchResources(q, room_id)
			res.status(200).json({ search_results: resources_result || [] })
			break;
	}
	
      }
      



const fetchRooms = async (query) => {
	console.log(`fetching rooms matching q=${query}`)
	const client = await clientPromise
	const cursor = await client.db().collection("rooms").find({$or: [{room_name: { $regex: `^${query}`, $options: 'i' }}, {tags_arr: {$elemMatch: {value: `${query}`}}}]})
	const result = await cursor.toArray();
	
	let mod_result = []
	
	for(const ele of result){
		
		mod_result.push(
			{
				...ele,
				total_res: await TotalResourcesCount(JSON.parse(JSON.stringify(ele._id))),
				total_peers: await TotalRoomMembers(JSON.parse(JSON.stringify(ele._id)), JSON.parse(JSON.stringify(ele.room_owner_id)))
			}
		)
	}
	
	return mod_result
} 



const fetchUsers = async (query) => {
	console.log(`fetching users matching q=${query}`)
	const client = await clientPromise
	const cursor = await client.db().collection("users").find({
		name: { $regex: `^${query}`, $options: 'i' }
	})
	const result = await cursor.toArray();
	let mod_result = []
	
	for(const ele of result){
		
		mod_result.push(
			{
				...ele,
				total_res_shared: await TotalUsersResourceCount(JSON.parse(JSON.stringify(ele._id))),
			}
		)
	}
	return mod_result
	
}

const fetchResources = async (query, room_id) => {
	console.log(`fetching users matching q=${query} room_id=${room_id}`)
	const client = await clientPromise
	const cursor = await client.db().collection("resources").aggregate([
		{
		  '$match': {
		    'room_id': new ObjectId(room_id)
		  }
		}, {
		  '$lookup': {
		    'from': 'users', 
		    'localField': 'user_id', 
		    'foreignField': '_id', 
		    'as': 'user_info'
		  }
		}, {
		  '$match': {
		    '$or': [
		      {
			'resource_title': {
			  '$regex': `^${query}`, 
			  '$options': 'i'
			}
		      }, {
			'tags': {
			  '$elemMatch': {
			    'value': `${query}`
			  }
			}
		      }
		    ]
		  }
		}
	      ])
	const result = await cursor.toArray();
	return result
}



