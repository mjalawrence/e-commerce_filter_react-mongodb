import {useEffect, useState} from "react";
import QuantityButtons from "../../SideBar/QuantityButtons";
import "./ProductModal.scss"

const ProductModal = ({ activeProduct,
                          setActiveProduct,
                          targetedProductData,
                          orderArray,
                          setOrderArray,
                          addItem,
                          removeItem,
                          colourCoordinator,
                          setColourCoordinator,
                          lastTargetedItem,
                          setLastTargetedItem }) => {

    const [colour, setColour] = useState("black")

    const closeModal = (e) => {
        setActiveProduct([])
    }

    const singular_category = targetedProductData.category.slice(0, -1)
    const clean_title = targetedProductData.title.replace(singular_category, "")

    let description_array = targetedProductData.description.split(". ")
    let descriptions = description_array.map(description_item => {
        let no_code = description_item.replace(/â€+/g, "'")
        let trimmed_description = no_code.trim()
        if (trimmed_description.length !== 0) {
            return <div className="modal_description">{trimmed_description}.</div>
        }
    })

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const selectBlackItem = (e) => {
        setColour("black")
        setColourCoordinator("black")
        setLastTargetedItem(targetedProductData._id)
    }

    const selectWhiteItem = (e) => {
        setColour("white")
        setColourCoordinator("white")
        setLastTargetedItem(targetedProductData._id)
    }

    const selectGrayItem = (e) => {
        setColour("gray")
        setColourCoordinator("gray")
        setLastTargetedItem(targetedProductData._id)
    }

    function coordinateModalAndCardColours() {
        if (lastTargetedItem === targetedProductData._id) {
            setColour(colourCoordinator)
        }
    }

    useEffect(coordinateModalAndCardColours, [lastTargetedItem, colourCoordinator])

    //if product is in array then: quantity buttons, if not: 'add to cart' button
    let in_order_array
    for (let i = 0; i < orderArray.length; i++) {
        if (Object.values(orderArray[i]).includes(activeProduct) && Object.values(orderArray[i]).includes(colour)) {
            in_order_array = true
            break
        }
    }

    function colourSpecificQuantityButtons() {
        if (colour === "black") {
            if (in_order_array) {
                return <QuantityButtons
                    id={targetedProductData._id}
                    image={targetedProductData.image}
                    character={targetedProductData.character}
                    category={targetedProductData.category}
                    price={targetedProductData.price}
                    colour={colour}
                    orderArray={orderArray}
                    setOrderArray={setOrderArray}
                    addItem={addItem}
                    removeItem={removeItem}
                />
            } else {
                return <div className="add_to_cart_button"
                            onClick={() => {addItem(targetedProductData._id, targetedProductData.image, targetedProductData.character, targetedProductData.category, targetedProductData.price, colour)}}
                > Add to Cart</div>
            }
        } else {
            if (in_order_array) {
                return <QuantityButtons
                    id={targetedProductData._id}
                    image_two={targetedProductData.image2}
                    character={targetedProductData.character}
                    category={targetedProductData.category}
                    price={targetedProductData.price}
                    colour={colour}
                    orderArray={orderArray}
                    setOrderArray={setOrderArray}
                    addItem={addItem}
                    removeItem={removeItem}
                />
            } else {
                return <div className="add_to_cart_button"
                            onClick={() => {addItem(targetedProductData._id, targetedProductData.image2, targetedProductData.character, targetedProductData.category, targetedProductData.price, colour)}}
                > Add to Cart</div>
            }
        }
    }

    let colour_specific_buttons = colourSpecificQuantityButtons()
    let image_two = targetedProductData.image2

    function imageSelector() {
        if (colour === "black" || targetedProductData.image2 === 'NULL') {
            return <div className="modal_image" style={{backgroundImage: `url("${targetedProductData.image}")`}} />
        } else {
            return <div className="modal_image" style={{backgroundImage: `url("${targetedProductData.image2}")`}} />
        }
    }

    let image_selector = imageSelector()

    return (
        <>
            <div className="modal_surrounding" onClick={closeModal}>
            </div>
            <div className="product_modal">
                <div className="close_modal" onClick={closeModal}>X</div>
                <div className="modal_image_container">
                    {image_selector}
                    <div className="modal_colour_box_container">
                        <div className="modal_colour_box_black" onClick={selectBlackItem} />
                        {image_two.endsWith("gray.jpg") ? <div className="modal_colour_box_gray" onClick={selectGrayItem} /> : ""}
                        {image_two.endsWith("white.jpg") ? <div className="modal_colour_box_white" onClick={selectWhiteItem} /> : ""}
                    </div>
                </div>
                <div className="product_text">
                    <div className="modal_title">{clean_title}</div>
                    <div className="character_category">
                        <div className="modal_character">{targetedProductData.character}</div>
                        <div className="modal_category">{singular_category}</div>
                    </div>
                    {descriptions}
                    <div className="modal_price_qty">
                        <div className="modal_price">£{targetedProductData.price} : {capitalizeFirstLetter(colour)}</div>
                        {colour_specific_buttons}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductModal

