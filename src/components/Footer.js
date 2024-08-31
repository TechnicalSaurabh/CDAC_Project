import React from 'react'
 import '../css/Footer.css'
const Footer = () => {
  return (
    <>
   <div className="foot pt-4">
   <footer className="footer-section ">
     <div className="container10 footer-box">
       <div className="footer-cta pt-5 pb-5">
         <div className="row">
           <div className="col-xl-4 col-md-4 mb-30">
             <div className="single-cta">
               <i className="fas fa-map-marker-alt" />
               <div className="cta-text">
                 <h4>Find us</h4>
                 <span>1110 Avenue, sw 412321, Pune</span>
               </div>
             </div>
           </div>
           <div className="col-xl-4 col-md-4 mb-30">
             <div className="single-cta">
               <i className="fas fa-phone" />
               <div className="cta-text">
                 <h4>Call us</h4>
                 <span>8021868697</span>
               </div>
             </div>
           </div>
           <div className="col-xl-4 col-md-4 mb-30">
             <div className="single-cta">
               <i className="far fa-envelope-open" />
               <div className="cta-text">
                 <h4>Mail us</h4>
                 <span>mtspg117@gmail.com</span>
               </div>
             </div>
           </div>
         </div>
       </div>
       <div className="footer-content pt-5 pb-5">
         <div className="row">
           <div className="col-xl-4 col-lg-4 mb-50">
             <div className="footer-widget">
               <div className="footer-logo">
                 <a href="index.html">
                   <img
                     src="data:image/png;base64,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"
                     className="img-fluid"
                     alt="logo"
                   />
                 </a>
               </div>
               <div className="footer-text">
                 <p>
                   The aim of accomodation system to provide user friendly
                   enviroment to pg sector or affordable price.
                 </p>
               </div>
               <div className="footer-social-icon">
                 <span>Follow us</span>
                 {/* <a href="#">
                   <i className="fab fa-facebook-f facebook-bg" />
                 </a>
                 <a href="#">
                   <i className="fab fa-twitter twitter-bg" />
                 </a>
                 <a href="#">
                   <i className="fab fa-google-plus-g google-bg" />
                 </a> */}
               </div>
             </div>
           </div>
           <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
             <div className="footer-widget">
               <div className="footer-widget-heading">
                 <h3>Useful Links</h3>
               </div>
               <ul>
                 <li>
                   <a href="/">Home</a>
                 </li>
                 <li>
                   <a href="navbar.html">services</a>
                 </li>
                 {/* <li>
                   <a href="#">About us</a>
                 </li> */}
                 <li>
                   <a href="Contact.html">Contact us</a>
                 </li>
               </ul>
             </div>
           </div>
           <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
             <div className="footer-widget">
               <div className="footer-widget-heading">
                 <h3>Subscribe</h3>
               </div>
               <div className="footer-text mb-25">
                 <p>
                   Don’t miss to subscribe to our new feeds, kindly fill the form
                   below.
                 </p>
               </div>
               <div className="subscribe-form">
                 <form action="#">
                   <input type="text" placeholder="Email Address" />
                   <button>
                     <i className="fab fa-telegram-plane" />
                   </button>
                 </form>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </footer>
 </div>
 </>
 
  )
}

export default Footer
