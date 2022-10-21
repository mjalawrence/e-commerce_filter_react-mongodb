import {useEffect, useState} from "react"
import QuantityButtons from "../QuantityButtons"
import "./OrderCard.scss";

const OrderCard = ({ productData, orderArray, setOrderArray, addItem }) => {

    const [subtotal, setSubtotal] = useState(0)
    const [deliveryFee, setDeliveryFee] = useState(0)
    const [total, setTotal] = useState(0)

    function quantityTimesPrice (qty, price) {
        return qty * price
    }

    // const addTotals = () => {
    //
    //     let itemTotal = 0
    //
    //     orderArray.forEach(orderItem => {
    //         itemTotal += (orderItem.price * orderItem.qty)
    //         setSubtotal(itemTotal)
    //     })
    //     if (itemTotal === 0) {
    //         setDeliveryFee(0)
    //         setServiceFee(0)
    //
    //     } else {
    //         setDeliveryFee(0.99)
    //         setServiceFee(1.50)
    //     }
    //     setSubtotal(itemTotal)
    // }

    let ordersDisplay = orderArray.map(orderItem => {
        const singular_category = (orderItem.category).slice(0, -1)
        const quantity_x_price = quantityTimesPrice(orderItem.qty, orderItem.price)
        return (
            <div className="order_box">
                <div className="order">{orderItem.character} {singular_category}</div>
                <div className="qty_box">
                <div className="price_box">£{quantity_x_price} :</div>
                    <QuantityButtons
                        id={orderItem._id}
                        character={orderItem.character}
                        category={orderItem.category}
                        price={orderItem.price}
                        orderArray={orderArray}
                        setOrderArray={setOrderArray}
                        addItem={addItem}
                    />
                </div>
            </div>
        )
    })

    return (
        <>
            <div className="cart_box">
                <div className="cart_title">
                    Cart
                </div>
                <div className="orders">
                    {orderArray.length ? ordersDisplay : "Currently Empty"}
                </div>
                <div className="cart_title">
                </div>
            </div>
        </>
    )
}


export default OrderCard;

// const myObj = [
//     {category:"Aprons", character:"Fred", price:"24"},
//     {category:"Mugs", character:"Dolores", price:"36"},
//     {category:"Baseball Hats", character:"Rex", price:"15"},
//     {category:"Aprons", character:"Fred", price:"24"},
//     {category:"Mugs", character:"Dolores", price:"36"},
//     {category:"Baseball Hats", character:"Rex", price:"15"}
// ]
//
// let ordersTest = myObj.map(orderItem => {
//     return (
//         <div>
//             <p>{orderItem.character} X {orderItem.category}</p>
//         </div>
//     )
// })