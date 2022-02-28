import React, { useState } from 'react'
import LinkWidget from './widgets/LinkWidget'
import TextWidget from './widgets/TextWidget'
import ImageWidget from './widgets/ImageWidget'
import shortUUID from 'short-uuid'
import styled from 'styled-components'
import CodeWidget from './widgets/CodeWidget'



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






function ResourceCreationComp() {

	const init_widgets_arr = [

	]

	const [Resource_data, setResource_data] = useState(init_widgets_arr)


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

	const onSubmit = (e) => {
		console.log("🚀 ~ file: ResourceCreationComp.js ~ line 35 ~ onSubmit ~ Resource_data", Resource_data)
	}


	const ContentArr = Resource_data.map((ele, index) => {

		return ele.type == "link" ? <LinkWidget key={ele.id} del_index={index} del_function={onWidgetDelete} widget_data={ele} update_data={onDataUpdate} />
			: ele.type == "text" ? <TextWidget key={ele.id} del_index={index} del_function={onWidgetDelete} widget_data={ele} update_data={onDataUpdate} />
				: ele.type == "image" ? <ImageWidget key={ele.id} del_index={index} del_function={onWidgetDelete} widget_data={ele} update_data={onDataUpdate} />
					: ele.type == "code" ? <CodeWidget key={ele.id} del_index={index} del_function={onWidgetDelete} widget_data={ele} update_data={onDataUpdate} />
					:undefined
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
					text_content: "lorem ipsum"
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
					image: undefined
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
					code: undefined,
					output: undefined
				}
			]
		})
	}






	return (
		<>
		
			<h1>header</h1>
				<WidgetContentWrapper>
					<WidgetContainer>
						<div onClick={onLinkWidgetClick} >link</div>
						<div onClick={onTextWidgetClick}>text</div>
						<div onClick={onImageWidgetClick}>image</div>
						<div>file</div>
						<div onClick={onCodeWidgetClick}>code</div>
					</WidgetContainer>
					<ContentContainer>{ContentArr}</ContentContainer>
				</WidgetContentWrapper>
		

			 {/* <button onClick={onSubmit}>submit</button>  */}
		</>

	)
}

export default ResourceCreationComp