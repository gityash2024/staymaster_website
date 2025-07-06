class Utilities {

    purifyObject<T>(obj: T): T {
        for (let key in obj) {
            if (obj[key] === null || obj[key] === undefined) delete obj[key];
            if (obj[key] === '') delete obj[key];
            if (obj[key] === 0) delete obj[key];
            if (Array.isArray(obj[key]) && (obj[key] as any).length === 0) delete obj[key];
            if (typeof obj[key] === 'object') this.purifyObject(obj[key]);
        }
        return obj;
    }
}

export const Util = new Utilities();