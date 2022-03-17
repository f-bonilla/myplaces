import Views from '../../utils/views.js';
import {createElementFromHTML} from '../../utils/strings.js';

const place = data=>{
	const result = `
	<details id="${data.id}" class="Place">
	  <summary>
	    <div>
				<a href="${data.image}" target="_blank"><img src="${data.image}" width="60px" height="60px"></a>
				<div>
					<div class="ItemName">${data.name}</div>
					<div class="ItemAddress">${data.address}</div>
				</div>
			</div>
	  </summary>
	  <div id="detail-content">
		  <p>
			  <a href="tel:${data.phone}">${data.phone}</a>
				<a href="mailto:${data.email}">${data.email}</a>
				<a href="${data.web}" target="_blank">${data.web}</a>
		  </p>
		  <div>${data.description}</div>
	  </div>
	</details>
	`;
	return createElementFromHTML(result);
};

const ItemsListView = (view, data)=>{
	if(Boolean(data.result.length)){
		data.result.forEach(placeData=>view.appendChild(place(placeData)));
	}
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
export default ItemsListView;

