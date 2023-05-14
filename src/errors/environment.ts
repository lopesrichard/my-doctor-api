export class RequiredVariableError extends Error {
  constructor(variable: string) {
    super(`Environment variable ${variable} is required`);
  }
}
