import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Update from "./components/Update";
import AllUsers from "./components/AllUsers";

import Registration from "./components/Registration";
import AdminHome from "./components/admin/AdminHome";
import UserHome from "./components/user/UserHome";
import Footer from "./components/Footer";
import ShowBookings from "./components/user/ShowBookings";
import UserProfile from "./components/user/UserProfile";
import UpdateUser from "./components/user/UpdateUserProfile";
import ChangePass from "./components/Changepass";
import BookRoom from "./components/user/BookRoom";
import BillList from "./components/user/BillList";
import PgManage from "./components/admin/PgManage";
import RegisterPG from "./components/admin/RegisterNewPg";
import UpdatePG from "./components/admin/UpdatePG";
import RegisterRoom from "./components/admin/RegisterRoom";
import RoomManage from "./components/admin/RoomManage";
import Rooms from "./components/Rooms";
import PgAllRoom from "./components/PgAllRoom";
import BookingDetails from "./components/user/BookingDetails";
import Support from "./components/user/Support";
import UpdateRoom from "./components/admin/UpdateRoom";
import AdminProfile from "./components/admin/AdminProfile";
import UpdateadminProfile from "./components/admin/UpdateAdminProfile";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration/>}/>
        <Route path="/update/:id" element={<Update/>}/>
        <Route path="/all" element={<AllUsers/>}/>
        <Route path="/adminHome" element={<AdminHome/>}/>
        <Route path="/userhome" element={<UserHome/>}/>
        <Route path="/showbooking" element={<ShowBookings/>}/>
        <Route path="/profile" element={<UserProfile/>}/>
        <Route path="/updateuser" element={<UpdateUser/>}/>
        <Route path="/changepassword/:email" element={<ChangePass/>}/>
        <Route path="/bookroom/:roomId" element={<BookRoom/>}/>
        <Route path="/bill" element={<BillList/>}/>
        <Route path="/admin/pgmanage" element={<PgManage/>}/>
        <Route path="/registerPg" element={<RegisterPG/>}/>
        <Route path="/updatePg" element={<UpdatePG/>}/>
        <Route path="/registerRoom" element={<RegisterRoom/>}/>
        <Route path="/admin/rooms" element={<RoomManage/>}/>
        <Route path="/room" element={<Rooms/>}/>
        <Route path="/pgallroom/:pgId" element={<PgAllRoom/>}/>
        <Route path="/bookingdetails/:roomId" element={<BookingDetails/>}/>
        <Route path="/support" element={<Support/>}/>
        <Route path="/updateRoom" element={<UpdateRoom/>}/>
        <Route path="/admin/profile" element={<AdminProfile/>}/>
        <Route path="/updateadminprofile" element={<UpdateadminProfile/>}/>
       </Routes>
       <Footer />
    </Router>
    
  );
}

export default App;
