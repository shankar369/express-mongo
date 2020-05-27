const express = require('express');
const Product = require('../../models/product')


const router = express.Router();


router.get('/products', (req, res, next) => {
    let query;
    if (req.query.category) {
        query = Product.find({ category: req.query.category });
    }
    else {
        query = Product.find({});
    }

    if (req.query.price_gt) {
        query.find({ cost: { $gte: req.query.price_gt } });
    }
    if (req.query.price_lt) {
        query.find({ cost: { $lte: req.query.price_lt } });
    }

    if (req.query.rating_gt) {
        query.find({ rating: { $gte: req.query.rating_gt } });
    }
    if (req.query.rating_lt) {
        query.find({ rating: { $lte: req.query.rating_lt } });
    }

    if (req.query.offset) {
        query.skip(parseInt(req.query.offset))
    }
    if (req.query.limit) {
        query.limit(parseInt(req.query.limit))
    }


    query.exec()
        .then(products => {
            res.send(products)
        })
        .catch(next)

});



router.get('/products/:id', (req, res, next) => {
    Product.findById({ _id: req.params.id }).then(product => {
        res.send(product)
    }
    ).catch(next)

});



router.post('/products', (req, res, next) => {
    Product.create(req.body).then(product => {
        res.send(product);
    }).catch(next)
});



router.put('/products/:id', (req, res, next) => {
    Product.findByIdAndUpdate({ _id: req.params.id }, req.body).then(product => {
        Product.findById(req.params.id).then(product => {
            res.send(product)
        }).catch(next)

    }).catch(next)
});



router.delete('/products/:id', (req, res, next) => {
    Product.findByIdAndDelete({ _id: req.params.id }).then(product => {
        res.send(product)
    }).catch(next)
});

module.exports = router;