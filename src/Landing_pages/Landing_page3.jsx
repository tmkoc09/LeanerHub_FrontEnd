import React, { useState } from 'react'
import Slider from 'react-slick';
// import { baseUrl } from "./config";

const Landing_page3 = () => {
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false
      };
    const[tablist,settablist]=useState("1")
  return (
    <div className='py-5'>
        <div className='container'>
            <p className='m-0 page2-subheading text-start'>Our Solutions</p>
            <p className='m-0 page2-heading text-start' style={{lineHeight:'75px'}}>A bird in hand is worth </p>
            <p className='m-0 page2-heading text-start' style={{lineHeight:'75px'}}>than two in a bush.</p>
        </div>
        <div className='row container mx-auto m-0 mt-5 pb-4'>
            <div className="col-lg-7">
            <ul class="nav flex-column">
  <li class="nav-item page3-tablist" onClick={()=>{
    settablist("1")
  }}>
   <p className='page3-tablist-content' style={{color:tablist==="1" ? '#5d5fe3':'#2A3941',fontWeight:tablist==="1" ? 600:500}}>1. University specific discussion platform</p>
  </li>
  <li class="nav-item page3-tablist" onClick={()=>{
    settablist("2")
  }}>
    <p className='page3-tablist-content' style={{color:tablist==="2" ? '#5d5fe3':'#2A3941',fontWeight:tablist==="2" ? 600:500}}>2. Subject specific Groups to exchange knowledge</p>
  </li>
  <li class="nav-item page3-tablist" onClick={()=>{
    settablist("3")
  }}>
   <p className='page3-tablist-content' style={{color:tablist==="3" ? '#5d5fe3':'#2A3941',fontWeight:tablist==="3" ? 600:500}}>3. Category based Private groups</p>
  </li>
  <li class="nav-item page3-tablist" onClick={()=>{
    settablist("4")
  }}>
    <p className='page3-tablist-content' style={{color:tablist==="4" ? '#5d5fe3':'#2A3941',fontWeight:tablist==="4" ? 600:500}}>4. Create your own Study-List to track your progress</p>
  </li>
  <li class="nav-item page3-tablist" onClick={()=>{
    settablist("5")
  }}>
    <p className='page3-tablist-content' style={{color:tablist==="5" ? '#5d5fe3':'#2A3941',fontWeight:tablist==="5" ? 600:500}}>5. Earn rewards by learning and sharing</p>
  </li>
  <li class="nav-item page3-tablist border-bottom" onClick={()=>{
    settablist("6")
  }}>
    <p className='page3-tablist-content' style={{color:tablist==="6" ? '#5d5fe3':'#2A3941',fontWeight:tablist==="6" ? 600:500}}>6. Extra-Curricular Engagement ( Open Groups)</p>
  </li>
</ul>
            </div>
            <div className="col-lg-5 p-0" style={{border:'1px solid #5D5FE3'}}>
                <img src={require('../img/landing_page/Rectangle 75.png')} style={{width:'100%',height:'100%'}} alt="" />
            </div>
        </div>

        {/* Slider */}
       <div className='page3-subdiv ' style={{height:'290px'}}>
       <div className="container py-3 h-100">
      <Slider {...settings}>
        <div>
          <div className='d-flex flex-column align-items-center justify-content-center'>
            <p className='page3-subdiv-head'>Beyond Books: Engage, Explore, Excel</p>
            <p className='px-1 px-md-5 page3-subdiv-para text-dark'>University life is more than academics; it's about growing as a well-rounded individual. Lernen-Hub’s platform promotes an active extra-curricular life, from eSports leagues to debate clubs, igniting passions and cultivating interests outside the lecture hall.</p>
            <button style={{backgroundColor:'#5d5fe3',fontSize:'14px',letterSpacing:'0.28px'}} className='text-white py-2 fw-medium btn'>Get Started Now</button>
          </div>
        </div>
        <div>
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <p className='page3-subdiv-head'>Beyond Books: Engage, Explore, Excel</p>
            <p className='px-1 px-md-5 page3-subdiv-para text-dark'>University life is more than academics; it's about growing as a well-rounded individual. Lernen-Hub’s platform promotes an active extra-curricular life, from eSports leagues to debate clubs, igniting passions and cultivating interests outside the lecture hall.</p>
            <button style={{backgroundColor:'#5d5fe3',fontSize:'14px',letterSpacing:'0.28px'}} className='text-white py-2 fw-medium btn'>Get Started Now</button>
          </div>
        </div>
        <div>
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <p className='page3-subdiv-head'>Beyond Books: Engage, Explore, Excel</p>
            <p className='px-1 px-md-5 page3-subdiv-para text-dark'>University life is more than academics; it's about growing as a well-rounded individual. Lernen-Hub’s platform promotes an active extra-curricular life, from eSports leagues to debate clubs, igniting passions and cultivating interests outside the lecture hall.</p>
            <button style={{backgroundColor:'#5d5fe3',fontSize:'14px',letterSpacing:'0.28px'}} className='text-white py-2 fw-medium btn'>Get Started Now</button>
          </div>
        </div>
      </Slider>
    </div>
       </div>
    </div>
  )
}

export default Landing_page3