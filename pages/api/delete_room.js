// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import clientPromise, {
    ObjectId
} from "../../lib/mongodb"

export default async function handler(req, res) {
   
    if (req.method == 'DELETE') {
        const room_id = req.query.room_id
        console.log("room_id", room_id)
        await delRoom(room_id)
        res.status(200).json({
            message: 'success'
        })
    }

}

const delRoom = async (room_id) => {
    const client = await clientPromise
    await client.db().collection("rooms").deleteOne({
        _id: new ObjectId(room_id)
    })
    await client.db().collection("resources").deleteMany({
        room_id: new ObjectId(room_id)
    })
    return "success"
}

