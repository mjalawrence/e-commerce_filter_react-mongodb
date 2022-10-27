import QuantityButtons from "../../SideBar/QuantityButtons";
import './ProductCard.scss'


const ProductCard = ({ index,
                         id,
                         price,
                         image,
                         character,
                         category,
                         orderArray,
                         setOrderArray,
                         addItem,
                         removeItem,
                         setActiveProduct }) => {

    const singular_category = category.slice(0, -1)

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
        </>
    )
}

export default ProductCard