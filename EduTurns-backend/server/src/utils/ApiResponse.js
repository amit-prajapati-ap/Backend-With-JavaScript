class ApiResponse extends Error {
    constructor(
        statusCode, data ,message = "Success"
    ) {
        this.statusCode = statusCode
        this.success = statusCode < 400
        this.data = data
        this.message = message
    }
}
export {ApiResponse}