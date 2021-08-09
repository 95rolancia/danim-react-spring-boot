package com.pd.danim.Service;

import org.springframework.mail.SimpleMailMessage;

import com.pd.danim.DTO.User;

import javassist.NotFoundException;

public interface SMTPService {
	
	void sendMail(String to, String sub, String text);

}
