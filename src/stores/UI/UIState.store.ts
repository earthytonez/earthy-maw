import { makeObservable, action, observable } from 'mobx';

type MachineType = 'sequencer' | 'modulator' | 'synthesizer' | 'arranger' | undefined

export default class UIStateStore {
    objectEditIsOpen: boolean = false;
    objectEditing: string | undefined = '';
    objectEditType: 'sequencer' | 'modulator' | 'synthesizer' | 'arranger' | "musicFeature" | undefined;
    objectEditTrack: number | "musicFeature" |  undefined;

  toggleObjectEdit(open: boolean, machineTrack?: number | "musicFeature", machineType?: MachineType | "musicFeature", machineSlug?: string) {
    if (!open) {
      this.objectEditIsOpen = false;
      return;
    }

    this.objectEditTrack = machineTrack;
    this.objectEditing = machineSlug;
    this.objectEditType = machineType;

    this.objectEditIsOpen = !this.objectEditIsOpen;
    console.log(`Edit Panel for ${this.objectEditing} ${this.objectEditType} is ${this.objectEditIsOpen}`);
  }
    
  constructor() {
    makeObservable(this, {
      objectEditIsOpen: observable,
      objectEditing: observable,
      toggleObjectEdit: action.bound,
    });
  }
}
