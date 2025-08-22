package com.devsuperior.dslist.dto;

import com.devsuperior.dslist.entities.GameList;

public class ListDTO {

	private Long id;
	private String name;
	
	public ListDTO() {
		
	}

	public ListDTO(GameList entity) {
		super();
		this.id = entity.getId();
		this.name = entity.getName();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String title) {
		this.name = title;
	}
	
}
