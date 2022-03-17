import Ajax from './utils/ajax.js';
import Session from './utils/sessions.js';
import Locale from './utils/locale.js';
import App from  './app/app.js';
import Home from  './app/home/home.js';

(async ()=>{
  const config = await Ajax.open('/config.json');
  const esLangUi = await Ajax.open('/i18n/app/es.json');
  const enLangUi = await Ajax.open('/i18n/app/en.json');
  const esLangApp = await Ajax.open('/i18n/common/es.json');  
  const enLangApp = await Ajax.open('/i18n/common/en.json');
  const unifiedEsLang = {...Object.assign(esLangUi.translation, esLangApp.translation)};
  const unifiedEnLang = {...Object.assign(enLangUi.translation, enLangApp.translation)};
  const esLang = {lang: esLangUi.lang, translation: unifiedEsLang};
  const enLang = {lang: enLangUi.lang, translation: unifiedEnLang};
  const session = Session.get('my-places');
  const sessionLang = session ? session.lang : null;
  Locale.init([esLang, enLang], sessionLang);
  App('app', config);
})();