<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recolectar y sanitizar los datos del formulario
    $nombre = htmlspecialchars($_POST['nombre']);
    $pais = htmlspecialchars($_POST['pais']);
    $email = htmlspecialchars($_POST['email']);
    $interes = htmlspecialchars($_POST['interes']);
    $marca = htmlspecialchars($_POST['marca']);
    $pagina = htmlspecialchars($_POST['pagina']);
    $mensaje = htmlspecialchars($_POST['mensaje']);
    $presupuesto = htmlspecialchars($_POST['presupuesto']);
    $conociste = htmlspecialchars($_POST['conociste']);

    // cuerpo del mensaje
    $to = "simbolikadesign@gmail.com"; 
    $subject = "Nuevo mensaje del formulario de contacto";
    $body = "Nuevo mensaje recibido:\n\n";
    $body .= "Nombre: $nombre\n";
    $body .= "País: $pais\n";
    $body .= "Email: $email\n";
    $body .= "Interés: $interes\n";
    $body .= "Nombre de la marca: $marca\n";
    $body .= "Página Web/Instagram: $pagina\n";
    $body .= "Mensaje: $mensaje\n";
    $body .= "Presupuesto: $presupuesto\n";
    $body .= "Cómo me conociste: $conociste\n";

    // Cabeceras del correo
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Enviar el correo
    if (mail($to, $subject, $body, $headers)) {
        echo "Gracias por tu mensaje. Nos pondremos en contacto pronto.";
    } else {
        echo "Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.";
    }
}
?>
