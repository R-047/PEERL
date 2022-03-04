import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import img from '../../public/delete_widget_ic.svg'
import axios from 'axios'
import getConfig from 'next/config'

const StyledDeleteBtn = styled.button`
margin: 1em;
padding: 0.25em 1em;
border-radius: 3px;
display: block;
background-color: transparent;
background-image: url(${img.src});
background-repeat: no-repeat;
width: 30px;
height: 30px;
background-size: cover;
background-position: center;
border: none;
order: 2;
`

const StyledWrapper = styled.div`
display: flex;
`


const VideoWrapper = styled.div`
    position: relative;
    width: 100%;
    margin: 10px;

`

function VideoWidget({ del_index, del_function, widget_data, update_data}) {

	const { publicRuntimeConfig } = getConfig()
	const { HOST_URL } = publicRuntimeConfig
	const [video_comp_state, setvideo_comp_state] = useState(widget_data)
	

	useEffect(() => {
		if (!video_comp_state.video_link) {
			let input = document.createElement('input');
			input.type = 'file';
			input.onchange = onFileUploaded
			input.click();
		} else {
			update_data(video_comp_state)
		}

		return async () => {
        
			const payload = video_comp_state
			const response = await axios.delete(`${HOST_URL}/api/cleanUp`, {data: payload})
			console.log("response after deleted", response)
		    }
	}, [video_comp_state])



	const onFileUploaded = async (e) => {
		const in_file = e.target.files[0]
		
		if (in_file) {
			const formdata = new FormData()
			formdata.append("file", in_file)
			const response = await axios.post(`${HOST_URL}/api/uploadBlob/upload`, formdata)
			console.log(response)
			const video_link = response.data.file_link
			const video_name = response.data.file_name
			const video_org_name = response.data.file_org_name
			setvideo_comp_state((prev_value) => {
				return { ...prev_value, video_link: video_link, file_name: video_name, video_org_name: video_org_name }
			})
		}
	}


	const ele = (
		!video_comp_state.video_link ? "loading" : 
	
		<>
		  <StyledDeleteBtn onClick={(e) => del_function(del_index)}></StyledDeleteBtn>
		  <VideoWrapper>
			  <video src={video_comp_state.video_link} controls width="250"/>
		    </VideoWrapper>
		</>
		 
	  
	  )


	return (
		<StyledWrapper>
			{ele}
		</StyledWrapper>
	)
}

export default VideoWidget