import React, { useState, useEffect, useContext } from 'react'
import RoomHeader from '../../components/RoomHeader'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../styles/Room.module.css'
import clientPromise, { ObjectId } from '../../lib/mongodb'
import Modal from 'react-modal'
import ResourceCreationComp from '../../components/ResourceCreationComp'
import axios from 'axios'
import getConfig from "next/config"
import Collapsible from 'react-collapsible';
import ResourceCapsule from '../../components/ResourceCapsule'
import { getSession } from 'next-auth/react'
import { UserTypeContext } from '../../contexts/UserTypeContext'


Modal.setAppElement('#__next')
const { publicRuntimeConfig } = getConfig()
const { HOST_URL } = publicRuntimeConfig


function Room({ room_info }) {
  const router = useRouter()
  const { room_name = [], room_id } = router.query;
  const [modalState, setmodalState] = useState(false)
  const [UserType, setUserType] = useState('')

  useEffect(() => {
    async function fetchData() {
      const session = await getSession()
      const user_id = session.id
      const result = await axios.get(`${HOST_URL}/api/checkusertype?user_id=${user_id}&room_id=${room_id}`)
      setUserType(result.data.user_type)
      console.log("🚀 ~ file: [...room_name].js ~ line 35 ~ fetchData ~ result.data.user_type", result.data.user_type)
    }
    fetchData();

  }, [UserType])


  const UpdateUserType = async () => {
    const session = await getSession()
    const user_id = session.id
    const result = await axios.post(`${HOST_URL}/api/joinroom`, {
      room_id,
      user_id
    })
    if (result.status == '200') {
      setUserType('RM')
    }

  }




  const openModal = (e) => {
    if (modalState) {
      setmodalState(false)
    } else {
      setmodalState(true)
    }
  }


  const room_body = (
    <UserTypeContext.Provider value={[UserType, UpdateUserType]}>
      <div className={styles.main_div}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/peerllogo.svg" />
          <title>PEERL</title>
        </Head>
        <RoomHeader room_info={room_info} room_context={room_name[1]} />
        <div className={styles.body_flex_wrapper}>
          {room_name[1] == 'resources' && <Resources_Comp openModal={openModal} room_id={room_id} />}
          {room_name[1] == 'qna' && <Qna_Comp />}
          {room_name[1] == 'voices' && <Voices_Comp />}
          <nav className={styles.nav_panel}>
            <Link href={`${room_name[0]}/resources?room_id=${room_id}`} replace>
              <div className={styles.link_group}>
                <div className={styles.link_icon_peergroups}></div>
                <a className={styles.link_text}>resources</a>
              </div>
            </Link>
            <Link href={`${room_name[0]}/qna?room_id=${room_id}`} replace>
              <div className={styles.link_group}>
                <div className={styles.link_icon_rooms}></div>
                <a className={styles.link_text}>Q n A</a>
              </div>
            </Link>
            <Link href={`${room_name[0]}/voices?room_id=${room_id}`} replace>
              <div className={styles.link_group}>
                <div className={styles.link_icon_subscriptions}></div>
                <a className={styles.link_text}>voices</a>
              </div>
            </Link>

          </nav>
        </div>

        <Modal isOpen={modalState} contentLabel="Post modal" onRequestClose={openModal}
          className={styles.RCModalStyles}
          overlayClassName={styles.RCModalOverlayStyles}
        >
          <ResourceCreationComp room_id={room_info._id} resource_cont_mode="write" />
        </Modal>

      </div>
    </UserTypeContext.Provider>

  )

  return room_body


  //all users
  // room level notifications
  // room settings
  // search
  // user profile
  // room name
  // room dp
  // room context heading
  //nav bar having resources , qna, voices
  //recent room events
  //room admin panel - resource control(RUD), user control



}




