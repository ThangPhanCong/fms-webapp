import * as store from "../helpers/storage";
import * as tokenApi from "../api/TokenApi";

let listeners = [];
let isLoading = true;
let user;
let isAuthenticated = null;

function broadcast() {
    listeners.forEach(cb => cb({user, isLoading, isAuthenticated}));
}

export const AuthenService = {
    isLoading: () => isLoading,
    getUser: () => user,
    isAuthenticated: () => isAuthenticated,
    setAuthenInfo: (info) => {
        if (info.user) user = info.user;
        if (info.isAuthenticated) isAuthenticated = info.isAuthenticated;
        if (info.isLoading) isLoading = info.isLoading;
        broadcast();
    },
    logOut: () => {
        store.clear('access_token');
        store.clear('projects');
        isLoading = false;
        user = null;
        isAuthenticated = null;
        broadcast();
    },
    verifyAccessToken: (access_token) => {
        if (!access_token) access_token = store.get('access_token');
        store.set('access_token', access_token);
        isLoading = true;
        broadcast();

        return tokenApi.verifyAccessToken(access_token)
            .then(userData => {
                user = userData;
                isAuthenticated = true;
                isLoading = false;
                broadcast();
            })
            .catch(() => {
                store.clear('access_token');
                user = null;
                isAuthenticated = null;
                isLoading = false;
                broadcast();
            })
    },
    register: (callback) => {listeners.push(callback)},
    unregister: (callback) => {
        listeners = listeners.filter(l => l !== callback)
    }
};
