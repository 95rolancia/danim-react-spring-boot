package com.pd.danim.Service;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pd.danim.Repository.DanimRepository;
import com.pd.danim.Util.JwtUtil;

@Service
public class AuthServiceImpl implements AuthService {
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private DanimRepository danimRepo;
	
	@Override
	public boolean isValidity(HttpServletRequest httpServletReq, String userId) {
		final String requestTokenHeader = httpServletReq.getHeader("Authorization");
		String idFromToken = jwtUtil.getUsername(requestTokenHeader);
		
		if(idFromToken.equals(userId)) {			
			return true;
		}
		else {
			return false;
		}
		
	}
	
	@Override
	public long getUserNo(String userId) {
		
		if(!danimRepo.existsById(userId)) {
			return -1;
		}
		
		return danimRepo.findById(userId).getUserno();
	}
	
}
