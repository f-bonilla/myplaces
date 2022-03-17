import Locale from './locale.js';
import Dom from './dom.js';

const cascadingSelects = (selects, selectsData, type)=>{
	const selectList = [...selects];
	const dataList = [...selectsData];
	const change = e=>{
		const selectectedIndex = selectList.findIndex((select)=>select.id === e.target.id);
		const nextSelect = selectList[selectectedIndex+1];

		let coincidences, result;
		switch(type){
			case 'province':
				const provinceId = selectList[selectectedIndex].options[selectList[selectectedIndex].selectedIndex].id;
				coincidences = dataList[1].filter(item=>{
					if(provinceId === item.id.substring(0,2)){
						return item;
					}
				});
				result = Boolean(coincidences.length)
					? coincidences
					: [{"id": "all", "nm": Locale.get('all')}];
				Dom.populateSelect(selectList[selectectedIndex+1], result);
				break;
			case 'category':
				const categoryId = selectList[selectectedIndex].options[selectList[selectectedIndex].selectedIndex].id;
				coincidences = dataList[1].filter(item=>{
					if(categoryId === item.category_id){
						return item;
					}
				});
				result = Boolean(coincidences.length)
					? coincidences
					: [{"id": "all", "nm": Locale.get('all')}];
				Dom.populateSelect(selectList[selectectedIndex+1], result);
				break;
			default:
				alert('cascadingSelect without type');
				break;
		}
	};
	
	dataList[0].unshift({"id": "all", "nm": Locale.get('all')});
	dataList[1].unshift({"id": "all", "nm": Locale.get('all')});

	Dom.populateSelect(selectList[0], dataList[0]);
	Dom.populateSelect(selectList[1], [{"id": "all", "nm": Locale.get('all')}]);

	const addListeners = (() =>{
		selectList[0].addEventListener('change', e=>change(e));
	})();
	const removeListeners = () =>{
		selectList[0].removeEventListener('change', e=>change(e));
	};
	return {
		destroy: ()=>{
			removeListeners();
		}
  }
};
export default cascadingSelects;