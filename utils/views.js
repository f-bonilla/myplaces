import Logger from './logger.js';
import {getUniqueId} from './strings.js';
import Templates from './templates.js';

const getStyle = (el, style)=>window.getComputedStyle(el).getPropertyValue(style)
const getHtml = async (htmlPath)=>{
	return await fetch(window.location.href+htmlPath)
  	.then(response => response.text())
  	.then(data => data);
}
const getCss = (id, cssPath)=>{
	const link  = document.createElement('link');
	link.id   = id;
	link.rel  = 'stylesheet';
	link.type = 'text/css';
	link.href = cssPath;
	link.media = 'all';
	return link;
};
const Views = (()=>{
	let container;
	return {
		add: async (id, wraperId, css, html)=>{
			container = document.getElementById(wraperId);
		  if(!container){
		    Logger.error('Views.add('+id+') in wraper "'+wraperId+'"" unknow: ' + wraperId);
		    return;
		  }
		  const template = Templates.add(id, getCss(id, css), await getHtml(html));
		  const addedView = container.appendChild(template);
		  return addedView;
		}, 
		remove: (id, wraperId)=>{
			container = document.getElementById(wraperId);
		  if(!container){
		    Logger.error('Views.remove(): dom element unknow: ' + wraperId);
		    return;
		  }else if(!container.querySelector('#'+id)){
		  	Logger.error('Views.remove(): compontent unknow, id: ' + id);
		    return;
		  }
		  Templates.remove(id);
		  container.removeChild(container.querySelector('#'+id));
		},
		api: view=>{
			let viewDisplay;
			return {
				show: ()=>{
					view.style.display=viewDisplay;
				},
				hide: ()=>{
					if(getStyle(view, 'display') !== 'none'){
						viewDisplay = getStyle(view, 'display');
					}
					view.style.display='none';
				},
				isOpen: ()=>view.style.display !== 'none',
				addEventListener: (eventName, callback)=>{
					view.addEventListener(eventName, callback);
				},
				removeEventListener: (eventName, callback)=>{
					view.addEventListener(eventName, callback);
				}
			}
		}
	}
})();

export default Views;