package com.pd.danim.Configuration;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class ExceptionHanlderFilter extends OncePerRequestFilter {

	private Logger log = LoggerFactory.getLogger(this.getClass());

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		try {
			filterChain.doFilter(request, response);
		} catch (ExpiredJwtException ex) {
			log.error("expired exception doesn't have access token");
			setErrorResponse(HttpStatus.FORBIDDEN, response, ex);

		} catch (RuntimeException ex) {
			log.error("runtime exception exception handler filter");
			setErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, response, ex);
		}
	}

	public void setErrorResponse(HttpStatus status, HttpServletResponse response, Throwable ex) {
		response.setStatus(status.value(),ex.getMessage());
		System.out.println(ex.getMessage());
		log.error(ex.getMessage());
		response.setContentType("application/json");
		response.setHeader("Access-Control-Allow-Credentials", "true");
		response.setHeader("Access-Control-Allow-Origins", "https://localhost:3000");
		response.setHeader("Access-Control-Expose-Headers","Content-Disposition, X-AUTH-TOKEN, Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Credentials");
//	        ErrorResponse errorResponse = new ErrorResponse(ErrorCode.INTER_SERVER_ERROR);
//	        errorResponse.setMessage(ex.getMessage());
		try {
//	            String json = errorResponse.convertToJson();
			System.out.println("exception filter에 걸리겠지??????");
//	            response.getWriter().write(json);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
