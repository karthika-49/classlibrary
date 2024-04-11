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

const getPdfsByUser = async (req, res) => {
  const userId = req.params.id;
  console.log("User ID:", userId, req); // Log the userId to check if it's correct
  try {
    const pdfs = await Pdf.find({ userId });
    console.log("PDFs:", pdfs); // Log the PDFs to check if any are returned

    return res.status(200).json(pdfs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};




async function addPdf(req, res) {
  try {
    let { title, subject, userId } = req.body;
    let originalName = '';
    console.log(userId, title, subject);
    if (req.file) {
      title = req.file.filename;
      originalName = req.file.originalname; // Capture the original file name
    }

    const newPdf = new Pdf({ title, originalName, subject , userId});
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
  getPdfsByUser,
  addPdf,
  deletePdf,
};
