// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import clientPromise, {
    ObjectId
} from "../../lib/mongodb"

export default async function handler(req, res) {
   
    if (req.method == 'DELETE') {
        const subscribe_obj = {
            subscriber_id: new ObjectId(req.query.logged_in_user_id),
            user_id: new ObjectId(req.query.user_id)
        }
        await unSubscribe(subscribe_obj)
        res.status(200).json({
            message: 'success'
        })
    }

}

const unSubscribe = async (subs_obj) => {
    const client = await clientPromise
    const result = await client.db().collection("subscriptions").deleteOne({
        subscriber_id: new ObjectId(subs_obj.subscriber_id),
        user_id: new ObjectId(subs_obj.user_id)
    })
    return result
}