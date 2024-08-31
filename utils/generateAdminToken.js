const jwt = require('jsonwebtoken');
const generateAdminToken = (generateAdminToken) => {
    return jwt.sign({ email: generateAdminToken.email, id: generateAdminToken._id}, process.env.ADMIN_TOKEN);
}
module.exports.generateAdminToken = generateAdminToken;