import { createStore } from 'vuex';
import getters from './getters';
import base from './modules/base.js'
import user from './modules/user.js'

// const modulesFiles = import.meta.globEager('./modules/*.js');

// const modules = Object.entries(modulesFiles).reduce((modules, [path, module]) => {
//   const moduleName = path.replace(/^\.\/(.*)\.\w+$/, '$1');
//   modules[moduleName] = module.default;
//   return modules;
// }, {});

const store = createStore({
  modules:{
	  base,
	  user
  },
  getters
});

export default store;
