import React from "react";
import "animate.css";
import Loginpage from "./Loginpage";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect,useContext } from "react";
import axios from "axios";
import Adddetails from "./Adddetails";
import { ipaddress } from "../App";
import { Context } from "../context/Context_provider";
import First_navabr from "../components/First_navabr";
import { toast } from "react-toastify";

const Signuppage = () => {
  const navigate = useNavigate();

  const {translate_value}=useContext(Context)

  const[loading,setloading]=useState()

  const[otpvalidationform,setotpvalidationform]=useState(false)
  const[isChecked,setisChecked]=useState(false)
  const[validatedform,setvalidatedform]=useState(false)
  const[passwordtype,setPasswordtype]=useState("password")
  const[passwordtype2,setPasswordtype2]=useState("password")

  const [formData, setFormData] = useState({
    phone_number: "",
    phone_number_extension: "",
    email: "",
    password: "",
    nickname: "",
    title: "",
    first_name: "",
    last_name: "",
  });

  const handleChange = (e) => {
    setFormData(prevData => {
      const updatedData = { ...prevData, [e.target.name]: e.target.value };
      

      if (updatedData.phone_number_extension.length!=10) {
        document.getElementById('alternate_phone').style.color="red"
        document.getElementById('alternate_phone').textContent = "*Phone Number Must be 10 Characters Only";
      } else{
        document.getElementById('alternate_phone').textContent = "";
      }
      if (updatedData.phone_number.length!=10) {
        document.getElementById('phone').style.color="red"
        document.getElementById('phone').textContent = "*Phone Number Must be 10 Characters Only";
      } else{
        document.getElementById('phone').textContent = "";
      }
      if (updatedData.nickname.length> 6) {
        document.getElementById('nick').textContent = "*Nickname should not be more than 6 characters";
      } else{
        document.getElementById('nick').textContent = "";
      }
      if(updatedData.password.length>8){
        document.getElementById('pass').style.color="green"
        document.getElementById('pass').innerHTML='<i class="fa-solid fa-circle-check"></i> Good'
       }
       else{
        document.getElementById('pass').style.color="red"
        document.getElementById('pass').innerHTML='<i class="fa-solid fa-circle-xmark"></i> Provide Strong Password'
       }
  
      // console.log(updatedData.password.length + 1);
  
      return updatedData; // Return the updated state
    });
  };

  const initialFormData = {
    phone_number: "",
    phone_number_extension: "",
    email: "",
    password: "",
    nickname: "",
    title: "",
    first_name: "",
    last_name: "",
  };
  const[backendotp,setBackendotp]=useState({})
  const handleSubmit = async (e) => {
    e.preventDefault();
    let emaildata={"email" : formData.email}
    try {
      const response = await axios.post(
        `${ipaddress}/userverification/`,
        emaildata
      );
      // console.log("OTP",response.data)
      if(response.data==='This email is already registered with other account'){
        const toastLiveExample = document.getElementById('liveToast2')
        document.getElementById('toastbody2').style.color="red"
        document.getElementById('toastbody2').textContent="This email is already registered !!!"
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastBootstrap.show()
      }
      else{
        setBackendotp(response.data)
      }
    } catch (error) {
      console.error("Error generating OTP");
    }
  };


  const[countries,setCountries]=useState([])
  const[cities,setCities]=useState([])
  const [showOptions, setShowOptions] = useState(false);
  const [showcity, setShowcity] = useState(false);
  const[filteredCountries,setFilteredCountries]=useState([])
  const[filteredcities,setFilteredcities]=useState([])
  const[domains,setdomains]=useState([])

  useEffect(()=>{
  // console.log("otp fetched : ",backendotp)
  axios.get(`${ipaddress}/DisplayCityAndCountry/`)
  .then((r)=>{
    console.log("Countries and Cities",r.data)
    setCountries(r.data.countries)
    setCities(r.data.cities)
  })
 },[backendotp])

 // To get the university email id domains
 const search_domain=(value)=>{

  // ----------------------------------------------To check the condition for @ and then it will call API------------------------
  const atIndex = value.indexOf('@');
  if (atIndex !== -1 && atIndex < value.length - 1 && value.length>0) {
    const inputAfterAt = value.substring(atIndex + 1);
  axios.get(`${ipaddress}/SendDomains/${inputAfterAt}/`)
 .then((r)=>{
  //  console.log("Domains",r.data)
   setdomains(r.data)
 })
}
else{
  setdomains([])
}
 }
//  -----------------------------------------SEARCH COUNTRY------------------------------------------------------
 const searchCountries=(value)=>{
  setShowOptions(true)
  setcountry(value)
  const filteredData=countries.filter(c=>c.toLowerCase().includes(value.toLowerCase()))
  setFilteredCountries(filteredData)
}

// -----------------------------------------SEARCH CITY-----------------------------------------------------------
const searchCities=(value)=>{
  setShowcity(true)
  setCity(value)
  const filteredData=cities.filter(c=>c.toLowerCase().includes(value.toLowerCase()))
  setFilteredcities(filteredData)
}
  // ----------------------------------------------NEW VALIDATIONS------------------------------------------------------
  const[university,setUniversity]=useState("")
  // const universityData=(e)=>{
  //   setUniversity(e.target.value)
  // }

  const[otp1,setOtp1]=useState("")
const[otp2,setOtp2]=useState("")
const[otp3,setOtp3]=useState("")
const[otp4,setOtp4]=useState("")
const[otp5,setOtp5]=useState("")
const[otp6,setOtp6]=useState("")

// -----------------------------------------------OTP TIMER FUNCTIONALITY---------------------------------------------------
const [timer, setTimer] = useState(30)
const [otpValid, setOTPValid] = useState(true);

useEffect(() => {
  let interval;
  if (otpValid && timer > 0) {
    interval = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);
  } else if (timer === 0) {
    setOTPValid(false);
    setBackendotp({})
    setOtp1("")
    setOtp2("")
    setOtp3("")
    setOtp4("")
    setOtp5("")
    setOtp6("")

  }

  // To Clear interval when timer expires
  return () => clearInterval(interval);
}, [timer]);

