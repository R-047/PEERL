import { getSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import styles from '../../styles/HomePage.module.css';
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import CommonHeader from '../../components/CommonHeader';
import axios from 'axios';
import getConfig from 'next/config'
import RoomBox from '../../components/RoomBox'



const { publicRuntimeConfig } = getConfig()
const { HOST_URL } = publicRuntimeConfig

function homepage() {
const router = useRouter()
console.log(router.query.options)
const context = router.query.options
const comp = (
<div className={styles.main_div}>

  <Head>
    <title>Create Next App</title>
    <meta name="description" content="Generated by create next app" />
    <link rel="icon" href="/peerllogo.svg" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
      crossorigin="anonymous" referrerpolicy="no-referrer" />
    <title>PEERL</title>
  </Head>
  {/* <button onClick={(e)=> signOut({ callbackUrl: 'http://localhost:3000/' })}>sign out</button> */}


  <CommonHeader />

  <div className={styles.body_flex_wrapper}>
    {context == 'peergroups' &&
    <Peergroup_comp />}
    {context == 'rooms' &&
    <Rooms_comp />}
    <nav className={styles.nav_panel}>
      <Link href="/home/peergroups">
      <div className={styles.link_group}>
        <div className={styles.link_icon_peergroups}></div>
        <a className={styles.link_text}>peer groups</a>
      </div>
      </Link>
      <Link href="/home/rooms">
      <div className={styles.link_group}>
        <div className={styles.link_icon_rooms}></div>
        <a className={styles.link_text}>rooms</a>
      </div>
      </Link>
      <Link href="/home/subscriptions">
      <div className={styles.link_group}>
        <div className={styles.link_icon_subscriptions}></div>
        <a className={styles.link_text}>subscriptions</a>
      </div>
      </Link>
      <Link href="/home/notebooks">
      <div className={styles.link_group}>
        <div className={styles.link_icon_notebooks}></div>
        <a className={styles.link_text}>notebooks</a>
      </div>
      </Link>
      <Link href="/trendingrooms">
      <div className={styles.link_group}>
        <div className={styles.link_icon_trendingrooms}></div>
        <a className={styles.link_text}>trending rooms</a>
      </div>
      </Link>
    </nav>
  </div>
</div>)
return useAuth(comp)
// return comp
}

export default homepage;





function Peergroup_comp(props) {

const peergroup_comp_jsx = (
<div className={styles.rooms_activities_wrapper}>

  <div className={styles.recent_activites_header_wrapper}>
    <p>recent activities</p>
    <div className={styles.activities_container}>
      <div className={styles.activity_rect}>
        <p>jason shared a new resource in OnTheBlocks </p>
        <span>
          <p>3 Hrs Ago</p>
        </span>
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

      <div className={styles.room_box}>
        <div className={styles.room_coverimage}>
          <Image src="/Hero/test1.png" alt="" width={1000} height={550}></Image>
        </div>
        <div className={styles.room_destext}>
          <p>101 Crypto Course</p>
          <span>Rohit EP</span>
        </div>
        <div className={styles.room_numbers}>
          <div className={styles.room_numbers_g1}>
            <i class="fa-solid fa-thumbs-up"></i>
            &nbsp;&nbsp;
            <span>110</span>
          </div>
          <div className={styles.room_numbers_g2}>
            <i class="fa-brands fa-rocketchat"></i>
            &nbsp;&nbsp;
            <span>23</span>
          </div>
        </div>
      </div>
      <div className={styles.room_box}>
      </div>
      <div className={styles.room_box}>
      </div>
    </div>
  </div>
</div>
)
return peergroup_comp_jsx
}




function Rooms_comp(props) {
const router = useRouter()

const init_state = []
const [your_rooms_state, setyour_rooms_state] = useState(init_state)

useEffect(async () => {
//get personal rooms
// rooms where room_owner_id = user_id
const response = await axios.get(`${HOST_URL}/api/getUsersRooms`)

setyour_rooms_state(response.data.result)

}, [])


const onRoomBoxClick = (id, name) => {
router.push({
pathname: `/rooms/${name}/resources`,
query: { room_id: id }
}, undefined, { shallow: true })
}

const users_rooms_comp = your_rooms_state.map((ele) => {
return (
<RoomBox key={ele._id} key_id={ele._id} room_name={ele.room_name} action={onRoomBoxClick} />
)
})




const onCreateClick = (e) => {
router.push("/createroom")
}


const rooms_comp_jsx = (
<div className={styles.rooms_activities_wrapper}>

  <div className={styles.recent_activites_header_wrapper}>
    <p className={styles.recent_activites_header_text}>recent activities</p>
    <div className={styles.activities_container}>

      <div className={styles.activity_rect}>
        <p>jason shared a new resource in OnTheBlocks </p>
        <span>3 Hrs Ago</span>
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
      <div className={styles.create_room_div}>
        <p>want to build a new peer group to teach and learn something new...?</p>

        <div className={styles.rooms_inner_container}>
          <button onClick={onCreateClick}>Create room</button>
          <Image src="/Hero/plus.png" alt="" width={50} height={50}></Image>
        </div>
      </div>
      {users_rooms_comp}
    </div>
  </div>
</div>
)
return rooms_comp_jsx
}

function Subs_comp(props) {

}

function Notebooks_comp(props) {

}