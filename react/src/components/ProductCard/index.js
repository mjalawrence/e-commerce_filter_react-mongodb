import './ProductCard.scss'

const ProductCard = ({title, price, image}) => {
    return (
        <>
            <div className="product_card">
                <img src={image} alt="product image" />
                <p>{title}</p>
                <p>${price}</p>
            </div>
        </>
    )
}

export default ProductCard