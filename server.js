const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/proxy', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).send('URL is required');
  try {
    const response = await fetch(url);
    const body = await response.text();
    res.send(body);
  } catch (e) {
    res.status(500).send('Error fetching page');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Nova proxy server running on port', PORT));
