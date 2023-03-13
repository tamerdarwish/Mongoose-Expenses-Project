var bodyParser = require('body-parser')
var express = require('express')
var app = express()
//var request = require('request')
var mongoose = require('mongoose')
var expenses = require('./expenses.json')
var ExpenseModel = require('./model/Expense')
const api = require('./server/routes/api')

mongoose.connect("mongodb://127.0.0.1:27017/miniProjectDB", {
  useNewUrlParser: true,
})
.then(()=>console.log("conneted to DB"))
.catch((err)=> console.log(err))


/*for(let expense of expenses){
    let e = new ExpenseModel(expense)
    e.save()
}
*/

app.use('/', api)

const port = 3200
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})



//console.log(expenses);