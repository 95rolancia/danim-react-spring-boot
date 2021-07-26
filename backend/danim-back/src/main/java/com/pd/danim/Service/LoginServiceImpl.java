package com.pd.danim.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pd.danim.Dto.DanimId;
import com.pd.danim.Repository.DanimRepository;

@Service
public class LoginServiceImpl implements LoginService {

	@Autowired
	private DanimRepository danimRepository;

	@Override
	public DanimId loginUser(String id, String password) throws Exception {

		DanimId danim = danimRepository.findById(id);
//		System.out.println("service의"+danim.getPassword());
		
		//왜 dead 코드인지 이해는 안감......
		if (danim == null) {
			throw new Exception("회원이  아니거나 비밀번호가 틀렸습니다.");
		}
		if (!danim.getPassword().equals(password)) {
			System.out.println("비밀번호 틀렸어");
			throw new Exception("회원이  아니거나 비밀번호가 틀렸습니다.");
		}
		return danim;
	}

}
