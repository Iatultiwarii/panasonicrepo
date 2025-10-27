import nodemailer from "nodemailer";
import dotenv from "dotenv";
import QRCode from "qrcode";
import User from "../models/UserModel.js";
dotenv.config();

const transporter = nodemailer.createTransport({
    secure:true,
    host:'smtp.gmail.com',
    port:465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

  
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Temporary in-memory store (email -> OTP)
const otpStore = new Map();

export const registerUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP in memory with timestamp
    otpStore.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 }); // 5 min expiry

    await transporter.sendMail({
      from: `"User Verification" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Verification OTP",
      html: `<h2>Hello ${name}</h2><p>Your OTP is: <strong>${otp}</strong></p><p>It will expire in 5 minutes.</p>`,
    });

    console.log(`OTP sent to ${email}: ${otp}`);
    return res.json({ message: `OTP sent successfully to ${email}` });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
};


export const verifyOtp = (req, res) => {
    const { email, otp } = req.body;
  
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }
    const record = otpStore.get(email);
    if (!record) {
      return res.status(400).json({ success: false, message: "No OTP found for this email" });
    }
    if (Date.now() > record.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ success: false, message: "OTP has expired" });
    }
    if (record.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    otpStore.delete(email);
    return res.json({ success: true, message: "OTP verified successfully" });
  };
  
  
export const saveUserDetails = async (req, res) => {
  try {
    const { name, email, designation, company, slot1, slot2 } = req.body;

    if (!name || !email || !designation || !company || !slot1 || !slot2) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User details already saved" });
    }

    // Save user
    user = new User({ name, email, designation, company, slot1, slot2 });
    await user.save();

    // ✅ Generate QR Code and store as base64
    const qrData = `https://yourdomain.com/verify/${user._id}`;
    const qrCodeBase64 = await QRCode.toDataURL(qrData);

    // Convert base64 -> Buffer for attachment
    const qrBuffer = Buffer.from(qrCodeBase64.split(",")[1], "base64");

    // ✅ Send email with attachment
    await transporter.sendMail({
      from: `"Registration Success" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🎉 Registration Successful - Welcome!",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Hello ${name},</h2>
          <p>Thank you for registering!</p>
          <p>Here are your submitted details:</p>
          <ul>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Designation:</strong> ${designation}</li>
            <li><strong>Company:</strong> ${company}</li>
            <li><strong>Slot 1:</strong> ${slot1}</li>
            <li><strong>Slot 2:</strong> ${slot2}</li>
          </ul>

          <p>You can verify your registration by scanning this QR Code (also attached below):</p>
          <img src="cid:qrcode" alt="QR Code" style="width:150px; height:150px;" />

          <p>We look forward to seeing you!</p>
          <hr/>
          <small>This is an automated email. Please do not reply.</small>
        </div>
      `,
      attachments: [
        {
          filename: "qrcode.png",
          content: qrBuffer,
          cid: "qrcode", // same as in HTML img src="cid:qrcode"
        },
      ],
    });

    return res.json({
      message: "User details saved successfully and email sent!",
      user,
      qrCode: qrCodeBase64,
    });
  } catch (err) {
    console.error("Error saving user details:", err);
    res.status(500).json({ message: "Failed to save details", error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
};