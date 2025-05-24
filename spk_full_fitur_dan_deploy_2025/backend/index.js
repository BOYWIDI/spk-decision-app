const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => res.send('SPK API is running'));

// Placeholder routers (akan diisi nanti)
app.use('/api/users', require('./routes/users'));
app.use('/api/questions', require('./routes/questions'));
app.use('/api/kuesioner', require('./routes/kuesioner'));
app.use('/api/admins', require('./routes/admins'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/export', require('./routes/export'));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});