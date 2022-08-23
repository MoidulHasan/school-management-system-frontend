// Dependencies
const rootUrl = 'http://localhost:3000/api/v1/';


const userData = localStorage.getItem("user");
const token = userData ? JSON.parse(userData).token : '';

// module scafolding
const fetchData = {};


// get requiest
fetchData.get = async (url) => {
    const response = await fetch(rootUrl + url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        mode: "cors"
    });

    return await response.json();
}


// POST request
fetchData.post = async (url, data) => {
    console.log(rootUrl)
    const response = await fetch(rootUrl + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        mode: "cors",
        body: JSON.stringify(data)
    });

    return await response.json();
}

// PUT request
fetchData.put = async (url, data) => {
    const response = await fetch(rootUrl + url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        mode: "cors",
        body: JSON.stringify(data)
    });

    return await response.json();
}


// Delete request
fetchData.delete = async (url, data) => {
    const response = await fetch(rootUrl + url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        mode: "cors",
        body: JSON.stringify(data)
    });

    console.log(response);

    return await response.json();
}

// export module
module.exports = fetchData;