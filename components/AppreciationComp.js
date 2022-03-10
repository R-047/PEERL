import React from 'react'
import styled from 'styled-components'

const LikeBtn = styled.button`

`

const LikesCount = styled.p`

`

function AppreciationComp({likeCount}) {
	const [likeToggleState, setlikeToggleState] = useState(false)

	const onLikeBtnClick = (e) => {
		setlikeToggleState((prev_State) => {
			return prev_State ? false : true
		})
	
		console.log("resource liked state: ",likeToggleState)
	}
  return (
    <div>
	    AppreciationComp
	    <LikeBtn onClick={onLikeBtnClick}/>
	    <LikesCount >
		    {likeCount}
	    </LikesCount>
	</div>
    
  )
}

export default AppreciationComp