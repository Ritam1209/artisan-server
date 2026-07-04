import nodemailer from "nodemailer";

export const sendEnquiryEmail = async (req, res) => {
  try {
    const { name, email, message, product } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields required"
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Enquiry from ${name}`,
      html: `
        <h2>New Art Enquiry</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Product:</b> ${product || "N/A"}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Email sent successfully"
    });

  } catch (error) {
    console.error("Email Error:", error);

    res.status(500).json({
      success: false,
      message: "Email failed"
    });
  }
};