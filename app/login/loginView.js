import UserMessage from '../../utils/userMessage.js';
import Views from '../../utils/views.js';
import Forms from '../../utils/forms.js';

const LoginView = (view, loginCallback)=>{
	const form = view.querySelector('#login-form');	
	const submitForm = e=>{
		e.preventDefault();
		let formData = Forms.validate(form);
		if(formData){
			loginCallback(Forms.parse(formData, 'login'));
		}else{
			UserMessage.alert('Form KO: ' + JSON.stringify(formData));
		}
	};
	const submitButton = view.querySelector('button');
	const user = view.querySelector('#username');
	const pass = view.querySelector('#password');
	const addListeners = (() =>{
		view.addEventListener('submit', submitForm);
	})();
	const removeListeners = () =>{
		view.removeEventListener('submit', submitForm);
	};
	return {
		...Views.api(view),
		enable: ()=>{
			submitButton.disabled = false;
			user.disabled = false;
			pass.disabled = false;
		},
		disable: ()=>{
			submitButton.disabled = true;
			user.disabled = true;
			pass.disabled = true;
		},
		destroy: ()=>{
			removeListeners();
		}
	};
};
export default LoginView;

