import { upload, apiRoute } from '../../lib/multerStorageBucket';
import {put} from '../../lib/s3client'
import clientPromise, {ObjectId} from '../../lib/mongodb'
import {getSession} from 'next-auth/react'



export default async function handler(req, res) {

    console.log("approving resources...........................")
	const resource_id = req.body.resource_id

	await approveResource(resource_id)

	
	res.json({ data: 'success' });
}




const approveResource = async (resource_id) => {
	const client = await clientPromise
	const result = await client.db().collection("resources").updateOne({
		_id: new ObjectId(resource_id)
	},{
		$set: {
			staging: false
		}
	})
    return result
	
}