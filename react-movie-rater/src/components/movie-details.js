import React from 'react';


function MovieDetails(props) {

    return (
        <div>
            <h1>{props.movie && props.movie.title}</h1>
            <p>{props.movie && props.movie.description}</p>
        </div>
    )
}

export default MovieDetails;