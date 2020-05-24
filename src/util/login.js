import axios from 'axios'
axios.defaults.withCredentials = true;
function is_login(next) {
    axios
        .get('http://localhost:8082/api/login')
        .then(response => {
            if (response.data.success) {
                next()
            }
            else {
                next({ name: 'login' })
            }
        })
        .catch(error => {
            console.log(error);
            next({ name: 'login' })
        })
}
export {
    is_login
}