import Placeable from "./Placeable.ts";

export default class Arranger extends Placeable {
    id: number;
    number: string;
    type: string;
    slug: string;


    constructor(type: string, id: number) {
        super();
        this.id = id;
        this.slug = `arranger-${id}`;
        this.type = type;
    }
}