import React from 'react'
import UserHeader from './UserHeader'
//import Rooms from '../Rooms'
import AllPgForUser from './AllPgForUsers'

export default function UserHome() {
  return (
    <>
    <UserHeader/>
    {/* <Rooms/> */}
    <div>
        All pg
        <br />
        pg
        <br />
        pg
      </div>
    <AllPgForUser/>
    </>
  )
}
