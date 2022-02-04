const express = require('express');
const serverless = require('serverless-http');
const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hii there welcome to your first serverless application');
});

app.post('/addTodo', async (req, res) => {
  const { todo } = req.body;
  const createdAt = new Date().toISOString();
  const id = v4();

  const newTodo = {
    id,
    todo,
    createdAt,
    completed: false,
  };
  await dynamodb
    .put({
      TableName: 'TodoTable',
      Item: newTodo,
    })
    .promise();
  res.status(200).send(JSON.stringify(newTodo));
});

module.exports.handler = serverless(app);
