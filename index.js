const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

// database connection
const dbURI =
  'mongodb+srv://charles:chigozie1999@cluster0.65y34.mongodb.net/crud?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(PORT);
    console.log('server is started at', PORT);
  })
  .catch((err) => console.log(err));

const payloadSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const Payload = mongoose.model('payload', payloadSchema);

// get
app.get('/', async (req, res) => {
  try {
    const data = await Payload.find({}).select('firstName lastName');
    res.status(200).json({
      message: 'Data retrieved',
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: 'could not get any data',
    });
  }
});

// post
app.post('/', async (req, res) => {
  try {
    if (!req.body.firstname && !req.body.lastname) {
      res.status(400).json({
        message: 'please provide the required body',
      });
    }
    if (!req.body.firstname === '' && !req.body.lastname === '') {
      res.status(400).json({
        message: 'please make the body is not empty',
      });
    }
    const data = await Payload.create({
      firstName: req.body.firstname,
      lastName: req.body.lastname,
    });
    const { firstName, lastName } = data;
    res.status(201).json({
      message: 'data created',
      data: {
        firstName,
        lastName,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: 'could not create any data',
    });
  }
});

// put
app.put('/:firstname', async (req, res) => {
  try {
    if (!req.params.firstname && !req.body.firstname && !req.body.lastname) {
      res.status(400).json({
        message: 'please provide the required parameters',
      });
    }
    if (
      !req.params.firstname === '' &&
      !req.body.firstname === '' &&
      !req.body.lastname === ''
    ) {
      res.status(400).json({
        message: 'please make the body and parameter is not empty',
      });
    }
    const data = await Payload.findOneAndUpdate(
      {
        firstName: req.params.firstname,
      },
      {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
      },
      { new: true },
    );
    if (data === null) {
      return res.status(404).json({
        message: 'Data not found',
      });
    }
    const { firstName, lastName } = data;
    res.status(201).json({
      message: 'data updated',
      data: {
        firstName,
        lastName,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: 'could not update any data',
    });
  }
});

// delete
app.delete('/:firstname', async (req, res) => {
  try {
    if (!req.params.firstname && !req.body.firstname && !req.body.lastname) {
      res.status(400).json({
        message: 'please provide the required parameters',
      });
    }
    if (
      !req.params.firstname === '' &&
      !req.body.firstname === '' &&
      !req.body.lastname === ''
    ) {
      res.status(400).json({
        message: 'please make the body and parameter is not empty',
      });
    }
    const data = await Payload.findOneAndDelete({
      firstName: req.params.firstname,
    });
    if (data === null) {
      return res.status(404).json({
        message: 'Data not found',
      });
    }
    const { firstName, lastName } = data;
    res.status(201).json({
      message: 'data deleted',
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: 'could not deleted any data',
    });
  }
});
