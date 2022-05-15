import React, {useState} from 'react'
import clientPromise, { ObjectId } from '../../lib/mongodb'
import ResourceCapsule from '../../components/ResourceCapsule';
import ResourceCreationComp from '../../components/ResourceCreationComp';
import Collapsible from 'react-collapsible';
import styles from '../../styles/Room.module.css'
import { UserTypeContext } from '../../contexts/UserTypeContext';

function Notebook({db_response}) {
    console.log("response,..........................",db_response)
    const [UserType, setUserType] = useState('NM')


    const ResourcesItemsArr = db_response.map(ele => {
      console.log("🚀 ~ file: [...room_name].js ~ line 119 ~ Resources_Comp ~ ele", ele)
    
      const tigger_ele = (
        <ResourceCapsule user_id={ele.resource_info[0].user_id} time={ele.resource_info[0].creation_date} title={ele.resource_info[0].resource_title} resource_ratings={ele.resource_info[0].appreciation_count} tags={ele.resource_info[0].tags} res_id={ele.resource_info[0]._id} />
      )
      return (
        <Collapsible className={styles.collapsible_container} openedClassName={styles.collapsible_container} key={ele._id} trigger={tigger_ele}>
          <ResourceCreationComp resource_obj={ele.resource_info[0]} resource_cont_mode="read" />
        </Collapsible>
    
      )
    })
    

  return (
    <UserTypeContext.Provider value={[UserType, setUserType]}>
      <div>{ResourcesItemsArr}</div>
    </UserTypeContext.Provider>
    
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