import Views from '../../utils/views.js';
import CascadingSelects from '../../utils/cascadingSelects.js';

const FilterItemsView = (view, data)=>{
	const province = view.querySelector('.FilterItems #province');
	const locality = view.querySelector('.FilterItems #locality');
	const category = view.querySelector('.FilterItems #category');
	const subCategory = view.querySelector('.FilterItems #sub-category');
		
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

	const addListeners = (() =>{})();
	const removeListeners = () =>{};
	return {
		...Views.api(view),
		enable: ()=>{},
		disable: ()=>{},
		destroy: ()=>{
			removeListeners();
		}
	};
};
export default FilterItemsView;

