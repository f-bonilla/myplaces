import Locale from '../../utils/locale.js';
import Views from '../../utils/views.js';
import UserMessage from '../../utils/userMessage.js';
import Ajax from '../../utils/ajax.js';
import {getUniqueId} from '../../utils/strings.js';
import LoginView from './loginView.js';

const Login = async (container, data, on_userLogged)=>{
	const id = 'login_'+ (data ? data.id || getUniqueId() : getUniqueId());
	const on_loginFormOk = async request=>{
		loginView.disable();
		const serverResponse = await Ajax.open(data.paths.server +'login', request, 'POST');
		if(serverResponse.errorId !== 0){
			UserMessage.alert(Locale.get(serverResponse.message).replace('{{SERVICE_NAME}}', Object.keys(request)[0]));
			loginView.enable();
		}else{			
			on_userLogged(serverResponse);
		}
	};
	const cssPath = 'app/login/style.css';
	const jsPath = 'app/login/template.html';
	const loginView = LoginView(await Views.add(id, container, cssPath, jsPath), on_loginFormOk);	
	const addListeners = (() =>{})();
	const removeListeners = () =>{};
	return {
		type: id,
		...loginView,
		destroy: ()=>{
			removeListeners();
			loginView.destroy();
			Views.remove(id, container);
		}
	}
};

export default Login;

