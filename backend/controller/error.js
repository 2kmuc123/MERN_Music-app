exports.error = (id, message) => {
    return {
        "code": id,
        "error": message
    }
}