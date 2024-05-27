package example.service.minio;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import example.dto.minio.FileInfo;
import io.minio.*;
import io.minio.errors.MinioException;
import io.minio.http.Method;
import io.minio.messages.Item;
import io.minio.messages.Tags;
import io.vertx.codegen.doc.Tag;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.MediaType;

import java.io.IOException;
import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@ApplicationScoped
public class MinioFileService{

    @Inject
    private MinioClient minioClient;

    public List<FileInfo> getAllFile(String bucket) throws Exception {
        List<FileInfo> fileReturn = new ArrayList<>();
        Iterable<Result<Item>> listObj = minioClient.listObjects(bucket);
        try {
            for (Result<Item> file : listObj) {
                Item item = file.get();

                Tags tags = minioClient.getObjectTags(
                        GetObjectTagsArgs.builder()
                                .bucket(bucket)
                                .object(item.objectName())
                                .build()
                );

                Map<String, String> tagsMap = tags.get();
                List<String> tagsList = new ArrayList<>();
                if (tagsMap != null && !tagsMap.isEmpty()) {
                    tagsMap.forEach((key, value) -> tagsList.add(key + ":" + value));
                }

                String url = minioClient.getPresignedObjectUrl(
                        GetPresignedObjectUrlArgs.builder()
                                .method(Method.GET)
                                .bucket(bucket)
                                .object(item.objectName())
                                .expiry(24 * 60 * 60)
                                .build()
                );

                fileReturn.add(new FileInfo(item.objectName(), String.valueOf(item.size()), item.lastModified().toString(), url, tagsList));
            }
        } catch (MinioException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return fileReturn;
    }


    public Object uploadFile(String bucketName, InputStream fileStream, String fileName,Map<String, String> tags) throws Exception{
        try {
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucketName)
                            .object(fileName)
                            .stream(fileStream,-1,10485760)
                            .contentType(MediaType.APPLICATION_OCTET_STREAM)
                            .build()
            );

            if (tags != null){
                minioClient.setObjectTags(SetObjectTagsArgs.builder()
                        .bucket(bucketName)
                        .object(fileName)
                        .tags(tags)
                        .build());

            }


            return "File uploaded successfully";
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Failed to upload file");
        }
    }


    public void deleteFile(String bucket, String fileName) throws Exception{
        try {
            minioClient.removeObject(
                    RemoveObjectArgs.builder()
                            .bucket(bucket)
                            .object(fileName)
                            .build()
            );
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    public InputStream downloadFile(String bucket, String fileName) throws Exception {
        try {
            InputStream inputStream = minioClient.getObject(bucket, fileName);
            return inputStream;
        } catch (MinioException e) {
            System.err.println("Error while downloading file: " + e.getMessage());
            throw new Exception("Failed to download file from MinIO", e);
        }
    }

    public Object renameFile(String bucketName, String oldName, String newName) {
        try {
            minioClient.copyObject(
                    CopyObjectArgs.builder()
                            .source(io.minio.CopySource.builder().bucket(bucketName).object(oldName).build())
                            .bucket(bucketName)
                            .object(newName)
                            .build());

            minioClient.removeObject(
                    RemoveObjectArgs.builder()
                            .bucket(bucketName)
                            .object(oldName)
                            .build());

            System.out.println("ไฟล์ถูกเปลี่ยนชื่อเรียบร้อยแล้ว");
        } catch (MinioException e) {
            System.out.println("เกิดข้อผิดพลาดจาก MinIO: " + e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        } catch (InvalidKeyException e) {
            throw new RuntimeException(e);
        }
        return null;
    }


}