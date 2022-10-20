import QuantityButtons from "../../SideBar/QuantityButtons";
import './ProductCard.scss'


const ProductCard = ({ title, price, image, character, category, orderArray, setOrderArray}) => {

    const singular_category = category.slice(0, -1)


    const clean_title = title.replace(singular_category, "")


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
                    <QuantityButtons
                        character={character}
                        category={category}
                        price={price}
                        orderArray={orderArray}
                        setOrderArray={setOrderArray}
                    />
                </div>

                </div>

        </>
    )
}

export default ProductCard