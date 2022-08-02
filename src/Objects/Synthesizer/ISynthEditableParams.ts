export default interface ISynthEditableParams {
    name: string;
    field: string;
    fieldType: string;
    fieldOptions: {
        max?: number;
        min?: number;
        current: number | string;
        options?: Array<number | string>;
    }
}