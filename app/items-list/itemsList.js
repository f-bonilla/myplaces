import Views from '../../utils/views.js';
import {getUniqueId} from '../../utils/strings.js';
import ItemsListView from './itemsListView.js';

const ItemsList = async (container, data)=>{
	const id = 'items-list_'+ (data ? data.id || getUniqueId() : getUniqueId());
	const cssPath = 'app/items-list/style.css';
	const jsPath = 'app/items-list/template.html';
	const itemsListView = ItemsListView(await Views.add(id, container, cssPath, jsPath), data);	
	const addListeners = (() =>{})();
	const removeListeners = () =>{};
	return {
		type: id,
		...itemsListView,
		destroy: ()=>{
			removeListeners();
			itemsListView.destroy();
			Views.remove(id, container);
		}
	}
};

export default ItemsList;

