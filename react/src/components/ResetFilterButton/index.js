const ResetFilterButton = ({resetFilters}) => {

    // const reset_button = document.querySelectorAll(".reset_filters")
    // reset_button.addEventListener('change', resetFilter)
    //     function resetFilter() {

        //     const character_radios = document.querySelectorAll(".category")
        //     character_radios.forEach(character_radio => {
        //         character_radio.checked = false
        //         console.log('itlives')
        //     })
        // }
            return (
                <a href='#' className='reset_filters' onClick={resetFilters}>Reset Filters</a>
            )
}

export default ResetFilterButton