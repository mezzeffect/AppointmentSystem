import axios from 'axios';
export class UserApi {
    static loginWithSalesForce() {
        return axios.get('api/account/LoginWithSalesForce');
    }
    static loginUser(userName, password) {
        var data = "username=" + userName + "&password=" + password + "&grant_type=password";
        debugger;
        return axios({
            method: "post",
            url: '/api/security/token',
            data: data,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });
    }
    static registerUser(userData) {
        return axios.post('/api/account/register', {
            first_name: userData.first_name,
            last_name: userData.last_name,
            password: userData.password,
            email: userData.email
        });
    }
    static salesforceCallback(resp) {
        return axios.post('/api/account/LoginWithSalesForceCallback', {
            'salesforce_code': resp.code
        });
    }
}
//# sourceMappingURL=user.api.jsx.map