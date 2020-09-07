import { Controller, Get } from "@exp/decorators";

@Controller('/api/v1/status')
export class StatusController {
  @Get('')
  public status() {
    return 'ok';
  }
}
