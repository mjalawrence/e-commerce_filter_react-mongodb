import Filter from './Filter'
import ResetFilterButton from './ResetFilterButton'
import OrderCard from "./OrderCard";
import {useRef, useState} from "react";
import './/SideBar.scss'
import Sorter from "./Sorter";
import ViewControl from "./ViewControl";


const SideBar = ({ productData,
                     setProductData,
                     orderArray,
                     setOrderArray,
                     setActiveCategoryFilter,
                     activeCategoryFilter,
                     setActiveCharacterFilter,
                     activeCharacterFilter,
                     addItem,
                     removeItem,
                     removeItemAll,
                     setActiveCheckout,
                     setActiveProduct,
                     resort,
                     view,
                     setView }) => {

    const categoryRefs = useRef([])
    const characterRefs = useRef([])
    const [sortBy, setSortBy] = useState("category")


    const closeModal = (e) => {
        setActiveProduct([])
    }

    return (
        <>

            <div className="side_bar" onClick={closeModal}>
                <Sorter
                    productData={productData}
                    setProductData={setProductData}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    resort={resort}
                />
                <ViewControl
                    view={view}
                    setView={setView}
                />
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
                    setSortBy={setSortBy}
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