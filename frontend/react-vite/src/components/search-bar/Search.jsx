import { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";

const Search = () => {
    const searchText = 'Search for products';

    return (
        <>
            <form className="d-flex mx-auto" role="search" style={{ width: "40vh", height: "30px", zIndex: '1' }}>
                <div className="input-group">
                    <span className="input-group-text">
                        <IoSearch />
                    </span>
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder={searchText}
                    ></input>
                </div>
            </form>
        </>
    )
}

export default Search
