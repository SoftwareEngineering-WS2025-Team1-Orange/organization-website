import {CreateNgo} from '../service';
import { HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {NGOGet} from '../service/model/nGOGet';

@Injectable({
  providedIn: 'root'
})
export class NGOService {
  public registerNGO(createNgo: CreateNgo): Observable<HttpResponse<any>>{
    alert(JSON.stringify(["post NGO", createNgo]));

    return new BehaviorSubject( new HttpResponse({ status: 200 })).asObservable();
  }

  public ngoControllerGetMeV1(): Observable<NGOGet>{
    const ngoData: NGOGet = {
      name: "Helping Hands International",
      address: "123 Charity Lane, Kindness City, 56789",
      contact: "+123 456 7890",
      mail: "info@helpinghands.org",
      description: "Helping Hands International is dedicated to providing aid and support to underprivileged communities worldwide.",
      images: [
        "https://example.com/images/ngo1.jpg",
        "https://example.com/images/ngo2.jpg"
      ],
      ngo_id: "ngo_001",
      projects: Array.from({ length: 15 }, (_, index) => ({
        name: `Project ${index + 1}`,
        description: `Description for Project ${index + 1}. This project focuses on making a significant impact in the area of need ${index + 1}.`,
        images: [
          `https://example.com/images/project${index + 1}_1.jpg`,
          `https://example.com/images/project${index + 1}_2.jpg`
        ],
        spending_goal: 10000 + index * 5000,
        speding_current: (10000 + index * 5000) * 0.5,
        progress: 50,
        project_id: index + 1
      }))
    };
    return new BehaviorSubject(ngoData).asObservable();
  }
}
