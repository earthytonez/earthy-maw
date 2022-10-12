import ISynthType from "./ISynthType";

export default interface IParsedSynthesizerTOML {
  name: string;
  description: string;
  type: ISynthType;
  tags: string[];
  plugins: string[];
  parameters: string[];
}
