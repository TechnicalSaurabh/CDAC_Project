import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import '../../css/Allpg.css'

export default function AllPgForUser() {
  const [pgs, setPgs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");

    // Fetch PG data from the API
    axios.get('http://localhost:7117/pg_api/pg/AllPg', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        const pgsData = response.data;
        console.log("---->"+pgsData);
        
        // Fetch images for each PG
        const pgsWithImagesPromises = pgsData.map(pg => {
          let imageUrls = [];

          return axios.get(`http://localhost:7117/pg_api/image/getBypg/${pg.pgId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(imageResponse => {
            const imagesData = imageResponse.data;
            imageUrls = imagesData.map(image => `data:image/jpeg;base64,${image.imagedata}`);
            return { ...pg, imageUrls };
          })
          .catch(err => {
            console.error(`Error fetching images for PG ${pg.pgId}:`, err);
            return { ...pg, imageUrls: [] }; // Return PG with empty images in case of error
          });
        });

        Promise.all(pgsWithImagesPromises)
          .then(pgsWithImages => {
            setPgs(pgsWithImages);
          });
      })
      .catch(error => {
        console.error("There was an error fetching the PGs!", error);
      });
  }, []);

  const handleViewDetails = (pgId) => {
    navigate(`/pgallroom/${pgId}`);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="container2">
      <div className="row">
        {pgs.length > 0 ? (
          pgs.map((pg) => (
            <div className="col-md-4" key={pg.pgId}>
              <div className="card mb-4">
                <div className="card-body">
                  {pg.imageUrls.length > 0 ? (
                    <Slider {...sliderSettings}>
                      {pg.imageUrls.map((url, index) => (
                        <div key={index}>
                          <img
                            src={url}
                            alt={`PG ${pg.pgName} - Image1 ${index + 1}`}
                            className="pg-image"
                          />
                        </div>
                      ))}
                    </Slider>
                  ) : (
                    <div className="no-image-placeholder">
                      <p>No images available</p>
                    </div>
                  )}
                  <h5 className="card-title">{pg.pgName}</h5>
                  <p className="card-text"><strong>Contact:</strong> {pg.contactNo} </p>
                  <p className="card-text"><strong>Address:</strong> {pg.address}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleViewDetails(pg.pgId)}
                  >
                    View All Rooms
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center">No PGs available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
