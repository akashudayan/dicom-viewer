export type config = {
  [key: string]: string | Array<string> | Boolean | Number;
};

export default interface ToolConfig {
  displayName: string;
  toolName: string;
  configuration?: config;
}
