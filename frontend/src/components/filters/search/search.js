
import { tasksDataSearch } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
const Search = () => {

    const dispatch = useDispatch()
    const search = useSelector(state => state.search)

    return (
        <div style={{marginLeft: '20px', width:'315px'}} className="md-form mt-0">
            <input
            value={search}
            onChange={(e) => dispatch(tasksDataSearch(e.target.value))}
            className="form-control" type="text" placeholder="Search" aria-label="Search"/>
        </div>
    )
}

export default Search;