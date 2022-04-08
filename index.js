if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 7000;

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(cors('*'))

app.use(express.static('public'))

// app.use(express.static(__dirname + '/cv/dist'));
// app.use(express.static(__dirname + '/vue/dist'));

app.get('/', (req, res) => {
  //res.sendFile('/index.html')
  res.render('app')
})

app.listen(port, () => {
  console.log(`app listening to http://localhost:${port}`)
})