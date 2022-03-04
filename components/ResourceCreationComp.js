import React, { useState } from 'react'
import LinkWidget from './widgets/LinkWidget'
import TextWidget from './widgets/TextWidget'
import ImageWidget from './widgets/ImageWidget'
import shortUUID from 'short-uuid'
import styled from 'styled-components'
import CodeWidget from './widgets/CodeWidget'
import VideoWidget from './widgets/VideoWidget'
import FileWidget from './widgets/FileWidget'
import getConfig from 'next/config'
import axios from 'axios'
import { getSession } from "next-auth/react"



const WidgetContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: yellow;
    height: 100%;
    padding: 100px;

`

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: green;
	width: 100%;
	height: 100%;
	overflow-y: auto;
`

const WidgetContentWrapper = styled.div`
	display: flex;
	flex-direction: row;
	height: 100%;
	width: 100%;
	overflow: hidden;
`

const HeaderWrapper = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
`






function ResourceCreationComp({room_id}) {

	const {publicRuntimeConfig} = getConfig()
	const {HOST_URL} = publicRuntimeConfig

	
	
	const [ResourceMetaData, setResourceMetaData] = useState({
		resource_client_id: `resource_${shortUUID().new()}`,
		room_id: room_id,
		resource_title: ""
	})

	const [Resource_data, setResource_data] = useState([])
	const [submissionFlag, setsubmissionFlag] = useState(false)

	

	
	const onHeadingChanged = (e) => {
		setResourceMetaData((prev_value) => {
			return {
				...prev_value,
				resource_title: e.target.value
			}
		})
	}


	const onWidgetDelete = (del_index) => {
		const new_data = Resource_data.filter((ele, index) => {
			return del_index == index ? false : true
		})
		setResource_data(new_data)
	}


	const onDataUpdate = (new_obj) => {
		const UpdatedResourceData = Resource_data.map(ele => {
			if (ele.id == new_obj.id) {
				return new_obj
			} else {
				return ele
			}
		})
		setResource_data(UpdatedResourceData)
	}

	

	const onSubmit = async (e) => {

		setsubmissionFlag(true)
		
		// const response = await axios.post(`${HOST_URL}/api/uploadresource`, {Resource_data})
                console.log("🚀 ~ file: ResourceCreationComp.js ~ line 108 ~ onSubmit ~ Resource_data", Resource_data)
		console.log(ResourceMetaData)
		const resources_obj = {
			resource_meta_data: ResourceMetaData,
			resources: Resource_data
		}
                console.log("🚀 ~ file: ResourceCreationComp.js ~ line 114 ~ onSubmit ~ resources_obj", resources_obj)
		const response = await axios.post(`${HOST_URL}/api/uploadresource`, {resources_obj})
		console.log(response)
	}


	const ContentArr = Resource_data.map((ele, index) => {

		switch(ele.type){
			case "link":
				return  <LinkWidget key={ele.id} del_index={index} del_function={onWidgetDelete} widget_data={ele} update_data={onDataUpdate} mode="write"/>
				
			case "text":
				return <TextWidget key={ele.id} del_index={index} del_function={onWidgetDelete} widget_data={ele} update_data={onDataUpdate} />
			
			case "image":
				return <ImageWidget key={ele.id} del_index={index} del_function={onWidgetDelete} widget_data={ele} update_data={onDataUpdate} />
			
			case "code":
				return <CodeWidget key={ele.id} del_index={index} del_function={onWidgetDelete} widget_data={ele} update_data={onDataUpdate} />

			case "video":
				return <VideoWidget key={ele.id} del_index={index} del_function={onWidgetDelete} widget_data={ele} update_data={onDataUpdate} />
			
			case "file":
				return <FileWidget key={ele.id} del_index={index} del_function={onWidgetDelete} widget_data={ele} update_data={onDataUpdate} />

			default:
				return undefined
		}

	})




	const onLinkWidgetClick = () => {
		setResource_data((prev_State) => {
			return [
				...prev_State,
				{
					resource_client_id: ResourceMetaData.resource_client_id,
					id: shortUUID().new(),
					type: "link",
					url: ""
				}
			]
		})
	}

	const onTextWidgetClick = () => {
		setResource_data((prev_State) => {
			return [
				...prev_State,
				{
					resource_client_id: ResourceMetaData.resource_client_id,
					id: shortUUID().new(),
					type: "text",
					text_content: ""
				}
			]
		})
	}

	const onImageWidgetClick = () => {
		setResource_data((prev_State) => {
			return [
				...prev_State,
				{
					resource_client_id: ResourceMetaData.resource_client_id,
					id: shortUUID().new(),
					type: "image",
					image_link: undefined
				}
			]
		})
	}


	const onCodeWidgetClick = () => {
		setResource_data((prev_State) => {
			return [
				...prev_State,
				{

					resource_client_id: ResourceMetaData.resource_client_id,
					id: shortUUID().new(),
					type: "code",
					language: "javascript",
					code: undefined,
					output: undefined
				}
			]
		})
	}


	const onVideoWidgetClick = () => {
		setResource_data((prev_State) => {
			return [
				...prev_State,
				{
					resource_client_id: ResourceMetaData.resource_client_id,
					id: shortUUID().new(),
					type: "video",
					video_link: undefined
				}
			]
		})
	}


	const onFileWidgetClick = () => {
		setResource_data((prev_State) => {
			return [
				...prev_State,
				{
					resource_client_id: ResourceMetaData.resource_client_id,
					id: shortUUID().new(),
					type: "file",
					file_link: undefined
				}
			]
		})
	}






	return (
		<>
		
			<HeaderWrapper>
				<h1>header</h1>
				<input type="text" value={ResourceMetaData.resource_title} onChange={onHeadingChanged}></input>
				<button onClick={onSubmit}>submit</button> 
			</HeaderWrapper>
				<WidgetContentWrapper>
					<WidgetContainer>
						<div onClick={onLinkWidgetClick} >link</div>
						<div onClick={onTextWidgetClick}>text</div>
						<div onClick={onImageWidgetClick}>image</div>
						<div onClick={onFileWidgetClick}>file</div>
						<div onClick={onCodeWidgetClick}>code</div>
						<div onClick={onVideoWidgetClick}>video</div>
					</WidgetContainer>
					<ContentContainer>{ContentArr}</ContentContainer>
				</WidgetContentWrapper>
		

			 
		</>

	)
}

export default ResourceCreationComp


