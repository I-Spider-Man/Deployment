import { Divider, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Button } from '@mui/material';
import { getAllFollowing } from '../Files/User_profile_avator';
import { useUser } from '../Auth/UserContext';
function FollowingList() {
  const {userDetails}=useUser();
  const [dataSource,setDataSource]=useState([])
  useEffect(()=>{
    const fetch=async()=>{
      const res=await getAllFollowing(userDetails.userId);
      setDataSource(res);
    }
    fetch();
  },[])
  const columns = [
    {
      title: 'Name',
      dataIndex: 'userName',
      key: 'name',
    },
    {
      title: 'Action',
      dataIndex: 'button'
    }
  ]
  return (
    <div style={{display:'flex',flexDirection:'row',height:'100%',justifyContent:'space-evenly'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'20%'}}>
        {dataSource?.length}
      </div>
      <Divider type='vertical' style={{borderWidth:'3px'}}/>
      <div style={{width:'100%', height:'100%'}}>
      <Table dataSource={dataSource} columns={columns}/>
      </div>
    </div>
  )
}

export default FollowingList