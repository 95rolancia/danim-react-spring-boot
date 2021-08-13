package com.pd.danim.Service;

import java.util.List;

import com.pd.danim.Form.Response.SearchByAreaResponse;
import com.pd.danim.Form.Response.SearchByNicknameResponse;

public interface SearchService {
	
	public List<SearchByNicknameResponse> searchByNickName(String nickname);
	public List<SearchByAreaResponse> searchByArea(String area);

}
