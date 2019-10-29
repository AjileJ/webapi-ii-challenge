const express = require('express');
const db = require('../data/db');
const router = express.Router();



router.get('/', (req,res) => {
  db.find()
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    res.status(500).json({error: "The post information could not be retrieved"})
  })
})


router.get('/:id', (req,res) => {
  const id = req.params.id
  db.findById(id)
  .then(posts => {
    if(posts){
      res.status(200).json(posts)
    }else{
      res.status(404).json({error: "The post with the specific ID does not exist."})
    }
  })
  .catch(err => {
  res.status(500).json({error: "The post information could not be retrieved"})
  })
})

router.get('/:id/comments', (req,res) => {
  const id = req.params.id
  db.findPostComments(id)
  .then(comments => {
    if(comments){
      res.status(200).json(comments)
    }else{
      res.status(404).json({error: "The post with the specific ID does not exist."})
    }
  })
  .catch(err => {
  res.status(500).json({error: "The post information could not be retrieved"})
  })
})

router.post('/', (req,res) => {
  const postInfo = req.body;
  if(!postInfo.title || !postInfo.contents){
    res.status(400).json({errorMessage: "Please provide title and contents from the post" })
  }else {
    db.insert(postInfo)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      res.status(500).json({error: "There was an error while saving the post to the database"})
    })
  }
})

router.post('/:id/comments', async(req,res) => {
  const comtext = req.body.text;
  const id = req.params.id;
  try {
     const commentInfo = await db.findById(req.params.id);
     if(commentInfo == []){
       res.status(404).json({error: "The post with the specific ID does not exist."})
     }else if (!comtext){
        res.status(400).json({error: "Please provide text for the comment"})
     }else {
       await db.insertComment({...req.body, post_id:id});
       res.status(201).json(comtext)
     }
     }catch (error){
       res.status(500).json({error: "There was an error while saving the comment to the database."})
     }
  });

  router.delete("/:id", (req, res) => {
    db.remove(req.params.id)
      .then(count => {
        if (count > 0) {
            res.status(200).json(count);
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        }
      })
      .catch(() => {
        res.status(500).json({
          error: "The post could not be removed."
        });
      });
  });

  router.put("/:id", (req, res) => {
    if (!req.body.title || !req.body.contents) {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    } else {
      db.update(req.params.id, req.body)
        .then(post => {
          if (post) {
            res.status(200).json(req.body);
          } else {
            res.status(404).json({
              message: "The post with the specified ID does not exist."
            });
          }
        })
        .catch(() => {
          res.status(500).json({
            error: "The post information could not be modified."
          });
        });
    }
  });











module.exports = router