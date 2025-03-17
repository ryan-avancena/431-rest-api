// SETUP STATEMENTS (DO NOT MODIFY)
import express, { json } from 'express';
import fs from 'fs/promises';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static('public'));
// END SETUP STATEMENTS

// STUDENT CODE AREA (Add your Custom Functions Here)

// Convert this function to async/await format
async function getCollection(req, res) {
  try {
    const jsonData = await fs.readFile('data.json','utf-8');

    if (!jsonData) {
      console.error("jsonData is empty.")
      return res.status(500).json({ error: "Internal server error."})
    }

    const data = JSON.parse(jsonData);
    const pets = data.pets || [];
    res.status(200).json(pets);
  } catch (err) {
    console.error("Error reading file:",err);
    res.status(500).json({ error: "Internal server error."})
  }
}

async function getItem(req, res) {
  // Implement Code to get 1 pet with an Id 
  const itemId = parseInt(req.params.id);
  console.log(itemId)

  try {
    const jsonData = await fs.readFile('data.json','utf-8');

    if (!jsonData) {
      console.error("jsonData is empty.")
      return res.status(500).json({ error: "Internal server error."})
    }
    const data = JSON.parse(jsonData);
    // console.log(data);
    const pets = data.pets || [];
    const pet = pets.find(p => p.id == itemId)

    console.log(pet);

    if (!pet) {
      return res.status(404).json({ error: "Pet not found." });
    }

    res.status(200).json(pet);

  } catch (err) {
    console.error("Error reading file:",err);
    res.status(500).json({ error: "Internal server error."})
  }
}

async function postItem(req, res) {
  // Implement Code to add 1 pet with new data
  console.log("hi")
}

async function putItem(req, res) {
  // Implement Code to update 1 pet with an Id and new data
}

async function deleteItem(req, res) {
  // Implement Code to delete 1 pet with an Id
}

// This function is just for illustration purposes
// You can delete it if you want
async function demoFunction(req, res) {
  // Exract the ":collection" and ":id" parameters from the URL
  const collection = req.params.collection;
  const id = req.params.id;
  // Create a message string
  let message = `Collection Requested: ${collection}, ID Requested: ${id}`;
  // Create a JSON object
  let JsonOutput = {
    "collection": collection,
    "id": id,
    "message": message
  };
  // Output a 200 status code and the JSON object
  res.status(200).json(JsonOutput);
}

app.get('/api/demo/:collection/:id', demoFunction);

// END STUDENT CODE AREA

// API ROUTES (DO NOT MODIFY)
app.get('/api/getItem/:collection/:id', getItem);
app.get('/api/getCollection/:collection', getCollection);
app.post('/api/postItem/:collection', postItem);
app.put('/api/putItem/:collection/:id', putItem);
app.delete('/api/deleteItem/:collection/:id', deleteItem);
//END API ROUTES

// FINAL SETUP (DO NOT MODIFY)
app.get('/', (req, res) => {
  res.redirect('/test.html');
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});