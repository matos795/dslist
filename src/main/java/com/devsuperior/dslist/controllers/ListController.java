package com.devsuperior.dslist.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.dslist.dto.ListDTO;
import com.devsuperior.dslist.services.ListService;

@RestController
@RequestMapping(value = "/lists")
public class ListController {

	@Autowired
	private ListService listService;
	
	@GetMapping
	public List<ListDTO> findAll(){
		List<ListDTO> result = listService.findAll();
		return result;
	}
	
	@GetMapping(value = "/{id}")
	public ListDTO findById(@PathVariable Long id){
		ListDTO result = listService.findById(id);
		return result;
	}
}
