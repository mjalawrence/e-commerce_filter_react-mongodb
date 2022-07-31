import Filter from '../Filter'
import ResetFilterButton from '../ResetFilterButton'
import {useState, useEffect} from "react";
import {useRef} from "react";


const SideBar = ({setActiveCategoryFilter, activeCategoryFilter, setActiveCharacterFilter, activeCharacterFilter}) => {

    // const [uncheckAll, setUncheckAll] = useState([])
    const refs = useRef([])

    return (
        <div>
            <Filter
                searchType="category"
                setActiveCategoryFilter={setActiveCategoryFilter}
                activeCategoryFilter={activeCategoryFilter}
                filterRef={refs}
                // uncheckAll={uncheckAll}
            />
            <Filter
                searchType="character"
                setActiveCharacterFilter={setActiveCharacterFilter}
                activeCharacterFilter={activeCharacterFilter}
                // uncheckAll={uncheckAll}
                filterRef={refs}
            />
            <ResetFilterButton
                setActiveCategoryFilter={setActiveCategoryFilter}
                setActiveCharacterFilter={setActiveCharacterFilter}
                // setUncheckAll={setUncheckAll}
                refProp={refs}
            />


            {/*<div> search by:</div>*/}
            {/*<input type="radio" name="key" value="key" />*/}
            {/*<input type="radio" name="key" value="key" />*/}
            {/*<input type="radio" name="key" value="key" />*/}
            {/*<input type="search" name="key" value="value" />*/}

            <h1>Stretch Goals</h1>
            <ol>

                <li>make reset filters work</li>
                <br></br>
                <li>be able to search specific item in the search bar</li>
                <ul>
                    <li>by id, title, etc</li>
                </ul>
                <br></br>
                <li>style</li>
            </ol>
        </div>
    )
}

export default SideBar