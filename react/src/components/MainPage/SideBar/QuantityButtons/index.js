import { useEffect, useState} from "react"
import "./QuantityButtons.scss"

const QuantityButtons = ({ id,
                             image,
                             character,
                             category,
                             price,
                             orderArray,
                             setOrderArray,
                             addItem,
                             removeItem }) => {

    const [quantity, setQuantity] = useState (0)

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
                    addItem(id, image, character, category, price)
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

