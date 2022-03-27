import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import TagsComponent from './TagsComponent'
import getConfig from 'next/config'
import axios from 'axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)


//username
//user dp
//resource title
//resource description
//resource tags
//total number of items
//resource posted date
//appreciation

const { publicRuntimeConfig } = getConfig()
const { HOST_URL } = publicRuntimeConfig


const UserDp = styled.div`
  position: relative;
    width: 32px;
    height: 32px;
    border-radius: 100%;
    overflow: hidden;

`

const ResourceTitle = styled.div`

`

const ResourceDescription  = styled.div`

`
const ResourceCapsuleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

`
const ResourceCapsuleHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
`

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

`

const ResourceRect = styled.div`
 display: flex;
 flex-direction: column;

`






function ResourceCapsule({user_id, time, title, resource_ratings, tags, res_id}) {
  const [userInfoState, setuserInfoState] = useState({
    user_name: "",
    user_img: "/empty_face.svg"
  })
  useEffect(() => {
    async function fetchData() {
				const result = await axios.get(`${HOST_URL}/api/user?user_id=${user_id}`)
				console.log("user_infooooooooooooooooooooooooooooooooooo",result.data)
        setuserInfoState({
          user_name: result.data.name,
          user_img: result.data.image
        })
		}
		fetchData();
  }, [])
  
  return (
    <ResourceCapsuleWrapper id={res_id}>
      <ResourceCapsuleHeader>
        <UserInfoWrapper>
          <UserDp>
            <Image src={userInfoState.user_img} layout="fill"/>
          </UserDp>
          {userInfoState.user_name}
        </UserInfoWrapper>
        {dayjs(time).fromNow()}
      </ResourceCapsuleHeader>
      <ResourceRect>
        <h1>{title}</h1>
        <p>{resource_ratings}</p>
      </ResourceRect>
      <TagsComponent mode="read" tags={tags}/>
    </ResourceCapsuleWrapper>
  )
}


export default ResourceCapsule