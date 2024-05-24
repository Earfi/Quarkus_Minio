package example.controller.support.minio;

import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.annotations.providers.multipart.PartType;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

public class FileUpload {
    @FormParam("file")
    @PartType(MediaType.APPLICATION_OCTET_STREAM)
    public InputStream file;

    @FormParam("fileName")
    @PartType(MediaType.TEXT_PLAIN)
    public String fileName;

    @FormParam("bucket")
    @PartType(MediaType.TEXT_PLAIN)
    public String bucket;

    @FormParam("folder")
    @PartType(MediaType.TEXT_PLAIN)
    public String folder;

    @FormParam("tagsAsString")
    @PartType(MediaType.TEXT_PLAIN)
    public String tagsAsString;

}
