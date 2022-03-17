import Views from '../utils/views.js';

const AppView = (view)=>{
	const addListeners = (() =>{})();
	const removeListeners = () =>{};
	return {
		...Views.api(view),
		enable: ()=>{},
		disable: ()=>{},
		destroy: ()=>{
			removeListeners();
		}
	};
};
export default AppView;

