import Views from '../../utils/views.js';
import {getUniqueId} from '../../utils/strings.js';
import HeaderView from './headerView.js';

const Header = async (container, appCallbacks)=>{
	const id = 'header_'+ (appCallbacks ? appCallbacks.id || getUniqueId() : getUniqueId());
	const cssPath = 'app/header/style.css';
	const jsPath = 'app/header/template.html';
	const headerView = HeaderView(await Views.add(id, container, cssPath, jsPath));
	const addListeners = (() =>{})();
	const removeListeners = () =>{};
	return {
		type: id,
		...headerView,
		destroy: ()=>{
			removeListeners();
			headerView.destroy();
			Views.remove(id, container);
		}
	}
};

export default Header;

