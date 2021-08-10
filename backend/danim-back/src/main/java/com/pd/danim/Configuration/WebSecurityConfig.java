package com.pd.danim.Configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private JwtRequestFilter jwtRequestFilter;
	
//	@Autowired
//	private CookieAttributeFilter cookieAttributeFilter;
	
	@Autowired
	private ExceptionHanlderFilter exceptionHanlderFilter;

	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		httpSecurity.csrf().disable()
				.authorizeRequests().antMatchers("/v2/api-docs/**",
						"/swagger.json",						
                        "/configuration/ui",
                        "/swagger-resources/**",
                        "/configuration/security",
                        "/api/swagger-ui.html",
                        "/swagger-ui.html",
                        "/webjars/**","/duplicate/**","/auth/signin","/auth/email","/auth/reset","/signup" , "account/**", "**", "*").permitAll()
				.antMatchers(HttpMethod.OPTIONS).permitAll()
				.anyRequest().authenticated();
		httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
					.addFilterBefore(exceptionHanlderFilter, JwtRequestFilter.class);
//					.addFilterBefore(cookieAttributeFilter, exceptionHanlderFilter.class);
	}
}
