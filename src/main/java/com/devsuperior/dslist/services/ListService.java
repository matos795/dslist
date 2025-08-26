package com.devsuperior.dslist.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dslist.dto.ListDTO;
import com.devsuperior.dslist.entities.GameList;
import com.devsuperior.dslist.projections.GameMinProjection;
import com.devsuperior.dslist.repositories.GameRepository;
import com.devsuperior.dslist.repositories.ListRepository;

@Service
public class ListService {
	
	@Autowired
	private ListRepository listRepository;
	@Autowired
	private GameRepository gameRepository;
	
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
	
	@Transactional
	public void move(Long listId, int sourceIndex, int destinationIndex) {
		List<GameMinProjection> list = gameRepository.searchByList(listId);
		GameMinProjection obj = list.remove(sourceIndex);
		list.add(destinationIndex, obj);
		
		int min = sourceIndex < destinationIndex ? sourceIndex : destinationIndex;
		int max = sourceIndex < destinationIndex ? destinationIndex : sourceIndex;
		
		for(int i=min; i<= max; i++) {
			listRepository.updateBelongingPosition(listId, list.get(i).getId(), i);
		}
	}
}
