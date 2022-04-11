import { upload, apiRoute } from '../../lib/multerStorageBucket';
import {put} from '../../lib/s3client'
import clientPromise, {ObjectId} from '../../lib/mongodb'
import {getSession} from 'next-auth/react'


apiRoute.use(upload.fields([{
	name: 'room_image', maxCount: 1,
      }, {
	name: 'room_dp', maxCount: 1
      }]));

apiRoute.post(async (req, res) => {

	console.log("hitting the route")
	console.log(req.body)
	
	const session = await getSession({ req })
	const id = session.id

	console.log("hitting the route2")

	
	const room_image = Object.keys(req.files).length ? req.files.room_image[0] : undefined
	const room_dp = Object.keys(req.files).length ? req.files.room_dp[0] : undefined
	
	

	let room = {
	room_owner_id: new ObjectId(id),
	room_name: req.body.room_name,
	room_desc: req.body.room_desc,
	room_status: req.body.room_status,
	creation_date: new Date(Date.now()),
	room_image_link: undefined,
	room_dp_link: undefined,
	tags_arr: JSON.parse(req.body.tags_arr)
	}
	
	console.log("hitting the route3")

	if(room_image){
		const result = await put(process.env.AWS_S3_DP_BUCKET_NAME, room_image.filename, room_image)
		room.room_image_link = `${process.env.HOST_URL}api/getBlob/d/${result.key}`
	}
	

	if(room_dp){
		const result = await put(process.env.AWS_S3_DP_BUCKET_NAME, room_dp.filename, room_dp)
		room.room_dp_link = `${process.env.HOST_URL}api/getBlob/d/${result.key}`	
	}

	console.log("room", room)

	const new_room_info = await createRoom(room)
	res.json({ message: 'success', data: new_room_info });

	
});

export default apiRoute;

export const config = {
	api: {
		bodyParser: false, // Disallow body parsing, consume as stream
	},
};




const createRoom = async (room) => {
	return new Promise(async (resolve, reject) => {
		const client = await clientPromise
		const result = await client.db().collection("rooms").insertOne(room)
		resolve({
			room_name:  room.room_name,
			room_id: result.insertedId
		})

	})
	

}




