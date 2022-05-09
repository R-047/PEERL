import axios from 'axios'
import { fetchData } from 'next-auth/client/_utils'
import React, {useState, useEffect} from 'react'
import ResourceCapsule from './ResourceCapsule'
import Collapsible from 'react-collapsible'
import ResourceCreationComp from './ResourceCreationComp'
import getConfig from 'next/config'
import styles from '../styles/Room.module.css'

const { publicRuntimeConfig } = getConfig()
const { HOST_URL } = publicRuntimeConfig

function StagedResourcesContainer({room_id}) {
    const [stageResources_arr, setstageResources_arr] = useState([])

    useEffect(() => {
      const fetchData = async () => {
          const result = await axios.get(`${HOST_URL}/api/get_staged_res?room_id=${room_id}`)
          setstageResources_arr(result.data)
          console.log("logging staged resources: ",result.data)
      } 
      fetchData()
    }, [])


    const resource_items = stageResources_arr.map(ele => {
        const tigger_ele = (
            <ResourceCapsule user_id={ele.user_id} time={ele.creation_date} title={ele.resource_title} resource_ratings={ele.appreciation_count} tags={ele.tags} res_id={ele._id} mode="staged"/>
          )
          return (
            <Collapsible className={styles.collapsible_container} openedClassName={styles.collapsible_container} key={ele._id} trigger={tigger_ele}>
              <ResourceCreationComp resource_obj={ele} resource_cont_mode="staged" />
            </Collapsible>
      
          )
    })
    
  return (
    <div>
        {resource_items}

    </div>
  )
}

export default StagedResourcesContainer