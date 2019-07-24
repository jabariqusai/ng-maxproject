// For demo purposes
export class LoggingService {
  lastLog: string;

  printLog(msg: string): void {
    console.log(this.lastLog);
    console.log(msg);
    this.lastLog = msg;
  }
}
