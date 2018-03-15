import axios from 'axios';
import {BASE_URL} from 'CONFIG';
import tokenGetter from 'helpers/token-getter';

// store token scope
const config = {
    '/api/a' : 'BASE',
    '/api/p' : 'PROJECT',
    '/api/o' : 'PROJECT',
    '/api/n' : 'PROJECT',
    '/api/ui' : 'PROJECT',
    '/api/t' : 'PROJECT'
};

function getTypeToken(route) {
    for (let routeAlias in config) {
        if (route.indexOf(routeAlias) !== -1) return config[routeAlias];
    }

    return 'BASE';
}

exports.get = (route, access_token = tokenGetter(getTypeToken(route))) => {
    let url = `${BASE_URL}${route}`;
    let headers = {
        'authorization': access_token
    };

    return axios.get(url, {headers})
        .then(handleResponse);
};

exports.post = (route, payload, access_token = tokenGetter(getTypeToken(route))) => {
    let url = `${BASE_URL}${route}`;
    let headers = {
        'authorization': access_token
    };

    return axios.post(url, payload, {headers})
        .then(handleResponse);
};

exports.put = (route, payload, access_token = tokenGetter(getTypeToken(route))) => {
    let url = `${BASE_URL}${route}`;
    let headers = {
        'authorization': access_token
    };

    return axios.put(url, payload, {headers})
        .then(handleResponse);
};

exports.delete = (route, access_token = tokenGetter(getTypeToken(route))) => {
    let url = `${BASE_URL}${route}`;
    let headers = {
        'authorization': access_token || access_token
    };

    return axios.delete(url, {headers})
        .then(handleResponse);
};

function handleResponse(res) {
    if (!res.data) {
        return Promise.reject(new Error('Something went wrong'));
    } else {
        if (res.data.success) {
            return Promise.resolve(res.data.data);
        } else {
            return Promise.reject(new Error(res.data.reason));
        }
    };
};

exports.getWithoutAuth = (route) => {
    let url = BASE_URL + route;
    return axios.get(url);
};
