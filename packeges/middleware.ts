import AuthInfo from "../BackendTypes/AuthInfo";

export default class Middleware {
    auth: AuthInfo;
    constructor(auth: AuthInfo) {
        this.auth = auth;
    }
    execute(check: boolean, callback?: Function) {
        if (check) {
            if (callback) {
                return callback();
            }
            return {
                props: {}
            }
        }
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
    only(...args: Array<string>): boolean {
        let result: boolean = false;
        args.forEach((guard) => {
            if (this.auth?.[guard]) {
                result = true;
            }
        })
        return result;
    }
    allExcept(...args: Array<string>): boolean {
        let result: boolean = true;
        args.forEach((guard) => {
            if (this.auth?.[guard]) {
                result = false;
            }
        })
        return result;
    }
}