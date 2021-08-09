package com.pd.danim.Configuration;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.pd.danim.DTO.DanimId;
import com.pd.danim.Service.MyUserDetailService;
import com.pd.danim.Util.CookieUtil;
import com.pd.danim.Util.JwtUtil;
import com.pd.danim.Util.RedisUtil;

import io.jsonwebtoken.ExpiredJwtException;


@Component
public class JwtRequestFilter extends OncePerRequestFilter {

	@Autowired
	private MyUserDetailService userDetailsService;

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private CookieUtil cookieUtil;

	@Autowired
	private RedisUtil redisUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
			FilterChain filterChain) throws ServletException, IOException {

		final Cookie jwtToken = cookieUtil.getCookie(httpServletRequest, JwtUtil.ACCESS_TOKEN_NAME);
		Cookie refreshToken = cookieUtil.getCookie(httpServletRequest, JwtUtil.REFRESH_TOKEN_NAME);
		final String requestTokenHeader = httpServletRequest.getHeader("Authorization");
		String username = null;
		String jwt = null;
		String refreshJwt = null;
		String refreshUname = null;
		
		try {
			if (requestTokenHeader != null) {
				jwt = requestTokenHeader;
				username = jwtUtil.getUsername(jwt);
			}
			if (username != null) {
				UserDetails userDetails = userDetailsService.loadUserByUsername(username);

				if (jwtUtil.validateToken(jwt, userDetails)) {
					UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
							userDetails, null, userDetails.getAuthorities());
					usernamePasswordAuthenticationToken
							.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
					SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
				}
			}
		} catch (ExpiredJwtException e) {
			throw new ExpiredJwtException(null, null, "access token expired");
		} catch (Exception e) {
			
		}
		
		
		if (refreshToken != null) {
			refreshJwt = refreshToken.getValue();
		}
		
		String redisData = null;
		
		try {
			if (refreshJwt != null) {
				
				refreshUname = jwtUtil.getUsername(refreshJwt);
				
				redisData = redisUtil.getData(refreshUname+"jwt");

				if (refreshJwt.equals(redisData)) {
					UserDetails userDetails = userDetailsService.loadUserByUsername(refreshUname);
					UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
							userDetails, null, userDetails.getAuthorities());
					usernamePasswordAuthenticationToken
							.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
					SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);

					DanimId danim = new DanimId();
					danim.setId(refreshUname);
					String newToken = jwtUtil.generateToken(danim);

				}
			}
		} catch (ExpiredJwtException e) {
			throw new ExpiredJwtException(null, null, "refresh token expired");
		}

		filterChain.doFilter(httpServletRequest, httpServletResponse);
	}

}

























