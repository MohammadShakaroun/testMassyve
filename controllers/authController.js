const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Dummy user data - in a real application, you would retrieve this from a database
const users = [
  {
    id: 1,
    username: 'testuser',
    password: bcrypt.hashSync('testpassword', 8), // Store hashed passwords
  },
];

const SECRET_KEY = 'your_secreti_key';

exports.login = (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Check if the password is correct
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ token: null, message: 'Invalid password' });
  }

  // Generate a token
  const token = jwt.sign({ id: user.id }, SECRET_KEY, {
    expiresIn: 86400, // expires in 24 hours
  });

  // Send the response with the token
  res.status(200).json({
    id: user.id,
    username: user.username,
    token: token,
  });
};
