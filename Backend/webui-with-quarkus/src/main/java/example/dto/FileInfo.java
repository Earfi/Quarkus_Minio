package example.dto;

public class FileInfo {
    private String fileName;
    private String fileSize;
    private String creationDate;

    public FileInfo(String fileName, String fileSize, String creationDate) {
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.creationDate = creationDate;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileSize() {
        return fileSize;
    }

    public void setFileSize(String fileSize) {
        this.fileSize = fileSize;
    }

    public String getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }
}
