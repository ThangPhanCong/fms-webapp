module.exports = {
    parseCustomer: (conv, prop, type, value) => {
        if (conv.type === "comment" && conv.customer && conv.customer.length > 0) {
            if (type === "update") {
                conv.customer[0][prop] = value;
                return conv;
            } else {
                return conv.customer[0][prop];
            }
        } else if (conv.customer && conv.type === "inbox") {
            if (type === "update") {
                conv.customer[prop] = value;
                return conv;
            } else {
                return conv.customer[prop];
            }
        } else if (conv.from && !type) {
            return conv.from[prop];
        }
    }
};