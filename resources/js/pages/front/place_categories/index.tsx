import BottomHeader from '@/components/front/BottomHeader'
import BottomNavbar from '@/components/front/BottomNavbar'
import Footer from '@/components/front/Footer'
import MiddleHeader from '@/components/front/MiddleHeader'
import TopHeader from '@/components/front/TopHeader'
import Category_item from '@/components/items/Category_item'
import React from 'react'

function index({place,categories}:any) {
  return (
    <div>
      <TopHeader />
      <MiddleHeader place={place?.name} />
      <BottomHeader  />
      
      <div className="container m-auto px-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories && categories.map((category:any) => (
          <Category_item key={category.id} category={category} place={place} />
        ))}
      </div>


      <Footer />
      <BottomNavbar />
    </div>
  )
}

export default index