function Resources_Comp(props) {


  const [resourceState, setresourceState] = useState([])
  const [UserType, UpdateUserType] = useContext(UserTypeContext)
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${HOST_URL}/api/getRoomResources?room_id=${props.room_id}`)
      console.log("🚀 ~ file: [...room_name].js ~ line 112 ~ useEffect ~ response", response.data)
      setresourceState(response.data)
    }
    fetchData();


  }, [])



  const onResourcesDataUpdate = (new_resource_obj) => {
    console.log("inside the content area..............", new_resource_obj);
    const UpdatedResourceData = resourceState.map(ele => {
      console.log("inside the content area comparing id..............", ele._id == new_resource_obj._id);
      if (ele._id == new_resource_obj._id) {

        return new_resource_obj
      } else {
        return ele
      }
    })
    setresourceState(UpdatedResourceData)
  }

  const onNewResourceAdded = () => {
    //re-fetch the resources
  }

  const ResourcesItemsArr = resourceState.map(ele => {
    console.log("🚀 ~ file: [...room_name].js ~ line 119 ~ Resources_Comp ~ ele", ele)

    const tigger_ele = (
      <ResourceCapsule user_id={ele.user_id} time={ele.creation_date} title={ele.resource_title} resource_ratings={ele.appreciation_count} tags={ele.tags} />
    )
    return (
      <Collapsible className={styles.collapsible_container} openedClassName={styles.collapsible_container} key={ele._id} trigger={tigger_ele}>
        <ResourceCreationComp resource_obj={ele} resource_cont_mode="read" update_content_func={onResourcesDataUpdate} />
      </Collapsible>

    )
  })


  const Resources_Comp_jsx = (
    <div className={styles.rooms_activities_wrapper}>

      <div className={styles.recent_activites_header_wrapper}>
        <p>recent activities</p>
        <div className={styles.activities_container}>

          <div className={styles.activity_rect}>
          </div>
          <div className={styles.activity_rect}>
          </div>
          <div className={styles.activity_rect}>
          </div>
          <div className={styles.activity_rect}>
          </div>
          <div className={styles.activity_rect}>
          </div>
        </div>
      </div>

      <div className={styles.rooms_header_wrapper}>
        <p>rooms joined</p>
        <div className={styles.rooms_container}>
          {UserType == 'NM' ? "join the room to post resources" : <div className={styles.create_resource_div}>
            <button onClick={props.openModal}>create resource</button>
          </div>}
          {/* <div className={styles.room_box}>
          </div>
          <div className={styles.room_box}>
          </div>
          <div className={styles.room_box}>
          </div> */}
          {ResourcesItemsArr}


        </div>
      </div>
    </div>
  )
  return Resources_Comp_jsx
}




function Qna_Comp(props) {
  const router = useRouter()
  const onCreateClick = (e) => {
    router.push("/createroom")
  }
  const Qna_Comp_jsx = (
    <div className={styles.rooms_activities_wrapper}>

      <div className={styles.recent_activites_header_wrapper}>
        <p>recent activities</p>
        <div className={styles.activities_container}>

          <div className={styles.activity_rect}>
          </div>
          <div className={styles.activity_rect}>
          </div>
          <div className={styles.activity_rect}>
          </div>
          <div className={styles.activity_rect}>
          </div>
          <div className={styles.activity_rect}>
          </div>
        </div>
      </div>

      <div className={styles.rooms_header_wrapper}>
        <p>rooms created</p>
        <div className={styles.rooms_container}>

          <div className={styles.room_box}>
          </div>
          <div className={styles.room_box}>
          </div>
          <div className={styles.room_box}>
          </div>
        </div>
      </div>
    </div>
  )
  return Qna_Comp_jsx
}





function Voices_Comp() {
  return (
    <div>Voices_Comp</div>
  )
}

export default Room





export async function getServerSideProps(context) {

  const { req, query } = context
  const { room_id } = query
  const db_response = await getRoomInfo(room_id)

  console.log("🚀 ~ file: [...room_name].js ~ line 185 ~ getServerSideProps ~ db_response", db_response)


  return {
    props: {
      room_info: db_response
    }
  }



}


const getRoomInfo = async (room_id) => {
  return new Promise(async (resolve, reject) => {
    const client = await clientPromise
    const result = await client.db().collection("rooms").findOne({
      _id: {
        $eq: new ObjectId(room_id)
      }
    })

    const string_Res = JSON.stringify(result)
    const json_res = JSON.parse(string_Res)


    resolve(
      json_res
    )


  })


}