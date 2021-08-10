package com.pd.danim.Service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pd.danim.DTO.DanimId;
import com.pd.danim.DTO.Interest;
import com.pd.danim.DTO.User;
import com.pd.danim.Form.Request.InterestRequest;
import com.pd.danim.Repository.DanimRepository;
import com.pd.danim.Repository.InterestRepository;
import com.pd.danim.Repository.UserRepository;
import com.pd.danim.Util.JwtUtil;

@Service
public class InterestServiceImpl implements InterestService {

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private InterestRepository interestRepo;
	
	@Autowired
	private DanimRepository danimRepo;
	
	@Autowired
	JwtUtil jwtUtil;
	
	public boolean setInterest(InterestRequest input, HttpServletRequest httpServletReq) {
		final String requestTokenHeader = httpServletReq.getHeader("Authorization");
		String userId = jwtUtil.getUsername(requestTokenHeader);
		
		DanimId danim = danimRepo.findById(userId);
		if(danim==null) {
			return false;			
		}
		
		String[] areas = input.getAreas();
		User user = danim.getUser();
		List<Interest> inter = user.getInterests();		
		
		//변화된 부분만 변경하는 방법
		if(inter.size() >= areas.length) {
			for(int i=0;i<areas.length;i++) {
				inter.get(i).setArea(areas[i]);
			}
			
			while(inter.size() > areas.length){
				interestRepo.delete(inter.get(areas.length));
				inter.remove(areas.length);
			}
		
			
		}else {
			for(int i=0;i<inter.size();i++) {
				inter.get(i).setArea(areas[i]);
			}
			for(int i=inter.size();i<areas.length;i++) {
				Interest interest = new Interest();
				interest.setUser(user);
				interest.setArea(areas[i]);		
				inter.add(interest);
			}
		}
		
		interestRepo.saveAll(inter);
		
		return true;
	}
	
}
