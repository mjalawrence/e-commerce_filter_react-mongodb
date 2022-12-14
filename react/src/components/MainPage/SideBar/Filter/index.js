import {useEffect, useState} from "react";
import './Filter.scss'

const Filter = ({searchType, setActiveCategoryFilter, setActiveCharacterFilter, filterRef}) => {

    const [filterList, setFilterList] = useState({})
    const [capsFilterTitle, setCapsFilterTitle] = useState('')
    const [filterDivs, setFilterDivs] = useState([])

    //Fetches data for sidebar title (category/character)
    useEffect(() => {
        fetch(`http://localhost:3001/products/${searchType}`)
            .then(response => response.json())
            .then(data => {
                setFilterList(data)
            })
    }, [])

    //Capitalises the title for sidebar and for input
    useEffect(() => {
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        if (Object.keys(filterList).length !== 0) {
            let caps_title = capitalizeFirstLetter(searchType)
            setCapsFilterTitle(caps_title)
        }
    }, [filterList])

    //onChange event of ticking a checkbox lifts state of checked filter and the api responds accordingly by displaying relevant products
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

    //Renders filter lists
    useEffect(() => {
        if (Object.keys(filterList).length !== 0) {
            let filters = filterList.map((filter_option, index) => {
                return <div className="filter_box" key={index}>
                    <label>
                        <input
                            className={searchType}
                            type="checkbox"
                            name={searchType}
                            value={filter_option}
                            onChange={filterChange}
                            ref={(element) => {filterRef.current[index] = element}}
                        />
                        <div className="filter_name">
                            {filter_option}
                        </div>
                    </label>
                </div>
            })
            setFilterDivs(filters)
        }
    },[capsFilterTitle])

    //Renders title and filter check boxes
    return (
        <div id={searchType} className="filter_container" >
            <div className="title">
                {capsFilterTitle}
            </div>
            {filterDivs}
        </div>
    )

}

export default Filter