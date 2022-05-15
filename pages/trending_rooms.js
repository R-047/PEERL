import React from 'react'
import clientPromise from "../lib/mongodb"

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import SearchComp from '../components/SearchComp';




function TrendingRooms() {
  return (
    <div>
      <Container maxWidth="sm">
      <Stack direction="row" spacing={2} sx={{
        
      }}>
          <SearchComp mode="general"/>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </Stack>
      </Container>
    </div>
  )
}


export async function getServerSideProps(context) {

  const { req, query } = context
  
  const { notebook } = query
  const db_response = await getTrendingRooms()

  console.log("🚀 ~ file: [...room_name].js ~ line 185 ~ getServerSideProps ~ db_response", db_response)




  return {
    props: {
      db_response
    }
  }



}


const getTrendingRooms = async () => {
  const client = await clientPromise
    const cursor = await client.db().collection("rooms").find({})

    const result = await cursor.toArray();

    const string_Res = JSON.stringify(result)
    const json_res = JSON.parse(string_Res)
    return json_res


}

export default TrendingRooms