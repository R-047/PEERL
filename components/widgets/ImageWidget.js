import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import img from '../../public/delete_widget_ic.svg'
import getConfig from 'next/config'
import axios from 'axios'


const ImageWrapper = styled.div`
    position: relative;
    width: 100%;
    margin: 10px;

`

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

const ImageContainer = styled.div`
display: flex;
justify-content: center;
width: 100%;
height: 300px;
position: relative;
`

function ImageWidget({ del_index, del_function, widget_data, update_data, mode }) {
  const { publicRuntimeConfig } = getConfig()
  const { HOST_URL } = publicRuntimeConfig

  const [image_comp_State, setimage_comp_State] = useState(widget_data)



  useEffect(() => {
    if (!image_comp_State.image_link) {
      let input = document.createElement('input');
      input.type = 'file';
      input.onchange = onFileUploaded
      input.click();
    } else {
      update_data(image_comp_State)
    }

    console.log("image widget updated###############################", image_comp_State)

    return async () => {

      const payload = image_comp_State
      const response = await axios.delete(`${HOST_URL}/api/cleanUp`, { data: payload })
      console.log("response after deleted", response)
    }

  }, [image_comp_State])





  const onFileUploaded = async (e) => {
    const in_file = e.target.files[0]

    if (in_file) {
      const formdata = new FormData()
      formdata.append("file", in_file)
      const response = await axios.post(`${HOST_URL}/api/uploadBlob/upload`, formdata)
      console.log(response)
      const image_link = response.data.file_link
      const file_name = response.data.file_name
      setimage_comp_State((prev_value) => {
        return { ...prev_value, image_link: image_link, file_name: file_name }
      })
    }


  }


  const ele = (
    !image_comp_State.image_link ? undefined :

      <>
        {mode == "write" ?
        <>
          <StyledDeleteBtn onClick={(e) => del_function(del_index)}></StyledDeleteBtn>
          <ImageWrapper>
            <Image src={image_comp_State.image_link} layout="responsive" width={0} height={0} quality="100" />
          </ImageWrapper>
        </> :
        <ImageWrapper>
            <Image src={image_comp_State.image_link} layout="responsive" width={0} height={0} quality="100" />
          </ImageWrapper>}


      </>


  )

  return (
    <StyledWrapper>
      {ele}
    </StyledWrapper>


  )
}

export default ImageWidget