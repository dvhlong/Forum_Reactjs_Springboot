package com.dvhl.forum_be.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;
@Service
public class FilesStorageServiceImpl implements FilesStorageService {
    private final Path root = Paths.get("avatars");
    @Override
    public void init() {
        try {
        Files.createDirectory(root);
        } catch (IOException e) {
        throw new RuntimeException("Could not initialize folder for upload!");
        }
    }
    @Override
    public void save(MultipartFile file,String newfilename) {
        try {
            Files.copy(file.getInputStream(), this.root.resolve(newfilename));
        } catch (Exception e) {
        throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
        }
    }
    @Override
    public Resource load(String filename) {
        try {
            Resource resource;
        if(Files.exists(root.resolve(filename))){
            Path file = root.resolve(filename);
            resource = new UrlResource(file.toUri());
        } else {
            Path file = root.resolve("img_avatar.png");
            resource = new UrlResource(file.toUri());
        }
        
        if (resource.exists() || resource.isReadable()) {
            return resource;
        } else {
            throw new RuntimeException("Could not read the file!");
        }
        } catch (MalformedURLException e) {
        throw new RuntimeException("Error: " + e.getMessage());
        }
    }
    @Override
    public void delete(String filename) {
        try {
            if(Files.exists(root.resolve(filename)))
                Files.delete(root.resolve(filename));
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}