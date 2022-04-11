// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise, { ObjectId } from "../../lib/mongodb"

export default async function handler(req, res) {
	console.log("hiiiiiiiiiiiiiiiiiii")
	if (req.method == 'POST') {
		const notebook_obj = {
			notebook_name: req.body.notebook_name,
            notebook_desc: req.body.notebook_desc,
			user_id: new ObjectId(req.body.user_id),
            creation_date: new Date(Date.now()),
		}
		const result =  await createNewNotebook(notebook_obj)
		// console.log(result)
		res.status(200).json({ message: 'success' })

	}
	
}


const createNewNotebook = async (notebook_obj) => {
	const client = await clientPromise
	const result = await client.db().collection("notebooks").insertOne(notebook_obj)
    console.log("logging notebooks.....", result)
	return result
}