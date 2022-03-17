const LoggerStyles = {
	default: 'background: white; color: black;',
	levelOne: 'background: #005500; color: #bada55; padding: 4px;',
	levelTwo: 'background: #007700; color: #bada55; padding: 4px;',
	levelThree: 'background: #009900; color: #bada55; padding: 4px;',
	levelFour: 'background: #009955; color: #bada55; padding: 4px;'
};
const Logger = (()=>{
	const debug = false;
	const output = (msg, logType, style)=>{
		const isString = typeof(msg) === 'string';
		msg = isString ? '%c' + msg : msg;
		logType(msg, isString ? style : ' ');
		if(debug){
			console.groupCollapsed('Logger stack');
		  console.trace();
		  console.groupEnd();	
		}
	};
	const defaultStyle = LoggerStyles.default;
	return {
		log: (msg, style=defaultStyle)=>{
			output(msg, console.log, style);
		},
		warn: (msg, style=defaultStyle)=>{
			output(msg, console.warn, style);
		},
		info: (msg, style=defaultStyle)=>{
			output(msg, console.info, style);
		},
		error: (msg, style=defaultStyle)=>{
			output(msg, console.error, style);
		},
		styles: LoggerStyles
	}  
})();
export default Logger;