import React from 'react'
import Category_item from '../items/Category_item'

function Categories_section({categories}:any) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3">
           
          {categories && categories.map((category:any) => (
            <Category_item key={category.id} category={category} />
          ))}
          
        </div>
    )
}

export default Categories_section