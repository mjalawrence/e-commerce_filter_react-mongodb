import { useEffect, useState} from "react"
import "./QuantityButtons.scss"

const QuantityButtons = ({ id,
                             image,
                             character,
                             category,
                             price,
                             colour,
                             orderArray,
                             addItem,
                             removeItem }) => {

    const [quantity, setQuantity] = useState (0)
    const [selectedProductImage, setSelectedProductImage] = useState ("")

    //Calculates selected quantity of individual items in orderArray
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

    function determineItemColour(url) {
        const colour_jpeg = url.substring(url.lastIndexOf('-') + 1)
        return colour_jpeg.split(".")[0]
    }

    //Selects image according to colour state
    function imageCoordinator() {
        let image_colour = determineItemColour(image)
        if (colour === image_colour) {
            setSelectedProductImage(image)
        }
    }

    useEffect(imageCoordinator, [colour, orderArray])

    //Renders quantity buttons and props item data to add or remove item functions
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

