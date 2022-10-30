import {useRef, useState} from "react";
import Filter from './Filter'
import OrderCard from "./OrderCard";
import ResetFilterButton from './ResetFilterButton'
import Sorter from "./Sorter";
import ViewControl from "./ViewControl";
import './/SideBar.scss'

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


    //Closes modal by clicking on SideBar
    const closeModal = (e) => {
        setActiveProduct([])
    }

    //Renders Sort-by, View-as, Filters, Reset Filters Button, and Mini Cart
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