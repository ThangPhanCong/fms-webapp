import * as redux from 'redux';
import _project from './project';
import projectModal from './projectModal';

const project = redux.combineReducers({
  projectModal,
  _project
});

export default project;
