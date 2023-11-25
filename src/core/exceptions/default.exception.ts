export class DefaultException extends Error {
  constructor(message?: string) {
    super(message ?? 'Sorry for an error, check your connection or try a few more moments.');
    this.name = 'DefaultException';
  }
}
