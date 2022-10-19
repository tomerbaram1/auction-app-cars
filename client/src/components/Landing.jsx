import React from 'react'

export default function Landing({imageSrc}) {
  return (
    <div className='landing'>
        <img src={imageSrc} alt='Car' className='landing-img'/>
        <h1 className="landing-title">Buying Cars Made Simple.</h1>
   </div>
  )
}
