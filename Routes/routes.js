const express = require('express');
const { crosshair } = require('../models/Crosshair.model');

const crosshairRouter = express.Router();

// GET All Crosshairs
crosshairRouter.get('/crosshair', async (req, res) => {
  try {
    const presets = await crosshair.find();
    if (!presets) {
      return res.status(404).json({ message: "No presets found" });
    }
    res.status(200).send(presets);
  } catch (e) {
    res.status(400).send("Error fetching presets");
  }
});

// GET Crosshair by ID
crosshairRouter.get('/crosshair/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const crosshairData = await crosshair.findOne({ CrosshairID: id });

    if (!crosshairData) {
      return res.status(404).json({ message: 'Crosshair not found.' });
    }

    res.status(200).json(crosshairData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching crosshair data.' });
  }
});

// PUT (Update) Crosshair
crosshairRouter.put('/crosshair/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Color, Type, Game, CreatedBy } = req.body;

    const updatedCrosshair = await crosshair.findOneAndUpdate(
      { CrosshairID: id },
      { Color, Type, Game, CreatedBy },
      { new: true }
    );

    if (!updatedCrosshair) {
      return res.status(404).json({ message: 'Crosshair not found.' });
    }

    res.status(200).json(updatedCrosshair);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating crosshair.' });
  }
});

module.exports = { crosshairRouter };
