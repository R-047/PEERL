// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import clientPromise, {
    ObjectId
} from "../../lib/mongodb"

export default async function handler(req, res) {
   
    if (req.method == 'DELETE') {
        const room_user_obj = {
            room_id: new ObjectId(req.query.room_id),
            user_id: new ObjectId(req.query.user_id)
        }
        await leaveRoom(room_user_obj)
        res.status(200).json({
            message: 'success'
        })
    }

}

const leaveRoom = async (room_user_obj) => {
    const client = await clientPromise
    const result = await client.db().collection("room_users").deleteOne(room_user_obj)
    return result
}