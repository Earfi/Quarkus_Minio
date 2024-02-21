package example.service;

import example.dto.FileInfo;
import io.minio.*;
import io.minio.errors.MinioException;
import io.minio.http.Method;
import io.minio.messages.Item;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.MediaType;

import java.io.IOException;
import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

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
                String url = minioClient.getPresignedObjectUrl(
                        GetPresignedObjectUrlArgs.builder()
                                .method(Method.GET)
                                .bucket(bucket)
                                .object(item.objectName())
                                .expiry(24 * 60 *60)
                                .build()
                );
                fileReturn.add(new FileInfo(item.objectName(),String.valueOf(item.size()),item.lastModified().toString() ,url));
            }
        } catch (MinioException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }


        return fileReturn;  
    }

    //    public List<BucketInfo> getAllBucket() {
//        List<BucketInfo> bucketReturn = new ArrayList<>();
//        try {
//            List<Bucket> bucketList = minioClient.listBuckets();
//            for (Bucket bucket : bucketList) {
//                bucketReturn.add(new BucketInfo(bucket.name(), bucket.creationDate().toString()));
//            }
//        } catch (MinioException e) {
//            e.printStackTrace();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return bucketReturn;
//    }

    public Object uploadFile(String bucketName, InputStream filStream, String fileName) throws Exception{
        try{
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucketName)
                            .object(fileName)
                            .stream(filStream,-1,10485760)
                            .contentType(MediaType.APPLICATION_OCTET_STREAM)
                            .build()
            );
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
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