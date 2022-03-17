const Ajax = ((resolve, reject) => {
  let xhr, method, formattedParams, resultValue;
  return {
    open: (url, keyValuePairs, method='GET') => {
      return new Promise((resolve, reject) => {
        if(keyValuePairs){
          formattedParams = '&';
          formattedParams += Object.keys(keyValuePairs)
            .map((key) => {
              resultValue = String(keyValuePairs[key]).indexOf("&") > -1
                ? encodeURIComponent(keyValuePairs[key])
                : keyValuePairs[key];
              return key + "=" + resultValue;
          }).join("&");
          if (method === "GET") url = url + "?" + formattedParams;
        }
        xhr = window.XMLHttpRequest
          ? new XMLHttpRequest()
          : new ActiveXObject("Microsoft.XMLHTTP");
        xhr.onloadend = function (data) {
          if (this.status >= 200 && this.status < 300) {
            try{
              let result = JSON.parse(xhr.response);
              resolve(result);
            }catch(err){
              reject({
                errorId: -16,
                url: url,
                message: "server response <empty>",
                result: err,
                //xhr: xhr.response,
              });
            }
          } else {
            reject({
              errorId: -11,
              url: url,
              message: "xhr onloadend error",
              status: this.status,
              statusText: xhr.statusText,
              result: null,
            });
          }
        };
        xhr.onerror = function (data) {
          reject({
            errorId: -12,
            url: url,
            message: "xhr onerror",
            status: this.status,
            statusText: xhr.statusText,
            result: null,
            serverResponse: data,
            //xhr: xhr
          });
        };
        xhr.open(method, url, true);
        xhr.withCredentials = true;
        xhr.setRequestHeader(
          "content-type",
          "application/x-www-form-urlencoded" +
            "; charset=utf-8; boundary=" +
            Math.random().toString().substr(2)
        );
        xhr.send(formattedParams);
      });
    },
  };
})();

export default Ajax;