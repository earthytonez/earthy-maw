import { textChangeRangeIsUnchanged } from 'typescript';
import { v4 as uuidv4 } from 'uuid';


export default class Placeable {
    id: string
    x: number
    y: number
    rotation: number
    isDragging: boolean


    constructor() {
        this.id = uuidv4();
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        if (this.x < 100) {
            this.x = 100;
        }

        if (this.y < 100) {
            this.y = 100;
        }

        if (window.innerWidth - this.y < 100) {
            this.x = window.innerWidth - 100;
        }

        if (window.innerHeight - this.y < 100) {
            this.y = window.innerHeight - 100;
        }

        this.rotation = Math.random() * 180;
        this.isDragging = false;
    }

}