const[otpmessage,setotpmessage]=useState("")
  const sendOtp = (e) => {
    e.preventDefault();
    const otp=otp1+otp2+otp3+otp4+otp5+otp6
    // console.log(otp)
    if(otp===backendotp.otp){
      // console.log("Hi")
      setotpmessage("Successfull")
      setotpvalidationform(false)
      setvalidatedform(true)
    }
    else{
     setotpmessage("Failed")
     alert("Invalid OTP !!!")
    }
  };

const[message,setmessage]=useState("")

  const fetchOTP=()=>{
    setloading(true)
    setTimer(120)
    setOTPValid(true)
    const universitymail=new FormData()
    universitymail.append('email',university)
    axios.post(`${ipaddress}/userverification/`,universitymail)
    .then((r)=>{
      console.log(r.data)
      if(r.data==='This email is already registered with other account'){
        toast.warn('This Email is already registered',{
          autoClose:3000,
        })
  setloading(false)
      }
      else{
      console.log("Mail successfully sent",r.data)
      setBackendotp(r.data)
      if(r.data.message!=undefined){
        setmessage(r.data.message)
      }
      setotpvalidationform(true)
      setloading(false)
      }
    })
    .catch(()=>{

    })
  }

  const[password,setPassword]=useState("")
  const[retypepassword,setretypePassword]=useState("")

  // --------------------------------------------SEND EMAIL AND PASSWORD----------------------------------------------
  const[city,setCity]=useState("")
  const[country,setcountry]=useState("")
  const[UserUniversity,setUserUniversity]=useState("")
  const[UserUniversityid,setUserUniversityid]=useState("")
 const[universitystatus,setuniversitystatus]=useState()

 const[fetched_university_details,setfetched_university_details]=useState([])


  const senddata=(e)=>{
    e.preventDefault()

    if(password.length>6){
    const formdata=new FormData()
    formdata.append('email',university)
    formdata.append('password',password)

    const universitydata=new FormData()
    universitydata.append('email',university)
    if(password===retypepassword){
      axios.post(`${ipaddress}/UserRegistrationAPIView/`,formdata)
      .then((r)=>{
        console.log("Email registration",r.data)

        document.getElementById('signupform2').style.display="none"
        document.getElementById('signupform3').style.display="block"
      })
      .catch((err)=>{
        console.log("Error",err)
      })
      axios.post(`${ipaddress}/UserUniversityAddition/`,universitydata)
      .then((r)=>{
        console.log("Email successfullllll",r.data)
        if(r.data==="university is not present"){
          setuniversitystatus(true)
          setCity("")
          setcountry("")
          setUserUniversity("")
          setUserUniversityid(0)
        }
        else{
          setuniversitystatus(false)
          setfetched_university_details(r.data)
          setcountry(r.data[0].country)
          setCity(r.data[0].city)
          // setcountry("Germany")
          setUserUniversity(r.data[0].university_name)
          setUserUniversityid(r.data[0].university_id)
        }
      })
      .catch(()=>{
        // console.log("Email Error")
      })
    }
    else{
      toast.error('Enter the Matching password',{
        autoClose:3000,
      })
    }
  }
  else{
    toast.error('Password must be more than 6 characters',{
      autoClose:3000,
    })
  }
  }

