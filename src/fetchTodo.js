const express = require('express');
const serverless = require('serverless-http');
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/fetchTodo/:id', async (req, res) => {
  const { id } = req.params;
  let todo;

  try {
    const result = await dynamodb
      .get({
        TableName: 'TodoTable',
        Key: { id },
      })
      .promise();
    todo = result.Item;
  } catch (err) {
    console.log(err);
  }

  res.send(JSON.stringify(todo));
});

module.exports.handler = serverless(app);
