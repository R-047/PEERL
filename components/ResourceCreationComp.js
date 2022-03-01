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






function ResourceCreationComp() {

	const {publicRuntimeConfig} = getConfig()
	const {HOST_URL} = publicRuntimeConfig

	const init_widgets_arr = [

	]

	const [Resource_data, setResource_data] = useState(init_widgets_arr)
	const [submissionFlag, setsubmissionFlag] = useState(false)


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

	const SubmitCheckFunc = () => {
		return submissionFlag
	}

	const onSubmit = async (e) => {
		console.log("submission flag value before", SubmitCheckFunc())
		setsubmissionFlag(true)
		console.log("submission flag value", SubmitCheckFunc())

		console.log("🚀 ~ file: ResourceCreationComp.js ~ line 35 ~ onSubmit ~ Resource_data", Resource_data)
		
		const response = await axios.post(`${HOST_URL}/api/uploadresource`, {Resource_data})

                console.log("🚀 ~ file: ResourceCreationComp.js ~ line 89 ~ onSubmit ~ response", response)
	}


	const ContentArr = Resource_data.map((ele, index) => {

		switch(ele.type){
			case "link":
				return  <LinkWidget key={ele.id} del_index={index} del_function={onWidgetDelete} widget_data={ele} update_data={onDataUpdate} mode="write"/>
				
			case "text":
				return <TextWidget key={ele.id} del_index={index} del_function={onWidgetDelete} widget_data={ele} update_data={onDataUpdate} />
			
			case "image":
				return <ImageWidget key={ele.id} del_index={index} del_function={onWidgetDelete} widget_data={ele} update_data={onDataUpdate} submissionFlag={SubmitCheckFunc}/>
			
			case "code":
				return <CodeWidget key={ele.id} del_index={index} del_function={onWidgetDelete} widget_data={ele} update_data={onDataUpdate} />

			case "video":
				return <VideoWidget key={ele.id} del_index={index} del_function={onWidgetDelete} widget_data={ele} update_data={onDataUpdate} submissionFlag={SubmitCheckFunc}/>
			
			case "file":
				return <FileWidget key={ele.id} del_index={index} del_function={onWidgetDelete} widget_data={ele} update_data={onDataUpdate} submissionFlag={SubmitCheckFunc}/>

			default:
				return undefined
		}

	})




	const onLinkWidgetClick = () => {
		setResource_data((prev_State) => {
			return [
				...prev_State,
				{
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