const bcrypt = require('bcrypt');
const hash = bcrypt.hashSync('password', 10);
console.log(hash);