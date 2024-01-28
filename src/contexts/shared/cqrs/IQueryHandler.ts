 
import { IQuery } from "./IQuery";

export interface IQueryHandler<Q extends IQuery, R> {
    execute(query: Q): Promise<R>;
}
