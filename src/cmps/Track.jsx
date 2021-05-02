import React, { useContext, useEffect, useState } from 'react'
import SC from 'soundcloud';
import { MainContextContext } from '../context/MainContext';

export const Track = () => {
    const [player, setPlayer] = useState(null)
    const [{ track }, setMainContext] = useContext(MainContextContext);
    useEffect(() => {
        setPlayer(null)
    }, [track])

    const handlePlay = async () => {
        const oEmbed = await SC.oEmbed(track.uri, { auto_play: true })
        setPlayer(oEmbed.html)
        console.log('player', player);
    };

    return (
        <>
            {
                track && <div className="track-container">
                    <h1>{track.title}</h1>

                    {player ?
                        <div className="player" dangerouslySetInnerHTML={{ __html: player }}></div>
                        :
                        <img onClick={handlePlay} src={track.artwork_url} alt="" />
                    }
                </div>
            }
        </>



    )
}
