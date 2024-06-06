import React from 'react'
import { useContext } from 'react';
import { Context } from '../context/Context_provider';
import data from '../pages/translate';
import { useNavigate } from 'react-router-dom';

const First_navabr = () => {
    let {translate_value, settranslate_value,lang, setLang}=useContext(Context)

    const navigate=useNavigate()

    const translate = (x) => {
        if (x === "ge") {
            settranslate_value(data.ge);
            setLang("ge");
        } else {
            settranslate_value(data.en);
            setLang("en");
        }
    };
  return (
    <div>
        <div className='container bg-light d-flex justify-content-between pt-3 pb-3'>
            <img style={{cursor:'pointer'}} onClick={()=>{
              navigate('/')
            }} src={require('../img/images_icons/LEARNENHUB.png')} id='signup-navbar-logo' alt="" />
            <p className='m-0'>
            <span className={`${lang==="en" ? 'text-decoration-underline fw-bold':''}`} style={{color:lang==="en" ? '#2C2C2C':'#B6BBBC',cursor:'pointer'}} onClick={()=>{
                    translate("en")
                  }}>EN</span>
                  <span className={`${lang==="ge" ? 'text-decoration-underline fw-bold':''} ms-3`} style={{color:lang==="ge" ? '#2C2C2C':'#B6BBBC',cursor:'pointer'}} onClick={()=>{
                    translate("ge")
                  }}>DE</span>
            </p>
        </div>
    </div>
  )
}

export default First_navabr