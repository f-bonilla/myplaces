const storageSupport = ()=>{
  const data = new Map();
  return {
    clear: data.clear(),
    getItem: (key)=>JSON.parse(data.get(key)),
    removeItem: (key)=>data.delete(key),
    setItem: (key, item)=>data.set(key, JSON.stringify(item))
  }
};
const LocalStorage = (typeof(Storage) !== 'undefined') ? localStorage : storageSupport();

export default LocalStorage;