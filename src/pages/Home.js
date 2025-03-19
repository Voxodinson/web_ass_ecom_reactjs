import React from 'react'
import ProductSection from '../components/ProductSection'
import Header from '../components/Header'

const Home = () => {
  return (
    <div>
        <Header />
         <div className='mt' >
            <ProductSection />
         </div>
  

    </div>
  )
}

export default Home