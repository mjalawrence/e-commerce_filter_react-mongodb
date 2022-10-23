import "./ProductModal.scss"
import QuantityButtons from "../../SideBar/QuantityButtons";

const ProductModal = ({ activeProduct, setActiveProduct, targetedProductData, orderArray, setOrderArray, addItem }) => {

    const closeModal = (e) => {
        setActiveProduct([])
    }

    const singular_category = targetedProductData.category.slice(0, -1)
    const clean_title = targetedProductData.title.replace(singular_category, "")

    // console.log(targetedProductData.description)

    let description_array = targetedProductData.description.split(". ")
    let descriptions = description_array.map(description_item => {
        let no_code = description_item.replace(/â€+/g, "'")
        let trimmed_description = no_code.trim()
        if (trimmed_description.length !== 0) {
            return <div className="modal_description">{trimmed_description}.</div>
        }
    })

    //if product is in array then: quantity buttons, if not: 'add to cart' button
    let in_order_array
    for (let i = 0; i < orderArray.length; i++) {
        if (Object.values(orderArray[i]).includes(activeProduct)) {
            in_order_array = true
            break
        }
    }

    return (
        <>
            <div className="modal_surrounding" onClick={closeModal}>
            </div>

            <div className="product_modal">
                    <div className="close_modal" onClick={closeModal}>X</div>
                    <div className="modal_image" style={{backgroundImage: `url("${targetedProductData.image}")`}}> </div>
                    <div className="product_text">
                        <div className="modal_title">{clean_title}</div>
                        <div className="character_category">
                            <div className="modal_character">{targetedProductData.character}</div>
                            <div className="modal_category">{singular_category}</div>
                        </div>
                        {descriptions}
                        <div className="modal_price_qty">
                            <div className="modal_price">£{targetedProductData.price} </div>
                            {in_order_array ? <QuantityButtons
                                id={targetedProductData._id}
                                character={targetedProductData.character}
                                category={targetedProductData.category}
                                price={targetedProductData.price}
                                orderArray={orderArray}
                                setOrderArray={setOrderArray}
                                addItem={addItem}
                            /> : <div className="add_to_cart_button"
                                      onClick={() => {addItem(targetedProductData._id, targetedProductData.character, targetedProductData.category, targetedProductData.price)}}
                            > Add to Cart</div>}
                        </div>
                    </div>
                </div>
        </>
    )
}

export default ProductModal

