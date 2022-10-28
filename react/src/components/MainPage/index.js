import {useState, useEffect} from "react"
import ".//MainPage.scss"
import CheckoutPage from "./CheckoutPage";
import ProductPage from "./ProductPage";
import SideBar from "./SideBar";

const MainPage = () => {

    const [activeProduct, setActiveProduct] = useState ([])
    const [productData, setProductData] = useState([])
    const [orderArray, setOrderArray] = useState([]);
    const [activeCategoryFilter, setActiveCategoryFilter] = useState([])
    const [activeCharacterFilter, setActiveCharacterFilter] = useState([])
    const [activeCheckout, setActiveCheckout] = useState(false)
    const [resort, setResort] = useState([])
    const [view, setView] = useState("grid")

    const addItem = (id, image, character, category, price) => {
        let orderArrayClone = [...orderArray]
        const orderArrayItem = {id, image, character, category, price, qty: 1}
        let itemOrdered = false
        orderArray.forEach((orderItem, key) => {
            if (orderItem.character === character && orderItem.category === category) {
                itemOrdered = key
            }
        })
        if (itemOrdered === false) {
            orderArrayClone.push(orderArrayItem)
        } else {
            orderArrayClone[itemOrdered].qty++
        }
        setOrderArray(orderArrayClone)
    }

    const removeItem = (id, character, category) => {
        let orderArrayClone = [...orderArray]
        let itemOrdered = false
        orderArray.forEach((orderItem, key) => {
            if (orderItem.character === character && orderItem.category === category) {
                itemOrdered = key
            }
        })
        if (itemOrdered !== false) {
            orderArrayClone[itemOrdered].qty--
            if(orderArrayClone[itemOrdered].qty < 1) {
                orderArrayClone.splice(itemOrdered, 1)
            }
            setOrderArray(orderArrayClone)
        }
    }

    const removeItemAll = (id, character, category) => {
        let orderArrayClone = [...orderArray]
        let itemOrdered = false
        orderArray.forEach((orderItem, key) => {
            if (orderItem.character === character && orderItem.category === category) {
                itemOrdered = key
            }
        })
        if (itemOrdered !== false) {
            orderArrayClone.splice(itemOrdered, 1)
            setOrderArray(orderArrayClone)
        }
    }

    const closeModal = () => {
        setActiveProduct([])
    }

    return (
        <>
            <div className="header" onClick={closeModal}>
                Robo-Merch
            </div>
            {activeCheckout ? <div className="checkout_main">
                    <CheckoutPage
                        orderArray={orderArray}
                        setOrderArray={setOrderArray}
                        addItem={addItem}
                        removeItem={removeItem}
                        removeItemAll={removeItemAll}
                        setActiveCheckout={setActiveCheckout}
                    />
                    </div> :
                <div className="main">
                    <SideBar
                        productData={productData}
                        setProductData={setProductData}
                        orderArray={orderArray}
                        setOrderArray={setOrderArray}
                        setActiveCategoryFilter={setActiveCategoryFilter}
                        activeCategoryFilter={activeCategoryFilter}
                        setActiveCharacterFilter={setActiveCharacterFilter}
                        activeCharacterFilter={activeCharacterFilter}
                        addItem={addItem}
                        removeItem={removeItem}
                        removeItemAll={removeItemAll}
                        setActiveCheckout={setActiveCheckout}
                        setActiveProduct={setActiveProduct}
                        activeProduct={activeProduct}
                        resort={resort}
                        view={view}
                        setView={setView}
                    />
                    <ProductPage
                        productData={productData}
                        setProductData={setProductData}
                        orderArray={orderArray}
                        setOrderArray={setOrderArray}
                        activeCategoryFilter={activeCategoryFilter}
                        activeCharacterFilter={activeCharacterFilter}
                        addItem={addItem}
                        removeItem={removeItem}
                        setActiveProduct={setActiveProduct}
                        activeProduct={activeProduct}
                        setResort={setResort}
                        view={view}
                    />
                </div>
            }
        </>
    );
}

export default MainPage