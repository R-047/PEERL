import clientPromise, { ObjectId } from '../../lib/mongodb'
import { getSession } from 'next-auth/react'


export default async function handler(req, res) {
	if (req.method == 'GET') {
		const session = await getSession({ req })
		const user_id = session ? session.id : req.query.id
		
		const result = await getSubscriptions(user_id)
		res.status(200).json(result)


	}else{
		res.status(400).json({ method: 'GET ONLY' })
	}
	
}


const getSubscriptions = async (sub_id) => {
	
		const client = await clientPromise
		const cursor = await client.db().collection("subscriptions").aggregate(
			[
				{
				  '$match': {
					'subscriber_id': new ObjectId(sub_id)
				  }
				}, {
				  '$lookup': {
					'from': 'users', 
					'localField': 'user_id', 
					'foreignField': '_id', 
					'as': 'user_info'
				  }
				}, {
				  '$unwind': {
					'path': '$user_info', 
					'includeArrayIndex': '0', 
					'preserveNullAndEmptyArrays': false
				  }
				}
			  ]
		)
		const result = await cursor.toArray();
		return result


}