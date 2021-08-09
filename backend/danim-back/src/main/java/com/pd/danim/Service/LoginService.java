package com.pd.danim.Service;

import com.pd.danim.DTO.DanimId;
import com.pd.danim.DTO.User;

public interface LoginService {
	
	DanimId loginUser(String id, String password) throws Exception;

	User getUserInfo(String id);

}	
