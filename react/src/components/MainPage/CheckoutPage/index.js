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

    const quantityTimesPrice = (qty, price) => {
        return qty * price
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

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
                            removeItemAll(orderItem.id, orderItem.character, orderItem.category)
                        }}>Remove</div>
                    </div>
                </td>
                <td className="checkout_product_price">£{orderItem.price}</td>
                <td className="checkout_product_quantity">
                    <div className="checkout_quantity_container">
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
                </td>
                <td className="checkout_product_total">£{quantity_x_price}</td>
            </tr>
        )
    })

    useEffect(addTotals, [orderArray])
    useEffect(() => {
        setTotal(subtotal + deliveryFee)
    }, [subtotal])

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
                        <a className="pay_now_button">
                            Pay Now
                        </a>
                    </div>
                </div>
            </div> }
        </>
    )
}

export default CheckoutPage