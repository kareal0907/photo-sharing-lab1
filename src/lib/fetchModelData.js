/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
function fetchModel(url) {
  const apiUrl = `http://localhost:3333${url}`;
  return fetch(apiUrl, { headers: { Accept: "application/json" } }).then((response) => {
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    return response.json();
  });
}

export default fetchModel;
