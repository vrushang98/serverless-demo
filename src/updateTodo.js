const express = require('express');
const serverless = require('serverless-http');
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.put('/updateTodo/:id', async (req, res) => {
  const { completed } = req.body;
  const { id } = req.params;

  await dynamodb
    .update({
      TableName: 'TodoTable',
      Key: { id },
      UpdateExpression: 'set completed = :completed', // injecting variable completed value by colon :
      ExpressionAttributeValues: {
        ':completed': completed,
      },
      ReturnValues: 'ALL_NEW',
    })
    .promise();
  res.status(200).send(JSON.stringify({ msg: 'Todo Updated' }));
});

module.exports.handler = serverless(app);
