const express = require('express');
const router = express.Router();
const {User} = require('../models');
router.get('/', async function (req, res) {
  const users = await User.findAll();

  return res.json(users);
});

router.get('/:id', async function (req, res) {
  const id = parseInt(req.params.id);
  const user = await User.findOne({ where: { id } });

  if (user) {
    return res.json(user);
  }

  return res.status(404).json({
    error: `User with id ${id} not found`
  });
});

router.post('/', async function (req, res) {
  const { name, age } = req.body;
  const user = await User.create({ name, age });

  return res.json(user);
});

router.put('/:id', async function (req, res) {
  const id = parseInt(req.params.id);
  const { name, age } = req.body;
  const user = await User.update({ name, age }, { where: { id } });

  return res.json(user);
});

router.delete('/:id', async function (req, res) {
  const id = parseInt(req.params.id);
  const affectedRows = await User.destroy({ where: { id } });
  // 1개가 삭제되었다면 성공!
  const result = affectedRows === 1;

  return res.json(result);
});

module.exports = router;
