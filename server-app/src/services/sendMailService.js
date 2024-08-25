import SibApiV3Sdk from 'sib-api-v3-sdk';

export const sendMailforgotPassword = async (to, to_name, reset_link) => {
    try {
        const defaultClient = SibApiV3Sdk.ApiClient.instance;
        const apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = process.env.BREVO_API_KEY;

        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

        const sendSmtpEmail = {
            to: [{ email: to, name: to_name }],
            sender: { email: 'clinica.veterinaria.pets2024@gmail.com', name: 'Clinica Veterinaria' },
            templateId: 2,
            params: {
                to_name: to_name,
                reset_link: reset_link,
            },
        };

        const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('Email enviado:', response);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        if (error.response) {
            console.error('Response body:', error.response.body);
        }
        throw new Error('Error al enviar el correo');
    }
};
