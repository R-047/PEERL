import { upload, apiRoute } from '../../lib/multerStorageBucket';
import {put} from '../../lib/s3client'
import clientPromise from '../../lib/mongodb'

apiRoute.use(upload.single('avatar'));

apiRoute.post(async (req, res) => {
	console.log("file......", req.file)
	const user_name = req.body.user_name
	let file_name = undefined
	// if(req.file){
	// 	const result = await put(process.env.AWS_S3_DP_BUCKET_NAME, req.file.filename, req.file)
	// 	console.log(result)
	// 	file_name = result.key
	// }
	
	console.log(user_name, file_name)
	
	const client = await clientPromise
	const users = await client.db()
	.collection("users")
	.find({})
	.toArray();
	console.log(users)
	// client.then(mc => {
	// 	console.log("mcccccc",mc)
	//       })

	res.status(200).json({ data: 'success' });
});

export default apiRoute;

export const config = {
	api: {
		bodyParser: false, // Disallow body parsing, consume as stream
	},
};

