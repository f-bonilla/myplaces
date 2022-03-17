import {notations} from './strings.js';

const Constants = {
  input: 'INPUT',
  textArea: 'TEXTAREA',
  select: 'SELECT'
}
const reduceRadioInputs = (list, form)=>{
  let group;
  const resultList = [...list];
  let index = resultList.length-1;
  while (index >= 0) {
    resultList[index].id = notations.snakeCase(resultList[index].id);
    if (resultList[index].type === 'radio' && !resultList[index].checked){
      resultList.splice(index, 1);
    }else if(resultList[index].type === 'radio' && resultList[index].checked){
      resultList[index].id = resultList[index].name;
    }
    index -= 1;
  }
  return resultList;
};
const itemFormToObject = (item, form)=>{
  let result;
  switch(item.tagName){
    case Constants.select:
      const option = item.options[item.selectedIndex];
      result = {id:item.id, value: option.id};
      break;
    case Constants.input:
      switch(item.type){
        default:
          result = {id:item.id, value: item.value};
          break;
      }
      break;
    case Constants.textArea:
      result = {id:item.id, value: item.value}      
      break;
  };
  return result;
}
const validateFormElement = (item)=>{
  if(item.required) return Boolean(item.value || item.text);
  return item;
};
const Forms = (()=>{
  return {
    validate: (form) => {
      const formItems = [...form.querySelectorAll([
        name="input",
        name="textarea",
        name="select"]
      )];
      const resultItems = [];
      let itemObject;
      const reducedList = reduceRadioInputs(formItems, form);
      let validElements = Object.values(Constants);

      const result = reducedList.every(item=>{
        if (validElements.includes(item.tagName)){
          itemObject = validateFormElement(itemFormToObject(item, form));
          return itemObject
            ? resultItems.push({...itemObject})
            : false;  
        }else{
          return true;
        }
      });
      return result ? resultItems : result;
    },
    parse: (formData, service)=>{
      const request = {};
      formData.forEach((item, index)=>request[item.id] = item.value);
      return request;
    }
  }
})();

export default Forms;