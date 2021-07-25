package com.pd.danim.Service;

import com.pd.danim.Dto.DanimId;
import com.pd.danim.Dto.SignUpForm;
import com.pd.danim.Dto.User;

import javassist.NotFoundException;

public interface SignUpService {
	boolean signUpUser(SignUpForm userForm);

	void sendVerificationMail(DanimId danimId) throws NotFoundException;
	
}
