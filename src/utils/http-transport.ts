import { queryStringify } from "./useful-functions.js";

const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE:'DELETE'
};

export type TypeOptions = {
    data?: any;
    getParam?: {} | null;
    timeout?: number | null;
    method: string;
    headers?: any;
};


export class HTTPTransport {
    get = (url: string, options: TypeOptions | any = {}) => {
        if (options.data) {
          url += queryStringify(options.data);
        }

        return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };

    put = (url: string, options: TypeOptions | any = {}) => {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };

    post = (url: string, options: TypeOptions | any = {}) => {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };

    delete = (url: string, options: TypeOptions | any = {}) => {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };


    request = (url: string, options: TypeOptions, timeout = 5000) => {						
      let {method, data, headers} = options
      let xhr = new XMLHttpRequest();
      
      return new Promise((resolve) => {

        xhr.open(method, url, true);


        if (headers) {
          Object.keys(headers).map(key => {
            xhr.setRequestHeader(key, headers[key]);
          });
        }  

        xhr.withCredentials = true;

        xhr.onload = () => {
          let response: { ok: boolean, response: any };

          if (xhr.status === 200) {
            response = { ok: true, response: this.getResponse(xhr.response) };
          } else {
            let obj = this.getResponse(xhr.response);
            let msg = `Ответ от сервера: ${xhr.status} | ошибка: ${obj.error}, причина: ${obj.reason}`
            response = { ok: false, response: msg };
          }

          return resolve(response);
        };

        xhr.onerror = (err) => console.log('error', err);
        
        xhr.timeout = timeout;  
        xhr.ontimeout = (err) => {
            console.log('error', err);
        };
        
        if (method === METHODS.GET || !data) {
          xhr.send();
        } else if (data instanceof FormData) {
          xhr.send(data);
        } else {
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify(data));
        }
      });
    };

    private getResponse(responseStirng: string): any {
      let response: string;
    
      try {
          response = JSON.parse(responseStirng);
      } catch {
          response = responseStirng;
      }
    
      return response;
    };
}
