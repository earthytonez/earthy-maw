import ISynthType from "./ISynthType";

export default interface ISynthDefinition {
  name: string;
  description: string;
  slug: string;
  tags: string[];
  type: ISynthType;
  parameters: string[];
}
