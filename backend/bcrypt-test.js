const bcrypt = require('bcrypt');
const hash = '$2b$10$OQpGJw0yB1BvL2KJw0qv8OQpGJw0yB1BvL2KJw0qv8OQpGJw0yB1Bv';
const result = bcrypt.compareSync('password', hash);
console.log(result); // Should print true