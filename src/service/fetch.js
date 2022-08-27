// Dependencies
const rootUrl = 'http://localhost:3000/api/v1/';


const userData = localStorage.getItem("user");
const token = userData ? JSON.parse(userData).token : '';

// module scafolding
const fetchData = {};


// get requiest
fetchData.get = async (url) => {
    try {
        const response = await fetch(rootUrl + url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            mode: "cors"
        });

        return await response.json();
    } catch (err) {
        return false;
    }

}


// POST request
fetchData.post = async (url, data) => {
    try {
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
    catch (err) {
        return false;
    }
}

// PUT request
fetchData.put = async (url, data) => {
    try {
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
    catch (err) {
        return false;
    }
}


// Delete request
fetchData.delete = async (url, data) => {
    try {
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
    catch (err) {
        return false;
    }
}



// export module
module.exports = fetchData;