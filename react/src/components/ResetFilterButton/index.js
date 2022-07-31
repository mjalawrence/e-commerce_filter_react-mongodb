const ResetFilterButton = ({setActiveCategoryFilter, setActiveCharacterFilter, refProp, setUncheckAll}) => {

    const setActiveFilters = () => {
        setActiveCategoryFilter([])
        setActiveCharacterFilter([])
    }


    const resetFilters = () => {
        refProp.current.map((filter_div, index) =>
        {
            filter_div.checked = false
            // console.log(filter_div)
            // console.log(filter_div.checked)
            console.log(refProp)
            console.log(refProp.current)
        })
        setActiveFilters()
    }

    console.log(refProp)

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