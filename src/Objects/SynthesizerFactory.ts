import Bell from "./Synthesizers/Bell.ts";
import HiHat from "./Synthesizers/HiHat.ts";
import Kick from "./Synthesizers/Kick.ts";

export function getSynthesizer(audioContext: any, type: string) {
    console.log(`Getting Synthesizer of type ${type}`);
    if (type === 'kick') {
        return new Kick(audioContext, 1)
    }
    if (type === 'hihat') {
        return new HiHat(audioContext, 1)
    }
    if (type === 'bell') {
        return new Bell(audioContext, 1)
    }
}