// ---------------------------------- Fetch the university based on the selected city-------------------------------------
const fetchMatcheduniversity=(city_name)=>{
fetched_university_details.map((x)=>{
  if(x.city===city_name){
    setUserUniversity(x.university_name)
    setUserUniversityid(x.university_id)
  }
})
}

// ---------------------------------------------SEND UNIVERSITY DATA AND ID----------------------------------------------
const[value,setvalue]=useState(false)
const senduniversitydata=(e)=>{
  e.preventDefault()
  const formdata=new FormData()
  formdata.append('email',university)
  formdata.append('university_id',UserUniversityid)

  axios.put(`${ipaddress}/UserUniversityAddition/`,formdata)
  .then((r)=>{
    console.log("University ID sent successfully",r.data)
    document.getElementById('signup').style.display='none'
    setvalue(true)
  })
}

// ------------------------------------------------ADD UNIVERSITY------------------------------------------------------
const[universityname,setuniversityname]=useState("")

const adduniversity=(e)=>{
  e.preventDefault()
  const formdata=new FormData()
  formdata.append('email',university)
  formdata.append('university_name',universityname)
  formdata.append('country',country)
  formdata.append('city',city)

  axios.put(`${ipaddress}/UserUniversityAddition/`,formdata)
  .then((r)=>{
    console.log("University added successfully",r.data)
    console.log("New University data",{
      'name':universityname,
      'country':country,
      'city':city,
      'email':university
    })
    toast.success('Request successfully sent to Admin',{
      autoClose:4000,
    })
setTimeout(() => {
  window.location.reload();
}, 2000);
  })
  .catch(()=>{
    console.log("New University data",{
      'name':universityname,
      'country':country,
      'city':city,
      'email':university
    })
  })
}

