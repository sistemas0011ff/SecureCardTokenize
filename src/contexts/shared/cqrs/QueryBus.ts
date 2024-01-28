// src/contexts/shared/cqrs/QueryBus.ts

import { IQuery } from "./IQuery";
import { IQueryHandler } from "./IQueryHandler";
import { IQueryBus } from "./IQueryBus"; // Importa la interfaz IQueryBus

export class QueryBus implements IQueryBus { // Indica que implementa IQueryBus
    private queryHandlersMap: Map<string, IQueryHandler<any, any>>;

    constructor() {
        this.queryHandlersMap = new Map<string, IQueryHandler<any, any>>();
    }

    registerQueryHandler(queryName: string, handler: IQueryHandler<any, any>): void {
        this.queryHandlersMap.set(queryName, handler);
    }

    async execute<Q extends IQuery, R>(query: Q): Promise<R> {
        const handler = this.queryHandlersMap.get(query.constructor.name);
        if (!handler) {
            throw new Error(`No query handler registered for ${query.constructor.name}`);
        }
        return handler.execute(query);
    }
}
