package com.pd.danim.Service;

import java.util.Collection;
import java.util.Iterator;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import com.pd.danim.DTO.DanimId;
import com.pd.danim.Form.Response.SignInResponse;
import com.pd.danim.Util.CookieUtil;
import com.pd.danim.Util.JwtUtil;
import com.pd.danim.Util.RedisUtil;

@Service
public class RefreshJwtTokenServiceImpl implements RefreshJwtTokenService{
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private CookieUtil cookieUtil;

	@Autowired
	private RedisUtil redisUtil;
	
	@Override
	public SignInResponse refreshJwt(HttpServletRequest request, HttpServletResponse response) {
		
		Cookie[] cookies = request.getCookies();
		String token = "";
		for (Cookie cookie : cookies) {
			if(cookie.getName().equals("refreshToken")) {
				token = cookie.getValue();
			}
		}
		
		String id = jwtUtil.getUsername(token);
		DanimId danim = new DanimId();
		danim.setId(id);
		String accessJwt = jwtUtil.generateToken(danim);
		String refreshJwt = jwtUtil.generateRefreshToken(danim);
		
		
		System.out.println("access token은 " + accessJwt);
				
		boolean deleteCheck = redisUtil.deleteData(id+"jwt");
//		System.out.println(deleteCheck);
		
		redisUtil.setData(id+"jwt", refreshJwt);
		
		Cookie refreshToken = cookieUtil.createCookie(JwtUtil.REFRESH_TOKEN_NAME, refreshJwt);
		
		SignInResponse signInResponse = new SignInResponse();
		signInResponse.setAccessToken(accessJwt);
		
		response.addCookie(refreshToken);
		
		
		//local용도
		Collection<String> headers = response.getHeaders(HttpHeaders.SET_COOKIE);
		for (String header : headers) {
			response.setHeader(HttpHeaders.SET_COOKIE, header+"; " + "SameSite=None; Secure;");
		}

		
		
		return signInResponse;
	}

}
