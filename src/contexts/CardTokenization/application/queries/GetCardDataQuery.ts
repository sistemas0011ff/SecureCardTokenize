import { IQuery } from "../../../../contexts/shared/cqrs/IQuery";

export class GetCardDataQuery implements IQuery {
    constructor(public readonly token: string) {}
}