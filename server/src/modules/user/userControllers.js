import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './userModel';

export const userGetAll = (req, res, next) => {
  User.find()
    .select('-__v')
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

export const userCreate = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((urs) => {
      if (urs.length > 0) {
        res.status(201).json({
          message: 'Mail exist',
        });
      }

      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        }

        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email,
          password: hash,
        });

        user
          .save()
          .then((result) => {
            console.log(result);
            res.status(201).json({
              message: 'User created',
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
      });
    });
};

export const productGetById = (req, res, next) => {
  const id = req.params.productId;
  User.findById(id)
    .select('-__v')
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: 'No product for provided id' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

export const productUpdateById = (req, res, next) => {
  const id = req.params.productId;
  User.update({ _id: id }, { $set: req.body })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json({
          message: 'User updated',
        });
      } else {
        res.status(400).json({
          message: 'User not found',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

export const productDeleteById = (req, res, next) => {
  const id = req.params.productId;
  User.remove({ _id: id })
    .exec()
    .then((doc) => {
      if (doc.result.n) {
        res.status(200).json({
          message: 'User deleted',
        });
      } else {
        res.status(400).json({
          message: 'User not found',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

