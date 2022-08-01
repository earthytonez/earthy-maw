export default class Arranger {
    id: number;
    number: string;
    type: string;
    slug: string;
    machineType: string = "Arranger";
    loading: boolean = true;
    
    setLoading(loading: boolean) {
        this.loading = loading;
    }

    constructor(type: string, audioContext: any) {
        this.id = id;
        this.slug = `arranger-${id}`;
        this.type = type;
    }
}