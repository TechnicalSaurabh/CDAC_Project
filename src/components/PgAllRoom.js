import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import '.././css/Rooms.css';  // Import the CSS file
import UserHeader from './user/UserHeader';

export default function PgAllRoom() {
  const [rooms, setRooms] = useState([]);
  const { pgId } = useParams();  // Get the pgId from the URL
  const navigate = useNavigate();
  console.log("---->"+pgId);
  
  useEffect(() => {
    const token = sessionStorage.getItem("authToken");

    // Fetch rooms data for the specific PG from the API
    axios.get(`http://localhost:7117/pg_api/room/getroombypgid/${pgId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        const roomsData = response.data;

        // Fetch images for each room
        const roomsWithImagesPromises = roomsData.map(room => {
          let imageUrls = [];

          return axios.get(`http://localhost:7117/pg_api/image/getByRoom/${room.roomId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(imageResponse => {
            const imagesData = imageResponse.data;
            imageUrls = imagesData.map(image => `data:image/jpeg;base64,${image.imagedata}`);
            return { ...room, imageUrls };
          })
          .catch(err => {
            console.error(`Error fetching images for room ${room.roomId}:`, err);
            return { ...room, imageUrls: [] }; // Return room with empty images in case of error
          });
        });

        Promise.all(roomsWithImagesPromises)
          .then(roomsWithImages => {
            setRooms(roomsWithImages);
          });
      })
      .catch(error => {
        console.error("There was an error fetching the rooms!", error);
      });
  }, [pgId]);  // Re-fetch when pgId changes

  const handleBookNow = (roomId) => {
    navigate(`/bookroom/${roomId}`);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
    <UserHeader/>
    <div>
All pg<br/>
pg
<br/>
pg
    </div>
    <div className="container3">
      <div className="row">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div className="col-md-4" key={room.roomId}>
              <div className="card mb-4">
                <div className="card-body">
                  {room.imageUrls.length > 0 ? (
                    <Slider {...sliderSettings}>
                      {room.imageUrls.map((url, index) => (
                        <div key={index}>
                          <img
                            src={url}
                            alt={`Room ${room.roomNumber} - Image1 ${index + 1}`}
                            className="room-image"
                          />
                        </div>
                      ))}
                    </Slider>
                  ) : (
                    <div className="no-image-placeholder">
                      <p>No image available</p>
                    </div>
                  )}
                  <h5 className="card-title">Room Number: {room.roomNumber}</h5>
                  <p className="card-text"><strong>Area:</strong> {room.area} </p>
                  <p className="card-text"><strong>Capacity:</strong> {room.capacity}</p>
                  <p className="card-text"><strong>Floor:</strong> {room.floorNumber}</p>
                  <p className="card-text"><strong>Type:</strong> {room.type}</p>
                  <p className="card-text"><strong>Rent:</strong> ₹{room.rent} per month</p>
                  <p className="card-text"><strong>PG Name:</strong> {room.pgRef.pgName}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleBookNow(room.roomId)}
                  >
                    Know More
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center">No rooms available at the moment.</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
