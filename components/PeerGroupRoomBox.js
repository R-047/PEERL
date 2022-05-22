import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'

{/* <div className={styles.room_box}>
        <div className={styles.room_coverimage}>
          <Image src="/Hero/test1.png" alt="" width={1000} height={550}></Image>
        </div>
        <div className={styles.room_destext}>
          <p>101 Crypto Course</p>
          <span>Rohit EP</span>
        </div>
        <div className={styles.room_numbers}>
          <div className={styles.room_numbers_g1}>
            <i className="fa-solid fa-thumbs-up"></i>
            &nbsp;&nbsp;
            <span>110</span>
          </div>
          <div className={styles.room_numbers_g2}>
            <i className="fa-brands fa-rocketchat"></i>
            &nbsp;&nbsp;
            <span>23</span>
          </div>
        </div>
      </div> */}

const RoomBox  = styled.div`
	padding-bottom: 10px;
    border: 2px solid rgba(207, 217, 235, 0.945);
    width: 300px;
    border-radius: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    min-height: 300px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    :hover{
	background: #dde1e7;
    border-radius: 20px;
    box-shadow: -3px -3px 10px #ffffffb2, 
         3px 3px 10px #ced0dfd0;
         transition: all 0.5s;
         transition-timing-function: ease-in-out;
    }
`

const RoomCoverImage = styled.div`
	width: 100%;
    height: 40%;
`

const RoomTxt = styled.div`
	font-size: 18px;
    text-transform: uppercase;
    font-weight: 700;
`

const RoomNumbers = styled.div`
	width: 70%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`




function PeerGroupRoomBox({img, room_name, room_owner_name, total_members, total_resources, key_id, action}) {
  return (
	<RoomBox onClick={() => {action(key_id, room_name)}}>
        <RoomCoverImage>
          <Image src={img || "/Hero/test1.png"} alt="" width={1000} height={550}></Image>
        </RoomCoverImage>
        <RoomTxt>
          <p>{room_name}</p>
          <span>{room_owner_name}</span>
        </RoomTxt>
        <RoomNumbers>
          {/* <div>
            <i className="fa-solid fa-thumbs-up"></i>
            &nbsp;&nbsp;
            <span>{total_members}</span>
          </div>
          <div>
            <i className="fa-brands fa-rocketchat"></i>
            &nbsp;&nbsp;
            <span>{total_resources}</span>
          </div> */}
        </RoomNumbers>
      </RoomBox> 
  )
}

export default PeerGroupRoomBox