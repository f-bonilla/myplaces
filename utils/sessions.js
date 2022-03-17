import LocalStorage from './localStorage.js';

const setSession = (name, props)=>{
	LocalStorage.setItem(name + '-session', JSON.stringify({
		date: getSessionDate(),
		...props
	}));
};
const getSession = (name)=>{
  const session = JSON.parse(LocalStorage.getItem(name+'-session')) || null;
  return (session && session.date === getSessionDate())
  	? session
  	: null;
};
const getSessionDate = (d=new Date())=>d.getFullYear()+''+d.getMonth()+''+d.getDate();

const Session = (()=>{
	return {
		get: (name)=>getSession(name),
		set: (name, props)=>setSession(name, props)
	}
})();
export default Session;