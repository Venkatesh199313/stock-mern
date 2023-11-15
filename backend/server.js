const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const {Schema} = mongoose; // we can take like this

// confifure port 
const port = 5400;
// middleware function
app.use(express.json());
app.use(cors({
    origin : "*"
}))

mongoose.connect("mongodb+srv://MiniStockPriceTracker:Ganesh13@cluster0.6cccu1g.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser : true,
    useUnifiedTopology : true 
}).then(() => console.log('db connected'));


// create Schema
const StockSchema = new Schema({
    stockname : String,
    price : Number
})

// model in DB
const Stock = mongoose.model("Stock", StockSchema);

//Predefined Stocks
const predefinedStocks = [
    {
        stockname : "Reliance",
        price : 260
    },
    {
        stockname : "Adani",
        price : 450
    },
    {
        stockname : "Tata Steel",
        price : 150
    },
    {
        stockname : "Tata Coffee",
        price : 110
    }

]

// Populate the pre-defined Stocks in DB
predefinedStocks.forEach(async (stock) => {
    await Stock.create(stock);
})

//getall Stocks
app.get('/getallstocks', async (req,res) => {
    const stocks = await Stock.find();
    const stockData = {};
    stocks.forEach((stock) => {
        stockData[stock.stockname] = (stock.price + Math.random() * 10 - 5).toFixed(2) ; //change the prices
    });
    res.json(stockData);
})


app.listen(port, () => {
    console.log(`server at ${port}`);
})