import * as store from "../helpers/storage";
import * as tokenApi from "../api/TokenApi";

let listeners = {};
let isLoading = true;
let user;
let isAuthenticated = null;

function broadcast() {
    for (let key in listeners) {
        listeners[key]({user, isLoading, isAuthenticated});
    }
}

export const AuthenService = {
    isLoading: () => isLoading,
    getUser: () => user,
    setUser: (_user) => {
        user = _user;
        broadcast();
    },
    setAccessToken: (access_token) => {
        store.set('access_token', access_token);
    },
    isAuthenticated: () => isAuthenticated,
    logOut: () => {
        store.clear('access_token');
        store.clear('projects');
        isLoading = false;
        user = null;
        isAuthenticated = null;
        broadcast();

        window.location = "/";
    },
    verifyAccessToken: (access_token) => {
        if (!access_token) {
            access_token = store.get('access_token');
        }

        if (access_token) {
            store.set('access_token', access_token);
            isLoading = true;

            tokenApi.verifyAccessToken(access_token)
                .then(
                    userData => {
                        user = userData;
                        isAuthenticated = true;
                    },
                    () => {
                        store.clear('access_token');
                        user = null;
                        isAuthenticated = null;
                    }
                )
                .then(() => {
                    isLoading = false;
                    broadcast();
                })
        } else {
            user = null;
            isAuthenticated = null;
            isLoading = false;
        }

        broadcast();
    },
    register: (self, callback) => {
        listeners[self] = callback;
    },
    unregister: (self) => {
        delete listeners[self];
    }
};
