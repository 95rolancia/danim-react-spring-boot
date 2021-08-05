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
	
	@Autowired
	private CookieAttributeFilter cookieAttributeFilter;
	
	@Autowired
	private ExceptionHanlderFilter exceptionHanlderFilter;

////	@Autowired
////	private UserDetailsService jwtUserDetailsService;
////
////
////	@Autowired
////	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
////		// configure AuthenticationManager so that it knows from where to load
////		// user for matching credentials
////		// Use BCryptPasswordEncoder
////		auth.userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder());
////	}
////	//when using creating an user with bcryptpassword
////	@Bean
////	public PasswordEncoder passwordEncoder() {
////		return new BCryptPasswordEncoder();
////	}
////
////	@Bean
////	@Override
////	public AuthenticationManager authenticationManagerBean() throws Exception {
////		return super.authenticationManagerBean();
////	}
//		
//	
//
	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		// We don't need CSRF for this example
		httpSecurity.csrf().disable()
				// dont authenticate this particular request
				.authorizeRequests().antMatchers("/v2/api-docs/**",
						"/swagger.json",						
                        "/configuration/ui",
                        "/swagger-resources/**",
                        "/configuration/security",
                        "/swagger-ui.html",
                        "/webjars/**","/duplicate/**","/auth/signin", "/signup").permitAll()
				// options method allow
				.antMatchers(HttpMethod.OPTIONS).permitAll()
				// all other requests need to be authenticated
				.anyRequest().authenticated();
//				.and().
				// make sure we use stateless session; session won't be used to
				// store user's state.
//				exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and().sessionManagement()
//				.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//
//		// Add a filter to validate the tokens with every request
		httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
					.addFilterBefore(exceptionHanlderFilter, JwtRequestFilter.class);
		
//		.addFilterBefore(cookieAttributeFilter, BasicAuthenticationFilter.class);
	}
//	
//	
////	@Override
////	public void configure(WebSecurity web) throws Exception {
////		// TODO Auto-generated method stub
////		web.ignoring().antMatchers("/user/checkDuplicate/{user_id}");
////	}
}
