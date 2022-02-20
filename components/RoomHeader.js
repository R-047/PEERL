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
    border-bottom: 1px solid rgb(58, 56, 56)
 
`

const RoomLogoWrapper = styled.div`
  width: 100px;
	height: 50px;
	position: relative;
`






function roomHeader() {
  return (
    
      <StyledHeader>
        
          <RoomLogoWrapper>
            <Image src="/PeerlLogo2.svg"  alt="PEERL Logo" layout='fill' quality="100"></Image>
          </RoomLogoWrapper>
        
      </StyledHeader>

    
  )
}

export default roomHeader