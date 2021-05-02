import React, { useContext, useState } from 'react'
import { useRef } from 'react';
import { MainContextContext } from '../context/MainContext';

export const Result = ({ result }) => {
    const resultRef = useRef(null)
    const [isFlying, setIsFlying] = useState(false)
    const [{ track }, setMainContext] = useContext(MainContextContext);

    const handleFlyToImage = () => {
        setIsFlying(true)
        setTimeout(() => {
            setMainContext((prevState) => { return { ...prevState, track: result } })
        }, 1500);
    };

    return (
        <li className={`result-container ${isFlying ? 'animateFlying' : ''}`} ref={resultRef} onClick={handleFlyToImage} >
            {result.title}
        </li>
    )
}
