import React, { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Calender() {

    const [bidEnd,setBidEnd] = useState(new Date())

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  return (
    <>
    <div >
        <Calendar
          onChange={setBidEnd}
          value={bidEnd}
          selectRange={true}
        />
    </div>
    {bidEnd.length > 0 ? (
        <p className='text-center'>
          <span className='bold'>Start:</span>
          {bidEnd[0].toDateString()}
          &nbsp;|&nbsp;
          <span className='bold'>End:</span> {bidEnd[1].toDateString()}
        </p>
      ) : (
        <p className='text-center'>
          <span className='bold'>Default selected date:</span>{' '}
          {bidEnd.toDateString()}
        </p>
      )}
    
    </>
  )
}
