package com.pd.danim.Service;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pd.danim.DTO.DanimId;
import com.pd.danim.Repository.DanimRepository;
import com.pd.danim.Util.RedisUtil;


@Service
public class DanimPasswordServiceImpl implements DanimPasswordService {
	
	@Autowired
	SMTPService SMTPService;
	
	@Autowired
	private DanimRepository danimRepo;
	
	@Autowired
	private RedisUtil redisUtil;

	
	@Override
	public boolean sendResetPassword(String userId) {
		DanimId danim = danimRepo.findById(userId);
		
		Random random = new Random();
		String key = String.format("%06d", random.nextInt(1000000));
		
		SMTPService.sendMail(userId, "Danim 비밀번호 초기화 인증 메일",
				"DANIM을 사용해주셔서 감사합니다! \n 다음 인증 코드를 입력 해주세요! \n 인증 코드 : " + key + "\n\n\n *본 메일은 발신 전용 메일이며, 회신 되지 않으므로 문의 사항은 고객센터를 이용해주세요.");
		
		
		redisUtil.setDataExpire(userId + "passwordReset", key, 60 * 5L);			
		danimRepo.save(danim);
		
		return true;
	}
	
	@Override
	public boolean resetPassword(String userId, String password, String key) {
		
		String danimId = redisUtil.getData(userId + "passwordReset");		
		if (danimId == null || !danimId.equals(key)) {
			return false;
		}
		
		DanimId danim = danimRepo.findById(userId);
		PasswordEncoder encoder = new BCryptPasswordEncoder();
		danim.setPassword(encoder.encode(password));
		danimRepo.save(danim);
		
		return true;
	}
}
