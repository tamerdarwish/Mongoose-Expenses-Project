const express = require('express')
const router = express.Router()

const ExpenseModel = require('../../model/Expense')
router.use(express.json())

router.get('/expenses', function (req, res) {
    let d1 = req.query.d1
    let d2 = req.query.d2

    if(d1 && d2){

        ExpenseModel.find({
            date: {
                $gte: new Date(d1), 
                $lt: new Date(d2)
            }
        }).then( function (expense) {
            res.send(expense)
        })
    }else if(d1 && d2 == undefined){
        ExpenseModel.find({
            date: {
                $gte: new Date(d1)
            }
        }).then( function (expense) {
            res.send(expense)
        })
    }
    else{
        ExpenseModel.find({}).sort('-date').then( function (expense) {
            res.send(expense)
        })
    }
  

    
})

router.post('/expense', (req, res) => {
    let e = new ExpenseModel(req.body)
    e.save().then(function(){
        res.send( 'Add Done!')
        console.log('the amount of the expense is ' + e.amount + ' for '+ e.item);

    })
  })

  router.put('/expense', (req, res) => {
    let group1 = req.query.group1
    let group2 = req.query.group2

      ExpenseModel.findOne({group:group1}).then( function (expense) {
        expense.group = group2;
        expense.save();
        res.send(expense.item + ' Updated!')
    })

  })

  router.get('/expenses/:group', function (req, res) {
    let groupName = req.params.group
    let totalStatus = req.query.total
    let total = 0

        ExpenseModel.find({group:groupName}).then( function (expense) {
           
            if(totalStatus == 'true'){
                for(let e of expense){
                    total+=e.amount
                }
                res.send({'total':total})

            } else{
                res.send(expense)
            }
        })
    
    
})



module.exports = router
