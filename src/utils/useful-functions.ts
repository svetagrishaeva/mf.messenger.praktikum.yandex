type Indexed = Record<string, any>;

function getKey(key: string, parentKey?: string) {
	return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(data: Indexed | [], parentKey?: string) {
	const result: [string, string][] = [];

	for (const [key, value] of Object.entries(data)) {
		if (typeof value === 'object') {
			result.push(...getParams(value, getKey(key, parentKey)));
		} else {
			result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
		}
	}

	return result;
}

export function queryStringify(data: Indexed): string {
	if (typeof data !== 'object') {
		throw new Error('input must be an object');
	}

	return getParams(data).map(arr => arr.join('=')).join('&');
}
