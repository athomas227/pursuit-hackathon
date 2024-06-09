// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQDkt_DaMxhXkQQqyqEOIcEHWXY3I63qJUckTb6L_jWo1Aiu5l9D1SPvjbpAXWwdiQRQ0ifTIk1BgBrfln6EZ3fjjfbWI2aKs4-b0Yaq_Svio24GCBnrd9n2hkBSaeKOhhHEupS2PXgBAg1I6c8aJDQa2BkQUZx2SmsISawUjDoLhRXSNQehhOFnrYqELWRH3DIo5va2cotLbg2l-Um_b1abtO3ab2IQXYQU3Xj_MgP7Iv2NE0Wm7PvPxT-gkHGmb_-RGiLmM2hms4m_TooH7jX3';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
  )).items;
}

const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);