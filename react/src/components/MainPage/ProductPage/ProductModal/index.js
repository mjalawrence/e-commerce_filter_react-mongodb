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

    const [colour, setColour] = useState("")

    //Closes modal when close-button or modal surroundings clicked
    const closeModal = (e) => {
        setActiveProduct([])
    }

    //Makes category and title presentable
    const singular_category = targetedProductData.category.slice(0, -1)
    const clean_title = targetedProductData.title.replace(singular_category, "")

    //Separates description paragraph into individual sentences
    let description_array = targetedProductData.description.split(". ")
    let descriptions = description_array.map(description_item => {
        let no_code = description_item.replace(/â€+/g, "'")
        let trimmed_description = no_code.trim()
        if (trimmed_description.length !== 0) {
            return <div className="modal_description">{trimmed_description}.</div>
        }
    })

    //Capitalise first letter of word for final render
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //Isolates the colour.jpeg at the end of the item's image url
    function determineItemColour(url) {
        const colour_jpeg = url.substring(url.lastIndexOf('-') + 1)
        return colour_jpeg.split(".")[0]
    }

    //Sets default colour as first image in product object
    useEffect(() => {
        let first_item_colour = determineItemColour(targetedProductData.image)
        setColour(first_item_colour)
    }, [])

    //Identifies item colour to produce corresponding classNames
        //and appropriate set states for colour, colour coordinator and last targeted item
            //Returns clickable boxes for selecting item colour
    function itemColourProcessor(inputted_image) {
        let image_colour = determineItemColour(inputted_image)
        let image_class_name = "modal_colour_box_" + image_colour
        const selectItemColour = () => {
            if (image_colour) {
                setColour(image_colour)
                setColourCoordinator(image_colour)
                setLastTargetedItem(targetedProductData._id)
            }
        }
        return <div className={image_class_name} onClick={selectItemColour} />
    }

    let item_one_processor = itemColourProcessor(targetedProductData.image)
    let item_two_processor= itemColourProcessor(targetedProductData.image2)

    //Makes sure item colour of selected product changes and does not apply to all products
    function coordinateModalAndCardColours() {
        if (lastTargetedItem === targetedProductData._id) {
            setColour(colourCoordinator)
        }
    }

    useEffect(coordinateModalAndCardColours, [lastTargetedItem, colourCoordinator])

    //Iterates through orderArray looking for selected product
        //If product is in array then: quantity buttons, if not: 'add to cart' button
    let in_order_array
    for (let i = 0; i < orderArray.length; i++) {
        if (Object.values(orderArray[i]).includes(activeProduct) && Object.values(orderArray[i]).includes(colour)) {
            in_order_array = true
            break
        }
    }

    //If not in orderArray: renders Add To Cart button. If in array: renders quantity buttons
    function quantityButtons(item_image) {
        if (in_order_array) {
            return <QuantityButtons
                id={targetedProductData._id}
                image={item_image}
                image_two={item_image}
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
                        onClick={() => {addItem(targetedProductData._id, item_image, targetedProductData.character, targetedProductData.category, targetedProductData.price, colour)}}
            > Add to Cart</div>
        }
    }

    //Renders Quantity Buttons/Add To Cart button that relate to specific item colours
    let image_one_quantity_buttons = quantityButtons(targetedProductData.image)
    let image_two_quantity_buttons = quantityButtons(targetedProductData.image2)

    //Used to identify item colour and coordinate with image and quantity buttons
    let image_one_colour = determineItemColour(targetedProductData.image)
    let image_two_colour = determineItemColour(targetedProductData.image2)

    //Decides the product image based on the colour useState
    function imageSelector() {
        if (colour === image_one_colour || colour === "") {
            return <div className="modal_image" style={{backgroundImage: `url("${targetedProductData.image}")`}} />
        } else if (colour === image_two_colour) {
            return <div className="modal_image" style={{backgroundImage: `url("${targetedProductData.image2}")`}} />
        }
    }

    let image_selector = imageSelector()

    //Renders modal with full functionality (select colour & add to orderArray)
    return (
        <>
            <div className="modal_surrounding" onClick={closeModal}>
            </div>
            <div className="product_modal">
                <div className="close_modal" onClick={closeModal}>X</div>
                <div className="modal_image_container">
                    {image_selector}
                    <div className="modal_colour_box_container">
                        {item_one_processor}
                        {item_two_processor}
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
                            {image_one_colour === colour ? image_one_quantity_buttons : ""}
                            {image_two_colour === colour ? image_two_quantity_buttons : ""}
                        </div>
                </div>
            </div>
        </>
    )
}

export default ProductModal

