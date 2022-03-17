import {getUniqueId} from '../utils/strings.js';
import Ajax from '../utils/ajax.js';
import Views from '../utils/views.js';
import AppView from './appView.js';
import Header from './header/header.js';
import FilterItems from './filter-items/filterItems.js';
import ItemForm from './item-form/itemForm.js';
import ItemsList from './items-list/itemsList.js';

const displayComponent = (component, visible)=>visible ? component.show() : component.hide();
const App = async (container, data)=>{
	const id = 'app_'+ (data ? data.id || getUniqueId() : getUniqueId());

	data.provinces = await Ajax.open('/assets/json/spain_localities/provinces.json');  
  data.localities = await Ajax.open('/assets/json/spain_localities/localities.json');
  
	const cssPath = 'app/style.css';
	const jsPath = 'app/template.html';
	const appView = AppView(await Views.add(id, container, cssPath, jsPath));
	
	const states = await Ajax.open(data.paths.server + 'states');
  const categories = await Ajax.open(data.paths.server + 'categories');
  const subCategories = await Ajax.open(data.paths.server + 'sub_categories');
  const places = await Ajax.open(data.paths.server + 'places');

	const displayMenu = visible=>{
		displayComponent(filterItems, visible);
		itemsList.hide();
	};
	const displayNewItemForm = visible=>{
		displayComponent(itemForm, visible);
		itemsList.hide();
	};
	const header = await Header('top-wraper', {displayMenu, displayNewItemForm});
	
  const filterItems = await FilterItems('center-wraper', {...data, categories, subCategories});
  filterItems.hide();
  const itemForm = await ItemForm('center-wraper', {...data, categories, subCategories});
  itemForm.hide();
  const itemsList = await ItemsList('center-wraper', places);

	const addListeners = (()=>{})();
	const removeListeners = ()=>{};
	
	return {
		type: id,
		...appView,
		destroy: ()=>{
			removeListeners();
			appView.destroy();
			Views.remove(id, container);
		}
	}
};

export default App;

