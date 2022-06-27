// import { isIntersectionTypeNode } from "typescript";
// import { 
//     NOTE_LETTERS, OCTAVE_MIN, OCTAVE_MAX, INT_NOTE_MIN, INT_NOTE_MAX } from "../config/constants.ts";
import TriggerWhen from './TriggerWhen.ts';
import NoteToPlay from './NoteToPlay.ts';
import VolumeToPlay from './VolumeToPlay.ts';
import IntervalsToPlay from './IntervalsToPlay.ts';

import NoteIntervalCalculator from './NoteIntervalCalculator.ts';

import IMusicScale from '../../Types/IMusicScale.ts';
import IMusicKey from '../../Types/IMusicKey.ts';
import IToneJSDuration from '../../Types/IToneJSDuration.ts';
import IToneJSNote from '../../Types/IToneJSNote.ts';

import { makeObservable, observable, flow, action, computed } from "mobx"

class SequencerLoaderHolder {
    name: string;
    type: "drone" | "step" | "arpeggiator"
    description?: string = "";
    length?: number = undefined;
    triggerWhen: TriggerWhen = new TriggerWhen();
    noteNotInterval: boolean = false;
    intervalToPlay: IntervalsToPlay = new IntervalsToPlay();
    noteToPlay: NoteToPlay = new NoteToPlay();
    volumeToPlay: VolumeToPlay = new VolumeToPlay();

    note(key: IMusicKey, scale: IMusicScale, beatNumber: number): IToneJSNote {
        let startNote = `${key}4`;
        let noteIntervalCalculator = new NoteIntervalCalculator(key, scale);
        if (this.noteNotInterval) {
            return this.noteToPlay.get();
        }
        let interval = this.intervalToPlay.get(beatNumber);
        if (!interval) {
            console.warn("No Interval Found");
            return startNote;
        }
        return noteIntervalCalculator.getNote(startNote, interval);
    }

    volume(): number {
        return 0;
    }
}

export default class SequencerLoader {
    sequencerCode: string = '';
    sequencerHolder: SequencerLoaderHolder = new SequencerLoaderHolder();
    
    get name() {
        return this.sequencerHolder.name;   
    }

    get type() {
        return this.sequencerHolder.type;   
    }

    measureBeat(beatNumber: number) {
        return (beatNumber - 1) % this.length();
    }

    duration(beatNumber: number): IToneJSDuration {
        return "8n";
    }

    volume(beatNumber: number): number {
        return this.sequencerHolder.volume(this.measureBeat(beatNumber));
    }

    note(key: IMusicKey, scale: IMusicScale, beatNumber: number): IToneJSNote {
        return this.sequencerHolder.note(key, scale, this.measureBeat(beatNumber));
    }

    length(): number {
        return this.sequencerHolder.length;
    }

    code() {
        return this.sequencerCode;
    }

    triggerWhen() {
        return this.sequencerHolder.triggerWhen;
    }

    lines(): Array<string> {
        if (this.sequencerCode) {
            return this.sequencerCode.split("\n");
        } 
        return [];
    }

    functionNameFromLine(line: string) {
        return line.split(" ")[1];
    }

    getVariable(name: string, line: string) {
        return line.split("=")[1].trim().replace(/['"]+/g, '');
    }

    getNumberVariable(name: string, line: string) {
        return parseInt(line.split("=")[1]);
    }

    parseLineForFunction(functionIn: string, line: string) {
        switch(functionIn) {
            case "NoteToPlay":
                this.sequencerHolder.noteNotInterval = true;
                this.sequencerHolder.noteToPlay.parse(line);
                break;
            case "IntervalToPlay":
                this.sequencerHolder.intervalToPlay.parse(line);
                break;
            case "IntervalsToPlay":
                this.sequencerHolder.intervalToPlay.parse(line);
                break;
            case "TriggerWhen":
                this.sequencerHolder.triggerWhen.parse(line);
                break;
            default:
                break;
        }
    }

    async load() {
        let inFunction = false;
        let functionIn = "";

        for (const line of this.lines()) {
            if (inFunction) {
                if (line === "end") {
                    inFunction = false;
                    functionIn = "";
                } else {
                    this.parseLineForFunction(functionIn, line);
                }
            }

            if (line.startsWith('name = ')) {
                this.sequencerHolder.name = this.getVariable('name', line);
            }

            if (line.startsWith('description = ')) {
                this.sequencerHolder.description = this.getVariable('description', line);
            }

            if (line.startsWith('length = ')) {
                this.sequencerHolder.length = this.getNumberVariable('length', line);                
            }

            if (line.startsWith('type = ') || line.startsWith('type=')) {
                this.sequencerHolder.type = this.getVariable('type', line);
            }

            if (line.startsWith('def ')) {
                inFunction = true;
                functionIn = this.functionNameFromLine(line);
            }
        }
    }

    constructor(sequencerCode: string) {
        this.sequencerCode = sequencerCode;

        makeObservable(this, {
            name: computed,
            type: computed,
            load: action,
            // fetch: flow
          });
      
    }
}