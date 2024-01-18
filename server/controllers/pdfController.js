const Pdf = require('../models/PDF');

async function getAllPdfs(req, res) {
  try {
    const pdfs = await Pdf.find();
    return res.status(200).json(pdfs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
}

const getPdfsBySubject = async (req, res) => {
  const subject = req.params.subject;
  console.log(subject)
  try {
    const pdfs = await Pdf.find({ subject });
    console.log(pdfs);

    return res.status(200).json(pdfs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getPdfsBySubject };


async function addPdf(req, res) {
  try {
    let { title, subject } = req.body;
    let originalName = '';

    if (req.file) {
      // If a file is provided, set the title based on the filename
      title = req.file.filename;
      originalName = req.file.originalname; // Capture the original file name
    }

    const newPdf = new Pdf({ title, originalName, subject });
    await newPdf.save();
    return res.status(201).json({ msg: 'PDF added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
}
const deletePdf = async (req, res) => {
  const pdfId = req.params.pdfId;

  try {
    const pdf = await Pdf.findById(pdfId);

    if (!pdf) {
      return res.status(404).json({ message: 'PDF not found' });
    }

    await pdf.remove();

    res.status(200).json({ message: 'PDF deleted successfully' });
  } catch (error) {
    console.error('Error deleting PDF:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = {
  getAllPdfs,
  getPdfsBySubject,
  addPdf,
  deletePdf,
};
