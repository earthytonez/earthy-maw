import BaseParameter from "stores/Parameter/Base";
import UserParameterStore from "stores/UserParameter.store";

export interface IPluginNode {
  ToneJSNode: any;
}

export interface IPlugin {
  _node: IPluginNode;
}

export interface IBasePlugin {}

export default class BasePlugin {
  _node?: IPluginNode;

  constructor(
    protected _trackID: string,
    protected _userParameterStore: UserParameterStore,
    _options: any
  ) {}

  get parameters(): Map<string, BaseParameter> {
    return new Map();
  }
}
