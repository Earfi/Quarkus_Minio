package org.example.config;

import io.minio.MinioClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class S3Configuration {
    @Bean
    public MinioClient minioClient(){
        System.out.println();
        return MinioClient.builder()
                .endpoint("http://minio-dev:9000")
                .credentials("Dev", "Dev-Test")
                .build();
    }
}
