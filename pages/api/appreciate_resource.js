// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import clientPromise, { ObjectId } from "../../lib/mongodb"

export default async function handler(req, res) {
	console.log(req.body)
	if (req.method == 'PUT') {
		const id = req.body.id;
		const action = req.body.action
		const user_id = req.body.user_id
		const result = await UpdateAprreciationCount(id, action, user_id)
		console.log("🚀 ~ file: appreciate_resource.js ~ line 11 ~ handler ~ result", result)
		res.status(200).json({ new_resource_obj: result })
	}
	
}

const UpdateAprreciationCount = async (id, action, user_id) => {
	const client = await clientPromise
	const inc_value = action == 'inc' ? 1 : -1
	const push = {
		$push: {
			appreciated_members: new ObjectId(user_id)
		} 
	}
	const pull = {
		$pull: {
			appreciated_members: new ObjectId(user_id)
		} 
	}
	const arr_action = action=='inc' ? push : pull

	await client.db().collection("resources").updateOne({
		_id: new ObjectId(id)
	}, {
		$inc: {
			appreciation_count: inc_value,
		},
		...arr_action

	},
		{ returnOriginal: false }
	)

	const  result = await client.db().collection("resources").findOne({
		_id: {
			$eq: new ObjectId(id)
		}
	})

	return result
}
