module.exports = {
    precondition: (check, message) => {
        if (!check) {
            throw new Error(message || "Precondition failed")
        }
    }
};