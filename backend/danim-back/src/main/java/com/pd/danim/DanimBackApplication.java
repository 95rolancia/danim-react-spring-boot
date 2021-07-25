package com.pd.danim;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class DanimBackApplication {

	public static void main(String[] args) {
		SpringApplication.run(DanimBackApplication.class, args);
	}

}
