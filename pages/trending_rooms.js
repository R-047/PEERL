import React from 'react'

function TrendingRooms() {
  return (
    <div>
      TrendingRooms
    </div>
  )
}


export async function getServerSideProps(context) {

  const { req, query } = context
  
  const { notebook } = query
  const db_response = await getTrendingRooms()

  console.log("🚀 ~ file: [...room_name].js ~ line 185 ~ getServerSideProps ~ db_response", db_response)




  return {
    props: {
      db_response
    }
  }



}


const getTrendingRooms = async () => {
  const client = await clientPromise
    const cursor = await client.db().collection("notebook_resources").find({})

    const result = await cursor.toArray();

    const string_Res = JSON.stringify(result)
    const json_res = JSON.parse(string_Res)
    return json_res


}

export default TrendingRooms