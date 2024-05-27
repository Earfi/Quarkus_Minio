package example.controller.support.minio;

import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.annotations.providers.multipart.PartType;

import java.util.List;
import java.util.Map;

public class tagsFile {
    @FormParam("bucket")
    @PartType(MediaType.TEXT_PLAIN)
    public String bucket;

    @FormParam("fileName")
    @PartType(MediaType.TEXT_PLAIN)
    public String fileName;

    @FormParam("tags")
    @PartType(MediaType.TEXT_PLAIN)
    public String tags;

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
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }
}
