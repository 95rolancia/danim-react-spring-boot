package com.pd.danim.Service;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pd.danim.Dto.DanimId;
import com.pd.danim.Repository.DanimRepository;


@Service
public class DanimPasswordServiceImpl implements DanimPasswordService {
	
	@Autowired
	SMTPService SMTPService;
	
	@Autowired
	private DanimRepository danimRepo;
	
	
	
	//비밀번호 초기화
	@Override
	public boolean resetPassword(String userId) {
		DanimId danim = danimRepo.findById(userId);
		
		Random random = new Random();
		String key = "danim"+String.format("%06d", random.nextInt(1000000));
		
		SMTPService.sendMail(userId, "Danim 비밀번호 초기화 메일",
				"DANIM을 사용해주셔서 감사합니다! \n 다음 비밀번호를 사용 해주세요! \n 인증 코드 : " + key + "\n\n\n *본 메일을 발신 전용으로 메일을 수신할 수 없습니다");
		
		PasswordEncoder encoder = new BCryptPasswordEncoder();
		
		danim.setPassword(encoder.encode(key));		
		danimRepo.save(danim);
		
		return true;
	}
	
	//비밀번호 변경
	@Override
	public boolean updatePassword(String userId, String password) {
		
		DanimId danim = danimRepo.findById(userId);
		PasswordEncoder encoder = new BCryptPasswordEncoder();
		danim.setPassword(encoder.encode(password));
		danimRepo.save(danim);
		
		return true;
	}
}
