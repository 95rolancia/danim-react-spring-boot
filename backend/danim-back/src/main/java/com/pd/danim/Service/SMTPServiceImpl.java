package com.pd.danim.Service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class SMTPServiceImpl implements SMTPService {
	
	
	
	private JavaMailSender emailSender;
	
	
	@Async
	@Override
	public void sendMail(String to, String sub, String text) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(to);
		message.setSubject(sub);
		message.setText(text);
		emailSender.send(message);
		
	}
	


}
