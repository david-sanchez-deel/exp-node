import { UserService } from "@exp/services";
import { Controller, Post } from "@exp/decorators";

@Controller('/api/v1/sign-up')
export class SignUpController {
  constructor(private userService: UserService) {
  }

  @Post('')
  public async signUp({ body }) {
    const user = await this.userService.create(body);
    return { name: user.name, _id: user._id };
  }
}
