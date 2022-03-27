import { del } from '../../../lib/s3client'


export default async function handler(req, res) {
	let bucket_name = undefined
	let key = undefined
	if (req.method == "DELETE") {
		const q_arr = req.query.delfile
		if (q_arr != undefined && q_arr.length == 2) {
			key = q_arr[1]
			console.log(q_arr[0])
			switch (q_arr[0]) {
				case 'a':
					bucket_name = process.env.AWS_S3_AVATAR_BUCKET_NAME
					break;
				case 'd':
					bucket_name = process.env.AWS_S3_DP_BUCKET_NAME
					break;
				case 'r':
					bucket_name = process.env.AWS_S3_RESOURCES_BUCKET_NAME

			}
		} else {
			res.status(400).json({ message: 'gone case...bad route...length issue' })

		}
	}
	console.log(bucket_name, key)

	if (bucket_name != undefined && key != undefined) {
		const result = await del(bucket_name, key)
		result ? res.send({ "deleted": "success" }) : res.send({ "error": "error occured" })
	} else {
		res.status(400).json({ message: 'gone case....undefined issue' })
	}


}