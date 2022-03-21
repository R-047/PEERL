// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise, { ObjectId } from '../../lib/mongodb'

export default async function handler(req, res) {
	console.log("get user obj")
	
	if (req.method == 'GET') {
		const user_id = req.query.user_id
		const result = await userInfo(user_id)
		res.status(200).json(result)
	}
	
}


const userInfo = async (user_id) => {

	const client = await clientPromise
	const result = await client.db().collection("users").findOne({
		_id: {
			$eq: new ObjectId(user_id)
		}
	})
	

	return result




}