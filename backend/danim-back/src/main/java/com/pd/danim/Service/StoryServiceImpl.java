package com.pd.danim.Service;

import java.io.File;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import com.pd.danim.DTO.Photo;
import com.pd.danim.DTO.Story;
import com.pd.danim.DTO.SubStory;
import com.pd.danim.DTO.User;
import com.pd.danim.Form.Request.PhotoRequest;
import com.pd.danim.Form.Request.PhotoUploadRequest;
import com.pd.danim.Form.Request.StoryRequest;
import com.pd.danim.Form.Response.PhotoResponse;
import com.pd.danim.Repository.DanimRepository;
import com.pd.danim.Repository.PhotoRepository;
import com.pd.danim.Repository.StoryRepository;
import com.pd.danim.Repository.SubStoryRepository;
import com.pd.danim.Repository.UserRepository;
import com.pd.danim.Util.AddressUtil;

@Service
public class StoryServiceImpl implements StoryService {

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private DanimRepository danimRepo;

	@Autowired
	private PhotoRepository photoRepo;

	@Autowired
	private SubStoryRepository subStoryRepo;

	@Autowired
	private StoryRepository storyRepo;

	@Autowired
	private AddressUtil addressUtil;
	
	
	public PhotoResponse uploadPhoto(PhotoUploadRequest photoReq, long userno) {		
		UUID uid = UUID.randomUUID();
		String absolutePath = new File("").getAbsolutePath() + File.separator;
		String path = "image" + File.separator + userno;
		File file = new File(path);

		if (!file.exists()) {
			file.mkdirs();
		}

		
		MultipartFile mfile = photoReq.getFile();
		String originalFileExtension;
		String contentType = mfile.getContentType();
		System.out.println(contentType);

		// 확장자가 없는 경우
		if (ObjectUtils.isEmpty(contentType)) {
			return null;
		}

		// 확장자 jpg, png 확인
		if (contentType.contains("image/jpeg")) {
			originalFileExtension = ".jpg";
		} else if (contentType.contains("image/png")) {
			originalFileExtension = ".png";
		} else {
			// 다른 확장자인 경우
			return null;
		}
		
		
		String address = addressUtil.ConvertAddress(photoReq.getLatitude(), photoReq.getLongtitude());
		
		/*
		 *  공공 데이터 테이블 생성 및 연결 
		 */
		
		String filename = uid.toString() + originalFileExtension;
		Photo photo = new Photo();
		photo.setFilename(filename);
		photo.setLatitude(photoReq.getLatitude());
		photo.setLongtitude(photoReq.getLongtitude());
		photo.setDate(photoReq.getDate());
		photo.setAddress(address);
		
		photoRepo.save(photo);

		// 파일 저장
		file = new File(absolutePath + path + File.separator + photo.getFilename());
		file.setWritable(true);
		file.setReadable(true);
		try {
			photoReq.getFile().transferTo(file);
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
		PhotoResponse response = new PhotoResponse();
		response.setFilename(filename);
		response.setLatitude(photo.getLatitude());
		response.setLongtitude(photo.getLongtitude());
		response.setDate(photoReq.getDate());
//		response.setSpaceName(spaceName);
//		response.setAddress(address);
		response.setPhotoNo(photo.getPhotoNo());
		response.setAddress(address);
		
		
		return response;
	}

	@Override
	public boolean writeStory(StoryRequest input) {

		Story story = new Story();

		List<PhotoRequest> photoReqList = input.getPhotos();


		SubStory[] subStoryArr = new SubStory[input.getDuration()];

		story.setCreatedDate(LocalDateTime.now());
		story.setStartDate(input.getStartDate());
		story.setDuration(input.getDuration());
		story.setStatus(input.getStatus());
		story.setTitle(input.getTitle());

		int seqNo = 0;
		List<Photo> photoList = new ArrayList();
		for (PhotoRequest photoReq : photoReqList) {
			Photo photo = new Photo(); 
			if(photoRepo.existsByPhotoNo(photoReq.getPhotoNo())) {
				photo = photoRepo.findByPhotoNo(photoReq.getPhotoNo());
			}
			
			seqNo = (int) Duration.between(input.getStartDate(), photo.getDate()).toDays();
			subStoryArr[seqNo].setUserNo(input.getUserno());
			subStoryArr[seqNo].setSeqNo(seqNo);
			subStoryArr[seqNo].setStory(story);
			photo.setStory(story);
			photo.setSubstory(subStoryArr[seqNo]);
			photo.setUserNo(input.getUserno());
			
			photoList.add(photo);
		}

		// 스토리 저장
		storyRepo.save(story);

		// 서브 스토리 저장
		for (SubStory sub : subStoryArr) {
			subStoryRepo.save(sub);
		}

		// 포토 저장
		for (Photo photo : photoList) {
			photoRepo.save(photo);
		}

		return true;
	}

	@Override
	public boolean modifyStory(StoryRequest input, long storyno, long userno) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean getStory(long storyno) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean getStories(User user) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean deleteStory(long storyno) {
		// TODO Auto-generated method stub
		return false;
	}

}
