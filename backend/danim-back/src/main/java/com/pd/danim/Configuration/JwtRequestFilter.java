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
		
//		System.out.println(requestTokenHeader);
//		System.out.println("이 토큰의 주인은" + jwtUtil.getUsername(requestTokenHeader));
		
		try {
			if (requestTokenHeader != null) {
//				jwt = jwtToken.getValue();
				jwt = requestTokenHeader;
				username = jwtUtil.getUsername(jwt);
//				System.out.println(username);
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
			System.out.println("이곳에서 에러났어11111");
			throw new ExpiredJwtException(null, null, "access token expired");
//			httpServletResponse.setStatus(403,"access token expired");
//			refreshToken = cookieUtil.getCookie(httpServletRequest, JwtUtil.REFRESH_TOKEN_NAME);
//			if (refreshToken != null) {
//				refreshJwt = refreshToken.getValue();
//			}
		} catch (Exception e) {
			e.printStackTrace();
//			System.out.println("exception 발생 " + e.getMessage());
			httpServletResponse.setStatus(403,"access token expired");
		}
		
		
		//추가된 로직 : 위의 expiredJwtexception 내에서 refreshToken을 못잡아온다.
		if (refreshToken != null) {
			refreshJwt = refreshToken.getValue();
		}
		
		//to check  redisData matches with refreshJwtToken
		String redisData = null;
		
		try {
			if (refreshJwt != null) {
				
				refreshUname = jwtUtil.getUsername(refreshJwt);
				
				redisData = redisUtil.getData(refreshUname+"jwt");

				//이 부분의 바뀐 이유 : 원래는 토큰가지고 유저 정보를 얻지만 우리의 경우는 유저정보를 통해 token을 얻는다.
//				if (refreshUname.equals(jwtUtil.getUsername(refreshJwt))) {
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

//					Cookie newAccessToken = cookieUtil.createCookie(JwtUtil.ACCESS_TOKEN_NAME, newToken);
//					httpServletResponse.addCookie(newAccessToken);
				}
			}
		} catch (ExpiredJwtException e) {
			httpServletResponse.setStatus(403,"refresh token expired");
		}

		filterChain.doFilter(httpServletRequest, httpServletResponse);
	}

}

























