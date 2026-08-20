const fs = require('fs');
const size = fs.statSync('public/hero-bouchers.jpg').size;
console.log('hero-bouchers.jpg size:', size);
