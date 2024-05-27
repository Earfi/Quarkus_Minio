package example.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import example.controller.support.minio.*;
import example.dto.minio.FileInfo;
import example.service.minio.MinioBucketService;
import example.service.minio.MinioFileService;
import example.service.minio.MinioTagsService;
import example.service.serviceInject.GetBucketName;
import io.minio.MinioClient;
import io.minio.errors.MinioException;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;

import java.io.IOException;
import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/minio")
@Produces(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class MinioResource {
        @Inject
        MinioFileService fileService;

        @Inject
        MinioBucketService bucketService;

        @Inject
        MinioTagsService minioTagsService;

        @Inject
        private MinioClient minioClient;

        @GET
        @Path("/file/all/{bucket}")
        @Produces(MediaType.APPLICATION_JSON)
        @PermitAll
//    @Schema(implementation = MinioFileService.class)
//    @APIResponses(value = {
//            @APIResponse(responseCode = "200", description = "ok" , content = @Content(mediaType = "application/json")),
//            @APIResponse(responseCode = "404", description = "Nooo Bucket")
//    })
        public Response getAllFile(@PathParam("bucket") String bucket) {
            try {
                List<FileInfo> files = fileService.getAllFile(bucket);
                return Response.ok(files).build();
            } catch (Exception e) {
                return Response.status(Response.Status.NOT_FOUND).entity("Nooo Bucket").build();
            }
        }

        @POST
        @Path("/download/file")
        @PermitAll
        public Response downloadFile(@MultipartForm downloadFile file) {
            try {
                // Check if bucket or fileName is empty
                if (file.bucket == null || file.bucket.isEmpty() || file.fileName == null || file.fileName.isEmpty()) {
                    return Response.status(Response.Status.BAD_REQUEST)
                            .entity("Bucket or fileName is empty.")
                            .build();
                }

                InputStream stream = fileService.downloadFile(file.bucket, file.fileName);

                if (stream == null) {
                    return Response.status(Response.Status.NOT_FOUND)
                            .entity("File not found.")
                            .build();
                }

                return Response.ok(stream).build();
            } catch (Exception e) {
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                        .entity("Error downloading file.")
                        .build();
            }
        }

    @POST
    @Path("/file/upload")
//    @RolesAllowed({"User","Admin"})
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response uploadFile(@MultipartForm FileUpload file) throws Exception {
//        [{"key":"shirt color","value":"blue"},{"key":"theme","value":"nature"}]
        InputStream fileStream = file.file;
        String folder = file.folder;

        ObjectMapper objectMapper = new ObjectMapper();
        List<TagDto> tagList = objectMapper.readValue(file.tagsAsString, objectMapper.getTypeFactory().constructCollectionType(List.class, TagDto.class));

        Map<String, String> tags = new HashMap<>();
        for (TagDto tag : tagList) {
            tags.put(tag.getKey(), tag.getValue());
        }

        try {
            Object response;
            if (folder == null || folder.equals("") || folder.isEmpty() || folder == "" || folder.equals("null") || folder == "null") {
                response = fileService.uploadFile(file.bucket, fileStream, file.fileName, tags);
            } else {
                response = fileService.uploadFile(file.bucket, fileStream, folder + "/" + file.fileName, tags);
            }
            return Response.status(200).entity(response).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(500).entity("Failed to upload file").build();
        }
    }


    @PUT
    @Path("/file/edit")
    @RolesAllowed({"User","Admin"})
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response renameFile(@MultipartForm renameFile file) throws Exception {
        try  {
            return Response.status(200).entity(fileService.renameFile(file.bucket, file.oldName, file.newName)).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(500).entity("Failed to upload file").build();
        }
    }

    @DELETE
    @Path("/file/delete")
    @RolesAllowed({"User","Admin"})
    public Response deleteFile(@MultipartForm deleteFile file) {
        try {
            fileService.deleteFile(file.bucket, file.fileName);
            return Response.ok("delete file : " + file.fileName + " successfully.").build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Failed to delete file").build();
        }
    }

//--------------------------------------------------
//--------------------------------------------------
//---------------- tags ----------------------------
//--------------------------------------------------
//--------------------------------------------------

    @POST
    @Path("/tags")
//    @RolesAllowed({"User","Admin"})
    public Response addMoreTags(@MultipartForm tagsFile file) throws JsonProcessingException {
//        [{"key":"shirt color","value":"blue"},{"key":"theme","value":"nature"}]
        ObjectMapper objectMapper = new ObjectMapper();
        List<TagDto> tagList = objectMapper.readValue(file.getTags(), objectMapper.getTypeFactory().constructCollectionType(List.class, TagDto.class));

        Map<String, String> tags = new HashMap<>();
        for (TagDto tag : tagList) {
            tags.put(tag.getKey(), tag.getValue());
        }

        minioTagsService.addMoreTags(file.bucket, file.fileName, tags);
        return Response.ok().entity("Tags added successfully.").build();
    }

    @DELETE
    @Path("/tags")
    @RolesAllowed({"User","Admin"})
    public Response deleteTagsByKey(@MultipartForm tagsRemoveByKeyFile file) {
        minioTagsService.deleteTagsByKey(file.bucket, file.fileName, file.key);
        return Response.ok().entity("Tags deleted successfully.").build();
    }

//--------------------------------------------------
//--------------------------------------------------
//--------------- bucket ---------------------------
//--------------------------------------------------
//--------------------------------------------------

    @GET
    @Path("/all/bucket")
    public Response getAllBucket() throws Exception {
        return Response.status(200).entity(bucketService.getAllBucket()).build();
    }

    @POST
    @Path("/bucket/upload")
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed({"User","Admin"})
    public Response createBucket(GetBucketName requestBody) {
        try {
            String bucketName = requestBody.getBucketName();
            bucketService.uploadBucket(bucketName);
            return Response.status(200).build();
        }catch (Exception e){
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DELETE
    @Path("/{bucket}/delete")
    @RolesAllowed({"User","Admin"})
    public Response deleteBucket(@PathParam("bucket") String bucketName) {
        try {
            bucketService.removeBucket(bucketName);
            return Response.status(200).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Failed to delete bucket").build();
        }
    }

}