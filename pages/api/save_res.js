// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise, { ObjectId } from "../../lib/mongodb"

export default async function handler(req, res) {
	if (req.method == 'POST') {
		const notebook_res_obj = {
			notebook_id: new ObjectId(req.body.notebook_id),
			resource_id: new ObjectId(req.body.resource_id)
		}
		const result =  await saveToNotebook(notebook_res_obj)
		res.status(200).json({ message: 'success' })

	}
	
}


const saveToNotebook = async (notebook_res_obj) => {
	const client = await clientPromise
	const result = await client.db().collection("notebook_resources").insertOne(notebook_res_obj)
	return result
}