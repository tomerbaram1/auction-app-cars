import React from 'react'
import ProductData from '../components/ProductData'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {

  const navigate = useNavigate()
  const {user} = useSelector((state) => state.auth)


  useEffect(() => {
    if(!user){
       navigate('/login')
    }
  },[user,navigate])
  return (
    <>
    <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>OurProducts</p>
        </section>
        <ProductData />
    </>
  )
}

export default Dashboard