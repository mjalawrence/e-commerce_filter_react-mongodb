import QuantityButtons from "../../SideBar/QuantityButtons";
import './ProductCard.scss'


const ProductCard = ({ id,
                         title,
                         price,
                         image,
                         character,
                         category,
                         description,
                         orderArray,
                         setOrderArray,
                         addItem,
                         removeItem,
                         setActiveProduct,
                         view }) => {

    const singular_category = category.slice(0, -1)
    const clean_title = title.replace(singular_category, "")

    let description_array = description.split(". ")
    let descriptions = description_array.map(description_item => {
        let no_code = description_item.replace(/â€+/g, "'")
        let trimmed_description = no_code.trim()
        if (trimmed_description.length !== 0) {
            return <div className="row_description">{trimmed_description}.</div>
        }
    })


    //setActiveProduct
    const seeMoreInfo = (e) => {
        setActiveProduct(e.currentTarget.name)
    }

    //if product is in array then: quantity buttons, if not: 'add to cart' button
    let in_order_array
    for (let i = 0; i < orderArray.length; i++) {
        if (Object.values(orderArray[i]).includes(id)) {
           in_order_array = true
            break
        }
    }

    return (
        <>
            {view !== "rows" ?
            <div className="product_card">
                <div className="product_details">
                <div className="image_container">
                    <div className="product_image" style={{backgroundImage: `url("${image}")`}}> </div>
                    <a
                        className="see_more_button"
                        name={id}
                        onClick={seeMoreInfo}
                    >See Full Details</a>
                </div>
                    <div className="character_category">
                        <div className="character_box">{character}</div>
                        <div className="category_box">{singular_category}</div>
                    </div>
                </div>
                <div className="price_qty">
                    <div className="product_price">£{price} </div>
                    {in_order_array ? <QuantityButtons
                        id={id}
                        character={character}
                        category={category}
                        price={price}
                        orderArray={orderArray}
                        setOrderArray={setOrderArray}
                        addItem={addItem}
                        removeItem={removeItem}
                    /> : <div className="add_to_cart_button"
                          onClick={() => {addItem(id, image, character, category, price)}}
                    > Add to Cart</div>}
                </div>
            </div>
            :
            <div className="product_row">
                <div className="row_image_container">
                    <div className="row_product_image" style={{backgroundImage: `url("${image}")`}}> </div>
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
                                £{price}
                            </div>
                            {in_order_array ? <QuantityButtons
                                id={id}
                                character={character}
                                category={category}
                                price={price}
                                orderArray={orderArray}
                                setOrderArray={setOrderArray}
                                addItem={addItem}
                                removeItem={removeItem}
                            /> : <div className="add_to_cart_button"
                                      onClick={() => {addItem(id, image, character, category, price)}}
                            > Add to Cart</div>}
                        </div>
                    </div>
                    <div className="row_descriptions">{descriptions}</div>

                </div>
                    {/*<div className="row_name_price">*/}
                    {/*    </div>*/}
                {/*</div>*/}
            {/*</div>*/}
            </div>
            }
        </>
    )
}

export default ProductCard