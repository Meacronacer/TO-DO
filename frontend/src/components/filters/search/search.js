

const Search = (props) => {

    return (
        <div style={{marginLeft: '20px', width:'315px'}} className="md-form mt-0">
            <input
            value={props.search}
            onChange={(e) => props.setSearch(e.target.value)}
            className="form-control" type="text" placeholder="Search" aria-label="Search"/>
        </div>
    )
}

export default Search;