



// Module scafolding
const UserService = {};




UserService.loginUser = async ({ email, password }) => {
    const data = {
        "email": email.value,
        "password": password.value
    }
    const response = await fetch(`http://localhost:3000/api/v1/user/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: "cors",
        body: JSON.stringify(data)
    });
    return await response.json();
}


// export module
module.exports = UserService;