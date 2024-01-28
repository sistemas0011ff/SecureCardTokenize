export interface IValidateUseCase<I, O> {
    execute(input: I): Promise<O>;
}