package com.pd.danim.Service;

import java.security.Principal;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pd.danim.Util.JwtUtil;
import com.pd.danim.Util.RedisUtil;

@Service
public class SignOutServiceImpl implements SignOutService {
	
	@Autowired
	private RedisUtil redisUtil;
	
	@Autowired
	private JwtUtil jwtUtil;

	@Override
	public void signOut(HttpServletRequest httpServletRequest) {
//		String username = principal.getName();
//		String data = username.concat("jwt");
		final String requestTokenHeader = httpServletRequest.getHeader("Authorization");
		System.out.println(requestTokenHeader);
		String username = jwtUtil.getUsername(requestTokenHeader);
		System.out.println(username);
		String data = username.concat("jwt");
		redisUtil.deleteData(data);
		
		
		
//		final Cookie[] cookies = httpServletRequest.getCookies();
//		for(Cookie cookie : cookies) {
//			String username = jwtUtil.getUsername(cookie.getValue());
//			String data = username.concat("jwt");
//			redisUtil.deleteData(data);
//		}
		
	}

}
