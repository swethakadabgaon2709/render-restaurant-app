import mongoose from "mongoose";  // Add this

const reservationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
date: { type: Date, required: true },
  time: { type: String, required: true },
}, { timestamps: true });

const Reservation = mongoose.model("Reservation", reservationSchema);

const send_reservation = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, date, time } = req.body;
    
    const newReservation = new Reservation({
      firstName, lastName, email, phone, date, time
    });
    
    await newReservation.save();
    
    res.status(200).json({
      success: true,
      message: "Reservation created successfully!",
    });
  } catch (error) {
    console.error("Reservation error:", error);  // Add logging
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default send_reservation;
