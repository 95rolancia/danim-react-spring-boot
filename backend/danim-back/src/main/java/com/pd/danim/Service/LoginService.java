package com.pd.danim.Service;

import com.pd.danim.Dto.DanimId;

public interface LoginService {
	
	DanimId loginUser(String id, String password) throws Exception;

}	
