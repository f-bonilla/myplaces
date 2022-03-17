import Logger  from './logger.js';

const Locale = (()=>{
  let language;
  let languages = {};
  let callbacks = [];
  return {
    currentLang: ()=>language,
    init: (incomingLanguages, defaultLang='es') =>{
      language = defaultLang || (navigator.language || navigator.userLanguage).split('-')[0];
      incomingLanguages.forEach(language=>{
        languages[language.lang] = language.translation;
      });
    },
    get: (key)=>{
      if (!languages[language][key]){
        return '<span>{{'+key+'}}</span>';
      }
      return languages[language][key];
    },
    change: (incomingLang)=>{
      if(!languages[incomingLang]){
        Logger.warn(languages[language]['lang_not_available'].replace('{{lang}}', incomingLang));
        return;
      }
      if(incomingLang !== language){
        language = incomingLang;
        callbacks.forEach(callback=>callback());
      }
    },
    changed: listenerCallback=>callbacks.push(listenerCallback)
  }
})();
export default Locale;