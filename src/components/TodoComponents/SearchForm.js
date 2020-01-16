import React from 'react'

const SearchForm = ({ handleSearchTerm, searchTerm }) => {
    return (
        <div>
            <input name="search-term" onChange={e => handleSearchTerm(e)} value={searchTerm} placeholder="Search By Name"/>
        </div>
    )
}

export default SearchForm;