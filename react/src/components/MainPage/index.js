import {useState} from "react"
import ProductPage from "../ProductPage";
import SideBar from "../SideBar";

function MainPage() {

    const [activeCategoryFilter, setActiveCategoryFilter] = useState([])
    const [activeCharacterFilter, setActiveCharacterFilter] = useState([])

    // const resetFilters = () => {
    //     setActiveCategoryFilter('')
    //     setActiveCharacterFilter('')
    // }

    return (
        <div className="main">
            <SideBar
                setActiveCategoryFilter={setActiveCategoryFilter}
                activeCategoryFilter={activeCategoryFilter}
                setActiveCharacterFilter={setActiveCharacterFilter}
                activeCharacterFilter={activeCharacterFilter}
                // resetFilters={resetFilters}
            />
            <ProductPage
                activeCategoryFilter={activeCategoryFilter}
                activeCharacterFilter={activeCharacterFilter}

            />
        </div>
    );
}

export default MainPage