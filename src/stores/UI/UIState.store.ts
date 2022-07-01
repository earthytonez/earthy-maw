import { makeObservable, action, observable } from 'mobx';

type MachineType = 'sequencer' | 'modulator' | 'synthesizer' | 'arranger'

export default class UIStateStore {
    objectEditIsOpen: boolean = false;
    objectEditing: string = '';
    objectEditType: 'sequencer' | 'modulator' | 'synthesizer' | 'arranger';
    objectEditTrack: number;

  toggleObjectEdit(open: boolean, machineTrack?: number, machineType?: MachineType, machineSlug?: string) {
    if (!open) {
      this.objectEditIsOpen = false;
      return;
    }
    this.objectEditTrack = machineTrack;
    this.objectEditing = machineSlug;
    this.objectEditType = machineType;
    console.log(`Edit Panel for ${this.objectEditing} ${this.objectEditType} is ${this.objectEditIsOpen}`);
    this.objectEditIsOpen = !this.objectEditIsOpen;
  }
    
  constructor() {
    makeObservable(this, {
      objectEditIsOpen: observable,
      objectEditing: observable,
      toggleObjectEdit: action.bound,
    });
  }
}
