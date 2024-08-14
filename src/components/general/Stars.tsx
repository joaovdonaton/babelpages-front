import Nullable from "../../util/Nullable.ts";

import starIcon from '../../assets/images/stars/star.png';
import starFullIcon from '../../assets/images/stars/star-full.png';
import starPartialIcon from '../../assets/images/stars/star-partial.png';
import './stars.css'
import React from "react";

const Stars = ({rawScore}: {rawScore: Nullable<number>}) => {
    const score = Math.ceil(rawScore === null ? 0 : rawScore);

    let starIndex = 0; // keep track of how many stars we have, we always want 5 in total
    const stars: React.JSX.Element[] = [];

    // add full stars
    for (let i = 0; i < Math.floor(score/2); i++) {
        stars.push(<img key={starIndex} src={starFullIcon} alt="full star" className="stars-img"/>)
        starIndex++;
    }

    // add partial star
    if(score % 2 == 1){
        stars.push(<img key={starIndex} src={starPartialIcon} alt="partial star" className="stars-img"/>)
        starIndex++;
    }

    // add empty stars until we have 5
    while(starIndex < 5){
        stars.push(<img key={starIndex} src={starIcon} alt="empty star" className="stars-img"/>)
        starIndex++;
    }

    return <div className="stars-container">
        {stars}
    </div>
};

export default Stars;