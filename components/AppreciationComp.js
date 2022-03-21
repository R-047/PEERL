import axios from 'axios'
import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import getConfig from 'next/config'
import { getSession } from 'next-auth/react'

const LikeBtn = styled.button`
 background-color: ${props => props.color ? "green" : "red"};
`

const LikesCount = styled.p`

`

function AppreciationComp({appreciation_count, resource_id, appreciated, update_func}) {
        console.log("🚀 ~ file: AppreciationComp.js ~ line 16 ~ AppreciationComp ~ appreciated", appreciated)
	// const [likeToggleState, setlikeToggleState] = useState(appreciated)
	const { publicRuntimeConfig } = getConfig()
	const { HOST_URL } = publicRuntimeConfig
	
	// useEffect(() => {
	//   setlikeToggleState(appreciated)
	// }, [appreciated])
	
	const onLikeBtnClick = async (e) => {
		// setlikeToggleState((prev_State) => {
		// 	return prev_State ? false : true
		// })
		const session = await getSession()
		const user_id = session.id
		const response = await axios.put(`${HOST_URL}/api/appreciate_resource`, {id:resource_id, user_id: user_id,action: appreciated ? 'dec' : 'inc'})
		update_func(response.data.new_resource_obj)
		//resource_appreciate endpoint
		//send request to this route, increment or decrement the count, send the resource id

	
		console.log("resource liked state: ",appreciated)
	}
  return (
    <div>
	    <LikeBtn onClick={onLikeBtnClick} color={appreciated}>appreciate</LikeBtn>
	    <LikesCount >
		    {appreciation_count}
	    </LikesCount>
	</div>
    
  )
}

export default AppreciationComp