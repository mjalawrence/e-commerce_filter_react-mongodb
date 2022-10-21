import {useState} from "react"
import ProductPage from "./ProductPage";
import SideBar from "./SideBar";

function MainPage() {

    const [productData, setProductData] = useState([])
    const [orderArray, setOrderArray] = useState([]);
    const [activeCategoryFilter, setActiveCategoryFilter] = useState([])
    const [activeCharacterFilter, setActiveCharacterFilter] = useState([])

    const addItem = (id, character, category, price) => {
        let orderArrayClone = [...orderArray]
        const orderArrayItem = {id, character, category, price, qty: 1}
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

    return (
        <div className="main">
            <SideBar
                productData={productData}
                orderArray={orderArray}
                setOrderArray={setOrderArray}
                setActiveCategoryFilter={setActiveCategoryFilter}
                activeCategoryFilter={activeCategoryFilter}
                setActiveCharacterFilter={setActiveCharacterFilter}
                activeCharacterFilter={activeCharacterFilter}
                addItem={addItem}
            />
            <ProductPage
                productData={productData}
                setProductData={setProductData}
                orderArray={orderArray}
                setOrderArray={setOrderArray}
                activeCategoryFilter={activeCategoryFilter}
                activeCharacterFilter={activeCharacterFilter}
                addItem={addItem}
            />
        </div>
    );
}

export default MainPage