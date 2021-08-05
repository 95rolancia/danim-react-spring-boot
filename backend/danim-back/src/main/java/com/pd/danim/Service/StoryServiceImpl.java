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

import com.pd.danim.Dto.Photo;
import com.pd.danim.Dto.PhotoForm;
import com.pd.danim.Dto.Story;
import com.pd.danim.Dto.StoryForm;
import com.pd.danim.Dto.SubStory;
import com.pd.danim.Dto.TestForm;
import com.pd.danim.Dto.User;
import com.pd.danim.Repository.PhotoRepository;
import com.pd.danim.Repository.StoryRepository;
import com.pd.danim.Repository.SubStoryRepository;
import com.pd.danim.Repository.UserRepository;

@Service
public class StoryServiceImpl implements StoryService {

	@Autowired
	UserRepository userRepo;
	
	@Autowired
	PhotoRepository photoRepo;
	
	@Autowired
	SubStoryRepository subStoryRepo;
	
	@Autowired
	StoryRepository storyRepo;
	
	@Override
	public boolean test(TestForm test) {
		
//		User user = userRepo.findByNickname("킹경원");		
//		
//		Story story = new Story();
//		SubStory subStory = new SubStory();
//		Photo photo = new Photo();
//		
//		story.setUserNo(user.getUserno());
//		story.setTitle("테스트 스토리");
//		story.setStartDate(LocalDateTime.now());
//		
//		System.out.println(LocalDateTime.now());
//		
//		subStory.setUserNo(1);
//		subStory.setStory(story);
//		subStory.setSeqNo(1);
//		
//		
//		
//		photo.setSubstory(subStory);
//		photo.setUserNo(1);
//		photo.setStory(story);
//		photo.setDate(LocalDateTime.now());
//		photo.setFilename("test");
//		photo.setLatitude("23.123123");
//		photo.setLongtitude("123.12323");
//		
//		storyRepo.save(story);
//		subStoryRepo.save(subStory);		
//		photoRepo.save(photo);
//		
//		int seq = (int)Duration.between(test.getDate(), LocalDateTime.now()).toDays();
//		System.out.println(seq);
////		UUID uid = UUID.randomUUID();
////		String absolutePath = new File("").getAbsolutePath() + File.separator;
////		String path = "image" + File.separator + "test";
////		File nFile = new File(path);
////
////		System.out.println(file);
////		String originalFileExtension;
////		String contentType = file.getContentType();
////		System.out.println(contentType);
////		
////		if (!nFile.exists()) {
////			nFile.mkdirs();
////		}
////		
////		// 확장자가 없는 경우
////		if (ObjectUtils.isEmpty(contentType)) {
////			return false;
////		}
////
////		// 확장자 jpg, png 확인
////		if (contentType.contains("image/jpeg")) {
////			originalFileExtension = ".jpg";
////		} else if (contentType.contains("image/png")) {
////			originalFileExtension = ".png";
////		} else {
////			// 다른 확장자인 경우
////			return false;
////		}
////
////		System.out.println(contentType);
////		nFile = new File(absolutePath + path + File.separator + uid.toString()+ originalFileExtension);
////		System.out.println(absolutePath + path + File.separator + uid.toString() + originalFileExtension);
////		// 파일 권한 설정(쓰기, 읽기)
////		try {
////			file.transferTo(nFile);
////		} catch (Exception e) {
////
////		}
////		nFile.setWritable(true);
////		nFile.setReadable(true);

		return true;
	}

	@Override
	public boolean writeStory(StoryForm input) {

		Story story = new Story();

		UUID uid = UUID.randomUUID();
		String absolutePath = new File("").getAbsolutePath() + File.separator;
		String path = "image" + File.separator + input.getUserno();
		File file = new File(path);

		List<Photo> photoList = new ArrayList();

		if (!file.exists()) {
			file.mkdirs();
		}
		
		int cnt=1;
		for (PhotoForm photoForm : input.getPhotos()) {
			MultipartFile mfile = photoForm.getFile();
			String originalFileExtension;
			String contentType = mfile.getContentType();
			System.out.println(contentType);

			// 확장자가 없는 경우
			if (ObjectUtils.isEmpty(contentType)) {
				return false;
			}

			// 확장자 jpg, png 확인
			if (contentType.contains("image/jpeg")) {
				originalFileExtension = ".jpg";
			} else if (contentType.contains("image/png")) {
				originalFileExtension = ".png";
			} else {
				// 다른 확장자인 경우
				return false;
			}

			String filename = uid.toString() + originalFileExtension;
			Photo photo = new Photo();
			photo.setFilename(filename);
			photo.setContent(photoForm.getContent());
			photo.setLatitude(photoForm.getLatitude());
			photo.setLongtitude(photoForm.getLongtitude());
			photo.setContent(photoForm.getContent());
			photo.setDate(photoForm.getDate());			
			
			photoList.add(photo);
			
			//파일 저장
			file = new File(absolutePath + path + File.separator + photo.getFilename());
			file.setWritable(true);
			file.setReadable(true);
			try {
				photoForm.getFile().transferTo(file);
			} catch (IllegalStateException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			
			//대표 이미지 설정
			if(cnt==input.getThumbnailNo()) {
				story.setThumbnail(photo.getFilename());
			}
			cnt++;
			
		}
		
		
		SubStory[] subStoryArr = new SubStory[input.getDuration()];

		story.setCreatedDate(LocalDateTime.now());
		story.setStartDate(input.getStartDate());
		story.setDuration(input.getDuration());
		story.setStatus(input.getStatus());
		story.setTitle(input.getTitle());

		int seqNo = 0;
		
		for (Photo photo : photoList) {
			seqNo= (int)Duration.between(input.getStartDate(), photo.getDate()).toDays(); 
			subStoryArr[seqNo].setUserNo(input.getUserno());
			subStoryArr[seqNo].setSeqNo(seqNo);
			subStoryArr[seqNo].setStory(story);
			photo.setStory(story);
			photo.setSubstory(subStoryArr[seqNo]);
			photo.setUserNo(input.getUserno());			
		}
		
		
		//스토리 저장
		storyRepo.save(story);
		
		//서브 스토리 저장
		for(SubStory sub : subStoryArr) {
			subStoryRepo.save(sub);
		}
		
		
		
		
		//포토 저장
		for(Photo photo : photoList) {		
			photoRepo.save(photo);
		}
		

		return true;
	}

	@Override
	public boolean modifyStory(StoryForm input, long storyno, long userno) {
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
