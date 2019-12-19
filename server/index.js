const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Reviews = require('../db/data').Reviews;
const Zips = require('../db/data').Zips;
const path = require('path');


const app = express();
const port = process.env.PORT || 3004;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/reviews/:id', async (req, res) => {
  try {
    const data = await Reviews.findAll({ where: { ListingId: req.params.id } })

    if(!data){
      res.status(404).send()
    }

    res.status(200).send(data)
  } catch (e) {
    res.status(500).res.send(e)
  }
});

app.get('/zips/:id', async (req, res) => {
  try {
    const data = await Zips.findAll({ where: { ListingId: req.params.id } })

    if(!data){
      res.status(404).send()
    }

    res.status(200).send(data)
  } catch (e) {
    res.status(500).res.send(e)
  }
})

app.listen(port, () => {
  console.log(`Server listening on port -> ${port} <-`);
});