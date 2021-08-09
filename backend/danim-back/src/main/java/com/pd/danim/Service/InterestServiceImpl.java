package com.pd.danim.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pd.danim.DTO.Interest;
import com.pd.danim.DTO.User;
import com.pd.danim.Form.Request.InterestRequest;
import com.pd.danim.Repository.InterestRepository;
import com.pd.danim.Repository.UserRepository;

@Service
public class InterestServiceImpl implements InterestService {

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private InterestRepository interestRepo;
	
	public boolean setInterest(InterestRequest input) {
		
		
		String[] areas = input.getAreas();
		User user = userRepo.findByUserno(input.getUserno());
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
	
		// 통째로 날리고 다시 넣는 방법
		/*
		for(int i=0;i<inter.size();i++) {
			interestRepo.delete(inter.get(i));
		}
		
		
		
		for(int i=0;i<areas.length;i++) {
			Interest interest = new Interest();
			interest.setArea(areas[i]);	
			interest.setUser(user);
			inter.add(interest);		
		}
		
		interestRepo.saveAll(inter);
		*/		


		
		return true;
	}
	
}
