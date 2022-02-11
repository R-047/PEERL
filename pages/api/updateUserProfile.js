import { upload, apiRoute } from '../../lib/multerStorageBucket';
import {put} from '../../lib/s3client'
import clientPromise, {ObjectId} from '../../lib/mongodb'
import {getSession} from 'next-auth/react'

apiRoute.use(upload.single('avatar'));

apiRoute.post(async (req, res) => {
	const session = await getSession({ req })
	const id = session.id
	const user_name = req.body.username
	let avtr_name = req.body.avatar_name == '/empty_face.svg' ? undefined : req.body.avatar_name
	


	if(req.file){
		const result = await put(process.env.AWS_S3_DP_BUCKET_NAME, req.file.filename, req.file)
		console.log(result)
		avtr_name = `${process.env.HOST_URL}api/getBlob/d/${result.key}`
	}

	await updateUserProfile(id, user_name, avtr_name)

	// res.redirect(308, '/')
	// res.end()

	res.json({ data: 'success' });
});

export default apiRoute;

export const config = {
	api: {
		bodyParser: false, // Disallow body parsing, consume as stream
	},
};


const updateUserProfile = async (id, username, avtr_name) => {
	const client = await clientPromise
	const result = await client.db().collection("users").updateOne({
		_id: new ObjectId(id)
	},{
		$set: {
			name: username,
			image: avtr_name
		}
	})
	console.log(result)
}