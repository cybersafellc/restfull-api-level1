import transportStream from "winston-transport";

class customTransport extends transportStream {
  constructor(options) {
    super(options);
  }

  log(info, next) {
    console.log({
      title: "this log from custom transports",
      level: info.level,
      message: info.message,
    });
    next();
  }
}
export default customTransport;
