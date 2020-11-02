// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#

export const authEndpoint = "https://accounts.spotify.com/authorize";

const redirectUri = "http://localhost:3000/";
const clientId = "91bc6353ad864f599c028135c15db443";

const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
];

// get the access token from this url
// http://localhost:3000/#access_token=BQDr-fRRDxvBaL0VnJIBv9EWZt5o8E70MVGBHoKgalmgizxVowFGUIW8jXoMdwo4TRc0SVXSjHsvNOdN04kLY6NQ4fwTIe_79w735jCAnx0JymdZgcczr0gO6jHp6QSODZydLwxW-hS5YQCtmqPansnGOV7y9Z_3apQIfPPkoCcFpxB1_Wpj&token_type=Bearer&expires_in=3600
export const getTokenFromUrl = () => {
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            let parts = item.split('=')
            initial[parts[0]] = decodeURIComponent(parts[1]);

            return initial;
        }, {});
}

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
