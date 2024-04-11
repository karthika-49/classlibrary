const mongoose = require('mongoose');
const Subject = require('../models/Subject');

exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getSubjectByName = async (req, res) => {
  const { subjectName } = req.params;

  try {
    console.log('Fetching subject by name:', subjectName);

    const subject = await Subject.findOne({ name: subjectName });

    if (!subject) {
      console.log('Subject not found');
      return res.status(404).json({ error: 'Subject not found' });
    }

    console.log('Subject found:', subject);
    res.json(subject);
  } catch (error) {
    console.error('Error fetching subject by name:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
