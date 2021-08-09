package com.pd.danim.DTO;

import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;

public class SecurityMember extends User{
	
	private static final long serialVersionUiD = 1L;
	
	public SecurityMember(DanimId danim, String role) {
		super(danim.getId(),"{noop}"+danim.getPassword(),AuthorityUtils.createAuthorityList(role));
	}
}
