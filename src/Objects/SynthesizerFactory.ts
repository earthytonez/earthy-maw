
import { SYNTH_TYPE_FROM_STRING } from "../config/constants.ts";

import { Volume } from 'tone';

import { error } from '../Util/logger.ts';

export function getSynthesizer(type: string, vol: Volume) {
    console.log(`Getting Synthesizer of type ${type}`);
    try {
        return new SYNTH_TYPE_FROM_STRING[type](vol);
    } catch(err) {
        error("SynthesizerFactory", err)
        error("SynthesizerFactory", `Error getting synthesizer of type ${type}`, err);
        return undefined;
    }
}

