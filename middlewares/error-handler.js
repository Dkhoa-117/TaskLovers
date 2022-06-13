const { CustomAPIError } = require("../errors/custom-error");
const errorHandler = (error, req, res, next) => {
	if (error instanceof CustomAPIError) {
		console.log(error.message);
		return res.status(error.statusCode).json({ message: error.message });
	}
	return res
		.status(500)
		.json({ message: "Something went wrong, try again later" });
};

module.exports = errorHandler;
