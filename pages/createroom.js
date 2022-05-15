import React, { useState } from 'react'
import getConfig from 'next/config'
import axios from 'axios'
import room from './rooms/[...room_name]'
import { Router, useRouter } from 'next/router'
import styled from 'styled-components'
import Image from 'next/image'
import TagsComponent from '../components/TagsComponent'


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const StyledForm = styled.form`
 display: flex;

 margin-left: 550px;
 margin-top: 20px;
 flex-direction: column;
 align-items: center;
 align-content: center;
 justify-content: space-between;
 width:430px;
 height: 700px;
 padding: 60px 35px 35px 35px;
 border-radius: 40px;
 background: #ecf0f3;
 box-shadow: 13px 13px 20px #cbced1,
              -13px -13px 20px #ffffff;
 
`

const FormParent = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 align-content: center;
 justify-content: space-between;
 height: 100%;

`

const MainWrapper = styled.div`
  height: 100vh
`

const RoomName = styled.input`
    width: 70%;
    padding: 10px;
    border-radius: 11px;
    border: 1px solid grey

`
const RoomDes = styled.textarea`
width: 70%;
    padding: 20px;
    border-radius: 11px;
    border: 1px solid grey

`
const RoomLabel = styled.h1`
font-size: 16px;
font-weight: bolder;

`
const Activeparent = styled.div`
display: flex;
flex-direction: row-reverse;
align-items: center;
justify-content: space-between;
margin: 0;
margin-top: 5px;


`
const Roomdp = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
margin: 0;
margin-top: 5px;


`
const Roommarginleft = styled.input`
margin-left: 10px;
padding: 5px;
border-radius: 2px;
border: 1px solid grey;


`
const RoomSubmitButton = styled.button`
    margin-top: 20px;
    margin-bottom: 10px;
    padding: 10px;
    width: 150px;
    background-color: black;
    color: white;
    border-radius: 11px;
    border: 1px solid grey;
    cursor: pointer;
    text-transform: capitalize;


`


// create form...inputs: room_name, room_desc, room_status(public or private), room_image, room_dp and submit to an API api/createroom and  save to S3 and DB

function createroom() {
  const router = useRouter()

  const { publicRuntimeConfig } = getConfig()
  const { HOST_URL } = publicRuntimeConfig

  const init_state = {
    room_name: "",
    room_desc: "",
    room_Status: false,
    category: "",
    room_image: "./empty_face.svg",
    room_dp: "./empty_face.svg",
    tags: []


  }
  const [form_State, setFormState] = useState(init_state)


  const handleChange = (event) => {
    setFormState((prev_state) => {
      return {
        ...prev_state,
        category: event.target.value
      }
    })
  };

  const onRoomNameChange = (e) => {
    setFormState((prev_state) => {
      return {
        ...prev_state,
        room_name: e.target.value
      }
    })
  }

  const onRoomDescChange = (e) => {
    setFormState((prev_state) => {
      return {
        ...prev_state,
        room_desc: e.target.value
      }
    })
  }

  const onRoomStatusChange = (e) => {
    setFormState((prev_state) => {
      return {
        ...prev_state,
        room_Status: !prev_state.room_Status
      }
    })
  }

  const onRoomsDpChange = (e) => {
    const in_file = e.target.files[0]
    if (in_file) {

      const reader = new FileReader();
      reader.addEventListener("load", function () {
        setFormState((prev_value) => {
          return { ...prev_value, room_dp: in_file }
        })
      })
      reader.readAsDataURL(in_file)
    }

  }

  const onRoomsPictureChange = (e) => {
    const in_file = e.target.files[0]
    if (in_file) {

      const reader = new FileReader();
      reader.addEventListener("load", function () {
        setFormState((prev_value) => {
          return { ...prev_value, room_image: in_file }
        })
      })
      reader.readAsDataURL(in_file)
    }
  }


  const onSubmitClick = async (e) => {

    e.preventDefault()
    console.log(form_State)
    const formData = new FormData();
    formData.append("room_name", form_State.room_name)
    formData.append("room_desc", form_State.room_desc)
    formData.append("room_status", form_State.room_Status)
    formData.append("room_category", form_State.category)
    formData.append("tags_arr", JSON.stringify(form_State.tags))

    // formData.append("room_image", undefined)
    // formData.append("room_dp", undefined)

    if (form_State.room_image) {
      formData.append("room_image", form_State.room_image)
    }

    if (form_State.room_dp) {
      formData.append("room_dp", form_State.room_dp)
    }



    console.log("logging form data", form_State)
    const response = await axios.post(`${HOST_URL}/api/createroom`, formData)
    //get room_id and room_name
    const room_id = response.data.data.room_id;
    const room_name = response.data.data.room_name;
    console.log(room_id, room_name)
    router.replace({
      pathname: `/rooms/${room_name}/resources`,
      query: { room_id: room_id }
    })



  }

  const onTagsUpdate = (tags_arr) => {
		setFormState((prev_value) => {
			return {
				...prev_value,
				tags: tags_arr
			}
		})
	}


  const form_ele = (
    <MainWrapper>
    <StyledForm>
      
      <Image src="/peerllogo.svg" alt="" width={1000} height={550}></Image>
        <RoomLabel>Room Name</RoomLabel>
        <RoomName type='text' onChange={onRoomNameChange} value={form_State.room_name} placeholder="Enter Room Name" required></RoomName>
        <RoomLabel>Room Description</RoomLabel>
        <RoomDes value={form_State.room_desc} onChange={onRoomDescChange} placeholder="Enter Room description"></RoomDes>
        <Activeparent>
        <RoomLabel>room status</RoomLabel>
        <input type='checkbox' onChange={onRoomStatusChange} checked={form_State.room_Status} required></input>
        </Activeparent>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={form_State.category}
            label="Category"
            onChange={handleChange}
          >
            <MenuItem value={"Technology"}>Technology</MenuItem>
            <MenuItem value={"Bussiness"}>Bussiness</MenuItem>
            <MenuItem value={"Finance"}>Finance</MenuItem>
            <MenuItem value={"Science"}>Science</MenuItem>
          </Select>
        </FormControl>
        <Roomdp>
        <RoomLabel>Room Icon</RoomLabel>
        <Roommarginleft type='file' onChange={onRoomsDpChange} required></Roommarginleft>
        </Roomdp>
        <Roomdp>
        <RoomLabel>Room Image</RoomLabel>
        <Roommarginleft type='file' onChange={onRoomsPictureChange} required></Roommarginleft>
        </Roomdp>
        <TagsComponent mode="write" tagsArrUpdate={onTagsUpdate} tags={form_State.tags} />
        <RoomSubmitButton type='submit' onClick={onSubmitClick}>create room</RoomSubmitButton>
        
        <div>
        </div>
      
    </StyledForm>
    </MainWrapper>

  )


  return form_ele
}

export default createroom