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
background-color: #E6E7EE;
overflow: hidden;

`

const LeftInfoWrapper = styled.div`
width: fit-content;
height: 100%;
display: flex;
justify-content: center;
align-items: flex-start;
flex-direction: column;
margin-left: 18px;
border-right: 5px solid black;

`
const Inerleftwrapper = styled.div`
width: 80%;
height: 100%;
height: 60%;

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
  border: 3px solid black;

`

const UserName = styled.h3`

`

const CreatedRoomsContainer = styled.div`

`

const ResourcesSharedContainer = styled.div`

`
const CreatedRoomsBtn = styled.button`
padding: 12px 14px 12px 14px;
  background: #efefef;
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: .5rem;
  color: #444;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: .2rem;
  text-align: center;
  outline: none;
  cursor: pointer;
  transition: .2s ease-in-out;
  box-shadow: -6px -6px 14px rgba(255, 255, 255, .7),
              -6px -6px 10px rgba(255, 255, 255, .5),
              6px 6px 8px rgba(255, 255, 255, .075),
              6px 6px 10px rgba(0, 0, 0, .15);
  &:hover{
  box-shadow: -2px -2px 6px rgba(255, 255, 255, .6),
              -2px -2px 4px rgba(255, 255, 255, .4),
              2px 2px 2px rgba(255, 255, 255, .05),
              2px 2px 4px rgba(0, 0, 0, .1);
        }
  &:active{
  box-shadow: inset -2px -2px 6px rgba(255, 255, 255, .7),
              inset -2px -2px 4px rgba(255, 255, 255, .5),
              inset 2px 2px 2px rgba(255, 255, 255, .075),
              inset 2px 2px 4px rgba(0, 0, 0, .15);

  }
`



const ResourcesSharedBtn = styled.button`
padding: 12px 14px 12px 14px;
  background: #efefef;
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: .5rem;
  color: #444;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: .2rem;
  text-align: center;
  outline: none;
  cursor: pointer;
  transition: .2s ease-in-out;
  box-shadow: -6px -6px 14px rgba(255, 255, 255, .7),
              -6px -6px 10px rgba(255, 255, 255, .5),
              6px 6px 8px rgba(255, 255, 255, .075),
              6px 6px 10px rgba(0, 0, 0, .15);
  &:hover{
  box-shadow: -2px -2px 6px rgba(255, 255, 255, .6),
              -2px -2px 4px rgba(255, 255, 255, .4),
              2px 2px 2px rgba(255, 255, 255, .05),
              2px 2px 4px rgba(0, 0, 0, .1);
        }
  &:active{
  box-shadow: inset -2px -2px 6px rgba(255, 255, 255, .7),
              inset -2px -2px 4px rgba(255, 255, 255, .5),
              inset 2px 2px 2px rgba(255, 255, 255, .075),
              inset 2px 2px 4px rgba(0, 0, 0, .15);

  }
`





const RoomsJoinedCountContainer = styled.div`
display: flex;
font-family: 'Courier New', Courier, monospace;
font-weight: 600;
text-transform: capitalize;
text-align: left;
font-size: 14px;
margin-bottom: 5px;

`

const ResourcesSharedCountContainer = styled.div`
display: flex;
font-family: 'Courier New', Courier, monospace;
font-weight: 600;
text-transform: capitalize;
margin-top: 20px;
text-align: left;
font-size: 14px;
margin-bottom: 5px;
`

const AverageAppreciationContainer = styled.div`
display: flex;
font-family: 'Courier New', Courier, monospace;
font-weight: 800;
text-transform: capitalize;
margin-top: 20px;
text-align: left;
font-size: 14px;
margin-bottom: 5px;
margin-top: 20px;
`

const RoomsCreatedCount = styled.div`
display: flex;
font-family: 'Courier New', Courier, monospace;
font-weight: 600;
margin-top: 20px;
text-transform: capitalize;
text-align: left;
font-size: 14px;
margin-bottom: 5px;
`

const NumbersWrapper = styled.div`

