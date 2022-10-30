import { useEffect, useState} from "react"
import "./QuantityButtons.scss"

const QuantityButtons = ({ id,
                             image,
                             image_two,
                             character,
                             category,
                             price,
                             colour,
                             orderArray,
                             addItem,
                             removeItem }) => {

    const [quantity, setQuantity] = useState (0)
    const [selectedProductImage, setSelectedProductImage] = useState ("")

    function findQuantity() {
        let itemInOrder = false
        orderArray.forEach(orderItem => {
                if (orderItem.image === selectedProductImage && orderItem.id === id) {
                    itemInOrder = true
                    setQuantity(orderItem.qty)
            }
        })
        if (!itemInOrder) {
            setQuantity(0)
        }
    }

    useEffect(findQuantity, [orderArray, selectedProductImage])

    function colourCoordinator() {
        if (colour !== "black") {
            setSelectedProductImage(image_two)
        } else {
            setSelectedProductImage(image)
        }
    }

    useEffect(colourCoordinator, [colour, orderArray])

    return (
        <>
            <div className="quantity_buttons">
                <button onClick={() => {
                    addItem(id, selectedProductImage, character, category, price, colour)
                }}>+</button>
                <div className="qty_digit">{quantity}</div>
                <button onClick={() => {
                    removeItem(id, selectedProductImage, character, category, colour)
                }}>-</button>
            </div>
        </>
    )
}

export default QuantityButtons

