const axios = require('axios'); // If you don't have axios, install it using: npm install axios

axios.get('http://localhost:8080/products')
    .then(response => {
        console.log('Products from backend:', response.data);
    })
    .catch(error => {
        console.error('Error connecting to backend:', error.message);
    });
