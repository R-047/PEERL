import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import img from '../../public/delete_widget_ic.svg'


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

function ImageWidget({del_index, del_function, widget_data, update_data}) {
  const [image_comp_State, setimage_comp_State] = useState(widget_data)
  
  useEffect(() => {
    if(!image_comp_State.image){
      let input = document.createElement('input');
      input.type = 'file';
      input.onchange = onFileUploaded
      input.click();
    }else{
      update_data(image_comp_State)
    }
  },[image_comp_State])



  const onFileUploaded = (e) =>{
    const in_file = e.target.files[0]
    
    
    if(in_file){
      const reader = new FileReader();
      reader.addEventListener("load", function() {
        // setfile(this.result)
        setimage_comp_State((prev_value) => {
          return {...prev_value, image_file: this.result, image: in_file}
        })
      })
      reader.readAsDataURL(in_file)
    } 
  }


  const ele = (
        !image_comp_State.image ? undefined : 

        <>
          <StyledDeleteBtn onClick={(e) => del_function(del_index)}></StyledDeleteBtn>
          <ImageWrapper>
                  <Image src={image_comp_State.image_file} layout="responsive" width={0} height={0} quality="100"/>
            </ImageWrapper>
              {/* <ImageContainer> */}
                
              {/* </ImageContainer> */}
        </>
         
  
  )

  return (
    <StyledWrapper>
      
      {ele}
    </StyledWrapper>
    
    
  )
}

export default ImageWidget