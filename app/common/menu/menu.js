import Views from '../../../utils/views.js';
import Logger from '../../../utils/logger.js';
import {getUniqueId} from '../../../utils/strings.js';
import MenuView from './menuView.js';

const Menu = async (container, data, callerCallback)=>{
	const id = 'common-menu_'+ (data ? data.id || getUniqueId() : getUniqueId());
	const cssPath = 'app/common/menu/style.css';
	const jsPath = 'app/common/menu/template.html';
	const on_menuViewSelected = target=>{
		callerCallback(target);
	};
	const menuView = MenuView(await Views.add(id, container, cssPath, jsPath), data, on_menuViewSelected);
	const addListeners = (() =>{})();
	const removeListeners = () =>{};
	return {
		type: id,
		...menuView,
		destroy: ()=>{
			removeListeners();
			menuView.destroy();
			Views.remove(id, container);
		}
	}
};

export default Menu;
