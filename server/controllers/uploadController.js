const uploadController = (req, res) => {

  if (req.file === undefined){
    return res.status(400).json({ message: 'No se ha proveido un archivo'})
  } else {
    const imageUrl = `http://localhost:5000/images/${req.file.filename}`;
    const imagePageUrl = `http://localhost:5000/image/${req.file.filename}`;
    
  
    res.json({ imageUrl, imagePageUrl });
  }
};

module.exports = {
  uploadController,
};
