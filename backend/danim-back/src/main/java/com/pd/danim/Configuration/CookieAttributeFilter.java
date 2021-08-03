package com.pd.danim.Configuration;

import java.io.IOException;
import java.util.Collection;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

import com.google.common.net.HttpHeaders;

public class CookieAttributeFilter implements Filter {

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletResponse httpServletResponse = (HttpServletResponse) response;
		chain.doFilter(request, response);
//		log.info("CookieAttributeFilter");
		addSameSite(httpServletResponse, "None");
	}

	private void addSameSite(HttpServletResponse response, String sameSite) {
		// TODO Auto-generated method stub
		Collection<String> headers = response.getHeaders(HttpHeaders.SET_COOKIE);
		boolean firstHeader = true;

		for (String header : headers) { // there can be multiple Set-Cookie attributes
			if (firstHeader) {
				response.setHeader(HttpHeaders.SET_COOKIE,
						String.format("%s; Secure; %s", header, "SameSite=" + sameSite));
				firstHeader = false;
				continue;
			}
			response.addHeader(HttpHeaders.SET_COOKIE, String.format("%s; Secure; %s", header, "SameSite=" + sameSite));
		}
	}

	@Override 
	public void init(FilterConfig filterConfig) throws ServletException { 
		// TODO Auto-generated method stub 
	}
	
	@Override public void destroy() { 
		// TODO Auto-generated method stub }
	}

}
