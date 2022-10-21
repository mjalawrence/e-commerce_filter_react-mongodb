import QuantityButtons from "../../SideBar/QuantityButtons";
import './ProductCard.scss'


const ProductCard = ({ index, id, title, price, image, character, category, orderArray, setOrderArray, addItem}) => {

    const singular_category = category.slice(0, -1)
    const clean_title = title.replace(singular_category, "")

    let in_order_array
    for (let i = 0; i < orderArray.length; i++) {
        if (Object.values(orderArray[i]).includes(id)) {
            console.log(orderArray[i])
           in_order_array = true
            break
        }
    }

    return (
        <>
            <div className="product_card">
                <div className="product_details">
                <img src={image} alt="product image" />
                    <div className="character_category">
                        <div className="character_box">{character}</div>
                        <div className="category_box">{singular_category}</div>
                    </div>
                    {/*<div className="product_description">{clean_title}</div>*/}
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
                    /> : <div className="add_to_cart_button" onClick={() => {
                        addItem(id, character, category, price)
                    }}> Add to Cart</div>}


                </div>

                </div>

        </>
    )
}

export default ProductCard