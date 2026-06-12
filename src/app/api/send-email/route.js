import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request) {
  try {
    const { name, email, message } = await request.json()

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Name, email, and message are required fields.' },
        { status: 400 }
      )
    }

    // Check if email credentials are configured
    const emailUser = process.env.EMAIL_USER
    const emailPassword = process.env.EMAIL_PASSWORD

    if (!emailUser || !emailPassword) {
      console.error('Email configurations (EMAIL_USER/EMAIL_PASSWORD) are missing in the server environment.')
      return NextResponse.json(
        { 
          message: 'Message sending is currently offline. Server environment variables (EMAIL_USER/EMAIL_PASSWORD) are not configured.' 
        },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for port 465, false for other ports
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    })

    // Email to you (original functionality)
    const mailOptionsToYou = {
      from: emailUser,
      to: 'beherasubhasish2005@gmail.com',
      subject: `Subhasish | New message from ${name} (${email})`,
      text: message,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    }

    // Confirmation email to user
    const mailOptionsToUser = {
      from: emailUser,
      to: email,
      subject: 'Thank you for contacting Subhasish.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank you for reaching out!</h2>
          <p>Dear ${name},</p>
          <p>I have received your message and will get back to you as soon as possible. Thank you for your interest in my work.</p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; margin: 20px 0;">
            <h4 style="margin: 0 0 10px 0; color: #333;">Your message:</h4>
            <p style="margin: 0; color: #666;">${message}</p>
          </div>
          
          <p>Best regards,<br>
          <strong>Subhasish</strong></p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #888;">This is an automated confirmation email. Please do not reply to this email.</p>
        </div>
      `,
    }

    // Send email to you (essential)
    await transporter.sendMail(mailOptionsToYou)

    // Send confirmation email to user (optional/best effort)
    try {
      await transporter.sendMail(mailOptionsToUser)
    } catch (userMailError) {
      console.warn('Failed to send confirmation email to user:', userMailError)
    }

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to send email' },
      { status: 500 }
    )
  }
}