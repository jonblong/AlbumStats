import React from 'react';
import './loginPage.css';

function LoginPage(props) {
    function resizeComponent() {
        document.getElementById('LoginPage').setAttribute('style', `min-height: ${window.innerHeight - 150}px`);
    }

    React.useEffect(() => {
        document.getElementById('LoginPage').setAttribute('style', `min-height: ${window.innerHeight - 150}px`);
        window.addEventListener('resize', resizeComponent);

        return function cleanup() {
            window.removeEventListener('resize', resizeComponent);
        }
    }, []);

    return (
        <div id='LoginPage'>
            <div id='description-text'>
                <h1>Vibecheck v0.1</h1>
                <p>VibeCheck allows you to see how things like energy, happiness and danceability of songs interact to create the 'vibe' of your favorite albums.</p>
                <p>In order to use VibeCheck you must <a
                    href={`${props.authEndpoint}?client_id=${props.client_id}&redirect_uri=${props.redirectUri}&scope=${props.scopes.join("%20")}&response_type=token&show_dialog=true`}
                >Login to Spotify</a>.</p>
            </div>
        </div>
    )
}

export default LoginPage