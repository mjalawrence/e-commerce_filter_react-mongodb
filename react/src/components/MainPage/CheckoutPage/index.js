import {useEffect, useState} from "react";
import QuantityButtons from "../SideBar/QuantityButtons";
import "./CheckoutPage.scss"

const CheckoutPage = ({ orderArray,
                          setOrderArray,
                          setActiveCheckout,
                          addItem,
                          removeItem,
                          removeItemAll }) => {

    const [subtotal, setSubtotal] = useState(0)
    const [deliveryFee, setDeliveryFee] = useState(0)
    const [total, setTotal] = useState(0)

    //Iterates through orderArray, create subtotal of quantity * price, add delivery cost
    const addTotals = () => {
        let itemTotal = 0
        orderArray.forEach(orderItem => {
            itemTotal += (orderItem.price * orderItem.qty)
            setSubtotal(itemTotal)
        })
        setSubtotal(itemTotal)
        if (itemTotal === 0) {
            setDeliveryFee(0)
        } else {
            setDeliveryFee(0.99)
        }
    }

    //Calculates item total based on quantity, probably redundant
    const quantityTimesPrice = (qty, price) => {
        return qty * price
    }

    //Capitalises first letter of a word for final render
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function handleSubmitData(e) {
        let data_body = {
            "user_id" : "mikey boi",
        }
        for (let i = 0; i < orderArray.length; i++) {
            Object.assign(data_body,
                {
                    [`item${i+1}`]: {
                        "item_no": i+1,
                        "product_id": orderArray[i].id,
                        "category": orderArray[i].category,
                        "character": orderArray[i].character,
                        "colour": orderArray[i].colour,
                        "qty": orderArray[i].qty
                    },
                }
            )
        }

        fetch("http://localhost:3001/basket", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data_body)
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }

    //Iterates through orderArray to render individual orders with corresponding QuantityButtons
    let ordersDisplay = orderArray.map(orderItem => {
        const singular_category = (orderItem.category).slice(0, -1)
        const quantity_x_price = quantityTimesPrice(orderItem.qty, orderItem.price)
        return (
            <tr className="table_row">
                <td className="checkout_product_details">
                    <div className="checkout_product_image" style={{backgroundImage: `url("${orderItem.image}")`}}> </div>
                    <div className="checkout_title_container">
                        <p className="checkout_product_name">{orderItem.character} : {singular_category} : {capitalizeFirstLetter(orderItem.colour)}</p>
                        <div className="checkout_remove_button" onClick={() => {
                            removeItemAll(orderItem.id, orderItem.image)
                        }}>Remove</div>
                    </div>
                </td>
                <td className="checkout_product_price">£{orderItem.price}</td>
                <td className="checkout_product_quantity">
                    <div className="checkout_quantity_container">
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
                </td>
                <td className="checkout_product_total">£{quantity_x_price}</td>
            </tr>
        )
    })

    //Triggers final total calculation after orderArray is finalised and sets total state
    useEffect(addTotals, [orderArray])
    useEffect(() => {
        setTotal(subtotal + deliveryFee)
    }, [subtotal])

    //If no orders, renders a return to shop button
    //If orders, renders a table to display order details in relevant columns with calculated totals underneath
        //Also renders a keep shopping and pay now button
    return (
        <>
            {!orderArray.length ?
                <div className="checkout_cart">
                    <h1 className="checkout_title"> Your cart is empty</h1>
                    <div className="return_button_container">
                        <a className="return_to_shop_button" onClick={() => {setActiveCheckout(false)}}>
                            Return to Shop
                        </a>
                    </div>
                </div>
                :
            <div className="checkout_cart">
                <h1 className="checkout_title"> Your Cart</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th className="checkout_head_middle">Price</th>
                            <th className="checkout_head_middle">Quantity</th>
                            <th className="checkout_head_total">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordersDisplay}
                    </tbody>
                </table>
                <div className="checkout_footer">
                    <div className="checkout_total_details">
                        <div className="label_mini_container">
                            <div className="checkout_delivery"> Delivery</div>
                            <div className="checkout_total">Total</div>
                        </div>
                        <div className="totals_mini_container">
                            <div className="checkout_delivery">£{deliveryFee}</div>
                            <div className="checkout_total">£{total}</div>
                        </div>
                    </div>
                    <div className="checkout_buttons_container">
                        <a className="keep_shopping_button" onClick={() => {setActiveCheckout(false)}}>
                            Keep Shopping
                        </a>
                        <a className="pay_now_button" onClick={handleSubmitData}>
                            Submit Order
                        </a>
                    </div>
                </div>
            </div> }
        </>
    )
}

export default CheckoutPage