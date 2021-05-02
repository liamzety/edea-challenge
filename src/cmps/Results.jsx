import { ClickAwayListener, Fade } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Result } from './Result'

export const Results = (props) => {
    const [pageNumber, setPageNumber] = useState(1)
    const [pageSize, setPageSize] = useState(6)
    const [results, setResults] = useState(getPaginatedResults())
    useEffect(() => {
        setResults(getPaginatedResults())
    }, [pageNumber])

    function getPaginatedResults() {
        return props.results.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
    }
    function paginate(nextOrPrev) {
        if (nextOrPrev === 'next') {
            if (pageNumber * pageSize >= props.results.length) return
            setPageNumber(prevState => prevState + 1)

        } else {
            if (pageNumber * pageSize <= props.results.length) return
            setPageNumber(prevState => prevState - 1)
        }
    }

    return (
        <ClickAwayListener onClickAway={props.toggleResults}>
            <Fade in={results}>
                <div className="results-container" >
                    <ul>
                        {results.map(result => {
                            return (
                                <Result key={result.id} result={result} />

                            )
                        })}
                    </ul>
                    <div className="actions-container">
                        <button className="sec" onClick={() => { paginate('prev') }}>Previous</button>
                        <button className="prime" onClick={() => { paginate('next') }}>Next</button>
                    </div>
                </div>
            </Fade>
        </ClickAwayListener>

    )
}
