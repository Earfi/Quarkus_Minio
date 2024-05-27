package example.controller.support.minio;

import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.annotations.providers.multipart.PartType;

public class tagsRemoveByKeyFile {
    @FormParam("bucket")
    @PartType(MediaType.TEXT_PLAIN)
    public String bucket;

    @FormParam("fileName")
    @PartType(MediaType.TEXT_PLAIN)
    public String fileName;

    @FormParam("key")
    @PartType(MediaType.TEXT_PLAIN)
    public String key;

    public String getBucket() {
        return bucket;
    }

    public void setBucket(String bucket) {
        this.bucket = bucket;
    }

    public String getObjectName() {
        return fileName;
    }

    public void setObjectName(String fileName) {
        this.fileName = fileName;
    }

    public String getTags() {
        return key;
    }

    public void setTags(String key) {
        this.key = key;
    }
}
