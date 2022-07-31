import {useEffect, useState, useRef} from "react";
import './Filter.scss'

const Filter = ({searchType, setActiveCategoryFilter, setActiveCharacterFilter, filterRef, uncheckAll}) => {

    const [filterList, setFilterList] = useState({})
    const [capsFilterTitle, setCapsFilterTitle] = useState('')
    const [filterDivs, setFilterDivs] = useState([])

        //fetches data for sidebar title (category/character)
    useEffect(() => {
        fetch(`http://localhost:3001/products/${searchType}`)
            .then(response => response.json())
            .then(data => {
                setFilterList(data)
            })
    }, [])

        //capitalises the title for sidebar and for input
    useEffect(() => {
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        if (Object.keys(filterList).length !== 0) {
            let caps_title = capitalizeFirstLetter(searchType)
            setCapsFilterTitle(caps_title)
        }
    }, [filterList])

        //onChange event lifts state of checked filters
    const filterChange = (e) => {
        const selectedValue = e.currentTarget.value
        if (e.currentTarget.name === 'category') {
            if (e.currentTarget.checked) {
                setActiveCategoryFilter(array => [...array, selectedValue])
            } else {
                setActiveCategoryFilter(prev => prev.filter(active_category_filter => active_category_filter !== selectedValue))
            }
        }

        if (e.currentTarget.name === 'character') {
            if (e.currentTarget.checked) {
                setActiveCharacterFilter(array => [...array, selectedValue])
            } else {
                setActiveCharacterFilter(prev => prev.filter(active_character_filter => active_character_filter !== selectedValue))
            }
        }
    }

    // const ref = useRef([])
    //
    // const resetFilters = () => {
    //     ref.current.map((filter_div, index) =>
    //         {
    //             console.log(filter_div.checked)
    //             filter_div.checked = false
    //             console.log(ref)
    //             console.log(ref.current)
    //             console.log(filter_div)
    //
    //         })
    //     setActiveCharacterFilter([])
    //     setActiveCategoryFilter([])
    // }

    //https://bobbyhadz.com/blog/react-check-if-checkbox-is-checked



        //returns filter lists
    useEffect(() => {
        if (Object.keys(filterList).length !== 0) {
            let filters = filterList.map((filter_option, index) => {
                return <div key={index}>
                    <label>
                        <input
                            className={searchType}
                            type="checkbox"
                            name={searchType}
                            value={filter_option}
                            onChange={filterChange}
                            ref={(element) => {filterRef.current[index] = element}}
                        />
                        {filter_option}
                    </label>
                </div>
            })
            setFilterDivs(filters)
        }
    },[capsFilterTitle])

    // console.log(filterRef)

    return (
        <div className="side_bar_text">
            <div className="title">
                {capsFilterTitle}
            </div>
            {filterDivs}
            {/*<a*/}
            {/*    href='#'*/}
            {/*    className='reset_filters'*/}
            {/*    onClick={resetFilters}*/}
            {/*>*/}
            {/*    Reset Filters*/}
            {/*</a>*/}
        </div>
    )

}

export default Filter