// src/contexts/shared/cqrs/IQueryBus.ts

import { IQuery } from "./IQuery";

export interface IQueryBus {
    execute<Q extends IQuery, R>(query: Q): Promise<R>;
}
