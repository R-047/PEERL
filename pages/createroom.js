import React, { useState } from 'react'
import getConfig from 'next/config'
import axios from 'axios'
import room from './rooms/[...room_name]'
import { Router, useRouter } from 'next/router'
import styled from 'styled-components'




const StyledForm = styled.form`
 display: flex;
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

const labelinputwrapper = styled.div`

`
const alllabelstyler = styled.label`

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
    room_image: "./empty_face.svg",
    room_dp: "./empty_face.svg",

  }
  const [form_State, setFormState] = useState(init_state)

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

    // formData.append("room_image", undefined)
    // formData.append("room_dp", undefined)

    if (form_State.room_image) {
      formData.append("room_image", form_State.room_image)
    }

    if (form_State.room_dp) {
      formData.append("room_dp", form_State.room_dp)
    }



    console.log(formData.get("room_name"), formData.get("room_desc"), formData.get("room_status"))
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


  const form_ele = (
    <StyledForm>
      <div >
        <label>room name</label>
        <input type='text' onChange={onRoomNameChange} value={form_State.room_name}></input>
        <label>room description</label>
        <textarea value={form_State.room_desc} onChange={onRoomDescChange}></textarea>
        <label>room status</label>
        <input type='checkbox' onChange={onRoomStatusChange} checked={form_State.room_Status}></input>
        <label>room dp</label>
        <input type='file' onChange={onRoomsDpChange}></input>
        <label>room image</label>
        <input type='file' onChange={onRoomsPictureChange}></input>
        <button type='submit' onClick={onSubmitClick} className={styles.signin_button}>create room</button>
        <div>
          <a href="#">Forgot password?</a> or <a href="#">Sign up</a>
        </div>
      </div>
    </StyledForm>

  )


  return form_ele
}

export default createroom