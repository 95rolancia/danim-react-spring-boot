package com.pd.danim.Form.Response;

import java.util.ArrayList;
import java.util.List;

public class SubStoryResponse implements Comparable<SubStoryResponse> {
	private int seqNo;	
	private List<PhotoResponse> photos = new ArrayList();
	public int getSeqNo() {
		return seqNo;
	}
	public void setSeqNo(int seqNo) {
		this.seqNo = seqNo;
	}

	public List<PhotoResponse> getPhotos() {
		return photos;
	}
	public void setPhotos(List<PhotoResponse> photos) {
		this.photos = photos;
	}
	@Override
	public int compareTo(SubStoryResponse o) {
		
		return this.seqNo - o.seqNo;
	}
	
	
	
}
