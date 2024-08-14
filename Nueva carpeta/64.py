import base64

# Mensaje original
message = """
Date: Wed, 14 Aug 2024 12:30:00 +0000
To: destinatario@example.com
Subject: Asunto del correo
Content-Type: text/plain; charset="UTF-8"

Este es el cuerpo del correo electrónico.
"""

# Codificar en Base64 y hacer URL-safe
encoded_message = base64.urlsafe_b64encode(message.encode("utf-8")).decode("utf-8").rstrip("=")

encoded_message