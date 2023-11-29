import Slider from './Slider'
import React from 'react'

const HomePage = (props) => {

    if (props.search.length !== 0 && props.search !== undefined) {
        return (
            <Slider title={"Search Results: " + props.search} search={props.search} toc={props.toc}/>
        )
      }
    
    return (
        <>
            <Slider title="Now Playing" now={true} />
            <Slider title="Coming Soon..." coming={true}/>
        </>
    )
}

export default HomePage