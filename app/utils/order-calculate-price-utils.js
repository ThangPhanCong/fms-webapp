export function calculateProductsPrice(products) {
    if (!products) return 0;

    return products.reduce((totalPrice, product) => {
        return totalPrice + (product.price * product.quantity - product.discount);
    }, 0)
}

export function calculateTotalPrice(order) {
    if (!order) return 0;

    const transport_fee = parseInt(order.transport_fee) || 0;
    const productsFee = calculateProductsPrice(order.products);

    return transport_fee + productsFee;
}