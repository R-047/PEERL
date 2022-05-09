import React from 'react'
import clientPromise, { ObjectId } from '../../lib/mongodb'

function Notebook({db_response}) {
    console.log(db_response)
  return (
    <div>Notebook</div>
  )
}



export async function getServerSideProps(context) {

    const { req, query } = context
    
    const { notebook } = query
    const db_response = await getNotebooksResources(notebook)
  
    console.log("🚀 ~ file: [...room_name].js ~ line 185 ~ getServerSideProps ~ db_response", db_response)
  
  
    return {
      props: {
        db_response
      }
    }
  
  
  
  }
  
  
  const getNotebooksResources = async (notebook_id) => {
    const client = await clientPromise
      const cursor = await client.db().collection("notebook_resources").aggregate(
        [
            {
              '$match': {
                'notebook_id': new ObjectId(notebook_id)
              }
            }, {
              '$lookup': {
                'from': 'notebooks', 
                'localField': 'notebook_id', 
                'foreignField': '_id', 
                'as': 'notebook_info'
              }
            }, {
              '$lookup': {
                'from': 'resources', 
                'localField': 'resource_id', 
                'foreignField': '_id', 
                'as': 'resource_info'
              }
            }
          ]
      )

      const result = await cursor.toArray();
  
      const string_Res = JSON.stringify(result)
      const json_res = JSON.parse(string_Res)
      return json_res
  
  
  }

export default Notebook