import Logger from './logger.js';
import Locale from './locale.js';
import {createElementFromHTML} from './strings.js';

const translateTemplate = (list, templateId)=>{
  list[templateId].forEach(element=>{
    const dataLang = Locale.get(element.getAttribute('data-lang'));
    element.innerHTML = dataLang;
  });  
};
const Templates = (()=>{
  const head  = document.getElementsByTagName('head')[0];
  let templateItems = {};
  const on_localeChanged = ()=>{
    for(const templateId in templateItems){
      translateTemplate(templateItems, templateId);
    }
  };
  Locale.changed(on_localeChanged);
  return {
    add: (id, css, template)=>{
      head.appendChild(css);
      const dom = createElementFromHTML(template);
      dom.setAttribute('id', id);
      const itemsToTranslate = dom.querySelectorAll('[data-lang]');
      if(Boolean(itemsToTranslate.length)){
        templateItems[id] = itemsToTranslate;
        translateTemplate(templateItems, id);
      }
      return dom;
    },
    addItem: (templateId, item)=>{
      templateItems[id] = itemsToTranslate;
      translateTemplate(templateItems, id);
    },
    remove: (id)=>{
      var linkNode = document.querySelector('link[id="'+id+'"]');
      linkNode.parentNode.removeChild(linkNode);
      delete templateItems[id];
    }
  }
})();

export default Templates;