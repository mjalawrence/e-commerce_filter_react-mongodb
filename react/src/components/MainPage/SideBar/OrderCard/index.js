import {useEffect, useState} from "react"
import QuantityButtons from "../QuantityButtons"
import "./OrderCard.scss";

const OrderCard = ({ orderArray,
                       setOrderArray,
                       addItem,
                       removeItem,
                       removeItemAll,
                       setActiveCheckout }) => {

    const [itemsInTotal, setItemsInTotal] = useState(0)
    const [subtotal, setSubtotal] = useState(0)

    //Iterates through orderArray to calculate number of items in total
    const calculateItemQuantity = () => {
        let itemTotal = 0
            orderArray.forEach((orderItem, key) => {
                itemTotal += orderItem.qty
                setItemsInTotal(itemTotal)
            })
    }

    //Iterates through orderArray, create subtotal of item quantity * price
    const addTotals = () => {
        let itemTotal = 0
        orderArray.forEach((orderItem, key) => {
            itemTotal += (orderItem.price * orderItem.qty)
            setSubtotal(itemTotal)
        })
        setSubtotal(itemTotal)
    }

    //Calculates total of individual item based on quantity and price, probably redundant
    const quantityTimesPrice = (qty, price) => {
        return qty * price
    }

    //Decides which colour box to render depending on the colour of orderItem
        //(Assumes only 3 colours: needs to be generalised and dried up)
    function colourBoxDecider(item) {
        if (item.endsWith("black.jpg")) {
            return <div className="order_colour_box_black" />
        } else if (item.endsWith("gray.jpg")) {
            return <div className="order_colour_box_gray" />
        } else if (item.endsWith("white.jpg")) {
            return <div className="order_colour_box_white" />
        }
    }

    //Iterates through orderArray and renders individual orders with name, category, colour, price, and quantity buttons
    let ordersDisplay = orderArray.map((orderItem, key) => {
        const singular_category = (orderItem.category).slice(0, -1)
        const quantity_x_price = quantityTimesPrice(orderItem.qty, orderItem.price)
        return (
            <div className="order_box">
                <div className="order">
                    <div className="remove_item_all" onClick={() => {
                        removeItemAll(orderItem.id, orderItem.image)
                    }}>X</div>
                    {orderItem.character} {singular_category}
                {colourBoxDecider(orderItem.image)}
                </div>
                <div className="qty_box">
                <div className="price_box">£{quantity_x_price} :</div>
                    <QuantityButtons
                        id={orderItem.id}
                        image={orderItem.image}
                        character={orderItem.character}
                        category={orderItem.category}
                        price={orderItem.price}
                        colour={orderItem.colour}
                        orderArray={orderArray}
                        setOrderArray={setOrderArray}
                        addItem={addItem}
                        removeItem={removeItem}
                    />
                </div>
            </div>
        )
    })

    useEffect(calculateItemQuantity, [orderArray])
    useEffect(addTotals, [orderArray])

    //renders mini-cart with subtotal and "proceed to checkout" button
    return (
        <>
            <div className="cart_container">
                <div className="cart_box">
                    <div className="cart_title">
                        {orderArray.length ? "Cart (" + itemsInTotal + " items)" : "Cart"}
                    </div>
                    <div className="orders">
                        {orderArray.length ? ordersDisplay : "Currently Empty"}
                    </div>
                    <div className="subtotal_box">
                        <div className="subtotal">
                            Subtotal:
                        </div>
                        <div className="subtotal">
                            £{subtotal}
                        </div>
                    </div>
                    <div className="checkout_button_container">
                        {orderArray.length ? <a className="checkout_button" onClick={() => {setActiveCheckout(true)}}>
                            Proceed to Checkout
                        </a> : ""}
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderCard;