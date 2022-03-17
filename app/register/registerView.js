import UserMessage from '../../utils/userMessage.js';
import Views from '../../utils/views.js';
import Dom from '../../utils/dom.js';
import Forms from '../../utils/forms.js';

const RegisterView = (view, registerCallback)=>{
	const form = view.querySelector('#register-form');
	const submitForm = e=>{
		e.preventDefault();
		let formData = Forms.validate(form);
		if(formData){
			registerCallback(Forms.parse(formData, 'register'));
		}else{
			UserMessage.alert('Form KO: ' + JSON.stringify(formData));
		}
	};
	const submitButton = view.querySelector('button');
	const user = view.querySelector('#username');
	const pass = view.querySelector('#password');
	const email = view.querySelector('#email');
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
			email.disabled = false;
		},
		disable: ()=>{
			submitButton.disabled = true;
			user.disabled = true;
			pass.disabled = true;
			email.disabled = true;
		},
		destroy: ()=>{
			removeListeners();
		}
	};
};
export default RegisterView;

