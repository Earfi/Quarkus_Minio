package example.service.user;

import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;

public class UserProfileService {

    public String saveProfileImage(byte[] fileBytes, String fileName) throws IOException {
        String uploadDir = "C:\\project_minio_quarkus_jasper_react\\img\\profile";
        String filePath = uploadDir + File.separator + fileName;
        File file = new File(filePath);
        FileUtils.writeByteArrayToFile(file, fileBytes);
        return filePath;
    }
}
