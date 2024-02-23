package example.jwt;

import example.model.User;
import example.model.UserCredentials;
import example.repository.UserRepository;
import io.smallrye.jwt.build.Jwt;
import jakarta.inject.Inject;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.jwt.Claims;

@Path("/auth")
public class AuthenticationResource {

    @Inject
    UserRepository userRepository; // Inject the UserRepository

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response login(UserCredentials credentials) {
        // Check if credentials are valid
        User user = userRepository.findByUsernameAndPassword(credentials.getUsername(), credentials.getPassword());
        if (user != null) {
            String token = generateToken(user.getUsername(), user.getRoles());
            JsonObject tokenJson = Json.createObjectBuilder().add("token", token).build();
            return Response.ok(tokenJson).build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    // Method to generate JWT token
    private String generateToken(String username, String roles) {
        return Jwt.issuer("https://example.com/issuer")
                .upn(username)
                .claim(Claims.groups.name(), roles)
                .claim(Claims.birthdate.name(), "2001-07-13")
                .sign();
    }
}
