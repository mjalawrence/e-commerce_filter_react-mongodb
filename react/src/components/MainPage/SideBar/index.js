import Filter from './Filter'
import ResetFilterButton from './ResetFilterButton'
import OrderCard from "./OrderCard";
import {useRef} from "react";
import './/SideBar.scss'


const SideBar = ({ productData,
                     orderArray,
                     setOrderArray,
                     setActiveCategoryFilter,
                     activeCategoryFilter,
                     setActiveCharacterFilter,
                     activeCharacterFilter,
                     addItem,
                     removeItem,
                     removeItemAll,
                     setActiveCheckout }) => {

    const categoryRefs = useRef([])
    const characterRefs = useRef([])

    return (
        <>
            <div className="side_bar">
                <Filter
                    searchType="category"
                    setActiveCategoryFilter={setActiveCategoryFilter}
                    activeCategoryFilter={activeCategoryFilter}
                    filterRef={categoryRefs}
                />
                <Filter
                    searchType="character"
                    setActiveCharacterFilter={setActiveCharacterFilter}
                    activeCharacterFilter={activeCharacterFilter}
                    filterRef={characterRefs}
                />
                <ResetFilterButton
                    setActiveCategoryFilter={setActiveCategoryFilter}
                    setActiveCharacterFilter={setActiveCharacterFilter}
                    categoryRefs={categoryRefs}
                    characterRefs={characterRefs}
                />
                <OrderCard
                    productData={productData}
                    orderArray={orderArray}
                    setOrderArray={setOrderArray}
                    addItem={addItem}
                    removeItem={removeItem}
                    removeItemAll={removeItemAll}
                    setActiveCheckout={setActiveCheckout}
                />
            </div>
        </>
    )
}

export default SideBar