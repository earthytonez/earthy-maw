import logfmt from 'logfmt';

export function error(message: string, object?: any) {
    console.error(logfmt.stringify({...object, message}))   
}

export function debug(message: string, object?: any) {
    console.log(logfmt.stringify({...object, message}))   
}

export function warn(message: string, object?: any) {
    console.log(logfmt.stringify({...object, message}))   
}

export function info(message: string, object?: any) {
    console.log(logfmt.stringify({...object, message}))   
}

module.exports = {
    debug, error, info, warn
}