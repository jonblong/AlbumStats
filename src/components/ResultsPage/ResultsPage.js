import React, { useEffect } from 'react';
import './resultsPage.css';
import end from './end.svg';

function truncateString(str, num) {
    if (str.length <= num) {
      return str
    }
    return str.slice(0, num) + '...'
}

function ResultsPage(props) {
    function resizeComponent() {
        document.getElementById('ResultsPage').setAttribute('style', `min-height: ${window.innerHeight - 150}px`);
    }

    useEffect(() => {
        document.getElementById('ResultsPage').setAttribute('style', `min-height: ${window.innerHeight - 150}px`);
        window.addEventListener('resize', resizeComponent);

        return function cleanup() {
            window.removeEventListener('resize', resizeComponent);
        }
    }, []);

    return (
        <div id="ResultsPage">
            <div id="results-head">
                <p>Showing results for</p>
                <p id='search-term'>{props.searchTerm}</p>
            </div>
            <div id="results-list">
                {props.results.map((a, i) => (
                    <div className='album-card' onClick={() => props.getTracks(a)}>
                        <img className='album-art' src={a.images[0].url} width='300px' height='300px' alt='album art'/>
                        <div className='album-info'>
                            <p><b>{truncateString(a.name, 20)}</b></p>
                            <p>{truncateString(a.artists[0].name, 25)}</p>
                        </div>
                        <div className='end'>
                            <img src={end} alt={a.name}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResultsPage;