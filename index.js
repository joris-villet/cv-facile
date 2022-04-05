const express = require('express');
const app = express();


app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static('public'))

// const path = require('path')
// const fs = require('fs')

// const pathFile = path.join(__dirname, 'cv/dist/index.html');
// const cvFile = fs.readFileSync(pathFile, 'utf8')
// console.log(cvFile)

app.use(express.static(__dirname + '/cv/dist'));

app.get('/', (req, res) => {
  res.sendFile('/index.html')
  // res.render('app')
})

app.listen(3000, () => {
  console.log(`app listening to http://localhost:3000`)
})