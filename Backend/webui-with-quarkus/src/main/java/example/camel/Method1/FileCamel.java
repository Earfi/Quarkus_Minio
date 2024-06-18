package example.camel.Method1;

import example.kafka.Method2.Producer;
import jakarta.enterprise.context.ApplicationScoped;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.jackson.JacksonDataFormat;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.inject.Inject;
import org.apache.camel.Exchange;

@ApplicationScoped
public class FileCamel extends RouteBuilder {

    @Inject
    Producer producer;

    @Override
    public void configure() throws Exception {
        onException(Exception.class)
                .log("Exception caught: ${exception.message}")
                .handled(true);

        from("file:C:/test1?noop=true")
                .id("route1")
                .unmarshal(new JacksonDataFormat(JsonNode.class))
                .process(this::processJson)
                .log("Sending JSON to Kafka: ${body}")
                .to("kafka:method1-kafka-consumer");
    }

    private void processJson(Exchange exchange) {
        JsonNode jsonObjectNode = exchange.getIn().getBody(JsonNode.class);

        JsonNode keyNode = jsonObjectNode.get("key");
        JsonNode valueNode = jsonObjectNode.get("value");

        if (keyNode == null || valueNode == null) {
            throw new IllegalArgumentException("JSON must contain 'key' and 'value' fields");
        }

        producer.sendToKafka(jsonObjectNode);
        exchange.getIn().setBody(jsonObjectNode.toString());
    }
}
