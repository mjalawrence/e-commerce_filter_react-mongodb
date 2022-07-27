import {useEffect, useState} from "react";
import './Filter.scss'

const Filter = ({searchType, setActiveCategoryFilter, activeCategoryFilter, setActiveCharacterFilter, activeCharacterFilter}) => {

    const [optionData, setOptionData] = useState({})
    const [title, setTitle] = useState('')
    const [capsTitle, setCapsTitle] = useState('')

    // const [filterData, setFilterData] = useState({"data":
    //                                                             {
    //                                                                 "characters": {
    //                                                                     "Fred": false,
    //                                                                     "Dolores": false,
    //                                                                     "Rex": false,
    //                                                                     "Bubble": false,
    //                                                                 },
    //                                                                 "category": {
    //                                                                     "Aprons": false,
    //                                                                     "Baseball Hats": false,
    //                                                                     "Mugs": false,
    //                                                                     "T-shirts": false
    //                                                                 }
    //                                                             }
    //                                                         })
    //

        //fetches data for sidebar title (category/character)
    useEffect(() => {
        const sidebar_title = {searchType}.searchType
        fetch(`http://localhost:3001/products/${sidebar_title}`)
            .then(response => response.json())
            .then(data => {
                setOptionData(data)
            })
    }, [])

        //capitalises the title for sidebar and for input
    useEffect(() => {
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        if (Object.keys(optionData).length !== 0) {
            let new_title = Object.keys(optionData)[0]
            let caps_title = capitalizeFirstLetter(new_title)
            setCapsTitle(caps_title)
            setTitle(new_title)
        }
    }, [optionData])

        //Original filter method (not good for check boxes) and not react style (eventListener)
    //selects the relevant <input> and adds 'change' event which sets the filter
            // useEffect(() => {
            //     if (Object.keys(optionData).length !== 0) {
            //         const input_className = Object.keys(optionData)[0]
            //         const input_radio_selectors = document.querySelectorAll("." + input_className)
            //         input_radio_selectors.forEach(input_radio_selector => {
            //             input_radio_selector.addEventListener('change', setFilter)
            //             function setFilter() {
            //                 if (input_className === 'category') {
            //                     {setActiveCategoryFilter({'option': input_radio_selector.value, 'title': input_radio_selector.name})}
            //                 }
            //                 if (input_className === 'character') {
            //                     {setActiveCharacterFilter({'option': input_radio_selector.value, 'title': input_radio_selector.name})}
            //                 }
            //             }
            //         })
            //     }
            // }, [title])

    //this bloated mofucka is supposed to see eventlistener of checked/unchecked input box
        //then if clicked then set/remove to checked
            //then update the filterData object

    // useEffect(() => {
    //
    //     if (Object.keys(optionData).length !== 0) {
    //         const filter_options = document.querySelectorAll("." + title)
    //         // console.log(filterData.data.characters)
    //         filter_options.forEach(filter_option => {
    //             filter_option.addEventListener('change', updateFilterDataObject)
    //
    //             function updateFilterDataObject() {
    //                 if (filter_option.checked) {
    //                     filter_option.setAttribute('checked', '')
    //                 } else {
    //                     filter_option.removeAttribute('checked')
    //                 }
    //
    //                 if (filter_option.checked) {
    //                     if (filter_option.name === 'category') {
    //                         let category_options = filterData.data.category
    //                         let options_array = Object.entries(category_options)
    //                         options_array.map((option_array) => {
    //                             if (option_array[0] === filter_option.value) {
    //
    //                                 // const new_filter_data = {"data":
    //                                 //                         {
    //                                 //                             "characters": {
    //                                 //                                 "Fred": true,
    //                                 //                                 "Dolores": true,
    //                                 //                                 "Rex": true,
    //                                 //                                 "Bubble": false,
    //                                 //                             },
    //                                 //                             "category": {
    //                                 //                                 "Aprons": true,
    //                                 //                                 "Baseball Hats": true,
    //                                 //                                 "Mugs": false,
    //                                 //                                 "T-shirts": false
    //                                 //                             }
    //                                 //                         }
    //                                 //                     }
    //
    //                                 setFilterData(prevState => ({
    //                                     ...prevState,
    //                                     "data": {
    //                                             "characters": {
    //                                                 "Fred": true,
    //                                                 "Dolores": true,
    //                                                 "Rex": true,
    //                                                 "Bubble": false,
    //                                             },
    //                                             "category": {
    //                                                 "Aprons": true,
    //                                                 "Baseball Hats": true,
    //                                                 "Mugs": false,
    //                                                 "T-shirts": false
    //                                             }
    //                                         },
    //                                     }))
    //                                 // console.log(filterData)
    //                             }
    //                         })
    //                     }
    //                 }

    //psuedo code (please ignore)
                    //if filter_option <input> === character/category, === value (Fred etc), === checked/unchecked
                    //iterate through filterData
                    // if value === filterData.data.characters/category && filter_option === checked
                    //change to true
                    //add to query

                        //function to update the data object based on what has been checked
                        //change data from false to true
                        // if checked = true

                        //iterate through filter_data
                        //if something = true then add to array
                        //pass array to query
                        // const filter_data = {filterData}
                        // foreach through filter
                        // if (change)





    //onChange event lifts state of checked filters
    const filterChange = (e) => {
        const selectedValue = e.currentTarget.value
        if (e.currentTarget.name === 'category') {
            if (e.currentTarget.checked) {
                setActiveCategoryFilter(array => [...array, selectedValue])
            } else {
                setActiveCategoryFilter(prev => prev.filter(activeCategoryFilter => activeCategoryFilter !== selectedValue))
            }
        }

        if (e.currentTarget.name === 'character') {
            if (e.currentTarget.checked) {
                setActiveCharacterFilter(array => [...array, selectedValue])
            } else {
                setActiveCharacterFilter(prev => prev.filter(activeCharacterFilter => activeCharacterFilter !== selectedValue))
            }
        }
    }



    //
    //         if (e.currentTarget.name === 'character') {
    //             if (e.currentTarget.checked) {
    //                 setActiveCharacterFilterTest(array => [...array, selectedValue])
    //             } else {
    //                 setActiveCharacterFilterTest(prev => prev.filter(activeCharacterFilterTest => activeCharacterFilterTest !== selectedValue))
    //             }
    //         }

    //         // if (e.currentTarget.checked) {
    //         //     setActiveFilters(array => [...array, selectedValue])
    //         //     console.log('helo world')
    //         // } else {
    //         //     setActiveFilters(prev => prev.filter(activeFilters => activeFilters !== selectedValue ))
    //         // }
    //     }
    // }

    // useEffect(() => {
    //     console.log('hello world')
    //     // console.log(activeCategoryFilterTest)
    //     // console.log(activeCharacterFilterTest)
    // }, [filterChange])



    let filters = optionData[searchType]?.map((option, index) => {
        return <div key={index}>
                    <label>
                    <input
                        className={title}
                        type="checkbox"
                        name={title}
                        value={option}
                        onChange={filterChange}
                    />
                    {option}</label>
                </div>
    })

    return (
        <div className="side_bar_text">
            <div className="title">
                {capsTitle}
            </div>
            {filters}
        </div>
    )
}

export default Filter