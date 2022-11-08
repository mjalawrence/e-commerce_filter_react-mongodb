import {useEffect, useState} from "react"
import ProductCard from "./ProductCard"
import ProductModal from "./ProductModal";
import ".//ProductPage.scss"

const ProductPage = ({ productData,
                         setProductData,
                         orderArray,
                         setOrderArray,
                         activeCategoryFilter,
                         activeCharacterFilter,
                         addItem,
                         removeItem,
                         setActiveProduct,
                         activeProduct,
                         setResort,
                         view }) => {

    //Both useStates required for coordinating item colour of productCard and productModal
    const [colourCoordinator, setColourCoordinator] = useState("")
    const [lastTargetedItem, setLastTargetedItem] = useState("")

    //Iterates through productData array looking for selected product
        //Fills targeted_product with product data to populate modal
    let targeted_product
    for (let i = 0; i < productData.length; i++) {
        if (Object.values(productData[i]).includes(activeProduct)) {
        targeted_product = productData[i]
        break
        }
    }

    //Iterates through orderArray looking for selected product
        //If product is in array then: quantity buttons, if not: 'add to cart' button
    let in_order_array
    for (let i = 0; i < orderArray.length; i++) {
        if (Object.values(orderArray[i]).includes(activeProduct)) {
            in_order_array = true
            break
        }
    }

    //4 fetches for different combinations of filter request initiated when filter checkbox checked/unchecked
        // all || character || category || character & category
    useEffect(() => {

        let character_statement = activeCharacterFilter.join(',')
        let category_statement = activeCategoryFilter.join(',')

        if (Object.keys(activeCategoryFilter).length !== 0 && Object.keys(activeCharacterFilter).length !== 0) {
            fetch(`http://localhost:3001/products?character=${character_statement}&category=${category_statement}`)
                .then(response => response.json())
                .then(data => {
                    setProductData(data)
                    setResort(data)

                })

        } else if (Object.keys(activeCategoryFilter).length === 0 && Object.keys(activeCharacterFilter).length !== 0) {
            fetch(`http://localhost:3001/products?character=${character_statement}`)
                .then(response => response.json())
                .then(data => {
                    setProductData(data)
                    setResort(data)
                })

        } else if (Object.keys(activeCategoryFilter).length !== 0 && Object.keys(activeCharacterFilter).length === 0) {
            fetch(`http://localhost:3001/products?category=${category_statement}`)
                .then(response => response.json())
                .then(data => {
                    setProductData(data)
                    setResort(data)
                })

        } else {
            fetch(`http://localhost:3001/products`)

                .then(response => response.json())
                .then(data => {
                    setProductData(data)
                    setResort(data)
                })
        }
    }, [activeCategoryFilter, activeCharacterFilter])

    //Iterates through productData array to render individual products with relevant data and functionality
    let products = productData.map((product, index) => {
        return <ProductCard
                    key={index}
                    id={product._id}
                    title={product.title}
                    price={product.price}
                    image={product.image}
                    image_two={product.image2}
                    image_three={product.image3}
                    character={product.character}
                    category={product.category}
                    description={product.description}
                    orderArray={orderArray}
                    setOrderArray={setOrderArray}
                    addItem={addItem}
                    removeItem={removeItem}
                    setActiveProduct={setActiveProduct}
                    view={view}
                    colourCoordinator={colourCoordinator}
                    setColourCoordinator={setColourCoordinator}
                    lastTargetedItem={lastTargetedItem}
                    setLastTargetedItem={setLastTargetedItem}
        />
    })

    //Renders products depending on selected view (grid or rows)
    //Modal renders if "see more" has been selected
    return (
        <div className="product_page">
            {
                targeted_product ? <ProductModal
                orderArray={orderArray}
                setOrderArray={setOrderArray}
                addItem={addItem}
                removeItem={removeItem}
                activeProduct={activeProduct}
                setActiveProduct={setActiveProduct}
                targetedProductData={targeted_product}
                inOrderArray={in_order_array}
                colourCoordinator={colourCoordinator}
                setColourCoordinator={setColourCoordinator}
                lastTargetedItem={lastTargetedItem}
                setLastTargetedItem={setLastTargetedItem}
                /> : ""
            }
            {
                view === "rows" ? <div className="products_rows">{products}</div>
                    : <div className="products_grid"> {products}</div>
            }
        </div>
    )
}

export default ProductPage
