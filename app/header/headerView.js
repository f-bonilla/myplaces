import Views from '../../utils/views.js';
const HeaderView = (view)=>{
	const addListeners = (() =>{})();
	const removeListeners = () =>{};
	return {
		...Views.api(view),
		update: (location, category)=>{},
		enable: ()=>{},
		disable: ()=>{},
		destroy: ()=>{
			removeListeners();
		}
	};
};
export default HeaderView;

