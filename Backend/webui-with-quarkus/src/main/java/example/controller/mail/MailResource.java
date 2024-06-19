package example.controller.mail;

import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

@Path("/send-mail")
public class MailResource {

    @Inject
    Mailer mailer;

    @GET
    public String sendEmail() {
        mailer.send(Mail.withText("pichaya8442@gmail.com",
                "Test Email",
                "Hello, this is a test email from Quarkus!"));
        return "Email sent!";
    }
}