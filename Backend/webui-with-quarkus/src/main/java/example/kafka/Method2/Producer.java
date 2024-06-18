package example.kafka.Method2;

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
            JsonNode keyNode = jsonObjectNode.get("key");
            JsonNode valueNode = jsonObjectNode.get("value");

            if (keyNode == null || valueNode == null) {
                throw new IllegalArgumentException("JSON must contain 'key' and 'value' fields");
            }

            Integer key = keyNode.asInt();
            String value = valueNode.asText();

            Record<Integer, String> record = Record.of(key, value);
            emitter.send(record);
        } catch (Exception e) {
            LOGGER.severe("Failed to send message to Kafka: " + e.getMessage());
            throw new RuntimeException("Failed to send message to Kafka", e);
        }
    }
}
