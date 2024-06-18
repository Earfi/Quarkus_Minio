package example.camel.Method1;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;

public class CommonFunction implements Processor {

    @Override
    public void process(Exchange exchange) throws Exception {
        System.out.println("CommonFunction");
    }
}
