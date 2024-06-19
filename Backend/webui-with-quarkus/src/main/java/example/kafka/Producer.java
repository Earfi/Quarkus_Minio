package example.kafka;

import com.fasterxml.jackson.databind.JsonNode;
import io.smallrye.reactive.messaging.kafka.Record;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.reactive.messaging.Channel;
import org.eclipse.microprofile.reactive.messaging.Emitter;

import java.util.logging.Logger;

@ApplicationScoped
public class Producer {

    @Inject
    @Channel("kafka-out")
    Emitter<Record<Integer, String>> emitter;

    private static final Logger LOGGER = Logger.getLogger(Producer.class.getName());

    public void sendToKafka(JsonNode jsonObjectNode) {
        try {
            JsonNode recipientNameNode = jsonObjectNode.get("tags");

            if (recipientNameNode == null) {
                String errorMessage = String.format("Invalid JSON: recipientName is null, jsonObjectNode: %s",
                        jsonObjectNode.toString());
                throw new RuntimeException(errorMessage);
            }

            int key = recipientNameNode.asText().hashCode();
            String value = jsonObjectNode.toString();

            Record<Integer, String> record = Record.of(key, value);
            LOGGER.info("Sending record to Kafka - Key: " + key + ", Value: " + value);
            emitter.send(record);
        } catch (Exception e) {
            LOGGER.severe("Failed to send message to Kafka: " + e.getMessage());
            throw new RuntimeException("Failed to send message to Kafka", e);
        }
    }
}
