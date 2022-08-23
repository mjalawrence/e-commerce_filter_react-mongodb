import Filter from '../Filter'
import ResetFilterButton from '../ResetFilterButton'
import {useRef} from "react";


const SideBar = ({setActiveCategoryFilter, activeCategoryFilter, setActiveCharacterFilter, activeCharacterFilter}) => {

    const categoryRefs = useRef([])
    const characterRefs = useRef([])

    return (
        <div>
            <Filter
                searchType="category"
                setActiveCategoryFilter={setActiveCategoryFilter}
                activeCategoryFilter={activeCategoryFilter}
                filterRef={categoryRefs}
            />
            <Filter
                searchType="character"
                setActiveCharacterFilter={setActiveCharacterFilter}
                activeCharacterFilter={activeCharacterFilter}
                filterRef={characterRefs}
            />
            <ResetFilterButton
                setActiveCategoryFilter={setActiveCategoryFilter}
                setActiveCharacterFilter={setActiveCharacterFilter}
                categoryRefs={categoryRefs}
                characterRefs={characterRefs}
            />

            <h1>Stretch Goals</h1>
            <ol>
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