const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { username, password, firstname, lastname } = req.body;
    if (!username || !password || !firstname || !lastname) return res.status(400).json({ 'message': 'Username, password and fullname are required.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        //create and store the new user
        const result = await User.create({
            firstname,
            lastname,
            username,
            "password": hashedPwd
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${username} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };