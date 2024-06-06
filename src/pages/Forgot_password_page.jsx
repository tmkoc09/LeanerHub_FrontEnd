import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Preloader from './Preloader'
import { ipaddress } from '../App'
const Forgot_password_page = () => {

    const {pattern}=useParams()

    const [newpassword,setNewpassword]=useState("")
    const [retypepassword,setRetypepassword]=useState("")
    const[loading,setloading]=useState()

    const resetPassword=()=>{
        setloading(true)
        const formdata=new FormData()
        formdata.append('token',pattern)
        formdata.append('password',newpassword)
console.log(pattern)
        if(newpassword===retypepassword){
    axios.post(`${ipaddress}/PasswordReset/`,formdata)
    .then((r)=>{
        console.log("Successfully Rested",r.data)
        setloading(false)
        setNewpassword("")
        setRetypepassword("")
          const toastLiveExample = document.getElementById('liveToast2')
    document.getElementById('toastbody2').style.color="green"
    document.getElementById('toastbody2').textContent="Password Updated Successfully !!!"
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
toastBootstrap.show()
    })

        }
    }
  return (
   <div>
    {loading ? (<Preloader/>):(
         <div className='bg-light d-flex justify-content-center align-items-center' style={{height:'100vh'}}>
         <div className='w-50 py-5 px-2 px-lg-5'>
        <div className='bg-white shadow rounded p-5'>
        <h5 className='text-center pb-4'>Reset Your Password</h5>
         <div class="mb-3">
    <label for="formGroupExampleInput"  class="form-label">New Password</label>
    <input  type="password" class="form-control py-3 bg-light" onChange={(e)=>{
      setNewpassword(e.target.value)
    }} value={newpassword}/>
  </div>
  <div class="mb-3">
    <label for="formGroupExampleInput2" class="form-label">Retype New Password</label>
    <input type="password" class="form-control py-3 bg-light" onChange={(e)=>{
      setRetypepassword(e.target.value)
    }} value={retypepassword}/>
  </div>
  <div className='mt-4 text-center'>
      <button className='btn btn-primary text-white w-75 py-2 mt-3' onClick={resetPassword}>Reset Password</button>
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
    )}

    {/* ---------------------------------------------TOAST------------------------------------------------------- */}
    <div class="toast-container position-fixed top-0 end-0 p-3">
          <div id="liveToast2" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            
            <div class="toast-body d-flex justify-content-between px-4 py-2">
              <span id='toastbody2'></span> 
              <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
          </div>
        </div>
   </div>
  )
}

export default Forgot_password_page