import React, { useState, useEffect } from 'react';
import { API } from '../api-service';
import { useCookies } from 'react-cookie';


function MovieForm(props) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [token] = useCookies(['mr-token']);

    useEffect(() => {
        setTitle(props.movie.title)
        setDescription(props.movie.description)
    }, [props.movie])

    const updateClicked = () => {
        API.updateMovie(props.movie.id, {title, description}, token['mr-token'])
        .then(resp => props.updatedMovie(resp))
        .catch(err => console.log(err));
    }

    const createClicked = () => {
        API.createMovie({title, description}, token['mr-token'])
        .then(resp => props.movieCreated(resp))
        .catch(err => console.log(err));
    }

    const isDisabled = title.length === 0 || description.length === 0;

    return (
        <React.Fragment>
            { props.movie ? (
                <div>
                    <label htmlFor="title">Title</label><br/>
                    <input id="title" type="text" placeholder="Title" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)}
                    /><br/>
                    <label htmlFor="description">Description</label><br/>
                    <textarea id="description" placeholder="Description"
                        value={description} 
                        onChange={e => setDescription(e.target.value)}
                    ></textarea><br/>
                    { props.movie.id ?
                        <button onClick={updateClicked} disabled={isDisabled}>Update</button> :
                        <button onClick={createClicked} disabled={isDisabled}>Create</button>
                    }                    
                </div>
            ) : null }
        </React.Fragment>
    )
}

export default MovieForm;
