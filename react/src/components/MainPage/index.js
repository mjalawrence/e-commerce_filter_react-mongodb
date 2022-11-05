import {useState} from "react"
import CheckoutPage from "./CheckoutPage";
import ProductPage from "./ProductPage";
import SideBar from "./SideBar";
import ".//MainPage.scss"

const MainPage = () => {

    const [activeProduct, setActiveProduct] = useState ([])
    const [productData, setProductData] = useState([])
    const [orderArray, setOrderArray] = useState([]);
    const [activeCategoryFilter, setActiveCategoryFilter] = useState([])
    const [activeCharacterFilter, setActiveCharacterFilter] = useState([])
    const [activeCheckout, setActiveCheckout] = useState(false)
    const [resort, setResort] = useState([])
    const [view, setView] = useState("grid")

    //Looks in orderArray, if item is present ("image" specifies colour of item), increase quantity,
        // if not, add to order array clone then update orderArray state
    const addItem = (id, image, character, category, price, colour) => {
        let orderArrayClone = [...orderArray]
        const orderArrayItem = {id, image, character, category, price, colour, qty: 1}
        let itemOrdered = false
        orderArray.forEach((orderItem, key) => {
            if (orderItem.image === image && orderItem.id === id) {
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

    //Looks in orderArray, if item (and specific colour) is more than 1, reduce quantity,
        //if only 1, remove from array clone: update orderArray state
    const removeItem = (id, image) => {
        let orderArrayClone = [...orderArray]
        let itemOrdered = false
        orderArray.forEach((orderItem, key) => {
            if (orderItem.image === image && orderItem.id === id) {
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

    //Looks in orderArray, if present then remove entirely: update orderArray
    const removeItemAll = (id, image) => {
        let orderArrayClone = [...orderArray]
        let itemOrdered = false
        orderArray.forEach((orderItem, key) => {
            if (orderItem.image === image && orderItem.id === id) {
                itemOrdered = key
            }
        })
        if (itemOrdered !== false) {
            orderArrayClone.splice(itemOrdered, 1)
            setOrderArray(orderArrayClone)
        }
    }

    //Function to be able to close modal by clicking on header
    const closeModal = () => {
        setActiveProduct([])
    }

    //render Sidebar, ProductPage, and CheckoutPage when activated
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