package example.jwt;

import io.smallrye.jwt.auth.principal.ParseException;
import jakarta.inject.Inject;
import jakarta.ws.rs.CookieParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.NewCookie;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.jwt.JsonWebToken;
import io.smallrye.jwt.auth.principal.JWTParser;
import io.smallrye.jwt.build.Jwt;

@Path("/secured")
public class SecuredResource {
    private static final String SECRET = "AyM1SysPpbyDfgZld3umj1qzKObwVMko";

    @Inject
    JWTParser parser;

    @GET
    @Produces("text/plain")
    public Response getUserName(@CookieParam("jwt") String jwtCookie) throws ParseException {
        if (jwtCookie == null) {
            // Create a JWT token signed using the 'HS256' algorithm
            String newJwtCookie = Jwt.upn("Alice").signWithSecret(SECRET);
            // or create a JWT token encrypted using the 'A256KW' algorithm
            // Jwt.upn("alice").encryptWithSecret(secret);
            return Response.ok("Alice").cookie(new NewCookie("jwt", newJwtCookie)).build();
        } else {
            // All mp.jwt and smallrye.jwt properties are still effective, only the verification key is customized.
            JsonWebToken jwt = parser.verify(jwtCookie, SECRET);
            // or jwt = parser.decrypt(jwtCookie, secret);
            return Response.ok(jwt.getName()).build();
        }
    }
}