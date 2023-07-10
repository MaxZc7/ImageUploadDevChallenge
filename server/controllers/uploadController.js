const uploadController = (req, res) => {

  if (req.file === undefined){
    return res.status(400).json({ message: 'No se ha proveido un archivo'})
  } else {
    // 'http://localhost:5000' ||
    const baseUrl =  "https://imageuploadmaxz.onrender.com/";
    const imageUrl = `${baseUrl}/images/${req.file.filename}`;
    const imagePageUrl = `${baseUrl}/image/${req.file.filename}`;
    
  
    res.json({ imageUrl, imagePageUrl });
  }
};

module.exports = {
  uploadController,
};
