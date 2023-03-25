
export const testLoggers = (req, res) => {
    try {
      req.logger.debug("Debug Test");
      req.logger.info("Info Test");
      req.logger.http("Http Test");
      req.logger.warning("Warning Test");
      req.logger.error("Error Test");
      req.logger.fatal("Fatal Error Test");
      res.json({message: 'hola'})
    } catch (error) {
        console.log(' hola, el error es : ', error);
      req.logger.error(error);
    }
  };