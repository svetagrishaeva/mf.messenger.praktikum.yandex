import {queryStringify} from './useful-functions';

const METHODS = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	PATCH: 'PATCH',
	DELETE: 'DELETE'
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

    request = (url: string, options: TypeOptions, timeout = 10000) => {
    	const {method, data, headers} = options;
    	const xhr = new XMLHttpRequest();

    	// ToDo: вынести в тип
    	return new Promise<{ ok: boolean, response: any }>((resolve, reject) => {
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
    				response = {ok: true, response: this.getResponse(xhr.response)};
    			} else {
    				const obj = this.getResponse(xhr.response);
    				const error = `Ответ от сервера: ${xhr.status} | ошибка: ${obj.error}, причина: ${obj.reason}`;
    				response = {ok: false, response: error};
    			}

    			return resolve(response);
    		};

    		xhr.timeout = timeout;
    		xhr.onabort = reject;
    		xhr.onerror = reject;
    		xhr.ontimeout = reject;

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
    }
}
