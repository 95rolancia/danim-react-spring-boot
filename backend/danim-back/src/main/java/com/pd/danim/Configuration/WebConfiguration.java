package com.pd.danim.Configuration;



import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {
	
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		// TODO Auto-generated method stub
		//allowedOrigins를 localhost:3000으로 바꿔야지 안나오려나? 내일 해보기 그 외의 것들은 구현되어있음.
		registry.addMapping("/**")
				.allowedOrigins("https://localhost:3000", "https://i5b204.p.ssafy.io")
				.allowedMethods("*")
				.allowedHeaders("Content-Type","X-AUTH-TOKEN","Authorization","Access-Control-Allow-Origin","Access-Control-Allow-Credentials")
				.exposedHeaders("Content-Disposition","X-AUTH-TOKEN","Authorization","Access-Control-Allow-Origin","Access-Control-Allow-Credentials")
				.allowCredentials(true);
//				.maxAge(3600);
	}
	

}
