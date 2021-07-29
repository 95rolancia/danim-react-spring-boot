package com.pd.danim.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pd.danim.Dto.DanimId;
import com.pd.danim.Dto.User;
import com.pd.danim.Repository.DanimRepository;
import com.pd.danim.Repository.UserRepository;

@Service
public class LoginServiceImpl implements LoginService {

	@Autowired
	private DanimRepository danimRepository;
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public DanimId loginUser(String id, String password) throws Exception {

		DanimId danim = danimRepository.findById(id);
//		System.out.println("service의"+danim.getPassword());
		
		//왜 dead 코드인지 이해는 안감......
		if (danim == null) {
			throw new Exception("회원이  아니거나 비밀번호가 틀렸습니다.");
		}
		
		PasswordEncoder encoder = new BCryptPasswordEncoder();
		if (!encoder.matches(password, danim.getPassword())) {
			throw new Exception("회원이  아니거나 비밀번호가 틀렸습니다.");
		}
		return danim;
	}
	
	
	@Override
	public User getUserInfo(String id) {
		
		
		DanimId danim = danimRepository.findById(id);
		
		User user = userRepo.findByUserno(danim.getUserno());
		
		if(user!=null) {
			danim.setPassword(null);
			return user;
		}
		
		
		return null;
	}

}
