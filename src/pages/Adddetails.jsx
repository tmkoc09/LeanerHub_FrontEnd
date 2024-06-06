// After Email validation and OTP Verification the user need to add their details

import React, { useState,useContext } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Mainsidebar from '../components/Mainsidebar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ipaddress } from '../App';
import { Context } from '../context/Context_provider';
import First_navabr from '../components/First_navabr';

const Adddetails = ({value,email,university_name}) => {

  const {translate_value,setAddsubjects_layout}=useContext(Context)

  let navigate=useNavigate()

 const[firstname,setFirstname]=useState()
 const[lastname,setlastname]=useState()
 const[nickname,setnickname]=useState("")
 const[coursename,setcoursename]=useState(0)
 const[courses,setCourses]=useState([])
 const[btn_status,setbtn_status]=useState(false)
 const[loading,setloading]=useState()
 const[success,setsuccess]=useState(false)
 const[error,seterror]=useState(false)



 useEffect(()=>{
  if(value==true){
    axios.get(`${ipaddress}/ProgramsView/${email}`)
  .then((r)=>{
    console.log("Programs",r.data)
    setCourses(r.data)
  })
  .catch(()=>{
    console.log("Joined courses fetching error")
  })
}
},[value])


// --------------To get the firstname and lastname from email-------------------------------

const [beforeDot, setBeforeDot] = useState("");
  const [afterDot, setAfterDot] = useState("");

  useEffect(() => {
    const parts = email.split('.');
    const firstDotIndex = email.indexOf('.');
    const atIndex = email.indexOf('@');
    
    const beforeDotWord = email.substring(0, firstDotIndex);
    const afterDotWord = email.substring(firstDotIndex + 1, atIndex);

    setFirstname(beforeDotWord);
    setlastname(afterDotWord);
  }, [email]);

 const senduserdata=(e)=>{
  e.preventDefault()
  setloading(true)
  const formdata=new FormData()
  formdata.append('first_name',firstname)
  formdata.append('last_name',lastname)
  formdata.append('nickname',nickname)
  formdata.append('course_name',coursename)
  formdata.append('email',email)

  axios.post(`${ipaddress}/UserRegistrationAPIView/`,formdata)
  .then((r)=>{
    console.log("Details Sent Successfully",r.data)
    signin()
    setAddsubjects_layout(true)
    setloading(false)
  })
 }

 const signin=()=>{
  axios.get(`${ipaddress}/UserDetails/${email}/`)
  .then((r)=>{
    sessionStorage.setItem('user',JSON.stringify(r.data))
    navigate('/dashboard/mainpage')
  })
  .catch((err)=>{
    console.log("ERROR",err)
  })
 }

//  Validate nickame
const[loading1,setloading1]=useState()
const[val,setval]=useState("")

const verifyNickname=(value)=>{
  setloading1(true)
  if(value.length>0){
  setval('Checking...')
axios.get(`${ipaddress}/admin_app/NickNameCheck/${value}/`)
.then((r)=>{
  console.log("Nickname data",r.data)
  document.getElementById('span').style.color="black"
  setloading1(false)
  if(r.data.message==='Not There'){
    setsuccess(true)
    seterror(false)
    
    setbtn_status(true)
  }
  else{
   seterror(true)
   setsuccess(false)
    setbtn_status(false)
  }
})
.catch((err)=>{
  console.log("Nickname error",err)
})
  }
  else{
    setbtn_status(false)
  }
}


//  ------------------------------------------ADD COURSE-------------------------------------------------
const[newcourse,setNewcourse]=useState("")
const addcourse = () => {
  setloading(true)
  const formdata = new FormData();
  formdata.append('course_name', newcourse);
  formdata.append('first_name', firstname);
  formdata.append('last_name', lastname);
  formdata.append('nickname', nickname);
  formdata.append('email', email);

  axios.post(`${ipaddress}/UserRegistrationAPIView/`, formdata)
    .then((r) => {
      setloading(false)
      console.log("Course Added Successfully")
     alert("Request Successfully sent to Admin for this Course !!!")
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    })
    .catch((error) => {
      console.error("Error adding course:", error);
    });
};
  return (
    <div className={`bg-light pt-3 ${value ? 'd-block' : 'd-none'}`} style={{height:'100vh'}}>
     <div className='container animate__animated animate__fadeIn'>
      <div>
        <First_navabr/>
      </div>
      <div className='text-center mt-4'>
        <img src={require('../img/images_icons/2c35e26927acc836b92bc5c724acb417.jpg')} className='rounded-circle' width={150} height={150} alt="" />
        <h4 className='fw-medium mt-4 pb-2' style={{fontSize:'32px',lineHeight:'normal',letterSpacing:'0.64px'}}>Hello {firstname}! You are about to set up</h4>
      </div>
      <div className='mt-4 d-flex justify-content-center'>
        <form action="" className='row m-0 w-75' onSubmit={senduserdata}>
        <div class="mb-3 col-lg-6">
  <label for="formGroupExampleInput1" class="form-label text-secondary d-flex align-items-center" ><span className='me-2'>{translate_value.signup_page.first_name}</span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FF845D" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
</svg></label>
  <input type="text" class="form-control py-3" id="formGroupExampleInput1" placeholder='Enter your Firstname' value={firstname} onChange={(e)=>{
    setFirstname(e.target.value)
  }}/>
</div>
<div class="mb-3 col-lg-6">
<label for="formGroupExampleInput1" class="form-label text-secondary d-flex align-items-center" ><span className='me-2'>{translate_value.signup_page.last_name}</span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FF845D" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
</svg></label>
  <input type="text" class="form-control py-3" id="formGroupExampleInput1" placeholder='Enter your Lastname' value={lastname} onChange={(e)=>{
    setlastname(e.target.value)
  }}/>
</div>

<div className="col-lg-6 mb-3">
<label for="formGroupExampleInput1" class="form-label text-secondary d-flex align-items-center" ><span className='me-2'>{translate_value.signup_page.nick_name}</span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FF845D" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
</svg></label>
<div class="input-group rounded border">
  <input type="text" class="form-control border-0 py-3 bg-transparent" id="formGroupExampleInput1" placeholder='Enter your Nickname' maxLength={9} onChange={(e)=>{
    if(e.target.value.length>0){
      setbtn_status(true)
    }
   setTimeout(()=>{
    setnickname(e.target.value)
    verifyNickname(e.target.value)
   },1000)
  }}/>
  <span id='span' className={`input-group-text bg-transparent border-0 ${nickname.length>0 ? '':'d-none'}`}>
    {loading1 ? (  <div class="spinner-border text-info spinner-border-sm" role="status">
  <span class="visually-hidden">Loading...</span>
</div>):(
  <span className='ms-2' style={{fontSize:'13px'}}><span className={`${success ? '':'d-none'}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check2-circle" viewBox="0 0 16 16">
  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
</svg></span>
  </span>
)}
</span>
</div>
<span className={`${error ? '':'d-none'}`} style={{fontSize:'13px',color:'#ff845d'}}>Nickname already exist</span>
</div>
{/* <div class="mb-3 col-lg-6">
<label for="formGroupExampleInput1" class="form-label text-secondary d-flex align-items-center" ><span className='me-2'>{translate_value.signup_page.nick_name}</span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FF845D" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
</svg></label>
  <input type="text" class="form-control py-3" id="formGroupExampleInput1" placeholder='Enter your Nickname' maxLength={6} onChange={(e)=>{
    if(e.target.value.length>0){
      setbtn_status(true)
    }
   setTimeout(()=>{
    setnickname(e.target.value)
    verifyNickname(e.target.value)
   },1000)
  }}/>
  <span id='span' className={`${nickname.length>0 ? '':'d-none'}`}>
    {loading1 ? (  <div class="spinner-border text-info mt-2 spinner-border-sm" role="status">
  <span class="visually-hidden">Loading...</span>
</div>):(
  <span className='ms-2' style={{fontSize:'13px'}}>{val}</span>
)}
  </span>
</div> */}
<div class="mb-3 col-lg-6 ">
  <label for="formGroupExampleInput1" class="form-label text-secondary" >{translate_value.signup_page.enter_your_course}</label>
  <select required type="text" class="form-control py-3" id="formGroupExampleInput1" onChange={(e)=>{
    setcoursename(e.target.value)
  }}>
    <option value="">Select the Course</option>
    {courses && (
      courses.map((x,index)=>{
                        return(
                        <option key={index} value={x.pid}>{x.program_name}</option>
                      )})
    )}
  </select>
</div>
<div className='text-end'>
  <a href="" className='text-decoration-none fw-medium' style={{color:'#FF845D'}} data-bs-toggle="modal" data-bs-target="#addcoursemodal">Didn't find the course</a>
</div>
<div class="mb-3 col-12 text-center mt-3">
<button className='text-white fw-medium btn py-2' disabled={!btn_status} type='submit' style={{backgroundColor:'#585FE3'}}>{loading ? 'Registering...' : 'Continue to select Modules'}</button>
</div>
</form>
</div>
</div>

{/* --------------------------------------------ADD COURSE--------------------------------------------------------- */}
<div class="modal fade" id="addcoursemodal" tabindex="-1" aria-labelledby="addcoursemodalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-body px-2  px-lg-5 py-5 mb-4 mt-2">
        <div className='d-flex flex-column align-items-center'>
          <h3 className='pb-4'>{translate_value.signup_page.add_course}</h3>
          <input type="text" name="" id="" className='form-control py-2' onChange={(e)=>{
            setNewcourse(e.target.value)
          }}/>
        </div>
        <div className='mt-4'>
            <button className='btn text-white w-100' style={{backgroundColor:'#5D5FE3'}} data-bs-dismiss="modal" onClick={addcourse}>{translate_value.login_page.submit}</button>
          </div>
      </div>
    </div>
  </div>
</div>

{/* TOAST MESSAGE */}
<div class="toast-container position-fixed bottom-0 end-0 p-3">
  <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    
    <div class="toast-body d-flex justify-content-between">
      <span id='toastbody'></span> 
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
</div>
</div>

  )
}
export default Adddetails
