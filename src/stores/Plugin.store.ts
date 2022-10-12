import FilterPlugin from "./Plugins/Filter";
import BasePlugin from "./Plugins/Base";
import RootStore from "./Root.store";

export default class PluginStore {
  constructor(private rootStore: RootStore) {
    this._plugins.set("filter", FilterPlugin);
  }
  _plugins: Map<string, typeof BasePlugin> = new Map();

  fetch(plugins: string[], trackID: string): BasePlugin[] {
    if (!plugins) return [];
    return plugins.map((pluginDef: string) => {
      console.log(`fetching PLUGINS ${pluginDef}`);

      let plugin: string;
      let subType: string | undefined;
      let splitPluginDef: string[];
      if (pluginDef.includes("<")) {
        splitPluginDef = pluginDef.split("<");
        plugin = splitPluginDef[0]!;
        subType = splitPluginDef[1]!.replace(/\>$/, "");
      } else {
        plugin = pluginDef;
        subType = undefined;
      }

      let PluginClass = this._plugins.get(plugin)!;
      if (!PluginClass) {
        throw new Error("Invalid Plugin Slug");
      }
      return new PluginClass(trackID, this.rootStore.userParameterStore, {
        subType: subType,
      });
    });
  }
}
