import axios from 'axios';
const serverConfigs = {
    url: 'http://localhost',
    port: 41484
};
export function configureAxios() {
    axios.defaults.baseURL = serverConfigs.port ? serverConfigs.url + ':' + serverConfigs.port : serverConfigs.url;
    axios.interceptors.request.use(function (config) {
        // TODO: should add the token to the headers before any request
        debugger;
        let user = localStorage.getItem('reduxPersist:user');
        if (user) {
            debugger;
            let token = JSON.parse(user).access_token;
            config.headers.common['Authorization'] = token;
        }
        return config;
    }, function (error) {
        console.log('Error occured');
        // Do something with request error
        return Promise.reject(error);
    });
    axios.interceptors.response.use(undefined, function (err) {
        // if(err.response.status == 401)
        // debugger;
    });
}
;
export default serverConfigs;
//# sourceMappingURL=configs.js.map