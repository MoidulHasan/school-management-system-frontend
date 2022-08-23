// dependenices
const fetchData = require('./fetch');



// Module scafolding
const UserService = {};




UserService.login = async ({ email, password }) => {

    let loginData = {};

    try {
        // bind login data in an object
        const data = {
            "email": email.value,
            "password": password.value
        }


        const user = await fetchData.post('login', data);

        console.log(user);

        if (user.status === "success") {
            localStorage.setItem("user", JSON.stringify(user));

            loginData.status = 'success';
            loginData.data = user;
        }
        else {
            loginData.status = 'fail';
            loginData.data = null;
            loginData.error = 'Internal server error';
        }
    }
    catch (err) {
        loginData.status = 'fail';
        loginData.data = null;
        loginData.error = 'Internal server error, please try again.' + err;
    }

    return loginData;
}

UserService.logout = () => {
    // alert("Logout button clicked");
    localStorage.removeItem("user");
}


UserService.authenticate = () => {
    try {
        const user = localStorage.getItem("user");
        if (user) return true;
        else return false;
    }
    catch (err) {
        return false;
    }
}


// export module
export default UserService;