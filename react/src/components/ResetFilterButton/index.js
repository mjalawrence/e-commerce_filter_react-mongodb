const ResetFilterButton = ({setActiveCategoryFilter, setActiveCharacterFilter, categoryRefs, characterRefs}) => {

    const setActiveFilters = () => {
        setActiveCategoryFilter([])
        setActiveCharacterFilter([])
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
        <a
            href='#'
            className='reset_filters'
            onClick={resetFilters}
        >
            Reset Filters
        </a>
    )
}

export default ResetFilterButton