package com.pd.danim;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class DanimBackApplication {
	
	  @PostConstruct
	    void started() {
	        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
	  }
	

	public static void main(String[] args) {
		SpringApplication.run(DanimBackApplication.class, args);
	}

}
