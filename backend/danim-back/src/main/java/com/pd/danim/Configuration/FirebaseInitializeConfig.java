package com.pd.danim.Configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

@Service
public class FirebaseInitializeConfig {
    @PostConstruct
    public void initialize() throws IOException {		
    	String rootPath = System.getProperty("user.dir");
    	System.out.println("------------------------------");
    	System.out.println();
        System.out.println("현재 프로젝트의 경로 : "+ rootPath);
        System.out.println();
        System.out.println("------------------------------");
        
		FileInputStream serviceAccount =
		  new FileInputStream(rootPath + "/src/main/resources/firebase/danim-89ae9-firebase-adminsdk-4v8tv-df518fb5fb.json");
		
		FirebaseApp firebaseApp = null;
		List<FirebaseApp> firebaseApps = FirebaseApp.getApps();
		if(firebaseApps != null && !firebaseApps.isEmpty()) {
			for(FirebaseApp app : firebaseApps) {
				if(app.getName().equals(FirebaseApp.DEFAULT_APP_NAME))
					firebaseApp = app;
			}
		} else {
			FirebaseOptions options = new FirebaseOptions.Builder()
			  .setCredentials(GoogleCredentials.fromStream(serviceAccount))
			  .setDatabaseUrl("https://danim-89ae9-default-rtdb.firebaseio.com/")
			  .build();
			
			FirebaseApp.initializeApp(options);

		}
    }
}