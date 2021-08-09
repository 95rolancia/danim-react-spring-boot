package com.pd.danim.Form.Request;

import java.util.List;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value="관심 지역 입력 폼", description="관심 지역(배열), 회원 번호")
public class InterestRequest {
	@ApiModelProperty(value="관심 지역들", example="[\"부산\",\"대전\",\"제주도\"]")
	private String[] areas;
	@ApiModelProperty(value = "회원 번호", example="486")
	private long userno;
	
	public String[] getAreas() {
		return areas;
	}
	public void setAreas(String[] areas) {
		this.areas = areas;
	}
	public long getUserno() {
		return userno;
	}
	public void setUserno(long userno) {
		this.userno = userno;
	}

	
	
	
}
