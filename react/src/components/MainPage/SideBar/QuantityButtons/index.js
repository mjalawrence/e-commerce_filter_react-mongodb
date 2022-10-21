import { useEffect, useState} from "react"
import "./QuantityButtons.scss"

const QuantityButtons = ({ id, character, category, price, orderArray, setOrderArray, addItem }) => {

    const [quantity, setQuantity] = useState (0)

    const removeItem = (id, character, category, price) => {
        let orderArrayClone = [...orderArray]
        let itemOrdered = false
        orderArray.forEach((orderItem, key) => {
            if (orderItem.character === character && orderItem.category === category) {
                itemOrdered = key
            }
        })
        if (itemOrdered !== false) {
            orderArrayClone[itemOrdered].qty--
            if(orderArrayClone[itemOrdered].qty < 1) {
                orderArrayClone.splice(itemOrdered, 1)
            }
            setOrderArray(orderArrayClone)
        }
    }

    function findQuantity() {
        let itemInOrder = false
        orderArray.forEach(orderItem => {
            if (orderItem.character === character && orderItem.category === category) {
                itemInOrder = true
                setQuantity(orderItem.qty)
            }
        })
        if (!itemInOrder) {
            setQuantity(0)
        }
    }
    useEffect(findQuantity, [orderArray])

    return (
        <>
            <div className="quantity_buttons">
                <button onClick={() => {
                    addItem(id, character, category, price)
                }}>+</button>
                <div className="qty_digit">{quantity}</div>
                <button onClick={() => {
                    removeItem(id, character, category, price)
                }}>-</button>
            </div>
        </>
    )
}

export default QuantityButtons

