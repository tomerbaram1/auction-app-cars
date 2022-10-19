import React from 'react'
import "./slider.css"
import { useInView } from 'react-intersection-observer';

import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function Slider({imageSrc, title, subtitle, flipped}) {
  
    // const navigate = useNavigate()
    const {user} = useSelector((state) => state.auth)
  
    const navigate = useNavigate()
  
  
  
    useEffect(() => {
      if(!user){
         navigate('/login')
      }
    },[user,navigate])
  


        const { ref, inView} = useInView({
          /* Optional options */
          threshold: 0.4,
        })

    const renderContext = () => {
        if(!flipped){
            return <>
            <img src={imageSrc} alt="car" className='slider-img' />
            <div className='slider-content'>
                <h1 className="slider-title">{title}</h1>
                <p className="slider-subtitle">{subtitle}</p>
            </div>
            </>
        }else{
            return <>
            <div className='slider-content'>
                <h1 className="slider-title">{title}</h1>
                <p className="slider-subtitle">{subtitle}</p>
            </div>
            <img src={imageSrc} alt='car' className='slider-img' />
            </>
        }
    }
  
    return (
    <div className={inView? "slider slider-zoom": "slider"} ref={ref}>{user?renderContext():<></>}</div>
  )
}
