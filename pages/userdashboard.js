import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import getConfig from 'next/config'
import axios from 'axios'
import RoomBox from '../components/RoomBox'
import UserSharedResourceItem from '../components/UserSharedResourceItem'



  const { publicRuntimeConfig } = getConfig()
  const { HOST_URL } = publicRuntimeConfig

const MainWrapper = styled.div`
display: flex;
flex-direction: row;
width: 100%;
height: 100vh;
background-color: pink;
overflow: hidden;

`

const LeftInfoWrapper = styled.div`
width: fit-content;
height: 100%;

`
const RightBigWrapper = styled.div`
  width: 100%;
  height: 100%;
`


const UserDp = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  background-color: blue;
  border-radius: 100%;
  overflow: hidden;

`

const UserName = styled.h3`

`

const CreatedRoomsContainer = styled.div`

`

const ResourcesSharedContainer = styled.div`

`






const RoomsJoinedCountContainer = styled.div`

`

const ResourcesSharedCountContainer = styled.div`

`

const AverageAppreciationContainer = styled.div`

`

const RoomsCreatedCount = styled.div`

`

const NumbersWrapper = styled.div`

`


const SubsBtn = styled.button`

`



const NavHeader = styled.div`

`

const CreatedRoomsBtn = styled.button`

`

const ResourcesSharedBtn = styled.button`

`









function userdashboard() {

  const [UserInfoState, setUserInfoState] = useState({})
  const [RoomsCreatedState, setRoomsCreatedState] = useState([])
  const [ResourcesSharedState, setResourcesSharedState] = useState([])
  const router = useRouter()
  const user_id = router.query.user_id
  console.log("logging query", user_id)
  


  const [NavBtnState , setNavBtnState]= useState('rooms')


  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${HOST_URL}api/getUserInfo?option=basic&user_id=${user_id}`)
      console.log(result)
      const response_data = result.data.result
      setUserInfoState({
        user_name: response_data.name,
        user_dp: response_data.image,
        user_email: response_data.email,
        rooms_joined_count: response_data.room_joined_count.joined_rooms,
        rooms_created_count:  response_data.room_joined_count.created_rooms,
        resources_shared_count: response_data.resources_shared_count,
        average_appreciation: response_data.average_appreciation_count
      })
      console.log("rooms created by user", response_data.user_created_rooms)
      setRoomsCreatedState(response_data.user_created_rooms)
      setResourcesSharedState(response_data.resources_shared)
    }
    if(user_id){
      fetchData()
    }
    
    
  }, [user_id])



  
  


  return (
    <MainWrapper >
      <LeftInfoWrapper>
        <UserDp>
          <Image src={UserInfoState.user_dp || "/empty_face.svg"} layout="fill"/>
        </UserDp>
        <UserName>
        {UserInfoState.user_name}
        </UserName>
        <NumbersWrapper>
          <RoomsJoinedCountContainer>
            rooms joined
            <br/>
            {UserInfoState.rooms_joined_count}
          </RoomsJoinedCountContainer>
          <ResourcesSharedCountContainer>
            resources shared
            <br/>
            {UserInfoState.resources_shared_count}
          </ResourcesSharedCountContainer>
          <AverageAppreciationContainer>
            average resource appreciation
            <br/>
            {parseFloat(UserInfoState.average_appreciation).toFixed(2)}
          </AverageAppreciationContainer>
          <RoomsCreatedCount>
            rooms created
            <br/>
            {UserInfoState.rooms_created_count}
          </RoomsCreatedCount>
          
        </NumbersWrapper>
        <SubsBtn>subscribe</SubsBtn>
      </LeftInfoWrapper>




      <RightBigWrapper>
        <NavHeader>
          <CreatedRoomsBtn onClick={(e) => setNavBtnState('rooms')}>rooms</CreatedRoomsBtn>
          <ResourcesSharedBtn onClick={(e) => setNavBtnState('resources')}>resources</ResourcesSharedBtn>
        </NavHeader>
        {NavBtnState == 'rooms' ? <RoomsHolder rooms_arr = {RoomsCreatedState}/> : <ResourcesHolder resources_arr = {ResourcesSharedState}/>}
      </RightBigWrapper>
    </MainWrapper>

  )
}

export default userdashboard









const RoomsItemsWrapper = styled.div`
 width: 100%;
 height: 100%;
 background-color: blue;
 overflow-y: auto;
`

function RoomsHolder(props) {

  const router = useRouter()

  const onRoomBoxClick = (id, name) => {
    router.push({
    pathname: `/rooms/${name}/resources`,
    query: { room_id: id }
    }, undefined, { shallow: true })
    }
  

  const rooms = props.rooms_arr.map(ele => {
    return(
      <RoomBox key={ele._id} key_id={ele._id} room_name={ele.room_name} action={onRoomBoxClick}></RoomBox>
    )
   
  })

  return (
    <RoomsItemsWrapper>
      {rooms}

    </RoomsItemsWrapper>
  )

}






const ResourcesItemsWrappper = styled.div`
  width: 100%;
  height: 100%;
  background-color: green;
  overflow-y: auto;

`


function ResourcesHolder(props){

  const resources  = props.resources_arr.map(ele => {
    return (
      <UserSharedResourceItem key={ele._id} room_id={ele.room_id} resource_title={ele.resource_title} appreciaiton_count={ele.appreciation_count} date={ele.creation_date} resource_id={ele._id}/>
    )
  })

  return (
    <ResourcesItemsWrappper>
      {resources}
    </ResourcesItemsWrappper>
  )

}

