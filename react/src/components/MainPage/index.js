import {useState} from "react"
import ProductPage from "./ProductPage";
import SideBar from "./SideBar";

function MainPage() {

    const [productData, setProductData] = useState([])
    const [orderArray, setOrderArray] = useState([]);
    const [activeCategoryFilter, setActiveCategoryFilter] = useState([])
    const [activeCharacterFilter, setActiveCharacterFilter] = useState([])

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
            />
            <ProductPage
                productData={productData}
                setProductData={setProductData}
                orderArray={orderArray}
                setOrderArray={setOrderArray}
                activeCategoryFilter={activeCategoryFilter}
                activeCharacterFilter={activeCharacterFilter}
            />
        </div>
    );
}

export default MainPage