// index.js

const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const enquiryRoutes = require('./src/routes/enquiriesRoutes');
const contactRoutes = require('./src/routes/contactRoute');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', enquiryRoutes);
app.use('/contact', contactRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});