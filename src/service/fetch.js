// Dependencies
const rootUrl = 'http://localhost:3000/api/v1/';

// module scafolding
const fetchData = {};


// get requiest
fetchData.get = async (url) => {
    const response = await fetch(rootUrl + url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: "cors"
    });

    return await response.json();
}


// POST request
fetchData.post = async (url, data) => {
    console.log(rootUrl)
    const response = await fetch(rootUrl + url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: "cors",
        body: JSON.stringify(data)
    });

    return await response.json();
}

// PUT request
fetchData.put = async (url, data) => {
    const response = await fetch(rootUrl + url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        mode: "cors",
        body: JSON.stringify(data)
    });

    return await response.json();
}


// Delete request
fetchData.delete = async (url) => {
    const response = await fetch(rootUrl + url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        mode: "cors"
    });

    return await response.json();
}

// export module
module.exports = fetchData;