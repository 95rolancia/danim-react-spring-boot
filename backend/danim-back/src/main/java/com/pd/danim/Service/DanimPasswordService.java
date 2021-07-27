package com.pd.danim.Service;

public interface DanimPasswordService {
	boolean resetPassword(String userId);
	boolean updatePassword(String userId, String password);
}
