import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'




//all users
// room level notifications
// room settings
// search
// user profile
// room name
// room dp
// room context heading

const StyledHeader = styled.header`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgb(58, 56, 56);
 
`

const RoomLogoWrapper = styled.div`
  width: 100px;
	height: 50px;
	position: relative;
`

const RoomName = styled.div`
  
`

const  RoomContextHeading = styled.div`

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
`

const RoomContextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`

const BtnsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`







function RoomHeader({room_info, room_context}) {
  console.log("🚀 ~ file: RoomHeader.js ~ line 43 ~ RoomHeader ~ room_info", room_info)
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
          <SearchInput />
          <BtnsWrapper>
            <RoomSettingsBtn>settings</RoomSettingsBtn>
            <RoomInfoBtn>about</RoomInfoBtn>
            <RoomNotificationBtn>notifications</RoomNotificationBtn>
          </BtnsWrapper>
          
        
      </StyledHeader>

    
  )
}

export default RoomHeader