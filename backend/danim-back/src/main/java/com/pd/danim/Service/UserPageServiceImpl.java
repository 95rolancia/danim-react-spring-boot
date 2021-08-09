package com.pd.danim.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pd.danim.DTO.Follow;
import com.pd.danim.DTO.Story;
import com.pd.danim.DTO.StoryStatus;
import com.pd.danim.DTO.User;
import com.pd.danim.Form.Response.MyPageResponse;
import com.pd.danim.Form.Response.UserSimpleResponse;
import com.pd.danim.Repository.FollowRepository;
import com.pd.danim.Repository.StoryRepository;
import com.pd.danim.Repository.UserRepository;

@Service
public class UserPageServiceImpl implements UserPageService {
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private StoryRepository storyRepo;
	
	@Autowired
	private FollowRepository followRepo;
	
	
	public MyPageResponse userPage(String nickname) {
		User user = userRepo.findByNickname(nickname);
		long userno = user.getUserno();
		
		if(userno == 0) return null;
		
		List<Story> stories = storyRepo.findAllByUserNoAndStatus(userno,StoryStatus.TEMP);
		
		List<Follow> tFollowList = followRepo.findAllByUser(user);
		List<Follow> tFollowedList = followRepo.findAllByFollowNo(userno);
		
		List<UserSimpleResponse> followingList = new ArrayList();
		List<UserSimpleResponse> followerList = new ArrayList();
		
		for(Follow follow : tFollowList) {
			UserSimpleResponse usf = new UserSimpleResponse();
			usf.setNickname(follow.getUser().getNickname());
			usf.setProfile(follow.getUser().getProfile());
			followingList.add(usf);
		}
		
		for(Follow follow : tFollowedList) {
			UserSimpleResponse usf = new UserSimpleResponse();
			usf.setNickname(follow.getUser().getNickname());
			usf.setProfile(follow.getUser().getProfile());
			followerList.add(usf);
		}
		
		MyPageResponse mpf = new MyPageResponse();
		
		mpf.setFollowingList(followingList);		
		mpf.setFollowerList(followerList);
		mpf.setNickname(nickname);
		mpf.setStories(stories);
		
		
		
		return mpf;
		
	}
	
	
	
}
