const express = require('express')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const app = express()
const port = 3001

app.use(cors())
app.use(express.json())

const url = "mongodb://root:password@localhost:27017"

const getJsonFormat = () => {
    return {
        message: '',
        status: '',
        data: []
    }
}

// // // - This route should return the following fields for every product - ID - image - title - price
app.get('/display_products', async (req, res) => {
        //Connecting to Mongo
    const connection = await MongoClient.connect(url)
        //Telling Mongo which DB we want to use
    const db = connection.db('e-commerce')
        //Telling Mongo which collection we want to query
    const collection = db.collection('products')
        //Running a query
    const data = await collection.find({}).project({_id: 1, image: 1, title: 1, price: 1}).toArray()

    res.json(data)
    // console.log(data)
})

// - This route should return only a single product (based on it's ID)

// ???


// // - Create a POST route for adding a new product
app.post('/products', async(req, res) => {
    const dataToInsert = {
        title: req.body.title,
        price: req.body.price,
        image: req.body.image,
        category_id: req.body.category_id,
        category: req.body.category,
        character_id: req.body.character_id,
        character: req.body.character,
        description: req.body.description,
        image2: req.body.image2,
        image3: req.body.image3,
        deleted: req.body.deleted
    }

    const connection = await MongoClient.connect(url)
    const db = connection.db('e-commerce')
    const collection = db.collection('products')

    const result = await collection.insertOne(dataToInsert)

    let jsonResponse = getJsonFormat()

    if (result.insertedId == null) {

        jsonResponse.status = 404
        jsonResponse.message = 'add failed'
        jsonResponse.data = req.body

        res.json(jsonResponse)
    } else {
        res.json({message: 'item added'})
    }
})

// // - Create a PUT route for updating an existing product
app.put('/products/:id', async(req, res) => {
    const idToUpdate = ObjectId(req.params.id)

    const dataToUpdate = {
        title: req.body.title,
        price: req.body.price,
        image: req.body.image,
        category_id: req.body.category_id,
        category: req.body.category,
        character_id: req.body.character_id,
        character: req.body.character,
        description: req.body.description,
        image2: req.body.image2,
        image3: req.body.image3,
        deleted: req.body.deleted
    }

    const connection = await MongoClient.connect(url, {ignoreUndefined: true})
    const db = connection.db('e-commerce')
    const collection = db.collection('products')

    const result = await collection.updateOne({_id: idToUpdate}, {$set: dataToUpdate})

    let jsonResponse = getJsonFormat()

    if (result.modifiedCount === 0) {
        jsonResponse.status = 404
        jsonResponse.message = 'update failed'
        jsonResponse.data = req.body

        res.json(jsonResponse)
    } else {
        res.json({message: 'update worked'})
    }
})

// // - Create a Hard DELETE route for removing an existing product
app.delete('/products/:id/hard', async (req, res) => {
    const personToDelete = ObjectId(req.params.id)

    const connection = await MongoClient.connect(url)
    const db = connection.db('e-commerce')
    const collection = db.collection('products')

    const result = await collection.deleteOne({_id: personToDelete})

    let jsonResponse = getJsonFormat()

    if (result.deletedCount === 0) {

        jsonResponse.status = 404
        jsonResponse.message = 'delete failed'
        jsonResponse.data = req.body

        res.json(jsonResponse)
    } else {
        res.json({message: 'delete worked'})
    }
})
//
// // - Create a Soft DELETE route for removing an existing product
app.delete('/products/:id', async (req, res) => {
    const personToSoftDelete = ObjectId(req.params.id)

    const connection = await MongoClient.connect(url)
    const db = connection.db('e-commerce')
    const collection = db.collection('products')

    const result = await collection.updateOne({_id: personToSoftDelete}, {$set: {deleted: "1"}})

    let jsonResponse = getJsonFormat()

    if (result.modifiedCount === 0) {

        jsonResponse.status = 404
        jsonResponse.message = 'soft delete failed'
        jsonResponse.data = req.body

        res.json(jsonResponse)
    } else {
        res.json({message: 'soft delete worked'})
    }
})

