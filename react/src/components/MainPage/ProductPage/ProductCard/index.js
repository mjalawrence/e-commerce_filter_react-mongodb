import {useEffect, useState} from "react";
import QuantityButtons from "../../SideBar/QuantityButtons";
import './ProductCard.scss'

const ProductCard = ({ id,
                         title,
                         price,
                         image,
                         image_two,
                         character,
                         category,
                         description,
                         orderArray,
                         setOrderArray,
                         addItem,
                         removeItem,
                         setActiveProduct,
                         view,
                         colourCoordinator,
                         setColourCoordinator,
                         lastTargetedItem,
                         setLastTargetedItem }) => {

    const [colour, setColour] = useState("")

    //Makes category and title presentable
    const singular_category = category.slice(0, -1)
    const clean_title = title.replace(singular_category, "")

    //Separates description paragraph into individual sentences
    let description_array = description.split(". ")
    let descriptions = description_array.map(description_item => {
        let no_code = description_item.replace(/â€+/g, "'")
        let trimmed_description = no_code.trim()
        if (trimmed_description.length !== 0) {
            return <div className="row_description">{trimmed_description}.</div>
        }
    })

    //Capitalise first letter of word for final render
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //Functionality of "see more" button
        //also necessary set states for coordinating colours of productModal and productCard
    const seeMoreInfo = (e) => {
        setActiveProduct(e.currentTarget.name)
    }

    //Isolates the colour.jpeg at the end of the item's image url
    function determineItemColour(url) {
        const colour_jpeg = url.substring(url.lastIndexOf('-') + 1)
        return colour_jpeg.split(".")[0]
    }

    //The image's colour and then declares a className using that colour
    let image_one_colour = determineItemColour(image)
    let image_one_class_name = "colour_box_" + image_one_colour
    let image_one_row_class_name = "row_colour_box_" + image_one_colour

    // Sets state with item colour for coordinating colours of productModal and productCard
    const selectColourOfImageOne = (e) => {
        if (image_one_colour)  {
            setColour(image_one_colour)
            setColourCoordinator(image_one_colour)
            setLastTargetedItem(id)
        }
    }
    useEffect(selectColourOfImageOne, [])

    //Same as above for image_two
    let image_two_colour = determineItemColour(image_two)
    let image_two_class_name = "colour_box_" + image_two_colour
    let image_two_row_class_name = "row_colour_box_" + image_two_colour

    const selectColourOfImageTwo = (e) => {
        if (image_two_colour)  {
            setColour(image_two_colour)
            setColourCoordinator(image_two_colour)
            setLastTargetedItem(id)
        }
    }

    //Same as above for image_three
        //haven't yet propped image_three (only one item in db has third image)
    // let image_three_colour = determineItemColour(image_three)
    // let image_three_class_name = "colour_box_" + image_three_colour
    // let image_three_row_class_name = "row_colour_box_" + image_three_colour
    //
    // const selectColourOfImageThree = (e) => {
    //     if (image_three_colour)  {
    //         setColour(image_three_colour)
    //         setColourCoordinator(image_three_colour)
    //         setLastTargetedItem(id)
    //     }
    // }

    //Makes sure item colour of selected product changes and does not apply to all products
    function coordinateModalAndCardColours() {
        if (lastTargetedItem === id) {
            setColour(colourCoordinator)
        }
    }
    useEffect(coordinateModalAndCardColours, [lastTargetedItem, colourCoordinator])

    //Iterates through orderArray looking for selected product
        //If product is in array then: quantity buttons, if not: 'add to cart' button
    let in_order_array
    for (let i = 0; i < orderArray.length; i++) {
        if (Object.values(orderArray[i]).includes(id) && Object.values(orderArray[i]).includes(colour)) {
           in_order_array = true
            break
        }
    }

    //If not in orderArray: renders Add To Cart button. If in array: renders quantity buttons
    function quantityButtons(item_image) {
        if (in_order_array) {
            return <QuantityButtons
                id={id}
                image={item_image}
                image_two={item_image}
                character={character}
                category={category}
                price={price}
                colour={colour}
                orderArray={orderArray}
                setOrderArray={setOrderArray}
                addItem={addItem}
                removeItem={removeItem}
            />
        } else {
            return <div className="add_to_cart_button"
                        onClick={() => {addItem(id, item_image, character, category, price, colour)}}
            > Add to Cart</div>
        }
    }

    //Renders Quantity Buttons/Add To Cart button that relate to specific item colours
    let image_one_quantity_buttons = quantityButtons(image)
    let image_two_quantity_buttons = quantityButtons(image_two)

    //Decides the product image based on the colour useState
    function imageSelector(class_variable) {
        if (colour === image_one_colour || colour === "") {
            return <div className={class_variable} style={{backgroundImage: `url("${image}")`}} />
        } else if (colour === image_two_colour) {
            return <div className={class_variable} style={{backgroundImage: `url("${image_two}")`}} />
        }
    }

    let product_image_selector = imageSelector("product_image")
    let row_product_image_selector = imageSelector("row_product_image")

    //Renders card depending on selected view (grid or rows)
        //Grid displays less information but has the option to option modal
    return (
        <>
            {view !== "rows" ?

            <div className="product_card">
                <div className="product_details">
                    <div className="image_container">
                    {product_image_selector}
                        <a
                            className="see_more_button"
                            name={id}
                            value={colour}
                            onClick={seeMoreInfo}
                        >See Full Details</a>
                        <div className="colour_box_container">
                            <div className={image_one_class_name} onClick={selectColourOfImageOne} />
                            <div className={image_two_class_name} onClick={selectColourOfImageTwo} />
                        </div>
                    </div>
                    <div className="character_category">
                        <div className="character_box">{character}</div>
                        <div className="category_box">{singular_category}</div>
                    </div>
                </div>
                <div className="price_qty">
                    <div className="product_price">£{price} </div>
                    {image_one_colour === colour ? image_one_quantity_buttons : ""}
                    {image_two_colour === colour ? image_two_quantity_buttons : ""}
                </div>
            </div>

            :

            <div className="product_row">
                <div className="row_image_container">
                    {row_product_image_selector}
                    <div className="row_colour_box_container">
                        <div className={image_one_row_class_name} onClick={selectColourOfImageOne} />
                        <div className={image_two_row_class_name} onClick={selectColourOfImageTwo} />
                    </div>
                </div>
                <div className="row_product_info_container">
                    <div className="row_name_title_price">
                        <div className="row_name_title">
                            <div className="character_category_row">
                                {character} : {singular_category}
                            </div>
                            <div className="row_title">{clean_title}</div>
                        </div>
                        <div className="row_price_quantity">
                            <div className="row_price">
                                {capitalizeFirstLetter(colour)} : £{price}
                            </div>
                            {image_one_colour === colour ? image_one_quantity_buttons : ""}
                            {image_two_colour === colour ? image_two_quantity_buttons : ""}
                        </div>
                    </div>
                    <div className="row_descriptions">{descriptions}</div>
                </div>
            </div>
            }
        </>
    )
}

export default ProductCard