package example.kafka;

import example.service.jasper.ReportService;
import io.minio.MinioClient;
import io.vertx.core.json.JsonObject;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.reactive.messaging.Incoming;

import java.util.logging.Logger;

@ApplicationScoped
public class Consumer {

    @Inject
    MinioClient minioClient;

    @Inject
    ReportService generatePdfReportService;

    private static final Logger LOGGER = Logger.getLogger(Consumer.class.getName());

    @Incoming("method1-kafka-consumer")
    public void consumeKafka(String message) {
        try {
            LOGGER.info("Received message from Kafka: " + message);
            JsonObject jsonObject = new JsonObject(message);

            generatePdfReportService.generatePdfReport(jsonObject, "report.pdf", "camel", "3");
            LOGGER.info("PDF generated successfully");

        } catch (Exception e) {
            LOGGER.severe("Failed to process Kafka message: ." + e.getMessage());
            throw new RuntimeException("Failed to process Kafka message", e);
        }
    }
}
