import UserMessage from '../../utils/userMessage.js';
import CascadingSelects from '../../utils/cascadingSelects.js';
import Views from '../../utils/views.js';
import Forms from '../../utils/forms.js';

const ItemFormView = (view, data, itemCallback)=>{
	const form = view.querySelector('#item-form');
	const submitForm = e=>{
		e.preventDefault();
		let formData = Forms.validate(form);
		if(formData){
			itemCallback(Forms.parse(formData, 'new_place'));
		}else{
			UserMessage.alert('Form item KO: ' + JSON.stringify(formData));
		}
	};
	const submitButton = view.querySelector('button');
	const cancelButton = view.querySelector('.CancelButton');
	const name = view.querySelector('#name');
	const address = view.querySelector('#address');
	const description = view.querySelector('#description');
	const image = view.querySelector('#image');
	const phone = view.querySelector('#phone');
	const email = view.querySelector('#email');
	const web = view.querySelector('#web');
	const province = view.querySelector('#province');
	const locality = view.querySelector('#locality');
	const category = view.querySelector('#category');
	const subCategory = view.querySelector('#sub-category');
	
	const provinceSelects = CascadingSelects(
		[province, locality],
		[data.provinces, data.localities],
		'province'
	);
	const categorySelects = CascadingSelects(
		[category, subCategory],
		[data.categories, data.subCategories],
		'category'
	);
	
	const cancelForm = e=>{
		form.reset();
	};
	const addListeners = (() =>{
		view.addEventListener('submit', submitForm);
		cancelButton.addEventListener('click', cancelForm);
	})();
	const removeListeners = () =>{};
	return {
		...Views.api(view),
		clear: ()=>{
			form.reset();
		},
		enable: ()=>{
			submitButton.disabled = false;
			name.disabled = false;
			address.disabled = false;
			description.disabled = false;
			image.disabled = false;
			phone.disabled = false;
			email.disabled = false;
			web.disabled = false;
			province.disabled = false;
			locality.disabled = false;
			category.disabled = false;
			subCategory.disabled = false;
		},
		disable: ()=>{
			submitButton.disabled = true;
			name.disabled = true;
			address.disabled = true;
			description.disabled = true;
			image.disabled = true;
			phone.disabled = true;
			email.disabled = true;
			web.disabled = true;
			province.disabled = true;
			locality.disabled = true;
			category.disabled = true;
			subCategory.disabled = true;
		},
		destroy: ()=>{
			removeListeners();
		}
	};
};
export default ItemFormView;

