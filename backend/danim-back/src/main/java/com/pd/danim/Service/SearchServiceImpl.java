package com.pd.danim.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pd.danim.DTO.Photo;
import com.pd.danim.DTO.User;
import com.pd.danim.Form.Response.SearchByAreaResponse;
import com.pd.danim.Form.Response.SearchByNicknameResponse;
import com.pd.danim.Repository.PhotoRepository;
import com.pd.danim.Repository.UserRepository;

@Service
public class SearchServiceImpl implements SearchService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PhotoRepository photoRepository;

	@Override
	public List<SearchByNicknameResponse> searchByNickName(String nickname) {
		
		List<SearchByNicknameResponse> responses = new ArrayList<>();
		
		List<User> users = userRepository.findByNicknameContaining(nickname);
		
		for (User user : users) {
			SearchByNicknameResponse response = new SearchByNicknameResponse();
			response.setNickname(user.getNickname());
			response.setProfile(user.getProfile());
			responses.add(response);
		}

		//없을 때도 처리해주기
		return responses;
	}

	@Override
	public List<SearchByAreaResponse> searchByArea(String area) {
		
		List<SearchByAreaResponse> responses = new ArrayList<>();
		
		List<Photo> photos = photoRepository.findTop9ByAddressContaining(area);
		
		for (Photo photo : photos) {
			SearchByAreaResponse response = new SearchByAreaResponse();
			response.setPhotoFileName(photo.getFilename());
			response.setStoryNo(photo.getStory().getStoryNo());
			response.setTitle(photo.getStory().getTitle());
			User user = userRepository.findByUserno(photo.getStory().getUserNo());
			response.setNickname(user.getNickname());
			responses.add(response);
		}
		
		
		return responses;
	}
	
	

}
