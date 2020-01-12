import Product from '../models/products';

export default ((app) => {
    app.get('/product_list', function (req, res) {
        if(req.query.status === 'true'){
            return res.status(200).send({ status: true })
        }
        if(req.query.status === 'false'){
            return res.status(400).send({ status: false })
        }
        Product.find({}, { productDescription: 0 }).sort({ productModify: -1 }).exec(function (err, result) {
            if (err) { return res.status(400).send({ error: err }) }
            res.json(result)
        })
    })

    app.get('/product_listById', function (req, res) {
        Product.findOne({ _id: req.query._id }).exec(function (err, result) {
            if (err) { return res.status(422).send({ error: err }) }
            res.json(result)
        })
    })
})