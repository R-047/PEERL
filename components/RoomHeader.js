import React,{useState, useContext} from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import SearchComp from './SearchComp'
import getConfig from 'next/config'
import {getSession} from 'next-auth/react'
import axios from 'axios'
import { UserTypeContext } from '../contexts/UserTypeContext'
import Modal from 'react-modal'
import StagedResourcesContainer from './StagedResourcesContainer'
import MembersStagedResourceContainer from './MembersStagedResourceContainer'




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
    background-color: #E6E7EE;
 
`

const RoomLogoWrapper = styled.div`
  width: 50px;
	height: 50px;
	position: relative;

  
`

const RoomName = styled.div`
margin-left: 10px;
text-transform: capitalize;
  
`

const  RoomContextHeading = styled.h5`

`

const RoomSettingsBtn = styled.button`
    padding: 10px;
    width: 100px;
    background-color: black;
    margin-right: 20px;
    color: white;
    border-radius: 11px;
    border: 1px solid grey;
    cursor: pointer;
    text-transform: capitalize;

`

const RoomInfoBtn = styled.button`
    padding: 10px;
    width: 100px;
    background-color: black;
    margin-right: 20px;
    color: white;
    border-radius: 11px;
    border: 1px solid grey;
    cursor: pointer;
    text-transform: capitalize;
`

const RoomNotificationBtn = styled.button`
    padding: 10px;
    width: 100px;
    background-color: black;
    margin-right: 20px;
    color: white;
    border-radius: 11px;
    border: 1px solid grey;
    cursor: pointer;
    text-transform: capitalize;
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

const ResourceStageButton = styled.div`
padding: 10px;
width: 100px;
background-color: black;
margin-right: 20px;
color: white;
border-radius: 11px;
border: 1px solid grey;
cursor: pointer;
`



const { publicRuntimeConfig } = getConfig()
const { HOST_URL } = publicRuntimeConfig

Modal.setAppElement('#__next')


function RoomHeader({room_info, room_context}) {


  const [UserType, UpdateUserType] = useContext(UserTypeContext)
  console.log("🚀 ~ file: RoomHeader.js ~ line 109 ~ RoomHeader ~ UserType", UserType)
  const [joinBtnState, setjoinBtnState] = useState(true)
  const [modalState, setmodalState] = useState(false)
  
  
  
  const openModal = (e) => {
      if (modalState) {
        setmodalState(false)
      } else {
        setmodalState(true)
      }
    }
  

  const onJoinRoomClick = async (e) =>{
        UpdateUserType()
        const room_id = room_info._id
        const session = await getSession()
        const user_id = session.id
        const result = await axios.post(`${HOST_URL}/api/joinroom`, {
          room_id,
          user_id
        })
        if(result.status == '200'){
          setjoinBtnState(false)
        }
				console.log(result)
  }

  console.log("roommmmmmmmmmmmminfooooooooooo", room_info)


  
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
          
          <SearchComp mode="resource" room_id={room_info._id}/>

          <BtnsWrapper>
            <RoomSettingsBtn>settings</RoomSettingsBtn>
            <RoomInfoBtn>about</RoomInfoBtn>
            <RoomNotificationBtn>notifications</RoomNotificationBtn>
            
            {UserType == 'RA' ? <ResourceStageButton onClick={openModal}>staged resources</ResourceStageButton> : UserType == 'RM' ? <ResourceStageButton onClick={openModal}>your staged resources</ResourceStageButton> : null}
          </BtnsWrapper>

          {UserType == 'NM' && <JoinBtn onClick={onJoinRoomClick}>join this room</JoinBtn>}

          <Modal isOpen={modalState} onRequestClose={openModal} contentLabel="Post modal" 
          style={{
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.75)'
            },
            content: {
              position: 'absolute',
              top: '40px',
              left: '40px',
              right: '40px',
              bottom: '40px',
              border: '1px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '20px'
            }
          }}
          >
            <h1>this is a modal</h1>
            {UserType == 'RA' && <StagedResourcesContainer room_id={room_info._id}></StagedResourcesContainer>}
            {UserType == 'RM' && <MembersStagedResourceContainer room_id={room_info._id}></MembersStagedResourceContainer>}

          </Modal>
          
        
      </StyledHeader>

    
  )
}

export default RoomHeader