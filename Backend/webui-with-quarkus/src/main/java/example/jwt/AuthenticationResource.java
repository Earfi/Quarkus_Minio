package example.jwt;

import example.model.User;
import example.model.UserCredentials;
import example.repository.UserRepository;
import io.quarkus.elytron.security.common.BcryptUtil;
import io.smallrye.jwt.build.Jwt;
import jakarta.inject.Inject;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.bouncycastle.crypto.generators.BCrypt;
import org.eclipse.microprofile.jwt.Claims;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Path("/auth")
public class AuthenticationResource {

    @Inject
    UserRepository userRepository;

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response login(UserCredentials credentials) {
        boolean passwordMatches = false;
        User user = userRepository.findByUsername(credentials.getUsername());
        if (user != null) {
            passwordMatches = BcryptUtil.matches(credentials.getPassword(), user.getPassword());
        }

        if (passwordMatches) {
            String token = generateToken(user);
            JsonObject tokenJson = Json.createObjectBuilder().add("token", token).build();
            return Response.ok(tokenJson).build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }


    private String generateToken(User user) {
        Instant now = Instant.now();
        Instant expiresAt = now.plus(1, ChronoUnit.HOURS);

        return Jwt.issuer("https://example.com/issuer")
                .upn(user.getUsername())
                .claim("userId", user.getId())
                .claim(Claims.groups.name(), user.getRoles())
                .expiresAt(expiresAt)
                .sign();
    }
}
