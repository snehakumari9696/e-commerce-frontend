import axios from 'axios';

const backendUrl = 'http://localhost:8080';

async function testGetProducts() {
    try {
        const response = await axios.get(`${backendUrl}/products`);
        console.log('Products:', response.data);
    } catch (error) {
        console.error('Error fetching products:', error.message);
    }
}

async function testCreateOrder() {
    try {
        const orderRequest = {
            userId: 1,
            productIds: [1, 2] // Make sure these IDs exist in your DB
        };
        const response = await axios.post(`${backendUrl}/orders`, orderRequest);
        console.log('Order created:', response.data);
    } catch (error) {
        console.error('Error creating order:', error.message);
    }
}
testGetProducts();
testCreateOrder();