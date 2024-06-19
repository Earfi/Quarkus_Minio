package example.camel;

import example.kafka.Producer;
import jakarta.enterprise.context.ApplicationScoped;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.jackson.JacksonDataFormat;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.inject.Inject;
import org.apache.camel.Exchange;
import org.apache.camel.Processor;

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
                .process(new JsonProcessor())
                .to("kafka:report");
    }

    private class JsonProcessor implements Processor {
        @Override
        public void process(Exchange exchange) {
            JsonNode jsonObjectNode = exchange.getIn().getBody(JsonNode.class);

            if (jsonObjectNode != null) {
                try {
                    producer.sendToKafka(jsonObjectNode);
                    exchange.getIn().setBody(jsonObjectNode.toString());
                } catch (Exception e) {
                    exchange.setProperty(Exchange.EXCEPTION_CAUGHT, e);
                    log.error("Failed to process JSON: " + jsonObjectNode.toString(), e);
                    throw e;
                }
            } else {
                throw new RuntimeException("Received null JsonNode from file");
            }
        }
    }
}
