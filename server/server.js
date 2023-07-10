const express = require('express');
const app = express();
const path = require('path');
const uploadd = require('./routes/Upload');


app.use(express.static(path.join(__dirname, 'uploads')));
app.use('/images', express.static(path.join(__dirname, 'uploads')));


app.use(express.static(path.join(__dirname, '/client/dist')))
app.get('*', (req, res)=> res.sendFile(path.join(__dirname, '/client/dist/index.html')))

app.use('/upload', uploadd);
app.get('/image/:filename', (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, 'uploads', filename);
  res.setHeader('Content-Type', 'image/jpeg');
  res.sendFile(imagePath);
});

console.log(path.join(path.resolve(), '../client/dist'));

app.listen(5000, () => {
  console.log('server listen on 5000');
});
