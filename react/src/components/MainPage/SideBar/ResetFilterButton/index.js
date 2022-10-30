import ".//ResetFilterButton.scss"

const ResetFilterButton = ({ setActiveCategoryFilter,
                               setActiveCharacterFilter,
                               categoryRefs,
                               characterRefs,
                               setSortBy }) => {

    //Clears filters and returns sortBy to "category"
    const setActiveFilters = () => {
        setActiveCategoryFilter([])
        setActiveCharacterFilter([])
        setSortBy("category")
    }


    //Unchecks filter check boxes and triggers clear filter function
    const resetFilters = () => {
        categoryRefs.current.map((filter_div) =>
        {
            filter_div.checked = false
        })
        characterRefs.current.map((filter_div) =>
        {
            filter_div.checked = false
        })
        setActiveFilters()
    }

    //Renders reset filter button
    return (
        <div className="reset_div">
            <a
                className="reset_filters "
                onClick={resetFilters}
            >
                Reset Filters
            </a>
        </div>
    )
}

export default ResetFilterButton