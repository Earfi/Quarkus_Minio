package example.config;

import io.minio.MinioClient;
import jakarta.inject.Singleton;
import jakarta.ws.rs.Produces;

public class S3Configuration {

    @Produces
    @Singleton
    public MinioClient minioClient() {
        System.out.println();
        return MinioClient.builder()
                .endpoint("http://minio-dev:9000")
                .credentials("Dev", "Dev-Test")
                .build();
    }
}
