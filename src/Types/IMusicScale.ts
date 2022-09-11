/*
 * https://github.com/tonaljs/tonal/tree/28984d85e4b1e387b4bb00ce6535e7f3a23a531c/packages/chord-type
 * 
 * export interface ScaleType extends Pcset {
 *   name: string;
 *   type: string;
 *   quality: ScaleQuality;
 *   aliases: string[];
 * }
 */ 

import { ScaleType } from '@tonaljs/scale-type';

type IMusicScale = ScaleType

export default IMusicScale;

// type IMusicScale = "major" | "minor";

// export default IMusicScale