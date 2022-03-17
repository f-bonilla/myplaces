import Views from '../../utils/views.js';

const HomeView = (view, languageChangeCallback)=>{
	const languages = view.querySelector('#home-languages');
	const on_languageChanged = e=>languageChangeCallback(e.target.value.toLowerCase());
	const addListeners = (() =>{
		languages.addEventListener('change', on_languageChanged);
	})();
	const removeListeners = () =>{
		languages.removeEventListener('change', on_languageChanged);
	};
	return {
		...Views.api(view),
		enable: ()=>{},
		disable: ()=>{},
		destroy: ()=>{
			removeListeners();
		}
	};
};
export default HomeView;

