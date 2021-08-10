package com.pd.danim.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.pd.danim.DTO.DanimId;
import com.pd.danim.Form.Response.MeResponse;
import com.pd.danim.Form.Response.SignInResponse;

public interface LoginService {
	
	DanimId loginUser(String id, String password) throws Exception;

	MeResponse getUserInfo(HttpServletRequest httpServletRequest);
	
	SignInResponse generateResponse(HttpServletResponse httpServletResponse,DanimId danim);

}	
