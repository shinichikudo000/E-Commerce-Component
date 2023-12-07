import React, { useContext } from 'react'
import { Context } from './App.tsx';

const Cart = () => {
    const context = useContext(Context)
    if (!context) {
        return null;
    }
    
    const { dispatch, cartMeal } = context

  return (
    <>
        {cartMeal.map((meal) => (
            <li key={meal.name}>
                <div className="plate">
                    <img src={`../public/images/${meal.image}`} alt={meal.name} className="plate" />
                    <div className="quantity">{meal.count}</div>
                    </div>
                    <div className="content">
                    <p className="menu-item">{meal.name}</p>
                    <p className="price">{`$${meal.price}`}</p>
                </div>
                <div className="quantity__wrapper">
                    <button className="decrease" onClick={() => dispatch({type: 'Decrease', meal: meal})}>
                      <img src="../public/images/chevron.svg" />
                    </button>
                    <div className="quantity">{meal.count}</div>
                    <button className="increase" onClick={() => dispatch({type: 'Increase', meal: meal})}>
                      <img src="../public/images/chevron.svg" />
                    </button>
                  </div>
                  <div className="subtotal">{`$${(meal.count * meal.price).toFixed(2)}`}</div>
            </li>
        ))}
    </>
  )
}

export default Cart