import React from 'react'
import { RecentSearches } from '../cmps/RecentSearches'
import { Track } from '../cmps/Track'
import { Search } from '../cmps/Search'

export function Home() {

  return (
    <section className="home flex space-between">
      <div className="search-wrapper flex column">
        <Search />
        <RecentSearches />
      </div>
      <div className="track-wrapper">
        <Track />
      </div>

    </section>
  )
}
