// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSession } from "next-auth/react"
import clientPromise,{ObjectId} from "../../lib/mongodb"

export default async function handler(req, res) {
	console.log("logging body: ",req.body)

	const session = await getSession({ req })
	const id = session.id

	const resource_meta_data = {
		...req.body.resources_obj.resource_meta_data,
		user_id: new ObjectId(id),
		room_id:new ObjectId(req.body.resources_obj.resource_meta_data.room_id)
	}
	const resources_arr = req.body.resources_obj.resources

	const resource = {
		...resource_meta_data,
		resources_arr
	}


	const result = await insertResource(resource)
	res.status(200).json({ result })
}
      


const insertResource = async (resource) => {
	const client = await clientPromise
	const result = await client.db().collection("resources").insertOne(resource)
	return result
}