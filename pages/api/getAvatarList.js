import {listObj} from '../../lib/s3client'


export default async function handler(req, res) {
	console.log("from get list of blobs ............................")
	const result = await listObj(process.env.AWS_S3_AVATAR_BUCKET_NAME)
	const avtr_names_arr = result.map(ele => {
		return {
			key: ele.Key
		}
	})

	res.send({"response": avtr_names_arr})
	// result ? res.send({"deleted": "success"}) : res.send({"error": "error occured"})

	
      }
      