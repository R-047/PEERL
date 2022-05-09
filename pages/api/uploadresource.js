// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSession } from "next-auth/react"
import clientPromise,{ObjectId} from "../../lib/mongodb"
const webpush = require("web-push");

const publicVapidKey = "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

export default async function handler(req, res) {
	console.log("logging body: ",req.body)

	const session = await getSession({ req })
	const id = session.id

	const resource_meta_data = {
		...req.body.resources_obj.resource_meta_data,
		user_id: new ObjectId(id),
		room_id:new ObjectId(req.body.resources_obj.resource_meta_data.room_id),
		appreciation_count: 0,
		appreciated_members: [],
		staging: await OwnerCheck(req.body.resources_obj.resource_meta_data.room_id, id),
		creation_date: new Date(Date.now()),
	}
	const resources_arr = req.body.resources_obj.resources

	const resource = {
		...resource_meta_data,
		resources_arr
	}


	const result = await insertResource(resource)
	const subscribers = await getSubscribers(id)
	sendNotifications(subscribers)
	res.status(200).json({ result })
}
      


const insertResource = async (resource) => {
	const client = await clientPromise
	const result = await client.db().collection("resources").insertOne(resource)
	return result
}


//function to send notification to users
//function to query all the subscribed users from the databsest

const getSubscribers = async (user_id) => {
	const client = await clientPromise
	const cursor = await client.db().collection("subscriptions").find({
		user_id: {
			$eq: new ObjectId(user_id)
		}
	})
	const result = await cursor.toArray();
	console.log("logging subscribers............................................")
	return result || []
}

const sendNotifications = async (subscribers) => {
	const payload = JSON.stringify({ title: "Push Testinggggggg, new resource uploaded" });
	subscribers.forEach(ele => {
		webpush.sendNotification(ele.subscription, payload).catch(err => console.error("notification error....",err));
	})
}


const OwnerCheck = async (room_id, user_id) => {
	const client = await clientPromise
	const result = await client.db().collection("rooms").findOne({
		_id: {
			$eq: new ObjectId(room_id)
		},
		room_owner_id: {
			$eq: new ObjectId(user_id)
		}
	})
	console.log("room owner check.........................", result)
	for(var i in result) return false;
	return true;
}