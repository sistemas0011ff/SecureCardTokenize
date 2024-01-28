// src/contexts/shared/cqrs/CommandBus.ts

import { ICommandBus } from "./ICommandBus";
import { ICommand } from "./ICommand";
import { ICommandHandler } from "./ICommandHandler";
import { ICommandResult } from "./ICommandResult";

export class CommandBus implements ICommandBus {
    private commandHandlersMap: Map<string, ICommandHandler<any, any>>;

    constructor() {
        this.commandHandlersMap = new Map<string, ICommandHandler<any, any>>();
    }

    registerCommandHandler(commandName: string, handler: ICommandHandler<any, any>): void {
        this.commandHandlersMap.set(commandName, handler);
    }

    async execute<T, C>(command: ICommand): Promise<ICommandResult<T, C>> {
        const handler = this.commandHandlersMap.get(command.constructor.name);
        if (!handler) {
            throw new Error(`No command handler registered for ${command.constructor.name}`);
        }
        return handler.handle(command);
    }
}
