package com.pd.danim.Service;

import com.pd.danim.Dto.DanimId;
import com.pd.danim.Dto.User;

public interface LoginService {
	
	DanimId loginUser(String id, String password) throws Exception;

	User getUserInfo(String id);

}	
