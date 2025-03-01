import { UseCase } from "../../../../shared/application/useCases/UseCase";
import { AuthenticationService } from "../services/AuthenticationService";

export class CheckIsAuthenticatedUseCase implements UseCase{
    constructor(
        private readonly authenticationService: AuthenticationService,
    ) {}

    public async execute(token: string) {
        const usuario = await this.authenticationService.tryGetAuthenticatedUser(token);
        return {token, usuario};
    }
}