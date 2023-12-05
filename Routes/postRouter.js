const express = require('express')

const router = express.Router()

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(403).json({ message: 'Token not provided' });
    }
  
    jwt.verify(token, 'your-secret-key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
  
      req.user = decoded;
      next();
    });
  };

router.post('/posts', verifyToken, async (req, res) => {
    try {
      const { title, body, active, latitude, longitude } = req.body;
  
      const post = new Post({
        title,
        body,
        createdBy: req.user.userId,
        active,
        location: {
          type: 'Point',
          coordinates: [latitude, longitude],
        },
      });
  
      await post.save();
      res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.get('/posts', verifyToken, async (req, res) => {
    try {
      const posts = await Post.find({ createdBy: req.user.userId });
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.put('/posts/:postId', verifyToken, async (req, res) => {
    try {
      const { title, body, active, latitude, longitude } = req.body;
  
      const updatedPost = await Post.findOneAndUpdate(
        { _id: req.params.postId, createdBy: req.user.userId },
        {
          title,
          body,
          active,
          location: {
            type: 'Point',
            coordinates: [latitude, longitude],
          },
        },
        { new: true }
      );
  
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found or unauthorized' });
      }
  
      res.status(200).json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.delete('/posts/:postId', verifyToken, async (req, res) => {
    try {
      const deletedPost = await Post.findOneAndDelete({
        _id: req.params.postId,
        createdBy: req.user.userId,
      });
  
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found or unauthorized' });
      }
  
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

  router.get('/posts/nearby', async (req, res) => {
    try {
      const { latitude, longitude } = req.query;
  
      const nearbyPosts = await Post.find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [parseFloat(latitude), parseFloat(longitude)],
            },
            $maxDistance: 10000, // Maximum distance in meters (adjust as needed)
          },
        },
      });
  
      res.status(200).json(nearbyPosts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.get('/posts/count', async (req, res) => {
    try {
      const activeCount = await Post.countDocuments({ active: true });
      const inactiveCount = await Post.countDocuments({ active: false });
  
      res.status(200).json({ activeCount, inactiveCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
      console.log("error");
    }
  });


module.exports = router