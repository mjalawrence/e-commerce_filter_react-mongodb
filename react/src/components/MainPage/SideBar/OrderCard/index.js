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

    const quantityTimesPrice = (qty, price) => {
        return qty * price
    }

    const calculateQuantity = () => {
        let itemTotal = 0
            orderArray.forEach((orderItem, key) => {
                itemTotal += orderItem.qty
                setItemsInTotal(itemTotal)
            })
    }

    const addTotals = () => {
        let itemTotal = 0
        orderArray.forEach((orderItem, key) => {
            itemTotal += (orderItem.price * orderItem.qty)
            setSubtotal(itemTotal)
        })
        setSubtotal(itemTotal)
    }

    function colourBoxDecider(item) {
        if (item.endsWith("black.jpg")) {
            return <div className="order_colour_box_black" />
        } else if (item.endsWith("gray.jpg")) {
            return <div className="order_colour_box_gray" />
        } else if (item.endsWith("white.jpg")) {
            return <div className="order_colour_box_white" />
        }
    }

    let ordersDisplay = orderArray.map((orderItem, key) => {
        const singular_category = (orderItem.category).slice(0, -1)
        const quantity_x_price = quantityTimesPrice(orderItem.qty, orderItem.price)
        return (
            <div className="order_box">
                <div className="order">
                    <div className="remove_item_all" onClick={() => {
                        removeItemAll(orderItem._id, orderItem.character, orderItem.category)
                    }}>X</div>
                    {orderItem.character} {singular_category}
                {colourBoxDecider(orderItem.image)}
                </div>
                <div className="qty_box">
                <div className="price_box">£{quantity_x_price} :</div>
                    <QuantityButtons
                        id={orderItem.id}
                        image={orderItem.image}
                        image_two={orderItem.image}
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

    useEffect(calculateQuantity, [orderArray])
    useEffect(addTotals, [orderArray])

    return (
        <>
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
        </>
    )
}

export default OrderCard;