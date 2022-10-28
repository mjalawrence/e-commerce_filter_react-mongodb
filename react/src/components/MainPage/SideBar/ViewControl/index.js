import ".//ViewControl.scss"

const ViewControl = ({ view, setView }) => {

    const viewAsGrid = (e) => {
        setView("grid")
    }
    const viewAsRows = (e) => {
        setView("rows")
    }

    return (
        <>
            <div className="view_box">
                <div className="view_title">
                    View As
                </div>
                <label>
                <input
                    className="view_as_button"
                    type="radio"
                    checked={view === "grid"}
                    onClick={viewAsGrid}
                />
                    Grid
                </label>
                <label>
                <input
                    className="view_as_button"
                    type="radio"
                    checked={view === "rows"}
                    onClick={viewAsRows}
                />
                rows
                </label>
            </div>
        </>
    )
}

export default ViewControl