// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import clientPromise, { ObjectId } from "../../lib/mongodb"

export default async function handler(req, res) {
	console.log(req.body)
	if (req.method == 'POST') {
		const subscribe_obj = {
			subscriber_id: new ObjectId(req.body.subscriber_id),
			user_id: new ObjectId(req.body.user_id)
		}
		await Subscribe(subscribe_obj)
		res.status(200).json({ message: 'success' })
	}
	
}

const Subscribe = async (subs_obj) => {
	const client = await clientPromise
	const result = await client.db().collection("subscriptions").insertOne(subs_obj)
	return result
}