return (
    <div style={{minHeight:'100vh',position:'relative'}} className="bg-light pb-4">
      <div id="signup" className="">
<div className="container pb-2">
  <First_navabr/>
</div>
<div className="row m-0 h-100 my-4">
  {/* ------------------------------------FORM 1------------------------------------------- */}
  <div id="signupform1" className="col-lg-6 pb-3">
    <div className="d-flex justify-content-center flex-column align-items-center h-100">
    <div id="signup_div1" className='bg-white shadow rounded pt-4 pb-2 px-3 signup-form2 d-flex flex-column align-items-center'>
      <h3 className='text-center mb-4 fw-bold mt-2' style={{fontSize:'32px'}}>{translate_value.signup_page.signup}</h3>
      <div action="" className="w-100">
                <div className="row m-0">
                  <div className="col-12">
                    <div>
                    <label for="formGroupExampleInput" class="form-label signup-labels d-flex align-items-center"><span className="me-2" style={{fontSize:'16px'}}>{translate_value.signup_page.university} {translate_value.login_page.email}</span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FF845D" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
</svg></label>
  <input type="text" class="form-control bg-light py-3 rounded-0" placeholder="Enter your University Email Id" value={university} aria-label="Username" name="university_mailid" onChange={(e)=>{
    setUniversity(e.target.value)
    search_domain(e.target.value)
  }}  aria-describedby="basic-addon1"/>

                    </div>
                    <div className={`${domains.length>0 ? '':'d-none'} bg-light border border-top-0 px-2 py-2`} style={{maxHeight:'160px',overflowY:'scroll'}}>
                    {domains && (
                        domains.map((x)=>{
                          return(
                            <>
                            <p className="m-0 mb-1" style={{fontSize:'14px',cursor:'pointer'}} onClick={()=>{
                              const atIndex = university.indexOf('@');
                              if (atIndex !== -1) {
                                const partBeforeAt = university.substring(0, atIndex + 1);
                                setUniversity(partBeforeAt + x.domain);
                              }
                              setdomains([]);
                            }}>{x.domain}</p>
                            </>
                          )
                        })
                      )}
                    </div>
                    </div>
                </div>
                <div class="p-2  d-flex text-center mt-auto">
                 <input type="checkbox" onClick={()=>{
        setisChecked(true)
      }} checked={isChecked}/>
      <p className="m-0 ms-2 text-secondary" style={{fontSize:'14px'}}><span style={{color:'red'}}>*</span>By Signing Up you <span className="text-decoration-underline fw-medium text-dark"> {translate_value.signup_page.agree}</span></p>
              
      </div>
                <div class="text-center mt-4">
                <button onClick={()=>{
                    toast.warn('Kindly agree to our T&C',{
                      autoClose:2000,
                    })
                  }}
                    className={`btn btn-md py-2 px-2 px-md-5 fw-bold ${isChecked ? 'd-none':''}`} style={{border:'1px solid #5D5FE3',color:'#5D5FE3'}}
                  >
                   {loading ? 'Fetching OTP...': `${translate_value.signup_page.get_otp}`}
                  </button>
                  <button onClick={(e)=>{
                    // e.preventDefault()
                    fetchOTP()
                  }}
                    className={`btn btn-md py-2 px-2 px-md-5 fw-bold ${isChecked ? '':'d-none'}`} style={{border:'1px solid #5D5FE3',color:'#5D5FE3'}}
                  >
                   {loading ? 'Fetching OTP...': `${translate_value.signup_page.get_otp}`}
                  </button>
                </div>
              </div>
              
      <p className='m-0 mt-auto pb-2'>Facing problem signing in. <span style={{color:'#5d5fe3',cursor:'pointer'}} onClick={()=>{
            navigate('/contact_us')
          }} className='fw-medium'>Need Help</span></p>
    </div>
    <div className="d-flex mt-3">

    <p className="login_here" style={{fontSize:'16px'}}>
                {translate_value.signup_page.already_have_account}
                  <Link to='/loginpage'
                    className="ms-1 fw-medium text-decoration-none"
                   style={{color:'#5C60E3'}}
                  >
                    {translate_value.signup_page.please_login_here}
                  </Link>
                </p>
    </div>
    </div>
  </div>

{/* --------------------------------------FORM 2-------------------------------------------- */}
<div id="signupform2" className="col-lg-6 pb-3" style={{display:'none'}}>
    <div className="d-flex justify-content-center flex-column align-items-center">
    <div id="signup_div2" className='bg-white shadow rounded pt-5 pb-3 px-3 signup-form d-flex flex-column align-items-center justify-content-center'>
      <h3 className='text-center mb-4 fw-bold'>{translate_value.signup_page.signup}</h3>
      <form action="" className="p-2 px-4">
                <div className="row">
                  <div className="col-12">
  <label for="formGroupExampleInput" class="form-label signup-labels">{translate_value.signup_page.password1}</label>
  <div class="input-group mb-3 bg-light rounded border py-2">
  <input type={passwordtype} class="form-control border-0 bg-transparent country-input" onChange={(e)=>{
    setPassword(e.target.value)
  }} placeholder="must be atleast 6 characters" aria-label="Username" aria-describedby="basic-addon1"/>
  <span style={{cursor:'pointer'}} onClick={()=>{
    setPasswordtype("text")
  }} class="input-group-text border-0 bg-transparent" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#8E9696" class="bi bi-eye-fill" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
</svg></span>
</div>

                  </div>
                  <div className="col-12">
  <label for="formGroupExampleInput" class="form-label signup-labels">{translate_value.signup_page.password2}</label>
  <div class="input-group mb-3 bg-light rounded border py-2">
  <input type={passwordtype2} class="form-control border-0 bg-transparent country-input" onChange={(e)=>{
    setretypePassword(e.target.value)
  }} aria-label="Username" placeholder={translate_value.signup_page.password_placeholder2} aria-describedby="basic-addon1"/>
  <span style={{cursor:'pointer'}} onClick={()=>{
    setPasswordtype2("text")
  }} class="input-group-text border-0 bg-transparent" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#8E9696" class="bi bi-eye-fill" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
</svg></span>
</div>
                  </div>
                </div>
                <div class="text-center mt-3">
                  <button
                    className="btn signup-btn btn-md py-2 px-2 px-md-5 text-white fw-medium"
                    type="submit" onClick={senddata}
                  >
                    {translate_value.signup_page.next}
                  </button>
                </div>
              </form>
              <div class="p-2 px-4 text-center mt-auto">
              <p className="login_here">
                {translate_value.signup_page.already_have_account}
                  <Link to='/loginpage'
                    className="ms-1 fw-medium text-decoration-none"
                   style={{color:'#5C60E3'}}
                  >
                     {translate_value.signup_page.please_login_here}
                  </Link>
                </p>
              </div>
    </div>
    <div className="d-flex mt-3">
                <input type="checkbox" checked={isChecked}/>
      <p className="m-0 ms-2 text-secondary">By Signing Up you <span className="text-decoration-underline fw-medium text-dark"> {translate_value.signup_page.agree}</span></p>
    </div>
    </div>
  </div>



{/* ----------------------------------------FORM 3---------------------------------------------- */}
<div id="signupform3" className="col-lg-6 pb-3" style={{display:'none'}}>
    <div className="d-flex justify-content-center flex-column align-items-center">
    <div className='bg-white shadow rounded pt-5 pb-3 px-3 signup-form d-flex flex-column align-items-center justify-content-center' 
    onClick={()=>{
      setShowOptions(false)
      setShowcity(false)
    }}>
      <h3 className='text-center mb-4 fw-bold'>{translate_value.signup_page.signup}</h3>

      <div className={`text-end ${message==="University is not present" ? '':'d-none'}`} style={{color:'#5d5fe3'}}>
<span>Kindly Add your University</span>
</div>
      <form action="" className="p-2 px-4">
                <div className="row">
                  <div className="col-12">
  <label for="formGroupExampleInput" class="form-label signup-labels">{translate_value.signup_page.country}</label>
  <div class="input-group bg-light border py-2" >
  <span class="input-group-text border-0 bg-transparent" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
  <path d="M17.2965 17.9936L10.774 11.4712C10.2532 11.9145 9.65423 12.2577 8.97714 12.5008C8.30006 12.7439 7.61963 12.8654 6.93587 12.8654C5.26746 12.8654 3.85544 12.2879 2.6998 11.1329C1.54414 9.97784 0.966309 8.56658 0.966309 6.89908C0.966309 5.23158 1.54382 3.81924 2.69883 2.66205C3.85385 1.50486 5.26511 0.92627 6.93261 0.92627C8.60013 0.92627 10.0125 1.50409 11.1696 2.65973C12.3268 3.81538 12.9054 5.22741 12.9054 6.89583C12.9054 7.61965 12.7772 8.3201 12.5208 8.99718C12.2644 9.67427 11.9279 10.2532 11.5112 10.734L18.0337 17.2564L17.2965 17.9936ZM6.93587 11.8237C8.31809 11.8237 9.48495 11.348 10.4365 10.3964C11.388 9.4449 11.8638 8.27803 11.8638 6.89583C11.8638 5.51362 11.388 4.34676 10.4365 3.39523C9.48495 2.4437 8.31809 1.96794 6.93587 1.96794C5.55366 1.96794 4.38679 2.4437 3.43527 3.39523C2.48376 4.34676 2.008 5.51362 2.008 6.89583C2.008 8.27803 2.48376 9.4449 3.43527 10.3964C4.38679 11.348 5.55366 11.8237 6.93587 11.8237Z" fill="black"/>
</svg></span>
  <input type="text" value={country} onChange={(e)=>{
    if(e.target.value !=null){
    searchCountries(e.target.value)
    }
  }} class="form-control border-0 bg-transparent country-input" placeholder="Select the City" aria-label="Username" aria-describedby="basic-addon1"/>
</div>
{/* --------------------------------SEARCH BAR FOR COUNTRY----------------------------------- */}
<div className={`px-3 py-2 bg-light border border-top-0 ${showOptions && filteredCountries.length>0 ? '':'d-none'}`} style={{maxHeight:'200px',overflowY:'scroll'}}>
  {fetched_university_details.map((x)=>{
    return(
      <>
       <p onClick={()=>{
        setcountry(x.country)
        setShowOptions(!showOptions)
       }} className="m-0" style={{cursor:'pointer'}}>{x.country}</p>
      </>
    )
  })}
</div>

                  </div>
                  <div className="col-12 mt-3">
  <label for="formGroupExampleInput" class="form-label signup-labels">{translate_value.signup_page.city}</label>
  <div class="input-group bg-light border py-2">
  <span class="input-group-text border-0 bg-transparent" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
  <path d="M17.2965 17.9936L10.774 11.4712C10.2532 11.9145 9.65423 12.2577 8.97714 12.5008C8.30006 12.7439 7.61963 12.8654 6.93587 12.8654C5.26746 12.8654 3.85544 12.2879 2.6998 11.1329C1.54414 9.97784 0.966309 8.56658 0.966309 6.89908C0.966309 5.23158 1.54382 3.81924 2.69883 2.66205C3.85385 1.50486 5.26511 0.92627 6.93261 0.92627C8.60013 0.92627 10.0125 1.50409 11.1696 2.65973C12.3268 3.81538 12.9054 5.22741 12.9054 6.89583C12.9054 7.61965 12.7772 8.3201 12.5208 8.99718C12.2644 9.67427 11.9279 10.2532 11.5112 10.734L18.0337 17.2564L17.2965 17.9936ZM6.93587 11.8237C8.31809 11.8237 9.48495 11.348 10.4365 10.3964C11.388 9.4449 11.8638 8.27803 11.8638 6.89583C11.8638 5.51362 11.388 4.34676 10.4365 3.39523C9.48495 2.4437 8.31809 1.96794 6.93587 1.96794C5.55366 1.96794 4.38679 2.4437 3.43527 3.39523C2.48376 4.34676 2.008 5.51362 2.008 6.89583C2.008 8.27803 2.48376 9.4449 3.43527 10.3964C4.38679 11.348 5.55366 11.8237 6.93587 11.8237Z" fill="black"/>
</svg></span>
  <input type="text" value={city} onChange={(e)=>{
    searchCities(e.target.value)
  }} class="form-control border-0 bg-transparent country-input" placeholder={translate_value.signup_page.city_placeholder} aria-label="Username" aria-describedby="basic-addon1"/>
</div>
{/* --------------------------------SEARCH BAR FOR CITY----------------------------------- */}
<div className={`px-3 py-2 bg-light border border-top-0 ${showcity && cities.length>0 ? '':'d-none'}`} style={{maxHeight:'200px',overflowY:'scroll'}}>
  {fetched_university_details.map((x)=>{
    return(
      <>
       <p onClick={()=>{
        fetchMatcheduniversity(x.city)
        setCity(x.city)

        setShowcity(!showcity)
       }} className="m-0" style={{cursor:'pointer'}}>{x.city}</p>
      </>
    )
  })}
</div>
</div>
                  <div className={`col-12 mt-3 ${message==="University is not present" ? 'd-none':''}`}>
  <label for="formGroupExampleInput" class="form-label signup-labels">{translate_value.signup_page.university}</label>
  <div class="input-group mb-3 bg-light rounded border py-2">
  <span class="input-group-text border-0 bg-transparent" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
  <path d="M17.2965 17.9936L10.774 11.4712C10.2532 11.9145 9.65423 12.2577 8.97714 12.5008C8.30006 12.7439 7.61963 12.8654 6.93587 12.8654C5.26746 12.8654 3.85544 12.2879 2.6998 11.1329C1.54414 9.97784 0.966309 8.56658 0.966309 6.89908C0.966309 5.23158 1.54382 3.81924 2.69883 2.66205C3.85385 1.50486 5.26511 0.92627 6.93261 0.92627C8.60013 0.92627 10.0125 1.50409 11.1696 2.65973C12.3268 3.81538 12.9054 5.22741 12.9054 6.89583C12.9054 7.61965 12.7772 8.3201 12.5208 8.99718C12.2644 9.67427 11.9279 10.2532 11.5112 10.734L18.0337 17.2564L17.2965 17.9936ZM6.93587 11.8237C8.31809 11.8237 9.48495 11.348 10.4365 10.3964C11.388 9.4449 11.8638 8.27803 11.8638 6.89583C11.8638 5.51362 11.388 4.34676 10.4365 3.39523C9.48495 2.4437 8.31809 1.96794 6.93587 1.96794C5.55366 1.96794 4.38679 2.4437 3.43527 3.39523C2.48376 4.34676 2.008 5.51362 2.008 6.89583C2.008 8.27803 2.48376 9.4449 3.43527 10.3964C4.38679 11.348 5.55366 11.8237 6.93587 11.8237Z" fill="black"/>
</svg></span>
  <input type="text" value={UserUniversity} class="form-control border-0 bg-transparent country-input" placeholder={translate_value.signup_page.university_placeholder} aria-label="Username" aria-describedby="basic-addon1"/>
</div>
                  </div>

                  <div className={`text-end ${message==="University is not present" ? 'mt-3':'d-none'}`}>
  <a href="" className='text-decoration-none fw-medium' style={{color:'#FF845D'}} data-bs-toggle="modal" data-bs-target="#adduniversitymodal">Add your University</a>
</div>
                </div>
                <div class="text-center mt-3">
                  <button disabled={message==="University is not present" ? true : false}
                    className="btn signup-btn btn-md py-2 px-2 px-md-5 text-white fw-medium"
                    type="submit" onClick={senduniversitydata}
                  >
                    {translate_value.signup_page.signup}
                  </button>
                </div>
              </form>
              <div class="p-2 px-4 text-center mt-2">
                <p className="login_here">
                {translate_value.signup_page.already_have_account}
                  <Link to='/loginpage'
                    className="ms-1 fw-medium text-decoration-none"
                   style={{color:'#5C60E3'}}
                  >
                    {translate_value.signup_page.please_login_here}
                  </Link>
                </p>
              </div>
    </div>
    <div className="d-flex mt-3">
      <input type="checkbox" checked={isChecked} />
      <p className="m-0 ms-2 text-secondary">By Signing Up you <span className="text-decoration-underline fw-medium text-dark"> {translate_value.signup_page.agree}</span></p>
    </div>
    </div>
  </div>

  
  <div className="col-lg-6 mt-4 mt-lg-0">
    
    <div className='row m-0 mt-5 mt-lg-0' style={{position:'relative'}}>
    <img src={require('../img/images_icons/Group 446.png')} id="signup-img" style={{position:'absolute',top:'-40px'}} alt="" />
   
    </div>
  </div>

</div>


{/* --------------------------------------------Enter and verify OTP Form--------------------------------------------- */}

<div class={`${otpvalidationform ? 'd-flex align-items-center':'d-none'}`} style={{backgroundColor: 'rgb(0, 0, 0,0.6)',width: '100%',top:0,left:0,position:'absolute',zIndex: 6, height: '100%'}}>
<div className="otp-form p-5 mx-auto">
<div className="bg-white rounded shadow w-75 px-2 mx-auto pb-5 animate__animated animate__fadeIn">
        <div className="text-center pt-4">
          <h3 className="mb-5 fw-bold">{translate_value.signup_page.otp_verification}</h3>
          <p>Please enter the 6 digit OTP <br />
          that has been sent to your registered Email Id</p>
        </div>
      <div  className="p-2 px-4">
                <div className="row">
                  <div className="col-sm-12 d-flex justify-content-evenly pb-1">
                    
                    <input type="text" className="form-control otp-input" value={otp1} onChange={(e)=>{
                      setOtp1(e.target.value)
                      if(e.target.value.length==1){
                        document.getElementById('otp2').focus()
                      }
                    }}/>
                    <input type="text" id="otp2" className="form-control otp-input" value={otp2} onChange={(e)=>{
                      setOtp2(e.target.value)
                      if(e.target.value.length==1){
                        document.getElementById('otp3').focus()
                      }
                    }}/>
                    <input type="text" id="otp3" className="form-control otp-input" value={otp3} onChange={(e)=>{
                      setOtp3(e.target.value)
                      if(e.target.value.length==1){
                        document.getElementById('otp4').focus()
                      }
                    }}/>
                    <input type="text" id="otp4" className="form-control otp-input" value={otp4} onChange={(e)=>{
                      setOtp4(e.target.value)
                      if(e.target.value.length==1){
                        document.getElementById('otp5').focus()
                      }
                    }}/>
                    <input type="text" id="otp5" className="form-control otp-input" value={otp5} onChange={(e)=>{
                      setOtp5(e.target.value)
                      if(e.target.value.length==1){
                        document.getElementById('otp6').focus()
                      }
                    }}/>
                    <input type="text" id="otp6" className="form-control otp-input" value={otp6} onChange={(e)=>{
                      setOtp6(e.target.value)
                    }}/>

                  </div>
                  </div>
                <div class="text-center mt-4">
                  <button
                    className="btn signup-btn btn-md py-2 w-100 text-white fw-medium"
                    type="submit" onClick={sendOtp}
                  >
                    {translate_value.signup_page.verify_otp}
                  </button>
                </div>
                <div className="mt-3 text-center">
                  <p style={{fontSize:'14px'}}>OTP will valid only for <span style={{color:'red'}}>{timer} Seconds</span></p>
                </div>
                <div className="d-flex justify-content-evenly mt-4">
                      <button className="btn text-decoration-underline border-0" disabled={otpValid} href="" style={{color:'#5D5FE3'}}  onClick={(e)=>{
                    e.preventDefault()
                    fetchOTP()
                  }}>{translate_value.signup_page.resend_otp}</button>
                      <button className="btn border-0 text-decoration-underline" style={{color:'#5D5FE3'}} onClick={()=>{
                        setOtp1("")
                        setOtp2("")
                        setOtp3("")
                        setOtp4("")
                        setOtp5("")
                        setOtp6("")
                        setotpvalidationform(false)
                      }}>{translate_value.signup_page.change_email}</button>
                    </div>
              </div>

</div>
</div>
</div>


{/* ---------------------------------------------OTP Successfull Message layout----------------------------------------------- */}

<div class={`${validatedform ? 'd-flex align-items-center':'d-none'}`} style={{backgroundColor: 'rgb(0, 0, 0,0.6)',width: '100%',top:0,left:0,position:'absolute',zIndex: 6, height: '100%'}}>
<div className="otp-form p-5 mx-auto">
<div className="bg-white rounded shadow w-75 mx-auto pb-5 animate__animated animate__fadeIn">
<div className="text-end px-2 pt-2">

<button onClick={()=>{
  if(message==="University is not present"){
    document.getElementById('signupform1').style.display='none'
  document.getElementById('signupform3').style.display='block'
    // document.querySelector('.modal-backdrop').remove();
    setvalidatedform(false)
  }
  else{
    document.getElementById('signupform1').style.display='none'
  document.getElementById('signupform2').style.display='block'
    // document.querySelector('.modal-backdrop').remove();
    setvalidatedform(false)
  }
}} className={`bg-transparent border-0 ms-auto`}><i class="fa-solid fa-circle-xmark fs-5"></i></button>
</div>
<div className='d-flex flex-column pb-2 align-items-center justify-content-center mt-3' style={{height:'200px'}}>
<img src={require('../img/images_icons/tick.png')} className=" animate__animated animate__bounceIn" width={70} alt="" />
<p className='m-0 mt-3 fs-2 animate__animated animate__bounceIn' style={{color:'#34a853',fontSize:'32px',lineHeight:'normal',fontWeight:450,letterSpacing:'0.64px'}}>OTP Verification</p>
<p className='m-0 fs-3 animate__animated animate__bounceIn' style={{color:'#34a853',fontSize:'32px',lineHeight:'normal',fontWeight:450,letterSpacing:'0.64px'}}>Successfull</p>
</div>
</div>
</div>
</div>
{/* TOAST MESSAGE */}
<div class="toast-container position-fixed top-0 end-0 p-3">
  <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    
    <div class="toast-body d-flex justify-content-between">
      <span id='toastbody'></span> 
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
</div>

<div class="toast-container position-fixed top-0 end-0 p-3">
  <div id="liveToast2" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    
    <div class="toast-body d-flex justify-content-between align-items-center">
      <span id='toastbody2'></span> 
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
</div>
</div>
{/* --------------------------------------------ADD UNIVERSITY--------------------------------------------------------- */}
<div class="modal fade" id="adduniversitymodal" tabindex="-1" aria-labelledby="addcoursemodalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-body px-2  px-lg-5 py-5 mb-4 mt-2">
        <div className='d-flex flex-column align-items-center'>
          <h3 className='pb-4'>Add University Name</h3>
          <input type="text" name="" id="" className='form-control py-2' onChange={(e)=>{
            setuniversityname(e.target.value)
          }}/>
        </div>
        <div className='mt-4'>
            <button className='btn text-white w-100' data-bs-dismiss="modal" style={{backgroundColor:'#5D5FE3'}} onClick={adduniversity}>Submit</button>
          </div>
      </div>
    </div>
  </div>
</div>

<Adddetails value={value} email={university} university_name={UserUniversity}/>
{/* <button class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Open first modal</button> */}
    </div>
  );
};

export default Signuppage;
