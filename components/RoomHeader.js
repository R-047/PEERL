import React,{useState, useContext} from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import SearchComp from './SearchComp'
import getConfig from 'next/config'
import {getSession} from 'next-auth/react'
import axios from 'axios'
import { UserTypeContext } from '../contexts/UserTypeContext'




//all users
// room level notifications
// room settings
// search
// user profile
// room name
// room dp
// room context heading


const JoinBtn = styled.button`
  background-color: green;
  padding: 10px 20px 10px 20px;
  color: white;
`

const StyledHeader = styled.header`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 100px;
    padding-right: 100px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgb(58, 56, 56);
 
`

const RoomLogoWrapper = styled.div`
  width: 50px;
	height: 50px;
	position: relative;

  
`

const RoomName = styled.div`
  
`

const  RoomContextHeading = styled.h5`

`

const RoomSettingsBtn = styled.button`

`

const RoomInfoBtn = styled.button`

`

const RoomNotificationBtn = styled.button`

`

const SearchInput = styled.input`

`


const LogoNameWrapper = styled.div`
  display:  flex;
  flex-direction: row;
  border-right: 1px solid black;
  justify-content: flex-start;
  align-items: center;
  padding-right: 50px;
`

const RoomContextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
`

const BtnsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`



const { publicRuntimeConfig } = getConfig()
const { HOST_URL } = publicRuntimeConfig



function RoomHeader({room_info, room_context}) {


  const [UserType, UpdateUserType] = useContext(UserTypeContext)
  console.log("🚀 ~ file: RoomHeader.js ~ line 109 ~ RoomHeader ~ UserType", UserType)
  // const [joinBtnState, setjoinBtnState] = useState(true)
  

  const onJoinRoomClick = async (e) =>{
        UpdateUserType()
        // const room_id = room_info._id
        // const session = await getSession()
        // const user_id = session.id
        // const result = await axios.post(`${HOST_URL}/api/joinroom`, {
        //   room_id,
        //   user_id
        // })
        // if(result.status == '200'){
        //   setjoinBtnState(false)
        // }
				// console.log(result)
  }

  return (
    
      <StyledHeader>
        
          <RoomContextWrapper>
            <LogoNameWrapper>
              <RoomLogoWrapper>
                <Image src={room_info.room_image_link || "/PeerlLogo2.svg"}  alt="PEERL Logo" layout='fill' quality="100"></Image>
              </RoomLogoWrapper>
              <RoomName>
                {room_info.room_name}
              </RoomName>
            </LogoNameWrapper>
            <RoomContextHeading >
              {room_context}
            </RoomContextHeading>
          </RoomContextWrapper>
          
          <SearchComp />

          <BtnsWrapper>
            <RoomSettingsBtn>settings</RoomSettingsBtn>
            <RoomInfoBtn>about</RoomInfoBtn>
            <RoomNotificationBtn>notifications</RoomNotificationBtn>
          </BtnsWrapper>

          {UserType == 'NM' && <JoinBtn onClick={onJoinRoomClick}>join this room</JoinBtn>}
          
        
      </StyledHeader>

    
  )
}

export default RoomHeader