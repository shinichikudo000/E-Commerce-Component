import './App.css'
import Cart from './Cart.tsx'
import Meal from './Meal.tsx'
import { MenuItems, menuItems } from './app.ts'
import { Dispatch, createContext, useReducer } from 'react'

interface ContextProps {
  cartMeal: MenuItems[]
  dispatch: Dispatch<Action>;
}

interface Action {
  type: 'Add' | 'Remove' | 'Increase' | 'Decrease';
  meal: MenuItems
}

function reducer(cartMeal: MenuItems[], action: Action) {
  const { type } = action

  switch (type) {
    case 'Add': {
      return [...cartMeal, {...action.meal, count: 1}]
    }
    case 'Remove': {
      return cartMeal.filter((meal) => meal.name !== action.meal.name)
    }
    case 'Increase': {
      const mealIndex = cartMeal.findIndex((meal) => meal.name === action.meal.name)
      if (mealIndex !== -1) {
        const updatedCartMeal = [...cartMeal]
        updatedCartMeal[mealIndex] = {...cartMeal[mealIndex], count: cartMeal[mealIndex].count + 1 }
        return updatedCartMeal
      }
      return cartMeal
    }
    case 'Decrease': {
      const mealIndex = cartMeal.findIndex((meal) => meal.name === action.meal.name)
      if (mealIndex !== -1 && cartMeal[mealIndex].count > 1) {
        const updatedCartMeal = [...cartMeal]
        updatedCartMeal[mealIndex] = {...cartMeal[mealIndex], count: cartMeal[mealIndex].count - 1 }
        return updatedCartMeal
      } if (mealIndex !== -1 && cartMeal[mealIndex].count === 1) {
        return cartMeal.filter((meal) => meal.name !== action.meal.name)
      }
      return [...cartMeal]
    }
  }
}
export const Context = createContext({} as ContextProps)

const cart: MenuItems[] = []

function App() {
  const [cartMeal, dispatch] = useReducer(reducer, cart)

  const subTotalAmount = cartMeal.reduce((total, meal) => {
    const mealTotal = meal.price * meal.count;
    return total + mealTotal;
  }, 0)

  const totalTax = subTotalAmount * 0.0975

  const totalAmount = subTotalAmount - totalTax
  return (
    <Context.Provider value={{cartMeal, dispatch}}>
      <div className="wrapper menu">
        <div className="panel">
          <h1 className='header'>To Go Menu</h1>
          <ul className="menu">
            {
              menuItems?.map((menuItem) => {
                return <Meal menuItemProp={menuItem}/>
              })
            }
          </ul>
        </div>

        <div className="panel cart">
          <h1 className='header'>Your Cart</h1>
           <p className="empty">Your cart is empty.</p>

          <ul className="cart-summary">
            {
              <Cart />
            }
          </ul>

          <div className="totals">
            <div className="line-item">
              <div className="label">Subtotal:</div>
              <div className="amount price subtotal">{`$${subTotalAmount.toFixed(2)}`}</div>
            </div>
            <div className="line-item">
              <div className="label">Tax:</div>
              <div className="amount price tax">{`${totalTax.toFixed(2)}`}</div>
            </div>
            <div className="line-item total">
              <div className="label">Total:</div>
              <div className="amount price total">{`${totalAmount.toFixed(2)}`}</div>
            </div>
          </div>
        </div>
      </div>
    </Context.Provider>
  )
}

export default App
