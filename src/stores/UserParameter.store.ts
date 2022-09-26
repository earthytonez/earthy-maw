import { info } from '../Util/logger';

export default class UserParameterStore {
    _userParameters: Map<string, string | number | string[] | number[]> = new Map();
    
    get(key: string): string | number | string[] | number[] | undefined {
        return this._userParameters.get(key)
    }

    // `track.1.synthesizer.${parameterName}`
    get parameterKeyRegex() {
      return /(track|global)+\.[0-9]+\.(synthesizer|sequencer|arranger|track|global)+\.[a-z]+/
    }

    set(key: string, value: string | number | string[] | number[]): boolean {
        if (key.match(this.parameterKeyRegex)) {
          this._userParameters.set(key, value);
          localStorage.setItem("user_parameters", JSON.stringify(Object.fromEntries(this._userParameters)));
          return true;
        }
        return false;
    }

    constructor() {
        this.checkLocalStorage();
    }

    checkLocalStorage() {
        info("LOAD_SAVE_USER_PARAMETER_STORE", "Loading User Paramters from Local Storage");
        let _user_parameters = localStorage.getItem("user_parameters");
        let user_parameters: any;
        if (_user_parameters && _user_parameters !== "undefined") {
          user_parameters = JSON.parse(_user_parameters!);
          Object.keys(user_parameters).forEach((key: string) => {
            this.set(key, user_parameters[key]);
          })
        }
      }
    
}