// - This route should return either only characters, categories or 1 combination of the two
app.get('/products', async (req, res) => {

    let project_stmt = {}

    if (req.query.category && req.query.category) {
        project_stmt = {$and: [{category: req.query.category}, {character: req.query.character}]}
    }

    if (!req.query.category && req.query.character) {
        project_stmt = {character: req.query.character}
    }

    if (req.query.category && !req.query.character) {
        project_stmt = {category: req.query.category}
    }

    const connection = await MongoClient.connect(url)
    const db = connection.db('e-commerce')
    const collection = db.collection('products')

    const data = await collection.find(project_stmt).toArray()

    let jsonResponse = getJsonFormat()
    if (data.length === 0) {
        jsonResponse.status = 404
        jsonResponse.message = 'not found'
        jsonResponse.data = req.body

        res.json(jsonResponse)
    } else {
        res.json(data)
    }
    // console.log(req.query)
})

    // let character_filters = []
    // for (const filter in req.body.data.filters) {
    //     if (req.body.data.filters[filter]) {
    //         character_filters.push(filter)
    //     }
    // }
    // console.log(character_filters)
    // const data = await collection.find({'character': {$in : [{character_filters}]}}).toArray()

app.get('/products/filter', async (req, res) => {

    let project_statement = {}

    if (req.query.category && req.query.character) {
        project_statement = {"character": {$in : req.query.character.split(",")}, "category": {$in: req.query.category.split(",")}}
        // project_statement = {"character": {$in : ['Fred', 'Dolores']}, "category": {$in: ['Mugs']}}
        //                      {$and: [{category: req.query.category}, {character: req.query.character}]}
    }

    if (!req.query.category && req.query.character) {
        project_statement = {"character": {$in : req.query.character.split(",")}}
                            // {character: req.query.character}
    }

    if (req.query.category && !req.query.character) {
        project_statement = {"category": {$in: req.query.category.split(",")}}
                        //    {category: req.query.category}
        // console.log(req.query.split())
    }

    // console.log(project_statement)

    const connection = await MongoClient.connect(url)
    const db = connection.db('e-commerce')
    const collection = db.collection('products')

    // const data = await collection.find({"character": {$in : ['Fred', 'Dolores']}}).toArray()
    const data = await collection.find(project_statement).toArray()
    // const data = await collection.find({"character": {$in : ['Fred', 'Dolores']}, "category": {$in: ['Mugs', 'Baseball Hats']}}).toArray()
    // http://localhost:3001/products/filter?character=Fred&Dolores&category=Mugs&BaseballHats

    let jsonResponse = getJsonFormat()
    if (data.length === 0) {
        jsonResponse.status = 404
        jsonResponse.message = 'not found'
        jsonResponse.data = req.body

        res.json(jsonResponse)
    } else {
        res.json(data)
    }
    console.log(project_statement)
    console.log(req.query)
    console.log(req.originalUrl)


})


//need refactoring
app.get('/products/category', (req, res) => {
    res.json({
        category: ['Aprons', 'Baseball Hats', 'Mugs', 'T-shirts']
    })
})

app.get('/products/character', (req, res) => {
    res.json({
        character: ['Bubbles', 'Dolores', 'Fred', 'Rex']
    })
})



// - Create an endpoint for adding a product to a basket.
// This should be a POST request that gets sent a user id, a product _id, name and price
app.post('/products/basket', async(req, res) => {

    const userId = {
        id: req.body.id
    }

    const dataToInsert = {
        id: req.body.id,
        title: req.body.title,
        price: req.body.price,
    }

    const connection = await MongoClient.connect(url)
    const db = connection.db('e-commerce')
    const collection = db.collection('products')

    const result = await collection.insertOne(dataToInsert)

    let jsonResponse = getJsonFormat()

    if (result.insertedId == null) {

        jsonResponse.status = 404
        jsonResponse.message = 'add failed'
        jsonResponse.data = req.body

        res.json(jsonResponse)
    } else {
        res.json({message: 'item added'})
    }
})

app.get('/products/:id', async (req, res) => {

    const connection = await MongoClient.connect(url)
    const db = connection.db('e-commerce')
    const collection = db.collection('products')

    const data = await collection.find({_id: ObjectId(req.params.id)}).toArray()

    let jsonResponse = getJsonFormat()

    if (data.length === 0) {
        jsonResponse.status = 404
        jsonResponse.message = 'not found'
        jsonResponse.data = req.body

        res.json(jsonResponse)
    } else {
        res.json({message: 'found', data: data})
    }
})

app.listen(port)
