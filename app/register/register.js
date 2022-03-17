import Session from '../../utils/sessions.js';
import Locale from '../../utils/locale.js';
import Views from '../../utils/views.js';
import UserMessage from '../../utils/userMessage.js';
import Ajax from '../../utils/ajax.js';
import {getUniqueId} from '../../utils/strings.js';
import RegisterView from './registerView.js';

const Register = async (container, data, on_userLogged)=>{
	const id = 'register_'+ (data ? data.id || getUniqueId() : getUniqueId());
	const on_registerFormOk = async request=>{
		registerView.disable();
		request.language = Session.get('my-places').lang;
		const serverResponse = await Ajax.open(data.paths.server + 'register', request, 'POST');
		if(serverResponse.errorId !== 0){
			UserMessage.alert(Locale.get(serverResponse.message));
			registerView.enable();
		}else{
			on_userLogged(serverResponse);
		}
	};
	const cssPath = 'app/register/style.css';
	const jsPath = 'app/register/template.html';
	const registerView = RegisterView(await Views.add(id, container, cssPath, jsPath), on_registerFormOk);
	const addListeners = (() =>{})();
	const removeListeners = () =>{};
	return {
		type: id,
		...registerView,
		destroy: ()=>{
			removeListeners();
			registerView.destroy();
			Views.remove(id, container);
		}
	}
};

export default Register;

