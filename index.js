const express = require('express');
const app = express();

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('app')
})

app.listen(3000, () => {
  console.log(`app listening to http://localhost:3000`)
})