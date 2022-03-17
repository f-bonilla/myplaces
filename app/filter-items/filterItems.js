import Views from '../../utils/views.js';
import {getUniqueId} from '../../utils/strings.js';
import FilterItemsView from './filterItemsView.js';

const FilterItems = async (container, data)=>{
	const id = 'filter-items_'+ (data ? data.id || getUniqueId() : getUniqueId());
	const cssPath = 'app/filter-items/style.css';
	const jsPath = 'app/filter-items/template.html';
	const filterItemsView = FilterItemsView(await Views.add(id, container, cssPath, jsPath), data);
	const addListeners = (() =>{})();
	const removeListeners = () =>{};
	return {
		type: id,
		...filterItemsView,
		switchDisplay: ()=>filterItemsView.isOpen() ? filterItemsView.hide() : filterItemsView.show(),
		destroy: ()=>{
			removeListeners();
			filterItemsView.destroy();
			Views.remove(id, container);
		}
	}
};

export default FilterItems;

