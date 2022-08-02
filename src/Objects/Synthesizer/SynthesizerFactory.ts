import * as Tone from "tone";

import { SYNTH_TYPE_FROM_STRING } from "../../config/constants";

import { error } from '../../Util/logger';


export function getSynthesizer(type: string, vol: Tone.Volume, audioContext: Tone.BaseContext) {
    try {
        return new SYNTH_TYPE_FROM_STRING[type](vol, audioContext);
    } catch(err: any) {
        error("SynthesizerFactory", err)
        error("SynthesizerFactory", `Error getting synthesizer of type ${type}`, err);
        return undefined;
    }
}

