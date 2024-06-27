const jsonServer = require('json-server');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const adapter = new FileSync('db.json');
const db = low(adapter);

const server = jsonServer.create();
const router = jsonServer.router(db.getState());
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

// Helper function to hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Login endpoint
server.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = db.get('users').find({ username }).value();

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate a token or session if needed
  const token = uuid.v4();

  res.json({ token }); // Return token or user information
});

server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
