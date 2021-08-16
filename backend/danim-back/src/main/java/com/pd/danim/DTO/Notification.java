package com.pd.danim.DTO;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Notification {

	@Id
	@Column(name = "notification_no")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long notiNo;
	
	@Column(name = "from_user_no")
	private long fromUserNo;
	@Column(name = "to_user_no")
	private long toUserNo;
	@Column(name = "data_id")
	private long dataId;
	@Column(name = "types")
	private String types;
	@Column(name = "is_read")
	private boolean isRead;
	
	
    public Notification(Long from, Long to, Long dataId, String type) {
        this.fromUserNo = from;
        this.toUserNo = to;
        this.dataId = dataId;
        this.types = type;
        this.isRead = false;
    }
    
    public boolean unread() {
        return !isRead;
    }

    public void read() {
        this.isRead = true;
    }

	
}
