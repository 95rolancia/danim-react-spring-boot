package com.pd.danim.Service;

import javax.servlet.http.HttpServletRequest;

public interface AuthService {
	boolean isValidity(HttpServletRequest httpServletReq, String userid);

	long getUserNo(String userId);
}
