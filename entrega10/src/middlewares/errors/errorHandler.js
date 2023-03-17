import { ERRORS_ENUM } from "../../consts/index.js";

/*export default (error, req, res, next) => {
    switch (error.status) {
        case ERRORS_ENUM["INVALID PRODUCT PROPERTY"]
        case EErrors.INVALID_TYPES_ERROR:
          res
            .status(error.status)
            .send({ status: error.status, response: error.response });
          break;
        case EErrors.SERVER_ERROR:
          res
            .status(error.status)
            .send({ status: error.status, response: error.response });
          break;
        default:
          res.send({ status: "error", error: "Unhandled error" });
      }
    
}*/

export const errorHandler = (error, req, res, next) => {
    console.log(`El error es: ${error}`);

    const errorMessage = ERRORS_ENUM[error.name] || "Unhandled error"

    res.send({
        status: 'Error',
        error: errorMessage
    })
}
