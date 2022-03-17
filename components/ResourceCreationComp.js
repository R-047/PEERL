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
import TagsComponent from './TagsComponent'
import React, {useState, useEffect} from 'react'


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






function ResourceCreationComp({ room_id, resource_obj, resource_cont_mode }) {

	const { publicRuntimeConfig } = getConfig()
	const { HOST_URL } = publicRuntimeConfig



	const [ResourceMetaData, setResourceMetaData] = useState({
		resource_client_id: resource_obj ? resource_obj.resource_client_id : `resource_${shortUUID().new()}`,
		room_id: resource_obj ? resource_obj.room_id : room_id,
		resource_title: resource_obj ? resource_obj.resource_title : "",
		resource_description: resource_obj ? resource_obj.resource_description : "",
		tags: resource_obj ? resource_obj.tags : []
	})

	const [Resource_data, setResource_data] = useState(resource_obj ? resource_obj.resources_arr : [])




	const onHeadingChanged = (e) => {
		setResourceMetaData((prev_value) => {
			return {
				...prev_value,
				resource_title: e.target.value
			}
		})
	}

	const onDescriptionChanged = (e) => {
		setResourceMetaData((prev_value) => {
			return {
				...prev_value,
				resource_description: e.target.value
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



		// const response = await axios.post(`${HOST_URL}/api/uploadresource`, {Resource_data})
		console.log("🚀 ~ file: ResourceCreationComp.js ~ line 108 ~ onSubmit ~ Resource_data", Resource_data)
		console.log(ResourceMetaData)
		const resources_obj = {
			resource_meta_data: ResourceMetaData,
			resources: Resource_data
		}
		console.log("🚀 ~ file: ResourceCreationComp.js ~ line 114 ~ onSubmit ~ resources_obj", resources_obj)
		const response = await axios.post(`${HOST_URL}/api/uploadresource`, { resources_obj })
		console.log(response)
	}

	const onUpdate = async (e) => {
		console.log("updating")
	}

	const onTagsUpdate = (tags_arr) => {
		setResourceMetaData((prev_value) => {
			return {
				...prev_value,
				tags: tags_arr
			}
		})
	} 


	const ContentArr = Resource_data.map((ele, index) => {

		switch (ele.type) {
			case "link":
				return <LinkWidget key={ele.id} del_index={index} del_function={onWidgetDelete} widget_data={ele} update_data={onDataUpdate} mode={resource_cont_mode} />

			case "text":
				return <TextWidget key={ele.id} del_index={index} del_function={onWidgetDelete} widget_data={ele} update_data={onDataUpdate} mode={resource_cont_mode} />

			case "image":
				return <ImageWidget key={ele.id} del_index={index} del_function={onWidgetDelete} widget_data={ele} update_data={onDataUpdate} mode={resource_cont_mode} />

			case "code":
				return <CodeWidget key={ele.id} del_index={index} del_function={onWidgetDelete} widget_data={ele} update_data={onDataUpdate} mode={resource_cont_mode} />

			case "video":
				return <VideoWidget key={ele.id} del_index={index} del_function={onWidgetDelete} widget_data={ele} update_data={onDataUpdate} mode={resource_cont_mode} />

			case "file":
				return <FileWidget key={ele.id} del_index={index} del_function={onWidgetDelete} widget_data={ele} update_data={onDataUpdate} mode={resource_cont_mode} />

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
				
				{(resource_cont_mode == "write" || resource_cont_mode == "update") ? <input type="text" value={ResourceMetaData.resource_title} onChange={onHeadingChanged} placeholder="title"></input> : <h1>{ResourceMetaData.resource_title}</h1>}
				{(resource_cont_mode == "write" || resource_cont_mode == "update") ? <input type="text" value={ResourceMetaData.resource_description} onChange={onDescriptionChanged} placeholder="description"></input> : <h1>{ResourceMetaData.resource_description}</h1>}
				{(resource_cont_mode == "write" || resource_cont_mode == "update") ? <TagsComponent mode="write" tagsArrUpdate={onTagsUpdate} tags={ResourceMetaData.tags}/>: <TagsComponent mode="read" tagsArrUpdate={onTagsUpdate} tags={ResourceMetaData.tags}/>}
				{resource_cont_mode == "write" && <button onClick={onSubmit}>submit</button>}
				{resource_cont_mode == "update" && <button onClick={onUpdate}>update</button>}
			</HeaderWrapper>
			<WidgetContentWrapper>

				{
					(resource_cont_mode == "write" || resource_cont_mode == "update") &&
					<WidgetContainer>
						<div onClick={onLinkWidgetClick} >link</div>
						<div onClick={onTextWidgetClick}>text</div>
						<div onClick={onImageWidgetClick}>image</div>
						<div onClick={onFileWidgetClick}>file</div>
						<div onClick={onCodeWidgetClick}>code</div>
						<div onClick={onVideoWidgetClick}>video</div>
					</WidgetContainer>
				}

				<ContentContainer>{ContentArr}</ContentContainer>
			</WidgetContentWrapper>



		</>

	)
}

export default ResourceCreationComp


