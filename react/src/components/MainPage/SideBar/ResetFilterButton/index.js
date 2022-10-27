import ".//ResetFilterButton.scss"

const ResetFilterButton = ({ setActiveCategoryFilter,
                               setActiveCharacterFilter,
                               categoryRefs,
                               characterRefs,
                               setSortBy }) => {

    const setActiveFilters = () => {
        setActiveCategoryFilter([])
        setActiveCharacterFilter([])
        setSortBy("category")
    }

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