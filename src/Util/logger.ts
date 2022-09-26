export function error(subsystem: string, message: string, object?: any, css?: string) {
    if (!object) {
        object = {};
    }
    console.error(`ERROR ${subsystem} ${message} / ${Object.keys(object).map((key) => { return `${key}=${object[key]} `})}`, css); 
}

export function debug(subsystem: string, message: string, object?: any, css?: string) {
    if (!object) {
        object = {};
    }
    console.debug(`DEBUG ${subsystem} ${message} / ${Object.keys(object).map((key) => { return `${key}=${JSON.stringify(object[key])} `})}`, css); 
}

export function warn(subsystem: string, message: string, object?: any, css?: string) {
    if (!object) {
        object = {};
    }
    console.warn(`WARN ${subsystem} ${message} / ${Object.keys(object).map((key) => { return `${key}=${object[key]} `})}`, css); 
}

export function info(subsystem: string, message: string, object?: any, css?: string) {
    if (!object) {
        object = {};
    }
    console.log(`INFO ${subsystem} ${message} / ${Object.keys(object).map((key) => { return `${key}=${object[key]} `})}`, css); 
}
