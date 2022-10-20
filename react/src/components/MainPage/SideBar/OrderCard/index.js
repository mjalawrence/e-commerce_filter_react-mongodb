import {useEffect, useState} from "react"
import QuantityButtons from "../QuantityButtons"
import "./OrderCard.scss";

const OrderCard = ({ productData, orderArray, setOrderArray }) => {

    function depluralise (plural_word) {
        return plural_word.slice(0, -1);
    }

    let ordersDisplay = orderArray.map(orderItem => {
        const singular_category = depluralise(orderItem.category)
        return (
            <div className="order_box">
                <div className="order">{orderItem.character} X {singular_category}</div>
                <div className="qty_box">
                <div className="price_box">£{orderItem.price} :</div>
                    <QuantityButtons
                        character={orderItem.character}
                        category={orderItem.category}
                        price={orderItem.price}
                        orderArray={orderArray}
                        setOrderArray={setOrderArray}
                    />
                </div>
            </div>
        )
    })

    // console.log(productData)

    return (
        <>
        <div className="cart_box">
            <div className="cart_title">
                Cart
            </div>
            <div className="orders">
                {ordersDisplay}

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