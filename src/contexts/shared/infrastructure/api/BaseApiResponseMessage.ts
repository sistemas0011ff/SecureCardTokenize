export default class BaseApiResponseMessage<T> {
  message: T;
  errorMessage?: string;

  public make(message: T, error?: any): BaseApiResponseMessage<T> {
    // Lógica de logging
    if (error) {
      if (error.type) {
        log.error({
          action: 'response',
          content: error.message
        });
      } else {
        log.fatal({
          action: 'response',
          content: error.message,
          stack: error.stack
        });
      }
      this.errorMessage = error.message;
    }

    this.message = message;
    return this;
  }
}
