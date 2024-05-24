package example.controller.support.minio;

import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.annotations.providers.multipart.PartType;

public class renameFile {

    @FormParam("bucket")
    @PartType(MediaType.TEXT_PLAIN)
    public String bucket;

    @FormParam("oldName")
    @PartType(MediaType.TEXT_PLAIN)
    public String oldName;

    @FormParam("newName")
    @PartType(MediaType.TEXT_PLAIN)
    public String newName;
}
