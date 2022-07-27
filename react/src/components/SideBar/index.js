import Filter from '../Filter'
import ResetFilterButton from '../ResetFilterButton'


const SideBar = ({setActiveCategoryFilter, activeCategoryFilter, setActiveCharacterFilter, activeCharacterFilter, resetFilters}) => {


    // console.log(activeCategoryFilter)
    // console.log(activeCharacterFilter)

    return (
        <div>
            <Filter
                searchType="category"
                setActiveCategoryFilter={setActiveCategoryFilter}
                activeCategoryFilter={activeCategoryFilter}

            />
            <Filter
                searchType="character"
                setActiveCharacterFilter={setActiveCharacterFilter}
                activeCharacterFilter={activeCharacterFilter}
            />
            <ResetFilterButton
                resetFilters={resetFilters}/>
            <br></br>

            {/*<div> search by:</div>*/}
            {/*<input type="radio" name="key" value="key" />*/}
            {/*<input type="radio" name="key" value="key" />*/}
            {/*<input type="radio" name="key" value="key" />*/}
            {/*<input type="search" name="key" value="value" />*/}

            <h1>Stretch Goals</h1>
            <ol>
                <li>sort out API to return category and character properly</li>
                <br></br>
                <li>push mongo to git repo, currently just react stuff</li>
                <br></br>
                <li>be able to uncheck selection without refreshing</li>
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