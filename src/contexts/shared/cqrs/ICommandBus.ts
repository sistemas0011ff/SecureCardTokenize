// src/contexts/shared/cqrs/ICommandBus.ts

import { ICommand } from "./ICommand";
import { ICommandResult } from "./ICommandResult";

export interface ICommandBus {
    execute<T, C>(command: ICommand): Promise<ICommandResult<T, C>>;
}
