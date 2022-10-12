import { makeObservable, action, observable } from "mobx";

type MachineType =
  | "sequencer"
  | "modulator"
  | "synthesizer"
  | "arranger"
  | undefined;

export default class UIStateStore {
  objectEditIsOpen: boolean = false;
  objectEditing: string | undefined = "";
  objectEditType:
    | "sequencer"
    | "modulator"
    | "synthesizer"
    | "arranger"
    | "musicFeature"
    | undefined;
  objectEditTrack: string | "musicFeature" | undefined;

  machineBrowserOpen: boolean = false;
  machinesBrowsing:
    | "sequencer"
    | "modulator"
    | "synthesizer"
    | "arranger"
    | "musicFeature"
    | undefined = undefined;

  closeMachineBrowser() {
    this.machineBrowserOpen = false;
    this.machinesBrowsing = undefined;
  }

  setMachinesBrowsing(
    machineType:
      | "sequencer"
      | "modulator"
      | "synthesizer"
      | "arranger"
      | "musicFeature"
      | undefined
  ) {
    this.machinesBrowsing = machineType;
  }

  browseMachines(
    machineType:
      | "sequencer"
      | "modulator"
      | "synthesizer"
      | "arranger"
      | "musicFeature"
      | undefined,
    machineBrowserOpen?: boolean
  ) {
    this.machineBrowserOpen = true;
    if (machineBrowserOpen === false) {
      this.machineBrowserOpen = false;
    }
    this.machinesBrowsing = machineType;
  }

  toggleObjectEdit(
    open: boolean,
    machineTrack?: string | "musicFeature",
    machineType?: MachineType | "musicFeature",
    machineSlug?: string
  ) {
    if (!open) {
      this.objectEditIsOpen = false;
      return;
    }

    this.objectEditTrack = machineTrack;
    this.objectEditing = machineSlug;
    this.objectEditType = machineType;

    this.objectEditIsOpen = !this.objectEditIsOpen;
  }

  constructor() {
    makeObservable(this, {
      objectEditIsOpen: observable,
      objectEditing: observable,
      machineBrowserOpen: observable,
      machinesBrowsing: observable,
      browseMachines: action.bound,
      closeMachineBrowser: action.bound,
      toggleObjectEdit: action.bound,
      setMachinesBrowsing: action.bound,
    });
  }
}
