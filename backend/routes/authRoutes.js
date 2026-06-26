const express = require('express');
const router = express.Router();

// Sample login endpoint
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // For demo, accept any credentials
  if (email && password) {
    res.json({ 
      success: true, 
      message: 'Login successful',
      user: { email, name: 'Emmanuel Adekunle Peace' }
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Sample register endpoint
router.post('/register', (req, res) => {
  const { email, password, name } = req.body;
  
  if (email && password && name) {
    res.json({ 
      success: true, 
      message: 'User registered successfully',
      user: { email, name }
    });
  } else {
    res.status(400).json({ error: 'Missing required fields' });
  }
});

module.exports = router;