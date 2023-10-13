import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000'
});

export const useHttp = () => {
    
    const request = (method, url, body = null) => {
        return client[method](
            url,
            body,
            {withCredentials: true}
        )
    }

    return {request}
}
