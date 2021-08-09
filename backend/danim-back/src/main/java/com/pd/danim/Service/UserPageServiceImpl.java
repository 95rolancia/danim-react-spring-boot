package com.pd.danim.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pd.danim.Dto.Follow;
import com.pd.danim.Dto.MyPageForm;
import com.pd.danim.Dto.Story;
import com.pd.danim.Dto.StoryStatus;
import com.pd.danim.Dto.User;
import com.pd.danim.Dto.UserSimpleForm;
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
	
	
	public MyPageForm userPage(String nickname) {
		User user = userRepo.findByNickname(nickname);
		long userno = user.getUserno();
		
		if(userno == 0) return null;
		
		List<Story> stories = storyRepo.findAllByUserNoAndStatus(userno,StoryStatus.TEMP);
		
		List<Follow> tFollowList = followRepo.findAllByUser(user);
		List<Follow> tFollowedList = followRepo.findAllByFollowNo(userno);
		
		List<UserSimpleForm> followingList = new ArrayList();
		List<UserSimpleForm> followerList = new ArrayList();
		
		for(Follow follow : tFollowList) {
			UserSimpleForm usf = new UserSimpleForm();
			usf.setNickname(follow.getUser().getNickname());
			usf.setProfile(follow.getUser().getProfile());
			followingList.add(usf);
		}
		
		for(Follow follow : tFollowedList) {
			UserSimpleForm usf = new UserSimpleForm();
			usf.setNickname(follow.getUser().getNickname());
			usf.setProfile(follow.getUser().getProfile());
			followerList.add(usf);
		}
		
		MyPageForm mpf = new MyPageForm();
		
		mpf.setFollowingList(followingList);		
		mpf.setFollowerList(followerList);
		mpf.setNickname(nickname);
		mpf.setStories(stories);
		
		
		
		return mpf;
		
	}
	
	
	
}