`


const SubsBtn = styled.button`
padding: 12px 14px 12px 14px;
border: 1px solid grey;
border-radius: 6px;
background-color: black;
color: white;
margin-top: 20px;
cursor: pointer;
`



const NavHeader = styled.div`
display: flex;
justify-content: space-around;
background-color: white;

`
const Logoutbtn = styled.div`
padding: 12px 14px 12px 14px;
border: 1px solid grey;
border-radius: 6px;
background-color: black;
color: white;
margin-top: 10px;
margin-bottom: 10px;
cursor: pointer;
`










function userdashboard() {

  const [UserInfoState, setUserInfoState] = useState({})
  const [RoomsCreatedState, setRoomsCreatedState] = useState([])
  const [ResourcesSharedState, setResourcesSharedState] = useState([])
  const [subsBtnState, setsubsBtnState] = useState("")
  const router = useRouter()
  const user_id = router.query.user_id
  console.log("logging query", user_id)
  


  const [NavBtnState , setNavBtnState]= useState('rooms')


  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession()
	    const logged_in_user_id = session.id
      const result = await axios.get(`${HOST_URL}api/getUserInfo?option=basic&user_id=${user_id}&logged_in_user_id=${logged_in_user_id}`)
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
      setRoomsCreatedState(response_data.user_created_rooms)
      setResourcesSharedState(response_data.resources_shared)
      console.log("logged in and user id", logged_in_user_id, user_id)
      if(response_data.subscribed){
        setsubsBtnState("subscribed")
      }else{
        
        if(logged_in_user_id == user_id){
          setsubsBtnState("hidden")
        }else{
          setsubsBtnState("unsubscribed")
        }
      }
    }
    if(user_id){
      fetchData()
    }
    
    
    
  }, [user_id])



const subscribe_user = async (e) => {
  const session = await getSession()
	const logged_in_user_id = session.id
  const response = await axios.post(`${HOST_URL}/api/subscribe_user`, {subscriber_id: logged_in_user_id , user_id: user_id})
  console.log(response)
  if(response.data.message == 'success'){
    setsubsBtnState("subscribed")
  }
}

const unsubscribe_user = async (e) =>{
  const session = await getSession()
	const logged_in_user_id = session.id
  const response = await axios.delete(`${HOST_URL}/api/unsubscribe_user?user_id=${user_id}&logged_in_user_id=${logged_in_user_id}`)
  console.log(response)
  if(response.data.message == 'success'){
    setsubsBtnState("unsubscribed")
  }
}
  
  


  return (
    <MainWrapper >
      <LeftInfoWrapper>
        <Inerleftwrapper>
        <UserDp>
          <Image src={UserInfoState.user_dp || "/empty_face.svg"} layout="fill"/>
        </UserDp>
        <UserName>
        {UserInfoState.user_name}
        </UserName>
        <NumbersWrapper>
          <RoomsJoinedCountContainer>
            Rooms Joined = 
            {UserInfoState.rooms_joined_count}
          </RoomsJoinedCountContainer>
          <ResourcesSharedCountContainer>
            resources shared =
            {UserInfoState.resources_shared_count}
          </ResourcesSharedCountContainer>
          <AverageAppreciationContainer>
            average resource appreciation =
            {parseFloat(UserInfoState.average_appreciation).toFixed(2)}
          </AverageAppreciationContainer>
          <RoomsCreatedCount>
            rooms created =
            {UserInfoState.rooms_created_count}
          </RoomsCreatedCount>
          
        </NumbersWrapper>
        {subsBtnState == "subscribed" ? <SubsBtn onClick={unsubscribe_user}>unsubscribe</SubsBtn>: subsBtnState == "unsubscribed" ? <SubsBtn onClick={subscribe_user}>subscribe</SubsBtn> : null}
        </Inerleftwrapper>
      </LeftInfoWrapper>




      <RightBigWrapper>
        <NavHeader>
          <CreatedRoomsBtn onClick={(e) => setNavBtnState('rooms')}>Rooms</CreatedRoomsBtn>
          <ResourcesSharedBtn onClick={(e) => setNavBtnState('resources')}>Resources</ResourcesSharedBtn>
          <Logoutbtn>LogOut</Logoutbtn>
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
 background-color: #e0e0e0;
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
  background-color: #f7f7f7;
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

