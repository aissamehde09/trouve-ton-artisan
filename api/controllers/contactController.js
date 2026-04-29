const nodemailer = require('nodemailer');

/**
 * POST /api/contact
 * Envoie un email à l'artisan via le formulaire de contact
 */
const sendContact = async (req, res) => {
  try {
    const { nom, email, objet, message, artisan_email, artisan_nom } = req.body;

    // Validation basique
    if (!nom || !email || !objet || !message || !artisan_email) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
    }

    // Validation format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Adresse email invalide.' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Trouve ton artisan" <${process.env.MAIL_USER}>`,
      to: artisan_email,
      replyTo: email,
      subject: `[Trouve ton artisan] ${objet}`,
      html: `
        <h2>Nouvelle demande de contact via Trouve ton artisan</h2>
        <p><strong>Artisan :</strong> ${artisan_nom}</p>
        <hr/>
        <p><strong>De :</strong> ${nom} (${email})</p>
        <p><strong>Objet :</strong> ${objet}</p>
        <p><strong>Message :</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
        <hr/>
        <p><small>Message envoyé depuis la plateforme Trouve ton artisan - Région Auvergne-Rhône-Alpes</small></p>
      `,
    });

    res.json({ success: true, message: 'Votre message a bien été envoyé.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l\'envoi du message.' });
  }
};

module.exports = { sendContact };
