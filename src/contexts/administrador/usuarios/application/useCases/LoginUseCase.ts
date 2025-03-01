import { UseCase } from "../../../../shared/application/useCases/UseCase";
import { AuthenticationService } from "../services/AuthenticationService";

export class LoginUseCase implements UseCase {
    constructor(
        private readonly authenticationService: AuthenticationService,
    ) { }

    public async execute(email: string, password: string) {
        const token = await this.authenticationService.authenticate(email, password);
        const usuario = await this.authenticationService.tryGetAuthenticatedUser(token.token);
        return { token, usuario };
    }
}