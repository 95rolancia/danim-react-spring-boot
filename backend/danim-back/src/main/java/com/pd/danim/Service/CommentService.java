package com.pd.danim.Service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.pd.danim.Form.Request.CommentDeleteRequest;
import com.pd.danim.Form.Request.CommentRequest;
import com.pd.danim.Form.Response.CommentResponse;

public interface CommentService {
	int writeComment(CommentRequest req, HttpServletRequest httpServletReq);
	int deleteComment(CommentDeleteRequest req, HttpServletRequest httpServletReq);
	List<CommentResponse> getComments(long storyNo, HttpServletRequest httpServletReq);
}
