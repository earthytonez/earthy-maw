import * as Tone from "tone";

export default class Arranger {
  type: string;
  machineType: string = "Arranger";
  loading: boolean = true;
  audioContext: Tone.BaseContext;

  incrementParameter(parameter: string) {
    console.log(parameter);
  }

  decrementParameter(parameter: string) {
    console.log(parameter);
  }

  changeParameter(parameter: string, value: any) {
    this[parameter as keyof this] = value;
  }

  get editParameters(): any[] {
    return [];
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  constructor(type: string, audioContext: Tone.BaseContext) {
    this.audioContext = audioContext;
    this.type = type;
  }
}
