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

    const [colour, setColour] = useState("black")

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
        setLastTargetedItem(id)
        setColourCoordinator(colour)
    }

//Changes colour of item
    // also required set states for coordinating colours of productModal and productCard
//(I plan to dry this up a bit to accommodate possibility of other colours, MVP at the mo)
    const selectBlackItem = (e) => {
        setColour("black")
        setColourCoordinator("black")
        setLastTargetedItem(id)
    }

    const selectWhiteItem = (e) => {
        setColour("white")
        setColourCoordinator("white")
        setLastTargetedItem(id)
    }

    const selectGrayItem = (e) => {
        setColour("gray")
        setColourCoordinator("gray")
        setLastTargetedItem(id)
    }

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

    //Renders Quantity Buttons that relate to specific item colours
        //(currently assumes all products are at least black, thus needs to be generalised and dried up)
    function colourSpecificQuantityButtons() {
        if (colour === "black") {
            if (in_order_array) {
                return <QuantityButtons
                    id={id}
                    image={image}
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
                            onClick={() => {addItem(id, image, character, category, price, colour)}}
            > Add to Cart</div>
            }
        } else {
            if (in_order_array) {
                return <QuantityButtons
                    id={id}
                    image_two={image_two}
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
                            onClick={() => {addItem(id, image_two, character, category, price, colour)}}
                > Add to Cart</div>
            }
        }
    }

    let colour_specific_buttons = colourSpecificQuantityButtons()


    //Decides the product image based on the colour useState
        //(Again assumes all products at least black: needs generalising and drying up)
    function imageSelector(class_variable) {
        if (colour === "black" || image_two === 'NULL') {
            return <div className={class_variable} style={{backgroundImage: `url("${image}")`}} />
        } else {
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
                            <div className="colour_box_black" onClick={selectBlackItem} />
                            {image_two.endsWith("gray.jpg") ? <div className="colour_box_gray" onClick={selectGrayItem} /> : ""}
                            {image_two.endsWith("white.jpg") ? <div className="colour_box_white" onClick={selectWhiteItem} /> : ""}
                        </div>
                    </div>
                    <div className="character_category">
                        <div className="character_box">{character}</div>
                        <div className="category_box">{singular_category}</div>
                    </div>
                </div>
                <div className="price_qty">
                    <div className="product_price">£{price} </div>
                    {colour_specific_buttons}
                </div>
            </div>
            :
            <div className="product_row">
                <div className="row_image_container">
                    {row_product_image_selector}
                    <div className="row_colour_box_container">
                        <div className="row_colour_box_black" onClick={selectBlackItem} />
                        {image_two.endsWith("gray.jpg") ? <div className="row_colour_box_gray" onClick={selectGrayItem} /> : ""}
                        {image_two.endsWith("white.jpg") ? <div className="row_colour_box_white" onClick={selectWhiteItem} /> : ""}
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
                            {colour_specific_buttons}
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