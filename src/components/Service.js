import React from 'react'
import "../css/Service.css"
const Service = () => {
   return (
      <div className="Services">
         <div className="name pt-2 text-center mx-auto">
            <h2>Services</h2>
         </div>
         <div className="container-xl ">
              <div className="row">
               <div className="col-xl-2">
                  <div className="card justify-content-between">
                     <img
                        src="Images/furnishedRoom.webp"
                        className="card-img-top img-fluid"
                        alt="..."
                     />
                     <div className="card-body">
                        <h5 className="card-title">Fully Furnished Bedroom</h5>
                        <p className="card-text">
                           We serve our client's diverse requirement of optimum fully
                           furnished modular rooms.
                        </p>
                     </div>
                  </div>
               </div>
               <div className="col-xl-2">
                  <div className="card">
                     <img src="Images/wadrobe.jpg" className="card-img-top img-fluid" alt="..." />
                     <div className="card-body">
                        <h5 className="card-title">Wardrobe With Locker</h5>
                        <p className="card-text">
                           You can secure your personal wardrobe by locking it.
                        </p>
                     </div>
                  </div>
               </div>
               <div className="col-xl-2">
                  <div className="card">
                     <img src="Images/shower.jpg" className="card-img-top img-fluid" alt="..." />
                     <div className="card-body">
                        <h5 className="card-title">Hot/Cold Shower</h5>
                        <p className="card-text">
                           You can adjust the hot or cold water temperatures in the bathroom
                           as per your preference.
                        </p>
                     </div>
                  </div>
               </div>
               <div className="col-xl-2">
                  <div className="card">
                     <img
                        src="Images/hygenicFood.jpg"
                        className="card-img-top img-fluid"
                        alt="..."
                     />
                     <div className="card-body">
                        <h5 className="card-title">Hygienic Food</h5>
                        <p className="card-text">
                           We offer a wide range of meals at best quality and ensure complete
                           hygiene in the mess.
                        </p>
                     </div>
                  </div>
               </div>
               <div className="col-xl-2">
                  <div className="card">
                     <img src="Images/water.jpg" className="card-img-top img-fluid" alt="..." />
                     <div className="card-body">
                        <h5 className="card-title">Water Facility</h5>
                        <p className="card-text">
                           We provide purified drinking water and hot water for bathing
                           everyday,all day long.
                        </p>
                     </div>
                  </div>
               </div>
               <div className="col-xl-2">
                  <div className="card">
                     <img src="Images/terrace.jpg"  className="card-img-top img-fluid" alt="..." />
                     <div className="card-body">
                        <h5 className="card-title">Terrace Re-creation</h5>
                        <p className="card-text">
                           You can relax in your open terrace with the fresh breeze &amp; can
                           beautify it as per your preference.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Service

