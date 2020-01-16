import React from 'react';
import './resultsPage.css';

function truncateString(str, num) {
    if (str.length <= num) {
      return str
    }
    return str.slice(0, num) + '...'
}

const ResultsPage = (props) => {
    return (
        <div id="ResultsPage">
            <div id="results-head">
                <div id='back-button' onClick={() => props.goBack()}>&lt;</div><p>Showing results for <span className='search-term'>{props.term}</span></p>
            </div>
            <div id="results-grid">
                {props.albums.map((a, i) => (
                    <div className='album-card' onClick={() => props.getTracks(a)}>
                        <img src={a.images[0].url} width='300px' height='300px' alt='album art'/>
                        <p><b>{truncateString(a.name, 20)}</b></p>
                        <p>{truncateString(a.artists[0].name, 25)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResultsPage;