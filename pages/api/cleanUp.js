import clientPromise from "../../lib/mongodb"
import {del} from "../../lib/s3client"


export default async function handler(req, res) {
	console.log("checking for claenup")
	console.log(req.body)

	const resource_client_id = req.body.resource_client_id


	const flag = await CheckForResource(resource_client_id)
        console.log("🚀 ~ file: cleanUp.js ~ line 13 ~ handler ~ flag", flag)
	const filename = req.body.file_name || "sample.png"
        console.log("🚀 ~ file: cleanUp.js ~ line 15 ~ handler ~ filename", filename)
	if(!flag){
		const result = await del(process.env.AWS_S3_RESOURCES_BUCKET_NAME, filename)
		result ? res.send({"deleted": "success"}) : res.send({"error": "error occured"})
		
	}else{
		res.status(200).json({ message: 'not deleted...reference found' })
	}
		
}





const CheckForResource = async (resource_client_id) => {
	        let flag = false
		const client = await clientPromise
		const result = await client.db().collection("resources").findOne({resource_client_id: resource_client_id})
		console.log(result)
		if(result){
			flag=true
		}
		return flag

}





      