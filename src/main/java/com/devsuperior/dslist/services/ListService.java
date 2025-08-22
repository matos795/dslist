package com.devsuperior.dslist.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dslist.dto.ListDTO;
import com.devsuperior.dslist.entities.GameList;
import com.devsuperior.dslist.repositories.ListRepository;

@Service
public class ListService {
	
	@Autowired
	
	private ListRepository listRepository;
	
	@Transactional(readOnly = true)
	public ListDTO findById(Long listId) {
		GameList result = listRepository.findById(listId).get();
		ListDTO dto = new ListDTO(result);
		return dto;
	}
	
	@Transactional(readOnly = true)
	public List<ListDTO> findAll(){
		List<GameList> result = listRepository.findAll();
		return result.stream().map(x -> new ListDTO(x)).toList();
	}
}
