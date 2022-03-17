import Ajax from '../../utils/ajax.js';
import Locale from '../../utils/locale.js';
import UserMessage from '../../utils/userMessage.js';
import Views from '../../utils/views.js';
import {getUniqueId} from '../../utils/strings.js';
import ItemFormView from './itemFormView.js';

const ItemForm = async (container, data)=>{
	const id = 'itemForm_'+ (data ? data.id || getUniqueId() : getUniqueId());
	const cssPath = 'app/item-form/style.css';
	const jsPath = 'app/item-form/template.html';

	const categories = [...data.categories];
	const subCategories = [...data.subCategories];
	const provinces = [...data.provinces];
	const localities = [...data.localities];

	const on_itemFormOk = async request=>{
		itemFormView.disable();
		const serverResponse = await Ajax.open(data.paths.server + 'new_place', request, 'POST');
		if(serverResponse.errorId !== 0){
			UserMessage.alert(Locale.get(serverResponse.message).replace('{{SERVICE_NAME}}', Object.keys(request)[0]));
			itemFormView.enable();
		}else{			
			itemFormView.clear();
		}
	};
	const itemFormView = ItemFormView(await Views.add(id, container, cssPath, jsPath), {
		categories, subCategories, provinces, localities
	}, on_itemFormOk);
	const on_cancelButtonClick = e=>{
		if(e.target.className === 'CancelButton'){
			itemFormView.hide();
		}
	}
	const addListeners = (() =>{
		itemFormView.addEventListener('click', on_cancelButtonClick);
	})();
	const removeListeners = () =>{
		itemFormView.removeEventListener('click', on_cancelButtonClick);
	};
	return {
		type: id,
		...itemFormView,
		destroy: ()=>{
			removeListeners();
			itemFormView.destroy();
			Views.remove(id, container);
		}
	}
};

export default ItemForm;

