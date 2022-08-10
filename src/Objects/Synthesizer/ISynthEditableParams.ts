export default interface ISynthEditableParams {
    name: string;
    field: string;
    fieldType: "slider" | "arraySelector" | "radio" | "dial";
    fieldOptions: {
        max?: number;
        min?: number;
        current: number | string;
        options?: Array<number | string>;
    }
}