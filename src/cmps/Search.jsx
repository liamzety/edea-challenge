import React, { useContext, useState } from 'react'
import { Results } from './Results'
import { BiSearchAlt } from 'react-icons/bi'
import SC from 'soundcloud';
import storageService from '../services/storageService';
import { MainContextContext } from '../context/MainContext';
import utilityService from '../services/utilityService';
SC.initialize({
    client_id: 'ggX0UomnLs0VmW7qZnCzw '
});

export const Search = () => {
    const [searchInput, setSearchInput] = useState('')
    const [{ results }, setMainContext] = useContext(MainContextContext);

    const handleSearch = async (e) => {
        e.preventDefault()
        let tracks;

        // *FOR DEVELOPMENT ONLY*
        // if (storageService.loadFromStorage('tracks')) {
        //     tracks = storageService.loadFromStorage('tracks')
        // } else {
        tracks = await SC.get('/tracks', {
            q: searchInput, license: 'cc-by-sa'
        })
        //     storageService.saveToStorage('tracks', tracks)
        // }
        // END *FOR DEVELOPMENT ONLY*
        setMainContext((prevState) => {

            const id = utilityService.makeId()
            const created_at = Date.now()
            let recentSearches = [...prevState.recentSearches]
            if (prevState.recentSearches.length >= 5) {
                recentSearches = recentSearches.sort((search1, search2) => search1.created_at - search2.created_at)
                recentSearches.splice(0, 1, { title: searchInput, id, created_at })

            } else {
                recentSearches = [{ title: searchInput, id, created_at }, ...prevState.recentSearches]
            }
            recentSearches = recentSearches.sort((search1, search2) => search1.created_at - search2.created_at)

            storageService.saveToStorage('recent_searches', recentSearches)

            return { ...prevState, results: tracks, recentSearches }


        });
    };

    const handleSearchInput = ({ target }) => {
        setSearchInput(target.value)
    };
    const toggleResults = () => {
        setMainContext((prevState) => {
            return { ...prevState, results: null }
        })
    };
    return (
        <div className="search-container">

            <form onSubmit={handleSearch}>
                <input onChange={handleSearchInput} type="text" placeholder="Type to search!" />
                <button type="submit" className="search-icon-container" >
                    <BiSearchAlt className="search-icon" />
                </button>
            </form>
            {
                results && <Results toggleResults={toggleResults} results={results} />

            }

        </div>
    )
}
