export default interface ISequencerParameters {
  name: string;
  field?: string;
  fieldType?: string;
  fieldOptions?: {
    min?: number;
    max?: number;
    step?: number;
    // current: number | string
  };
}
