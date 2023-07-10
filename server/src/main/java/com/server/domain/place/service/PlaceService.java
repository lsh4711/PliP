package com.server.domain.place.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.server.domain.place.dto.PlaceDto;

import com.server.domain.place.entity.Place;
import com.server.domain.place.mapper.PlaceMapper;
import com.server.domain.place.repository.PlaceRepository;
import com.server.domain.record.entity.Record;
import com.server.domain.schedule.entity.SchedulePlace;
import com.server.domain.schedule.repository.SchedulePlaceRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlaceService {
    private final PlaceRepository placeRepository;
    private final PlaceMapper placeMapper;

    //final이 빠지면 RequiredArgsConstructor로 생성이 안됨!
    private final SchedulePlaceRepository schedulePlaceRepository;

    public List<Place> getPlaces(long memberId) {
        // placeRepository.fin

        return null;
    }


    public List<Place> savePlaces(List<Place> places) {
        return placeRepository.saveAll(places);

        // 디버깅용
        // for (Place place : places) {
        //     Place savedPlace = placeRepository.save(place);
        //     System.out.println("CREATED");
        // }
    }

    public List<Place> placeDtosToPlaces(List<PlaceDto.Post> placedtos) {
        return placeMapper.postDtosToPlaces(placedtos);
    }

    public List<Record> findRecords(Long placeId) {
        List<Record> records = new ArrayList<>();

        List<SchedulePlace> schedulePlaceList = schedulePlaceRepository.findByPlacePlaceId(placeId);

        if (schedulePlaceList.size()>0) {
            for(SchedulePlace schedulePlace:schedulePlaceList){
                for(Record record:schedulePlace.getRecords()){
                    records.add(record);
                }
            }
        }
        return records;
    }
}