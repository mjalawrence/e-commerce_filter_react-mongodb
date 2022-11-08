import {useEffect, useState} from "react";
import QuantityButtons from "../../SideBar/QuantityButtons";
import './ProductCard.scss'

const ProductCard = ({ id,
                         title,
                         price,
                         image,
                         image_two,
                         image_three,
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

    //Sets default colour as first image in product object
    useEffect(() => {
        let first_item_colour = determineItemColour(image)
        setColour(first_item_colour)
    }, [])

    //Identifies item colour to produce corresponding classNames
        //and appropriate set states for colour, colour coordinator and last targeted item
            //Returns clickable boxes for selecting item colour
    function itemColourProcessor(inputted_image) {
        let image_colour = determineItemColour(inputted_image)
        let image_class_name = "colour_box_" + image_colour
        let image_row_class_name = "row_colour_box_" + image_colour
        const selectItemColour = () => {
            if (image_colour) {
                setColour(image_colour)
                setColourCoordinator(image_colour)
                setLastTargetedItem(id)
            }
        }
        if (view !== "rows") {
            return <div className={image_class_name} onClick={selectItemColour} />
        } else {
            return <div className={image_row_class_name} onClick={selectItemColour} />
        }
    }

    let item_one_processor = itemColourProcessor(image)
    let item_two_processor = itemColourProcessor(image_two)
    let item_three_processor = itemColourProcessor(image_three)
    // possible for loop for uber dryness/allowing the possibility of infinite colours
    // let item_three_processor= itemColourProcessor(image_three)


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
    let image_three_quantity_buttons = quantityButtons(image_three)

    //Used to identify item colour and coordinate with image and quantity buttons
    let image_one_colour = determineItemColour(image)
    let image_two_colour = determineItemColour(image_two)
    let image_three_colour = determineItemColour(image_three)

    //Decides the product image based on the colour useState
    function imageSelector(class_variable) {
        if (colour === image_one_colour || colour === "") {
            return <div className={class_variable} style={{backgroundImage: `url("${image}")`}} />
        } else if (colour === image_two_colour) {
            return <div className={class_variable} style={{backgroundImage: `url("${image_two}")`}} />
        } else if (colour === image_three_colour) {
            return <div className={class_variable} style={{backgroundImage: `url("${image_three}")`}} />
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
                            {item_one_processor}
                            {item_two_processor}
                            {item_three_processor}
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
                    {image_three_colour === colour ? image_three_quantity_buttons : ""}
                </div>
            </div>

            :

            <div className="product_row">
                <div className="row_image_container">
                    {row_product_image_selector}
                    <div className="row_colour_box_container">
                        {item_one_processor}
                        {item_two_processor}
                        {item_three_processor}
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
                            {image_three_colour === colour ? image_three_quantity_buttons : ""}
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