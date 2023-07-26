import { XcPlugin } from 'nc-plugin';
import OpenAI from './OpenAI';

class OpenAIPlugin extends XcPlugin {
  private static openAI: OpenAI;

  public getAdapter() {
    return OpenAIPlugin.openAI;
  }

  public async init(config: any): Promise<any> {
    OpenAIPlugin.openAI = new OpenAI(config);
    await OpenAIPlugin.openAI.init();
  }
}

export default OpenAIPlugin;
