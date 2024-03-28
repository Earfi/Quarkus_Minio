package example.config;

import io.minio.MinioClient;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.ws.rs.Produces;
import org.eclipse.microprofile.config.inject.ConfigProperty;

public class S3Configuration {

    @Inject
    @ConfigProperty(name = "config.minio.endpoint",defaultValue = "http://minio-dev:9000")
    String minioEndpoint;

    @ConfigProperty(name = "config.minio.accessKey",defaultValue = "Dev")
    String accessKey;

    @ConfigProperty(name = "config.minio.secretKey",defaultValue = "Dev-Test")
    String secretKey;

    @Produces
    @Singleton
    public MinioClient minioClient() {
        System.out.println();
        return MinioClient.builder()
                .endpoint(minioEndpoint)
                .credentials(accessKey, secretKey)
                .build();
    }
}
