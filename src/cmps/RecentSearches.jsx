import React, { useContext } from 'react'
import { MainContextContext } from '../context/MainContext'
import SC from 'soundcloud';

SC.initialize({
    client_id: 'ggX0UomnLs0VmW7qZnCzw '
});
export const RecentSearches = () => {
    const [{ recentSearches }, setMainContext] = useContext(MainContextContext);
    const initSearch = async (recentSearch) => {
        let results;
        results = await SC.get('/tracks', {
            q: recentSearch.title, license: 'cc-by-sa'
        })
        setMainContext(prevState => {
            return { ...prevState, results }
        })
    }
    return (
        <>
            {
                recentSearches.length > 0 &&
                <div className="recent-searches-container">
                    <h2>Recent Searches</h2>
                    <ul>
                        {recentSearches && recentSearches.map(recentSearch => {
                            return (
                                <li key={recentSearch.id} onClick={() => initSearch(recentSearch)}>
                                    {recentSearch.title}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            }
        </>


    )
}
