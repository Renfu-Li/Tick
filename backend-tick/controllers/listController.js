const Router = require("express").Router;
const Task = require("../models/taskModel");
const List = require("../models/listModel");
const listRouter = Router();

listRouter.get("/", async (req, res) => {
  const lists = req.user.lists;
  return res.status(200).json(lists);
});

listRouter.get("/:id", async (req, res) => {
  const listId = req.params.id;
  const lists = req.user.lists;
  const foundList = lists.find((list) => list.id === listId);

  return res.status(200).json(foundList);
});

listRouter.post("/", async (req, res) => {
  const user = req.user;
  const { listName } = req.body;

  const newList = new List({
    listName,
    tasks: [],
  });
  await newList.save();

  user.lists.push(newList);
  await user.save();

  return res.status(200).json(user.lists);
});

listRouter.put("/:id", async (req, res) => {
  const listId = req.params.id;
  const { listName, tasks } = req.body;
  await List.findByIdAndUpdate(listId, { listName, tasks }, { new: true });
});

listRouter.delete("/:listId", async (req, res) => {
  const user = req.user;
  const listId = req.params.listId;
  user.lists.pull(listId);
  await user.save();

  // also delete all the tasks within that list
  await Task.deleteMany({ _id: listId });

  res.status(200).json(user.lists);
});

module.exports = listRouter;
