import {useEffect, useState} from "react"
import ".//ProductPage.scss"
import ProductCard from "./ProductCard"
import ProductModal from "./ProductModal";

const ProductPage = ({ productData,
                         setProductData,
                         orderArray,
                         setOrderArray,
                         activeCategoryFilter,
                         activeCharacterFilter,
                         addItem,
                         removeItem,
                         setActiveProduct,
                         activeProduct }) => {

    //gathers product data with which to populate modal
    let targeted_product
    for (let i = 0; i < productData.length; i++) {
        if (Object.values(productData[i]).includes(activeProduct)) {
        targeted_product = productData[i]
        break
        }
    }

    //if product is in array then: quantity buttons, if not: 'add to cart' button
    let in_order_array
    for (let i = 0; i < orderArray.length; i++) {
        if (Object.values(orderArray[i]).includes(activeProduct)) {
            in_order_array = true
            break
        }
    }

    //4 fetches for different combinations of filter request
    useEffect(() => {

        let character_statement = activeCharacterFilter.join(',')
        let category_statement = activeCategoryFilter.join(',')

        if (Object.keys(activeCategoryFilter).length !== 0 && Object.keys(activeCharacterFilter).length !== 0) {
            fetch(`http://localhost:3001/products?character=${character_statement}&category=${category_statement}`)
                .then(response => response.json())
                .then(data => {
                    setProductData(data)
                })

        } else if (Object.keys(activeCategoryFilter).length === 0 && Object.keys(activeCharacterFilter).length !== 0) {
            fetch(`http://localhost:3001/products?character=${character_statement}`)
                .then(response => response.json())
                .then(data => {
                    setProductData(data)
                })

        } else if (Object.keys(activeCategoryFilter).length !== 0 && Object.keys(activeCharacterFilter).length === 0) {
            fetch(`http://localhost:3001/products?category=${category_statement}`)
                .then(response => response.json())
                .then(data => {
                    setProductData(data)
                })

        } else {
            fetch(`http://localhost:3001/products`)

                .then(response => response.json())
                .then(data => {
                    setProductData(data)
                })
        }
    }, [activeCategoryFilter, activeCharacterFilter])

        let products = productData.map((product, index) => {
            return <ProductCard
                        key={index}
                        index={product.id}
                        id={product._id}
                        title={product.title}
                        price={product.price}
                        image={product.image}
                        character={product.character}
                        category={product.category}
                        orderArray={orderArray}
                        setOrderArray={setOrderArray}
                        addItem={addItem}
                        removeItem={removeItem}
                        setActiveProduct={setActiveProduct}
            />
        })

    return (
        <div className="product_page">
            {targeted_product ? <ProductModal
                orderArray={orderArray}
                setOrderArray={setOrderArray}
                addItem={addItem}
                removeItem={removeItem}
                activeProduct={activeProduct}
                setActiveProduct={setActiveProduct}
                targetedProductData={targeted_product}
                inOrderArray={in_order_array}
            /> : ""}
            <div className="products__grid">
                {products}
            </div>
        </div>
    )
}

export default ProductPage
