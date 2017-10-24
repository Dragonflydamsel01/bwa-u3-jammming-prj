const redirectUri = 'http://SPOTIFY_JAMMMING.surge.sh';               //"http://localhost:3000/";
const clientId = '4eae0c7f6bfe43bf8717ccf19a3941a7';

//step 77 variable for user's empty acces token. I'll use Yelp model
let accessToken;

//step 76 create a Spotify module as an empy object (initally).
const Spotify = {
  getAccessToken(){ //set up a token retrieval method that will either return or retrieve the token.
    if(accessToken){
      return accessToken;
    }
      //set up the url and access token and access expire. Matches return arrays. They have regex expressions with them.
      //const url = window.location.href;
      const accessTokenMatch = window.location.href.match('/access_token=([^&]*)/');
      const expiresInMatch =  window.location.href.match('/expires_in=([^&]*)/');

    //step 80, for when access token and expiration time are in the url
      if (accessTokenMatch && expiresInMatch){
        accessToken = accessTokenMatch[1];// accesstoken was "matched" so there must be an array. Don't say let or const
        const expiresIn = Number(expiresInMatch[1]);

        /*access and expire; they ride together, they die together. For the else, the condition is
        that the access variable is empty and not in the URL */
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
      } else {
        const accountUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        window.location = accountUrl;
      }
    }, //get accesstoken method ends

   /*now we need a search method that accepts a term, passes the value to a Spotify request,
    then returns the response as a list of tracks in JSON format */
  search(term){
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
      headers: { 'Authorization': `Bearer ${accessToken}`}
    }).then(response => {
      return response.json();
      }).then(jsonResponse => {
      if(!jsonResponse.tracks){
        return [];
      }
        return jsonResponse.tracks.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        })); //end final return
      });//end final then.
  }, //end search

  /*check if values are saved to the name and the track's uri array */
  savePlaylist(name, trackUris){
    if(!name || !trackUris.length){
    return;
  }
    const accessToken = Spotify.getAccessToken();
    const headers = { 'Authorization': `Bearer ${accessToken}`};
    let userId;

    /*Now let's get the user id, then convert the response to JSON. Use the Yelp model. Then look at the
    POST and GET lessons. After, you'll need the user's playlists */

    return fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response => {
      return response.json();
    }).then(jsonResponse => {
      userId = jsonResponse.userId;
      return fetch(`/v1/users/${userId}/playlists`,{
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()).then(jsonResponse => {
        let playlistId = jsonResponse.id;
        return fetch(`/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        }); //end final fetch
      });//end final then
    });//end first then
  } //end savePlaylist
}//end spotify



export default Spotify;
