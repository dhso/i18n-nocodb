export default class OpenAI {
  openAIOptions: any;
  private input: any;

  constructor(input: any) {
    this.input = input;
  }

  public async init(): Promise<any> {
    this.openAIOptions = {
      gpt_token: this.input.gpt_token,
      gpt_model: this.input.gpt_model || 'gpt-3.5-turbo',
      gpt_base_url: this.input.gpt_base_url || 'https://api.openai.com',
    };
  }

  public getConfig() {
    return this.openAIOptions;
  }

  public async test(): Promise<boolean> {
    try {
      return true;
    } catch (e) {
      throw e;
    }
  }
}
