import React, { useState, createContext } from 'react';
import storageService from '../services/storageService';

const MainContextContext = createContext();

function MainContextProvider(props) {

    const [MainContext, setMainContext] = useState({
        recentSearches: getIfExsits(),
        results: null,
        track: null
    });
    function getIfExsits() {
        const recentSearches = storageService.loadFromStorage('recent_searches')
        if (recentSearches) {
            return recentSearches
        } else {
            return []
        }
    };
    return (
        <MainContextContext.Provider value={[MainContext, setMainContext]}>
            {props.children}
        </MainContextContext.Provider>
    );
}

export { MainContextContext, MainContextProvider };