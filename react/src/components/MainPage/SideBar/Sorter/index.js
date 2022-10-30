import ".//Sorter.scss"
import {useEffect} from "react";

const Sorter = ({ productData,
                    setProductData,
                    sortBy,
                    setSortBy,
                    resort }) => {

    //Sorts products by specified property
    function sortByProperty(array, propertyName) {
        let arrayClone = [...array]
        return arrayClone.sort(function (a, b) {
            if (a[propertyName] === b[propertyName]) {
                return 0;
            }
            else {
                return (a[propertyName] < b[propertyName]) ? -1 : 1
            }
        });
    }

    //Uses above function to sort depending on category, character, or price
        //Updates productData to be rendered on ProductPage
    const categorySorter = (e) => {
        setProductData(sortByProperty(productData, "category"))
        setSortBy(e.target.value)
    }

    const characterSorter = (e) => {
        setProductData(sortByProperty(productData, "character"))
        setSortBy(e.target.value)
    }

    const priceSorter = (e) => {
        setProductData(sortByProperty(productData, "price"))
        setSortBy(e.target.value)
    }

    //Makes sortBy isn't ignored when filter checkboxes are changed
    useEffect(() => {
        setProductData(sortByProperty(productData, sortBy))
    }, [resort])

    //Renders sortBy selectors: category, character, price
        //(I plan to include ascending and descending option)
    return (
        <>
            <div className="sort_box">
                <div className="sort_title">
                    Sort By
                </div>
                <label className="sort_by_category">
                    <input
                        className="sort_checkbox"
                        type="radio"
                        name="sort_by"
                        value="category"
                        checked={sortBy === "category"}
                        onChange={categorySorter}
                    />
                    Category
                </label>
                <label className="sort_by_character" >
                    <input
                        className="sort_checkbox"
                        type="radio"
                        name="sort_by"
                        value="character"
                        checked={sortBy === "character"}
                        onChange={characterSorter}
                    />
                    Character
                </label>
                <label className="sort_by_price" >
                    <input
                        className="sort_checkbox"
                        type="radio"
                        name="sort_by"
                        value="price"
                        checked={sortBy === "price"}
                        onChange={priceSorter}
                    />
                    Price
                </label>
            </div>
        </>
    )
}

export default Sorter