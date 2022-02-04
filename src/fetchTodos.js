const express = require('express');
const serverless = require('serverless-http');
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/fetchTodos', async (req, res) => {
  let todos;

  try {
    const results = await dynamodb
      .scan({
        TableName: 'TodoTable',
      })
      .promise();
    todos = results.Items;
  } catch (err) {
    console.log(err);
  }

  res.send(JSON.stringify(todos));
});

module.exports.handler = serverless(app);
