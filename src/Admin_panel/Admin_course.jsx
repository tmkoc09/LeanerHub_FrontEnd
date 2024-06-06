import React, { useEffect, useState } from 'react'
import Admin_sidebar from './Admin_sidebar'
import Admin_navbar from './Admin_navbar'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { ipaddress } from '../App'
import * as XLSX from 'xlsx';

const Admin_course = () => {
const navigate=useNavigate()

const[state,setstate]=useState("module")

  const[course_details,setcourse_details]=useState([])
  const[group_details,setgroup_details]=useState([])
  const[public_group_details,setpublic_group_details]=useState([])

  const {university_id}=useParams()

  useEffect(()=>{
    fetchmodules()
  },[])

  const fetchmodules=()=>{
    axios.get(`${ipaddress}/admin_app/api/CoursesUnderUniversity/${university_id}/`)
    .then((r)=>{
        console.log("Courses data",r.data)
        setcourse_details(r.data)
    })
    .catch((err)=>{
        console.log("Courses fetching error",err)
    })
  }

  const fetchgroup=(value)=>{
    axios.get(`${ipaddress}/admin_app/GroupsUnderUniversity/${university_id}/${value}/`)
    .then((r)=>{
        console.log("Group data",r.data)
        setgroup_details(r.data)
    })
    .catch((err)=>{
        console.log("Group fetching error",err)
    })
  }

  const fetchpublicgroup=(value)=>{
    axios.get(`${ipaddress}/admin_app/GroupsUnderUniversity/${university_id}/${value}/`)
    .then((r)=>{
        console.log("Public Group data",r.data)
        setpublic_group_details(r.data)
    })
    .catch((err)=>{
        console.log("Group fetching error",err)
    })
  }


  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(course_details);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'Course_details.xlsx');
  };

  const exportToExcel2 = () => {
    const worksheet = XLSX.utils.json_to_sheet(group_details);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'Private_group_details.xlsx');
  };

  const exportToExcel3 = () => {
    const worksheet = XLSX.utils.json_to_sheet(public_group_details);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'Public_group_details.xlsx');
  };

  return (
    <div>
        <Admin_navbar/>

        <div className='d-flex'>
            <Admin_sidebar state={"course"}/>
            <div className='bg-light w-100 px-3'>

              <div className='d-flex justify-content-evenly bg-white py-3 shadow-sm rounded mt-3'>
                <span onClick={()=>{
                  setstate('module')
                }} className='' style={{fontSize:'16px',color:state==='module' ? '#5d5fe3':'gray',cursor:'pointer',fontWeight:state==='module' ? 600:400,textDecoration:state==='module' ? 'underline':'none'}}>Modules</span>
                <span onClick={()=>{
                  setstate('public')
                  fetchpublicgroup('public')
                }} className='' style={{fontSize:'16px',color:state==='public' ? '#5d5fe3':'gray',cursor:'pointer',fontWeight:state==='public' ? 600:400,textDecoration:state==='public' ? 'underline':'none'}}>Public Groups</span>
                <span onClick={()=>{
                  setstate('private')
                  fetchgroup('private')
                }} className='' style={{fontSize:'16px',color:state==='private' ? '#5d5fe3':'gray',cursor:'pointer',fontWeight:state==='private' ? 600:400,textDecoration:state==='private' ? 'underline':'none'}}>Private Groups</span>
              </div>

{/* Modules */}
<div className={`${state==='module' ? '':'d-none'}`}>
<div className='d-flex justify-content-between align-items-center py-3'>
            <h6 className='m-0 d-flex align-items-center'><span style={{cursor:'pointer'}} onClick={()=>{
          navigate('/university_details')
        }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
      </svg></span><span className='ms-2'>Course Details</span></h6>
              <button className={`btn btn-sm text-white ${course_details.length>0 ? '':'d-none'}`} style={{backgroundColor:'#5d5fe3'}} onClick={exportToExcel}>
                Export to Excel
              </button>
            </div>

<h6 className={`text-secondary text-center py-3 ${course_details.length>0 ? 'd-none':''}`}>No records available...</h6>
  <div class={`table-responsive ${course_details.length>0 ? '':'d-none'}`}>
  {/* <div className='d-flex justify-content-between align-items-center pb-2'>
    <h6 className='text-primary'>All B2B Leads</h6>
    <div>
    <div class="input-group mb-3 rounded bg-light border">
  <span class="input-group-text bg-transparent border-0" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 19 18" fill="none">
  <path d="M17.297 17.9936L10.7745 11.4712C10.2537 11.9145 9.65471 12.2577 8.97763 12.5008C8.30055 12.7439 7.62012 12.8654 6.93635 12.8654C5.26795 12.8654 3.85593 12.2879 2.70029 11.1329C1.54463 9.97784 0.966797 8.56658 0.966797 6.89908C0.966797 5.23158 1.54431 3.81924 2.69932 2.66205C3.85434 1.50486 5.2656 0.92627 6.9331 0.92627C8.60061 0.92627 10.013 1.50409 11.1701 2.65973C12.3273 3.81538 12.9059 5.22741 12.9059 6.89583C12.9059 7.61965 12.7777 8.3201 12.5213 8.99718C12.2649 9.67427 11.9284 10.2532 11.5117 10.734L18.0341 17.2564L17.297 17.9936ZM6.93635 11.8237C8.31857 11.8237 9.48544 11.348 10.437 10.3964C11.3885 9.4449 11.8642 8.27803 11.8642 6.89583C11.8642 5.51362 11.3885 4.34676 10.437 3.39523C9.48544 2.4437 8.31857 1.96794 6.93635 1.96794C5.55415 1.96794 4.38728 2.4437 3.43575 3.39523C2.48424 4.34676 2.00849 5.51362 2.00849 6.89583C2.00849 8.27803 2.48424 9.4449 3.43575 10.3964C4.38728 11.348 5.55415 11.8237 6.93635 11.8237Z" fill="#8E9696"/>
</svg></span>
  <input type="text" onChange={(e)=>{
    // search_all_leads(e.target.value)
  }} class="form-control bg-transparent border-0 ps-0 shadow-none" placeholder="Search here..." aria-label="Username" aria-describedby="basic-addon1"/>
</div>
    </div>
    </div> */}
      <div class={`table-responsive mt-3 rounded`}>
        <table class="table">
  <thead>
    <tr>
      <th scope="col" className='fw-medium text-secondary'>SI.No</th>
      <th scope="col" className='fw-medium text-secondary'>Course Name</th>
      <th scope="col" className='fw-medium text-secondary'>University Name</th>
      <th scope="col" className='fw-medium text-secondary'>Document Count</th>
      <th scope="col" className='fw-medium text-secondary'>Flashset Count</th>
    </tr>
  </thead>
  <tbody>
    {course_details.map((x,index)=>{
        return(
            <>
              <tr style={{cursor:'pointer'}} onClick={()=>{
                navigate(`/admin_documents/${x.course_id}`)
              }}>
      <th scope="row">{index+1}</th>
      <td>{x.course_name}</td>
      <td>{x.university_name.university_name}</td>
      <td>{x.document_count}</td>
      <td>{x.flashset_count}</td>
    </tr>
            </>
        )
    })}
  </tbody>
</table>
</div>
        
</div>

</div>

{/* Private Group */}
<div className={`${state==='private' ? '':'d-none'}`}>
<div className='d-flex justify-content-between align-items-center py-3'>
            <h6 className='m-0 d-flex align-items-center'><span style={{cursor:'pointer'}} onClick={()=>{
          navigate('/university_details')
        }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
      </svg></span><span className='ms-2'>Private Groups</span></h6>
              <button className={`btn btn-sm text-white ${group_details.length>0 ? '':'d-none'}`} style={{backgroundColor:'#5d5fe3'}} onClick={exportToExcel2}>
                Export to Excel
              </button>
            </div>

<h6 className={`text-secondary text-center py-3 ${group_details.length>0 ? 'd-none':''}`}>No records available...</h6>
  <div class={`table-responsive ${group_details.length>0 ? '':'d-none'}`}>
  {/* <div className='d-flex justify-content-between align-items-center pb-2'>
    <h6 className='text-primary'>All B2B Leads</h6>
    <div>
    <div class="input-group mb-3 rounded bg-light border">
  <span class="input-group-text bg-transparent border-0" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 19 18" fill="none">
  <path d="M17.297 17.9936L10.7745 11.4712C10.2537 11.9145 9.65471 12.2577 8.97763 12.5008C8.30055 12.7439 7.62012 12.8654 6.93635 12.8654C5.26795 12.8654 3.85593 12.2879 2.70029 11.1329C1.54463 9.97784 0.966797 8.56658 0.966797 6.89908C0.966797 5.23158 1.54431 3.81924 2.69932 2.66205C3.85434 1.50486 5.2656 0.92627 6.9331 0.92627C8.60061 0.92627 10.013 1.50409 11.1701 2.65973C12.3273 3.81538 12.9059 5.22741 12.9059 6.89583C12.9059 7.61965 12.7777 8.3201 12.5213 8.99718C12.2649 9.67427 11.9284 10.2532 11.5117 10.734L18.0341 17.2564L17.297 17.9936ZM6.93635 11.8237C8.31857 11.8237 9.48544 11.348 10.437 10.3964C11.3885 9.4449 11.8642 8.27803 11.8642 6.89583C11.8642 5.51362 11.3885 4.34676 10.437 3.39523C9.48544 2.4437 8.31857 1.96794 6.93635 1.96794C5.55415 1.96794 4.38728 2.4437 3.43575 3.39523C2.48424 4.34676 2.00849 5.51362 2.00849 6.89583C2.00849 8.27803 2.48424 9.4449 3.43575 10.3964C4.38728 11.348 5.55415 11.8237 6.93635 11.8237Z" fill="#8E9696"/>
</svg></span>
  <input type="text" onChange={(e)=>{
    // search_all_leads(e.target.value)
  }} class="form-control bg-transparent border-0 ps-0 shadow-none" placeholder="Search here..." aria-label="Username" aria-describedby="basic-addon1"/>
</div>
    </div>
    </div> */}
      <div class={`table-responsive mt-3 rounded`}>
        <table class="table">
  <thead>
    <tr>
      <th scope="col" className='fw-medium text-secondary'>SI.No</th>
      <th scope="col" className='fw-medium text-secondary'>Group Id</th>
      <th scope="col" className='fw-medium text-secondary'>Group Name</th>
      <th scope="col" className='fw-medium text-secondary'>Created on</th>
      <th scope="col" className='fw-medium text-secondary'>Created by</th>
      <th scope="col" className='fw-medium text-secondary'>Category</th>
      <th scope="col" className='fw-medium text-secondary'>Description</th>
      <th scope="col" className='fw-medium text-secondary'>Member Count</th>
      <th scope="col" className='fw-medium text-secondary'>Flashset Count</th>
    </tr>
  </thead>
  <tbody>
    {group_details.map((x,index)=>{
        return(
            <>
              <tr>
      <th scope="row">{index+1}</th>
      <td>{x.group_id}</td>
      <td>{x.group_name}</td>
      <td>{x.created_at!=undefined && x.created_at.slice(0,10)}</td>
      <td>{x.user_details}</td>
      <td>{x.category}</td>
      <td>{x.description}</td>
      <td>{x.member_count}</td>
      <td>{x.flashset_count}</td>
    </tr>
            </>
        )
    })}
  </tbody>
</table>
</div>
        
</div>

</div>

{/* Public Group */}
<div className={`${state==='public' ? '':'d-none'}`}>
<div className='d-flex justify-content-between align-items-center py-3'>
            <h6 className='m-0 d-flex align-items-center'><span style={{cursor:'pointer'}} onClick={()=>{
          navigate('/university_details')
        }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
      </svg></span><span className='ms-2'>Public Groups</span></h6>
              <button className={`btn btn-sm text-white ${public_group_details.length>0 ? '':'d-none'}`} style={{backgroundColor:'#5d5fe3'}} onClick={exportToExcel3}>
                Export to Excel
              </button>
            </div>

<h6 className={`text-secondary text-center py-3 ${public_group_details.length>0 ? 'd-none':''}`}>No records available...</h6>
  <div class={`table-responsive ${public_group_details.length>0 ? '':'d-none'}`}>
  {/* <div className='d-flex justify-content-between align-items-center pb-2'>
    <h6 className='text-primary'>All B2B Leads</h6>
    <div>
    <div class="input-group mb-3 rounded bg-light border">
  <span class="input-group-text bg-transparent border-0" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 19 18" fill="none">
  <path d="M17.297 17.9936L10.7745 11.4712C10.2537 11.9145 9.65471 12.2577 8.97763 12.5008C8.30055 12.7439 7.62012 12.8654 6.93635 12.8654C5.26795 12.8654 3.85593 12.2879 2.70029 11.1329C1.54463 9.97784 0.966797 8.56658 0.966797 6.89908C0.966797 5.23158 1.54431 3.81924 2.69932 2.66205C3.85434 1.50486 5.2656 0.92627 6.9331 0.92627C8.60061 0.92627 10.013 1.50409 11.1701 2.65973C12.3273 3.81538 12.9059 5.22741 12.9059 6.89583C12.9059 7.61965 12.7777 8.3201 12.5213 8.99718C12.2649 9.67427 11.9284 10.2532 11.5117 10.734L18.0341 17.2564L17.297 17.9936ZM6.93635 11.8237C8.31857 11.8237 9.48544 11.348 10.437 10.3964C11.3885 9.4449 11.8642 8.27803 11.8642 6.89583C11.8642 5.51362 11.3885 4.34676 10.437 3.39523C9.48544 2.4437 8.31857 1.96794 6.93635 1.96794C5.55415 1.96794 4.38728 2.4437 3.43575 3.39523C2.48424 4.34676 2.00849 5.51362 2.00849 6.89583C2.00849 8.27803 2.48424 9.4449 3.43575 10.3964C4.38728 11.348 5.55415 11.8237 6.93635 11.8237Z" fill="#8E9696"/>
</svg></span>
  <input type="text" onChange={(e)=>{
    // search_all_leads(e.target.value)
  }} class="form-control bg-transparent border-0 ps-0 shadow-none" placeholder="Search here..." aria-label="Username" aria-describedby="basic-addon1"/>
</div>
    </div>
    </div> */}
      <div class={`table-responsive mt-3 rounded`}>
      <table class="table">
  <thead>
    <tr>
      <th scope="col" className='fw-medium text-secondary'>SI.No</th>
      <th scope="col" className='fw-medium text-secondary'>Group Id</th>
      <th scope="col" className='fw-medium text-secondary'>Group Name</th>
      <th scope="col" className='fw-medium text-secondary'>Created on</th>
      <th scope="col" className='fw-medium text-secondary'>Created by</th>
      <th scope="col" className='fw-medium text-secondary'>Description</th>
      <th scope="col" className='fw-medium text-secondary'>Member Count</th>
    </tr>
  </thead>
  <tbody>
    {public_group_details.map((x,index)=>{
        return(
            <>
              <tr>
      <th scope="row">{index+1}</th>
      <td>{x.group_id}</td>
      <td>{x.group_name}</td>
      <td>{x.created_at!=undefined && x.created_at.slice(0,10)}</td>
      <td>{x.user_details}</td>
      <td>{x.description}</td>
      <td>{x.member_count}</td>
    </tr>
            </>
        )
    })}
  </tbody>
</table>
</div>
        
</div>

</div>
            </div>
        </div>
    </div>
  )
}

export default Admin_course