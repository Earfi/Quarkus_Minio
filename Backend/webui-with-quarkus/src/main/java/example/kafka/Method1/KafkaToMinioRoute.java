package example.kafka.Method1;

import example.service.jasper.ReportService;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.vertx.core.json.JsonObject;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.apache.camel.builder.RouteBuilder;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

@ApplicationScoped
public class KafkaToMinioRoute extends RouteBuilder {

    @Inject
    MinioClient minioClient;

    @Inject
    ReportService generatePdfReportService;

    @Override
    public void configure() throws Exception {
        from("kafka:No-method1-kafka-consumer?brokers=localhost:9092")
                .id("route2")
                .log("Received message from Kafka: ${body}")
                .process(exchange -> {
                    String jsonString = exchange.getIn().getBody(String.class);
                    JsonObject jsonObject = new JsonObject(jsonString);

                    String bucketName = "airplane";

                    // Generate PDF
                    byte[] pdfData = generatePdfReportService.generatePdfReport(jsonObject, "report.pdf", bucketName, "3");
                    System.out.println("PDF generated successfully");

                    // Upload PDF to MinIO
                    try (InputStream pdfInputStream = new ByteArrayInputStream(pdfData)) {
                        minioClient.putObject(
                                PutObjectArgs.builder()
                                        .bucket(bucketName)
                                        .object("report.pdf")
                                        .stream(pdfInputStream, pdfData.length, -1)
                                        .contentType("application/pdf")
                                        .build()
                        );
                        System.out.println("PDF uploaded to MinIO: report.pdf");
                    } catch (Exception e) {
                        throw new RuntimeException("Failed to upload PDF to MinIO", e);
                    }
                });
    }
}
