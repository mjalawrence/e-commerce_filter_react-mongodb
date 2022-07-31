import {useState} from "react"
import ProductPage from "../ProductPage";
import SideBar from "../SideBar";

function MainPage() {

    const [activeCategoryFilter, setActiveCategoryFilter] = useState([])
    const [activeCharacterFilter, setActiveCharacterFilter] = useState([])

    return (
        <div className="main">
            <SideBar
                setActiveCategoryFilter={setActiveCategoryFilter}
                activeCategoryFilter={activeCategoryFilter}
                setActiveCharacterFilter={setActiveCharacterFilter}
                activeCharacterFilter={activeCharacterFilter}
            />
            <ProductPage
                activeCategoryFilter={activeCategoryFilter}
                activeCharacterFilter={activeCharacterFilter}

            />
        </div>
    );
}

export default MainPage