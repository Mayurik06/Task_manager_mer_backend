const verifyAdmin = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.isAdmin) {
        req.user = decoded; // Attach user info to request object
        next();
      } else {
        return res.status(403).json({ message: 'Not authorized as an admin' });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
  };

  export default verifyAdmin;