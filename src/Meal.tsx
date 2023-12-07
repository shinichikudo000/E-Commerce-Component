import React, { useContext } from 'react'
import { MenuItems } from './app'
import { Context } from './App.tsx'

const Meal = ({menuItemProp}: {menuItemProp: MenuItems}) => {
    const context = useContext(Context)
    if (!context) {
        return null;
    }
    
    const { dispatch, cartMeal } = context

    const isInTheCart = cartMeal && cartMeal.findIndex((meal) => meal.name === menuItemProp.name) !== -1

  return (
    <> 
        <li>
            <div className="plate">
                <img src={`../public/images/${menuItemProp.image}`} alt={menuItemProp.alt} className="plate" />
            </div>
            <div className="content">
                <p className="menu-item">{menuItemProp.name}</p>
                <p className="price">{`$${menuItemProp.price}`}</p>
                {
                    isInTheCart ? (
                        <button className="in-cart" onClick={() => dispatch({type: 'Remove', meal: menuItemProp})}>
                            <img src="../public/images/check.svg" alt="Check" />
                            In Cart
                        </button>
                    ) : (
                        <button className="add" onClick={() => dispatch({type: 'Add', meal: menuItemProp})}>Add to Cart</button>
                    )
                }
            </div>
        </li>
    </>
  )
}

export default Meal