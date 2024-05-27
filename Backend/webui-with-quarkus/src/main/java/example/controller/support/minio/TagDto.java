package example.controller.support.minio;

import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.annotations.providers.multipart.PartType;


public class TagDto {
    @FormParam("key")
    @PartType(MediaType.TEXT_PLAIN)
    public String key;

    @FormParam("value")
    @PartType(MediaType.TEXT_PLAIN)
    public String value;

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
