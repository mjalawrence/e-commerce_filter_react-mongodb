import {useEffect, useState} from "react"
import ".//ProductPage.scss"
import ProductCard from "./ProductCard"
import QuantityButtons from "../SideBar/QuantityButtons";

const ProductPage = ({productData, setProductData, orderArray, setOrderArray, activeCategoryFilter, activeCharacterFilter}) => {

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
                    title={product.title}
                    price={product.price}
                    image={product.image}
                    character={product.character}
                    category={product.category}
                    orderArray={orderArray}
                    setOrderArray={setOrderArray}
                />
    })



    return (
        <main>
            <div className="products__grid">
                {products}
            </div>
        </main>
    )
}

export default ProductPage
//
// let ordersDisplay = orderArray.map(orderItem => {
//     return (
//         <div>
//             <p>{orderItem.character} X {orderItem.category}</p>
//             <QuantityButtons
//                 character={orderItem.character}
//                 category={orderItem.category}
//                 price={orderItem.price}
//                 orderArray={orderArray}
//                 setOrderArray={setOrderArray}
//             />
//         </div>
//     )
// })