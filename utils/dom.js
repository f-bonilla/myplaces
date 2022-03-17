const clearSelect = select=>select.innerHTML = '';
const Dom = (()=>{
  return {
    populateSelect: (select, data)=>{
      let selectOption;
      clearSelect(select);
      data.forEach((item, index)=>{
        selectOption = document.createElement('option');
        selectOption.id = item.id;
        selectOption.text = item.nm || item.name;
        select.appendChild(selectOption);
      });
    }
  };
})();
export default Dom;