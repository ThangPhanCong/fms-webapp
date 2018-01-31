import * as storage from './storage';

let project_id;

export function setProjectId(id) {
    project_id = id;
}

export default function (scope) {
    switch (scope) {
        case 'BASE':
            return storage.get('access_token');
        case 'PROJECT':
            const projects = storage.get('projects');
            const currProject = projects.find(p => p.data._id === project_id);
            return currProject.access_token;
    }
}