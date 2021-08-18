package com.pd.danim.Service;

public interface DanimPasswordService {
	boolean sendResetPassword(String userId);	
	boolean resetPassword(String userId, String password, String key);
}
