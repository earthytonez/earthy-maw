class BeatMarker {
    num: number;
  
    increment() {
      if (isNaN(this.num)) {
        this.num = 0;
      }
      this.num++;
    }
    
    toString(): number {
      return this.num;
    }

    constructor(num: number) {
      this.num = num;
    }
  }

  export { BeatMarker };