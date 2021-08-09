package com.pd.danim.Service;


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
		final String requestTokenHeader = httpServletRequest.getHeader("Authorization");
		String username = jwtUtil.getUsername(requestTokenHeader);
		String data = username.concat("jwt");
		boolean deleted = redisUtil.deleteData(data);
	}

}
