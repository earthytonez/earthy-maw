// import * as Tone from 'tone';   

// import SequencerFilter from './Synthesizers/Features/Filter';

// import { ISequencerGate } from '../../stores/Sequencer/SequencerRunner/SequencerGate';
// import IOscillatorType from "./IOscillatorType";
// import IPlayParams from '../../Types/IPlayParams';
// import ISynthEditableParams, { OSCILLATOR_TYPES } from './ISynthEditableParams';

// export default abstract class Synthesizer {
//     loading: boolean = true;
//     machineType: string = "Synthesizer";
//     abstract name: string;
//     abstract slug: string;

//     abstract play(sequencerGate: ISequencerGate, params: IPlayParams): void;
//     abstract attachVolume(vol: Tone.Volume): void;

//     /* Synthesizer Parameters */
//     abstract oscillatorType?: IOscillatorType;
//     abstract oscillatorTypeA?: IOscillatorType;
//     abstract oscillatorTypeB?: IOscillatorType;
//     abstract oscillatorTypeC?: IOscillatorType;

//     abstract pitch: number;

//     /* Synthesizer Features */
//     filter: SequencerFilter = new SequencerFilter();
//     // abstract incrementParameter(parameter: string): void
//     // abstract decrementParameter(parameter: string): void
//     // abstract changeParameter(parameter: string, value: any): void
    
//     abstract get _editParameters(): ISynthEditableParams[]

//     changeParameter(parameter: string, value: any) {
//         switch(parameter) {
//             case("oscillatorType"):
//                 if (OSCILLATOR_TYPES.includes(value)) {
//                     this.oscillatorType = value;
//                 }
//                 break;
//             case("filter.cutoff"):
//                 if (!isNaN(value)) {
//                     this.filter.cutoff = value;
//                 }
//                 break;
//             case("filter.resonance"):
//                 if (!isNaN(value)) {
//                     this.filter.resonance = value;
//                 }
//                 break;
//             case("pitch"):
//                 if (!isNaN(value)) {
//                     this.pitch = value;
//                 }
//                 break;
//         }
//       }
    
//       incrementParameter(parameter: string): void {
//         switch(parameter) {
//             case("filter.cutoff"):
//                 this.filter.cutoff++;
//                 break;
//             case("filter.resonance"):
//                 this.filter.resonance++;
//                 break;
//         }
//       }
      
//       decrementParameter(parameter: string): void {
//         /* TODO: Fix */
//         switch(parameter) {
//             case("filter.cutoff"):
//                 this.filter.cutoff--;
//                 break;
//             case("filter.resonance"):
//                 this.filter.resonance--;
//                 break;
//         }
//       }    

//     loadParameters(synthesizer: any) {
//         this.pitch = synthesizer.pitch;
//     }

//     get editParameters(): ISynthEditableParams[] {
//         let retVal = this._editParameters;
//         if (this.filter) {
//             retVal = retVal.concat(this.filter._editParameters);
//         }
//         return retVal
//     }

//     setLoading(loading: boolean) {
//         this.loading = loading;
//     }
    
//     isSynth() {
//         return true;
//     }

//     bindSynth(_synth: Synthesizer) {
//         console.log("Can't bind a Synthesizer to a Synthesizer");
//     }
// }