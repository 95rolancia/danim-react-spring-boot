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
		
//		if(area[i].equals("전남")) {
//			inter.get(i).setArea("전라남");
//		} else if(area[i].equals("전북")) {
//			inter.get(i).setArea("전라북");
//		} else if(area[i].equals("경남")) {
//			inter.get(i).setArea("경상남");
//		}	else if(area[i].equals("경북")) {
//			inter.get(i).setArea("경상북");
//		} else if(area[i].equals("충남")) {
//			inter.get(i).setArea("충청남");
//		}	else if(area[i].equals("충북")) {
//			inter.get(i).setArea("충북");
//		} else {
//			inter.get(i).setArea(areas[i]);
//		}
		
		
		//변화된 부분만 변경하는 방법
		if(inter.size() >= areas.length) {
			for(int i=0;i<areas.length;i++) {
//				inter.get(i).setArea(areas[i]);
				if(areas[i].equals("전남")) {
					inter.get(i).setArea("전라남");
				} else if(areas[i].equals("전북")) {
					inter.get(i).setArea("전라북");
				} else if(areas[i].equals("경남")) {
					inter.get(i).setArea("경상남");
				}	else if(areas[i].equals("경북")) {
					inter.get(i).setArea("경상북");
				} else if(areas[i].equals("충남")) {
					inter.get(i).setArea("충청남");
				}	else if(areas[i].equals("충북")) {
					inter.get(i).setArea("충청북");
				} else {
					inter.get(i).setArea(areas[i]);
				}
			}
			
			while(inter.size() > areas.length){
				interestRepo.delete(inter.get(areas.length));
				inter.remove(areas.length);
			}
		
			
		}else {
			for(int i=0;i<inter.size();i++) {
//				inter.get(i).setArea(areas[i]);
				if(areas[i].equals("전남")) {
					inter.get(i).setArea("전라남");
				} else if(areas[i].equals("전북")) {
					inter.get(i).setArea("전라북");
				} else if(areas[i].equals("경남")) {
					inter.get(i).setArea("경상남");
				}	else if(areas[i].equals("경북")) {
					inter.get(i).setArea("경상북");
				} else if(areas[i].equals("충남")) {
					inter.get(i).setArea("충청남");
				}	else if(areas[i].equals("충북")) {
					inter.get(i).setArea("충북");
				} else {
					inter.get(i).setArea(areas[i]);
				}
			}
			for(int i=inter.size();i<areas.length;i++) {
				Interest interest = new Interest();
				interest.setUser(user);
				if(areas[i].equals("전남")) {
					interest.setArea("전라남");
				} else if(areas[i].equals("전북")) {
					interest.setArea("전라북");
				} else if(areas[i].equals("경남")) {
					interest.setArea("경상남");
				}	else if(areas[i].equals("경북")) {
					interest.setArea("경상북");
				} else if(areas[i].equals("충남")) {
					interest.setArea("충청남");
				}	else if(areas[i].equals("충북")) {
					interest.setArea("충북");
				} else {
					interest.setArea(areas[i]);
				}	
				inter.add(interest);
			}
		}
		
		interestRepo.saveAll(inter);
		
		return true;
	}
	
}
