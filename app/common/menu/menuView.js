import Views from '../../../utils/views.js';

let currentOption;
const switchOptions = option=>{
	currentOption.className = 'Active';
	option.className = 'Selected';
	currentOption = option;
};
const MenuView = (view, items, menuCallback)=>{
	let domElement;
	let className;
	let itemSelected;
	items.menuItems.forEach((item, index)=>{
		domElement = document.createElement('a');
		domElement.id = item.id ? item.id : index;
		domElement.type = 'OPTION';
		domElement.textContent = item.text;
		domElement.dataset.lang = items.translate[index];
		if(item.selected === true){
			className = 'Selected';
			currentOption = domElement;
			itemSelected = true;
		}else{
			className = 'Active';
		}
		domElement.className = className;
		view.appendChild(domElement);
	});
	if(!itemSelected){
		view.children[0].className = 'Selected';
		currentOption = view.children[0];
	}
	const on_viewClick = e=>{
		if(e.target.getAttribute('type') === 'OPTION'){
			switchOptions(e.target);
			menuCallback(currentOption);
		}
	};
	const addListeners = (() =>{
		view.addEventListener('click', on_viewClick);
	})();
	const removeListeners = () =>{
		view.removeEventListener('click', on_viewClick);
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
export default MenuView;

