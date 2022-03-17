import Views from '../../utils/views.js';
import Logger from '../../utils/logger.js';
import Locale from '../../utils/locale.js';
import {getUniqueId} from '../../utils/strings.js';
import HomeView from './homeView.js';
import Menu from '../../app/common/menu/menu.js';
import Login from '../../app/login/login.js';
import Register from '../../app/register/register.js';

const Home = async (container, data, on_userLogged)=>{
	const id = 'home_'+ (data ? data.id || getUniqueId() : getUniqueId());
	const on_languageChanged = props=>Locale.change(props);
	const cssPath = 'app/home/style.css';
	const jsPath = 'app/home/template.html';
	
	const homeView = HomeView(await Views.add(id, container, cssPath, jsPath), on_languageChanged);
	const formsMenuData = {
		id: 'home-forms',
		menuItems: [{text:Locale.get('login'), id:'login'},{text:Locale.get('register'), id:'register'}],
		translate: ['login', 'register']
	};
	const on_homeMenuChanged = target=>{
		switch(target.id){
			case 'login':
				login.show();
				register.hide();
				break;
			case 'register':
				login.hide();
				register.show();
				break;
		}
	};
	const formsMenu = await Menu('home-menu', formsMenuData, on_homeMenuChanged);
	const login = await Login('login-form', data, on_userLogged);
	const register = await Register('register-form', data, on_userLogged);
	register.hide();

	const addListeners = (()=>{})();
	const removeListeners = ()=>{};
	return {
		type: id,
		...homeView,
		destroy: ()=>{
			removeListeners();
			homeView.destroy();
			formsMenu.destroy();
			login.destroy();
			Views.remove(id, container);
		}
	}
};

export default Home;

